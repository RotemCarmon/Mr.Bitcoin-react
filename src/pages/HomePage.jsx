import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import BitcoinService from "../services/BitcoinService";
import { loadUser } from "../actions/userActions";

import MoveList from "../cmps/MoveList";
import ChartCmp from "../cmps/ChartCmp";

// ICONS
import coinsIcon from "../assets/img/coins.png";
import bitcoinIcon from "../assets/img/bitcoin_icon.png";
import usdIcon from "../assets/img/usd.png";

class HomePage extends Component {
  state = {
    rate: null,
    chartData: null,
  };
  async componentDidMount() {
    const user = await this.props.loadUser();
    if (!user) {
      this.props.history.push("/signup");
      return;
    }

    const rate = await BitcoinService.getRate();
    this.setState({ ...this.state, rate: rate.data });
    this.setChartData();
  }
  getMovesToShow = () => {
    if (!this.props.user) return;
    return this.props.user.moves.slice(0, 3);
  };

  setChartData = () => {
    const data = this.prepareChartData(this.props.user.moves);

    this.setState({
      chartData: {
        data: data,
        title: "Moves history",
      },
    });
  };
  prepareChartData = (moves) => {
    const data = moves.map((move) => {
      move.at = Moment(move.at).format("DD-MM-YYYY");
      return [move.at, move.amount];
    });
    data.unshift(["Date", "amount"]);
    return data;
  };

  render() {
    const { user } = this.props;
    const { rate } = this.state;
    const balance =
      user && rate
        ? ((1 / rate) * user.coins).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : "";
    const moves = this.getMovesToShow();
    const data = this.state.chartData
    if (!user) return <div>Loding...</div>;

    return (
      <section className="home-page-container flex">
        <section className="user-info-container">
          <section className="user-info">
            <div className="user flex align-center">
              <div className="user-img ratio-square">
                <img src="https://robohash.org/{{user._id}}" alt="Profile" />
              </div>
              <h2>Hello {user.name}!</h2>
            </div>

            <div className="coins flex align-center">
              <img className="icon" src={coinsIcon} alt="Coin" />
              {<h3>Coins: {user.coins}</h3>}
            </div>

            <div className="bitRate flex align-center">
              <img className="icon" src={bitcoinIcon} alt="BitCoin" />
              {<h3>BTC: {rate}</h3>}
            </div>

            {balance && (
              <div className="balance flex align-center">
                <img className="icon" src={usdIcon} alt="USD" />
                {<h3>Balance: {balance}</h3>}
              </div>
            )}
          </section>

          {data && (
            <ChartCmp chartData={data} />
          )}
        </section>
        <section className="user-moves">
          {!moves || !moves.length ? (
            "No moves to show"
          ) : (
            <div>
              <h2>Your last {moves.length} moves</h2>
              <MoveList moves={moves} />
            </div>
          )}
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = {
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
