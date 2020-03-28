import React, { useContext, useEffect, Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../actions/auth/authContext";
import { NavBar } from "../layout/navbar/NavBar";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthentication, loadAuth } = authContext;
  useEffect(() => {
    loadAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthentication ? (
          <Redirect to="/login" />
        ) : (
          <Fragment>
            <NavBar />
            <Component {...props} />
          </Fragment>
        )
      }
    />
  );
};
