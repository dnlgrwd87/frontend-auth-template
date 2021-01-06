import firebase from 'firebase';
import { auth, googleProvider } from '../firebase';

export interface IAuth {
  currentUser: firebase.User | null;
}

type UserCredential = firebase.auth.UserCredential;

export const loginWithGoogle = () => {
  return auth.signInWithPopup(googleProvider);
};

export const signup = (email: string, password: string): Promise<UserCredential> => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const login = (email: string, password: string): Promise<UserCredential> => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const logout = (): Promise<void> => {
  return auth.signOut();
};

export const generateHeaders = async () => {
  const token = await auth.currentUser?.getIdToken();

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
