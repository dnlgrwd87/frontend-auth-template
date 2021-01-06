import React, { useContext, useEffect, useState } from 'react';
import { auth, FirebaseUser } from '../firebase';
import { createUser, verifyUserExists } from '../services/userService';

export interface IAuth {
  currentUser: FirebaseUser | null;
}

export const AuthContext = React.createContext<IAuth>({
  currentUser: null,
});

export const useAuth = () => useContext<IAuth>(AuthContext);

export const AuthProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(async user => {
      if (user) {
        try {
          const response = await verifyUserExists();
          if (!response.data) {
            try {
              await createUser(user.email);
            } catch {
              user = null;
            }
          }
        } catch {
          user = null;
        }
      }

      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
