import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";



export default class HamburgerNavbar extends Component {
  render() {
    return (
      <div>
        {this.props.isShowNavbar ? (
          <div className="dark-screen" onClick={this.props.toggleNavbar}></div>
        ) : (
          <div className="hamburger" onClick={this.props.toggleNavbar}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
        )}
      </div>
    );
  }
}


