import React, { Fragment, useContext, useEffect } from "react";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import getUser from "../../actions/user";
import AuthContext from "../../actions/auth/authContext";
// import image from "../../assets/download (1).jpeg";
import "./Profile.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
    width: "100%",
    height: "100vh",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

const Profile = props => {
  const authContext = useContext(AuthContext);
  const classes = useStyles();

  const {
    getUser,
    linkFb,
    displayName,
    studentCode,
    birthPlace,
    email,
    image,
    loading
  } = props;

  const { token, isAuthentication } = authContext;

  useEffect(() => {
    if (token || isAuthentication) {
      getUser();
    }
    // eslint-disable-next-line
  }, [token]);

  return loading ? (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  ) : (
    <Fragment>
      <div className="container-user">
        <div className="user">
          <div className="image">
            <img alt="" src={`http://sv20.tlu.edu.vn/imagesv/${image}.jpg`} />
          </div>
          <div className="info">
            <div className="sayHi">
              <h3>
                Hi <span>{displayName}</span>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      name="checkedH"
                    />
                  }
                />
              </h3>
            </div>
            {!linkFb ? <p>https://100co.com</p> : <p>{linkFb}</p>}
            <div className="details">
              <div>
                <h5>Name:</h5>
                <p>{displayName}</p>
              </div>
              <div>
                <h5>Student code:</h5>
                <p>{studentCode}</p>
              </div>
              <div>
                <h5>Email:</h5>
                <p>{email}</p>
              </div>
              <div>
                <h5>Place:</h5>
                <p>{birthPlace}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  loading: state.user.loading,
  displayName: state.user.displayName,
  studentCode: state.user.studentCode,
  birthPlace: state.user.birthPlace,
  email: state.user.email,
  image: state.user.image,
  linkFb: state.user.linkFb
});

export default connect(mapStateToProps, { getUser })(Profile);
