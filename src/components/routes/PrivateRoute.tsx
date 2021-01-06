import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

interface RouteProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser
          ? <Component {...props} />
          : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
