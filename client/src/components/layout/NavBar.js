import React, { Fragment, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import AuthContext from "../../actions/auth/authContext";
import { SideDrawer } from "./SideDrawer";
import { Backdrop } from "./Backdrop";
import "./NavBar.css";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const onLogout = e => {
    authContext.logout();
  };
  const openSideDrawer = () => {
    setIsOpen(true);
  };
  const closeSideDrawer = () => {
    setIsOpen(false);
  };
  const onChange = e => {
    if (e.target.checked) {
      document.body.classList.toggle("dark");
    } else {
      document.body.classList.toggle("dark");
    }
  };

  return (
    <Fragment>
      {isOpen && <Backdrop onClick={closeSideDrawer} />}
      <SideDrawer show={isOpen} onClick={closeSideDrawer}>
        <div className="navSideDrawer">
          <h2>Comming soon</h2>
          <input type="checkbox" className="switch" onChange={onChange} />
          <NavLink exact to="/timetable" className="timetables">
            Timetable
          </NavLink>
          <NavLink to="/mark" exact>
            Mark
          </NavLink>
          <NavLink to="/send" exact>
            Email
          </NavLink>
          <NavLink to="#" className="side-logout" onClick={onLogout}>
            Logout
          </NavLink>
        </div>
      </SideDrawer>
      <nav>
        <Link className="title" to="/">
          <h3>Hello World</h3>
        </Link>
        <button onClick={openSideDrawer} className="sideDrawer">
          <span />
          <span />
          <span />
        </button>
        <div className="tool">
          <Link to="mark">
            <i className="fas fa-marker" /> Mark
          </Link>
          <Link to="/timetable">
            <i className="far fa-calendar-times" />
            Timetable
          </Link>
          <Link to="/send">
            <i className="far fa-envelope" />
            Email
          </Link>
          <Link to="#" onClick={onLogout} className="logout">
            <i className="fas fa-sign-out-alt" /> Logout
          </Link>
        </div>
      </nav>
    </Fragment>
  );
};
