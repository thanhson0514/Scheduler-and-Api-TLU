import React from "react";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import "./Alert.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(4)
    },
    padding: "5px",
    "font-weight": 300,
    "border-radius": "5px",
    transition: "300ms ease"
  }
}));

const Alerts = ({ alerts }) => {
  const classes = useStyles();

  return (
    !!alerts.length &&
    alerts.map(alert => (
      <div className={classes.root}>
        <Alert severity={alert.type}>{alert.msg}</Alert>
      </div>
    ))
  );
};
const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
