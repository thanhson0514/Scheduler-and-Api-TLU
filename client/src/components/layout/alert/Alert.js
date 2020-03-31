import React from "react";
import { connect } from "react-redux";

import "./Alert.css";

const Alert = ({ alerts }) => {
  console.log("alert:", alerts);
  return (
    !!alerts.length &&
    alerts.map(alert => (
      <div className={`alert alert-${alert.type}`} key={alert.id}>
        <h3>
          <i className="fas fa-exclamation-triangle" />
          {""}
          {alert.msg}
        </h3>
      </div>
    ))
  );
};
const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alert);
