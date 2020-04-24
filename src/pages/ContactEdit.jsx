import React, { Component } from "react";
import { connect } from "react-redux";

import { loadContactById, saveContact } from "../actions/contactActions";

class ContactEdit extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.loadContact(id);
    }
  }

  

  async loadContact(id) {
    await this.props.loadContactById(id);
    this.setState({ ...this.props.contact });
  }

  handleChange = (ev) => {
    const { value, name } = ev.target;
    this.setState({ [name]: value });
  };

  saveContact = async (ev) => {
    ev.preventDefault();

    const contact = await this.props.saveContact({ ...this.state });
    this.props.history.push(`/contact/${contact._id}`);
  };

  render() {
    const { name, phone, email } = this.state;
    return (
      <section className="contact-edit-container">
        <form onSubmit={this.saveContact} className="contact-edit-form flex column align-center">
          <div className="form-row">
            <input
              type="text"
              onChange={this.handleChange}
              value={name}
              name="name"
              placeholder="Enter Full Name"
            />
            <p className="validation-error">Name is required</p>
          </div>
          <div className="form-row">
            <input
              type="text"
              onChange={this.handleChange}
              value={phone}
              name="phone"
              placeholder="Phone Number"
            />
          </div>
          <div className="form-row">
            <input
              type="email"
              onChange={this.handleChange}
              value={email}
              name="email"
              placeholder="Email"
            />
            <p className="validation-error">Email is required</p>
          </div>
          <div className="action-btns flex space-between">
            <button type="submit" className="save-btn btn">
              Save
            </button>
            <button className="cancel-btn">Cancel</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.contact.contact,
  };
};

const mapDispatchToProps = {
  loadContactById,
  saveContact
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);
