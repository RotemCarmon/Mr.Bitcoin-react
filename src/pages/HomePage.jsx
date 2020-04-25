import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import BitcoinService from "../services/BitcoinService";
import { loadUser } from "../actions/userActions";

import MoveList from "../cmps/MoveList";
import ChartCmp from "../cmps/ChartCmp";
import UserInfo from "../cmps/UserInfo";

class HomePage extends Component {
  state = {
    rate: null,
    chartData: null,
    _isMounted: null,
  };
  
  async componentDidMount() {
    this.setState({ _isMounted: true });
    const user = await this.props.loadUser();
    if (!user) {
      this.props.history.push("/signup");
      return;
    }

    const rate = await BitcoinService.getRate();
    if (this.state._isMounted) {
      this.setState({ ...this.state, rate: rate.data });
    }
    this.setChartData();
  }

  componentWillUnmount() {
    this.setState({ _isMounted: null }, console.log(this.state._isMounted));
  }

  getMovesToShow = () => {
    if (!this.props.user) return;
    return this.props.user.moves.slice(0, 3);
  };

  setChartData = () => {
    const data = this.prepareChartData(this.props.user.moves);
    console.log("Still not clean");
    if (this.state._isMounted) {
      this.setState({
        chartData: {
          data: data,
          title: "Moves history",
        },
      });
    }
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

    const moves = this.getMovesToShow();
    const data = this.state.chartData;
    if (!user) return <div>Loding...</div>;

    return (
      <section className="home-page-container flex">
        <section className="user-info-container">
          <UserInfo user={user} rate={rate} />
          {data && <ChartCmp chartData={data} />}
        </section>
        <section className="user-moves">
          {!moves.length ? "No moves to show" : (
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
