import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class ContactFilter extends Component {
  state = {
    term: "",
  };

  constructor(props) {
    super(props);
    this.state = { ...props.filterBy };
  }
  

  onSubmit = (event) => {
    event.preventDefault();
  };

  onChangeHandler = (ev) => {
    const { value, name } = ev.target;
    this.setState({ [name]: value }, () => {
      this.props.onFilter({ ...this.state });
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="contact-filter flex align-end justify-center">
        <input
          type="text"
          placeholder="Search"
          onChange={this.onChangeHandler}
          name="term"
          value={this.state.term}
        />
        <FontAwesomeIcon className="fa-icon" icon={faSearch} />
      </form>
    );
  }
}
