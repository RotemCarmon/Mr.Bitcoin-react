import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


class AppHeader extends Component {
  state = {
    isShowNavbar: false
  }
  
  showNavbar = () => {
    this.setState({isShowNavbar: true})
  }
  
  hideNavbar = () => {
    this.setState({isShowNavbar: false})
  }

  render() {
    return (
<section className="app-header-container flex space-between align-center">
  <div className="logo">
    <NavLink exact to="/">
      <h1>Mr<span className="logo-dot">.</span>BITCoin</h1>
    </NavLink>
  </div>
  
  <div className={`navbar flex align-center ${this.state.isShowNavbar ? 'shown':''}`}>
    <NavLink onClick={this.hideNavbar} exact to="/">Home </NavLink> 
    <NavLink onClick={this.hideNavbar} to="/contact"> Contacts</NavLink>
    <NavLink onClick={this.hideNavbar} to="/statistic"> Statistic</NavLink>
    <NavLink onClick={this.hideNavbar} to="/signup"> Sign Up</NavLink>
  </div>
  {this.state.isShowNavbar ? (<div className="dark-screen"  onClick={this.hideNavbar}></div>) : (<div className="hamburger"  onClick={this.showNavbar} ><FontAwesomeIcon icon={faBars} size="2x" /></div>)}
</section>
  )
}
}

export default AppHeader
