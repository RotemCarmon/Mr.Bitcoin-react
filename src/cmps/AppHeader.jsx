import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import HamburgerNavbar from "./HamburgerNavbar";


class AppHeader extends Component {

  state = {
    isShowNavbar: false,
  };
  
  toggleNavbar = () => {
    this.setState({ isShowNavbar: !this.state.isShowNavbar });
  }

  render() {
    const className = `navbar flex align-center ${
      this.state.isShowNavbar ? "shown" : ""
    }`
    return (
      <section className="app-header-container flex space-between align-center">
        <NavLink activeClassName="Logo-active" exact to="/">
          <div className="logo">
            <h1>
              Mr<span className="logo-dot">.</span>BITCoin
            </h1>
          </div>
        </NavLink>
        <div
          className={className}
        >
          <NavLink onClick={this.toggleNavbar} className="nav-btn" exact to="/">
            Home
          </NavLink>
          <NavLink onClick={this.toggleNavbar} className="nav-btn" to="/contact">
            Contacts
          </NavLink>
          <NavLink onClick={this.toggleNavbar} className="nav-btn" to="/statistic">
            Statistic
          </NavLink>
          <NavLink onClick={this.toggleNavbar} className="nav-btn" to="/signup">
            Sign Up
          </NavLink>
        </div>
        <HamburgerNavbar toggleNavbar={this.toggleNavbar} isShowNavbar={this.state.isShowNavbar} />
      </section>
    );
  }
}

export default AppHeader;
