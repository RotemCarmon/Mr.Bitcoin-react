import React, { Component } from "react";

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
      </form>
    );
  }
}
