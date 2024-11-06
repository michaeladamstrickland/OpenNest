import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from './react-auth0-wrapper';

// Private Route component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          // If the user is authenticated, render the component
          <Component {...props} />
        ) : (
          // Otherwise, redirect them to login
          loginWithRedirect()
        )
      }
    />
  );
};

export default PrivateRoute;
