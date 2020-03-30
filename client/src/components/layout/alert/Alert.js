import React, { useContext } from "react";

import AlertContext from "../../../actions/alert/alertContext";
import "./Alert.css";

export const Alert = () => {
  const alertContext = useContext(AlertContext);
  return (
    <React.Fragment>
      {alertContext.alert.map(el => (
        <div className={`alert alert-${el.type}`} key={el.id}>
          <h3>
            <i className="fas fa-exclamation-triangle" />{""}
            {el.msg}
          </h3>
        </div>
      ))}
    </React.Fragment>
  );
};
