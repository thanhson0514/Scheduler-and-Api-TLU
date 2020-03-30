import React from "react";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

export const SideDrawer = props => {
  const context = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer">
        {props.children}
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(context, document.getElementById("drawer-hook"));
};
