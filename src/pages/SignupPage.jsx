import React, { Component } from 'react'
import { connect } from 'react-redux';

import { addUser } from "../actions/userActions";

class SignupPage extends Component {
    state = {
        name: ''
    }

    onChangeHandler = (ev) => {
        const { value, name } = ev.target;
        this.setState({ [name]: value }, () => {
        });
    };

    handleSignup = async (ev) => {
        ev.preventDefault();
       await this.props.addUser({ ...this.state })
       
        this.props.history.push('/')
    }
      
    render() {
        return (
            <section className="signup-container">
            <form onSubmit={this.handleSignup} className="flex column align-center">
                <div className="form-row flex column align-center" >
                    <label htmlFor="name">Please enter your name:</label>
                    <input 
                        type="text"
                        value={this.state.name}
                        onChange={this.onChangeHandler} 
                        name="name"
                        placeholder="Your name goes here..." />
                    
                    <p className="validation-error">Name is required</p>
                </div>
                <button type="submit" className="save-btn btn">Save</button>    
            </form>
        </section>
        
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  }
  
  const mapDispatchToProps = {
    addUser
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
  