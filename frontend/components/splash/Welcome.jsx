import React from "react";

import MainNavBarContainer from "./MainNavBarContainer";
import SplashLoggedIn from "./SplashLoggedIn";

const Welcome = (props) => (
  <div className="Splash logged-in">
    <div className="Splash__nav-wrapper">
      <MainNavBarContainer />
      <div className="BillboardV2__background-decoration"></div>
    </div>
    
    <div className="Splash__body-container">
      <SplashLoggedIn currentUser={props.currentUser} />
    </div>
  </div>
);

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id]
  }
}

export default connect(mapStateToProps, null)(Welcome)