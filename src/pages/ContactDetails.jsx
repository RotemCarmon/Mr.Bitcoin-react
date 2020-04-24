import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faArrowCircleLeft,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

import UserService from "../services/UserService";
import { loadContactById, deleteContact } from "../actions/contactActions";
import { loadUser } from "../actions/userActions";

import TransferFund from "../cmps/TransferFund";
import MoveList from "../cmps/MoveList";

class ContactDetails extends Component {
  state = {
    actionBtns: false,
  };
  async componentDidMount() {
    this.loadContact();
    await this.props.loadUser();
  }

  loadContact() {
    const id = this.props.match.params.id;
    this.props.loadContactById(id);
  }

  goBack = () => {
    this.props.history.push("/contact");
  };
  editContact = () => {
    this.props.history.push(`/contact/edit/${this.props.contact._id}`);
  };
  deleteContact = async () => {
    await this.props.deleteContact(this.props.contact._id);
    this.props.history.push("/contact");
  };

  toggleActionBtns = (ev) => {
    ev.stopPropagation();
    if (this.state.actionBtns) {
      this.setState({ actionBtns: false });
    } else {
      this.setState({ actionBtns: true });
    }
  };

  collapseBtns = () => {
    this.setState({ actionBtns: false });
  };

  TransferFund = async (fund) => {
    const move = {
      toId: this.props.contact._id,
      to: this.props.contact.name,
      amount: fund,
      at: Date.now(),
    };
    await UserService.addMove(move);
    this.props.loadUser();
  };

  getMovesToShow = () => {
    const { user, contact } = this.props;
    if (user && contact)
      return user.moves.filter((move) => move.toId === contact._id);
  };

  render() {
    const moves = this.getMovesToShow();
    const { contact } = this.props;
    if (!contact) return <div>Loading</div>;
    return (
      <div>
        <section
          className="contact-details-container flex space-between"
          onClick={this.collapseBtns}
        >
          <div className="contact-img ratio-square">
            <img src={`https://robohash.org/${contact._id}?set=set2`} alt="" />
          </div>

          <div className="contact-info flex column space-between">
            <h3>Name: {contact.name}</h3>
            <h3>Phone: {contact.phone}</h3>
            <h3>Email: {contact.email}</h3>
            {this.props.user && (
              <TransferFund
                maxCoins={this.props.user.coins}
                transferFund={this.TransferFund}
              />
            )}
          </div>
          <div className="actions flex ">
            <FontAwesomeIcon
              icon={faEllipsisV}
              onClick={this.toggleActionBtns}
              className={`dots ${this.state.actionBtns ? "deactive" : ""}`}
            />
            <div
              className={`collapse-action-btns flex column align-center space-between ${
                this.state.actionBtns ? "active" : ""
              }`}
            >
              <button
                className="go-back-btn"
                onClick={this.goBack}
                title="Back"
              >
                <FontAwesomeIcon icon={faArrowCircleLeft} />
              </button>
              <button
                className="edit-btn"
                onClick={this.editContact}
                title="Edit"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="delete-btn"
                onClick={this.deleteContact}
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </section>
        {moves && (
          <section className="contact-moves">
            <h2>Moves you made to {contact.name}</h2>
            <MoveList moves={moves} isInContact={true}></MoveList>
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.contact.contact,
    user: state.user.user,
  };
};

const mapDispatchToProps = {
  loadContactById,
  deleteContact,
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
