import React, { Fragment } from "react";

import "./ChangePassword.css";

export const ChangePassword = () => {
  return (
    <Fragment>
      <div className="container-form-password">
        <form>
          <input type="text" />
          <input type="password" />
          <input type="password" />
        </form>
      </div>
    </Fragment>
  );
};
