import React, { Component } from "react";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { loadContacts } from "../actions/contactActions";

import ContactList from "../cmps/ContactList";
import ContactFilter from "../cmps/ContactFilter";
import { Link } from "react-router-dom";

class ContactPage extends Component {
  state = {
    contacts: [],
    filterBy: {
      term: "",
    },
  };

  async componentDidMount() {
    this.loadContacts();
  }

  loadContacts = async () => {
    this.props.loadContacts(this.state.filterBy)
  };
  
  onFilterHandler = (filterBy) => {
    
    this.setState((prevState) => {
      
      return {
        filterBy: {
        ...prevState.filterBy,
          ...filterBy,
        },
      };
    }, this.loadContacts);
  };

  render() {
    const { contacts } = this.props
    return (
      <section className="contact-page-container">
        <h2>Contacts</h2>
        <Link to="contact/edit"  className="add-contact-btn flex align-center justify-center btn"><FontAwesomeIcon icon={faUserPlus} /></Link>
        <ContactFilter
          className="filter-cmp"
          filterBy={this.state.filterBy}
          onFilter={this.onFilterHandler}
        />
        {contacts.length ?
        <ContactList contacts={contacts} /> :
        <h1 className="no-contacts">No contacts to display</h1>
        }
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contact.contacts,
  };
}

const mapDispatchToProps = {
  loadContacts
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

