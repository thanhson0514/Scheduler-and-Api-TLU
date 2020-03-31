import React, { Fragment, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import getUser from "../../actions/user";
import Spinner from "../layout/Spinner";
import AuthContext from "../../actions/auth/authContext";
// import image from "../../assets/download (1).jpeg";
import "./Profile.css";

const Profile = props => {
  const authContext = useContext(AuthContext);

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
    <Spinner />
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
              {/* <div className="view-more">
                <button className="view-more-btn">More</button>
              </div> */}
            </div>
            <div className="footer-responsive">
              <Link to="#">
                <i className="fab fa-github" />
              </Link>
              <Link to="#">
                <i className="fab fa-facebook" />
              </Link>
              <Link to="#">
                <i className="fab fa-google" />
              </Link>
              <Link to="#">
                <i className="fab fa-twitter" />
              </Link>
            </div>
          </div>
          <div className="footer-user">
            <Link to="#">
              <i className="fab fa-github" />
            </Link>
            <Link to="#">
              <i className="fab fa-facebook" />
            </Link>
            <Link to="#">
              <i className="fab fa-google" />
            </Link>
            <Link to="#">
              <i className="fab fa-twitter" />
            </Link>
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
