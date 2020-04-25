import React, { Component } from "react";

export default class TransferFund extends Component {
  state = {
    fund: '',
    userMsg: "",
    msgTimer: null,
  };

  componentWillUnmount() {
    clearTimeout(this.state.msgTimer);
  }

  onTransferFund = (ev) => {
    const { fund } = this.state;
    if (fund > this.props.maxCoins) {
      this.sendUserMsg("Insufficient funds");
      return;
    }
    if (!fund) {
      this.sendUserMsg("Amount is required");
      return;
    }
    this.props.transferFund(fund);
    this.sendUserMsg(`You made a transaction of ${fund} coins`);
    this.setState({ fund: '' });
  };

  handleFunds = (ev) => {
    const { value, name } = ev.target;
    this.setState({ [name]: +value });
  };

  sendUserMsg = (msg) => {
    this.setState({ userMsg: msg });
    const msgTimer = setTimeout(() => {
      this.setState({ userMsg: null });
    }, 3000);
    this.setState({ msgTimer: msgTimer });
  };

  render() {
    return (
      <section className="transfer-fund-container flex align-center">
        <input
          type="number"
          name="fund"
          onChange={this.handleFunds}
          value={this.state.fund}
          placeholder="Amount"
        />
        <button onClick={this.onTransferFund} className="transfer-btn btn">
          Transfer
        </button>
        {this.state.userMsg && (
          <div className="transfer-msg">{this.state.userMsg}</div>
        )}
      </section>
    );
  }
}
