import React, { Component } from "react";
import ChartCmp from "../cmps/ChartCmp";

import BitcoinService from "../services/BitcoinService";
import Moment from "moment";

export default class StatisticPage extends Component {
  state = {
    marketPrice: null,
    tradeVolume: null,
    confirmedTransactions: null,
   
  };

  componentDidMount() {
    this.getMarketPrice();
    this.getTradeVolume();
    this.getConfirmedTransactions();
  }

  getMarketPrice = async () => {
    var marketPrice = JSON.parse(localStorage.getItem("marketPrice"));
    if (!marketPrice) {
      const res = await BitcoinService.getMarketPrice();
      marketPrice = res.data;
      localStorage.setItem("marketPrice", JSON.stringify(marketPrice));
    }

    marketPrice.data = [
      ["Date", "Price"],
      ...(await this.prepareChartData(marketPrice)),
    ];

    this.setState({
      marketPrice: {
        data: [...marketPrice.data],
        title: marketPrice.name
      },
    });
  };

  getTradeVolume = async () => {
    var tradeVolume = JSON.parse(localStorage.getItem("tradeVolume"));
    if (!tradeVolume) {
      const res = await BitcoinService.getTradeVolume();
      tradeVolume = res.data;
      localStorage.setItem("tradeVolume", JSON.stringify(tradeVolume));
    }
    tradeVolume.data = [
      ["Date", "Price"],
      ...(await this.prepareChartData(tradeVolume)),
    ];
    this.setState({
        tradeVolume: {
        data: [...tradeVolume.data],
        title: tradeVolume.name
      },
    });
  };

  getConfirmedTransactions = async () => {
    var confirmedTransactions = JSON.parse(localStorage.getItem("confirmedTransactions"));
    if (!confirmedTransactions) {
      const res = await BitcoinService.getConfirmedTransactions();
      confirmedTransactions = res.data;
      localStorage.setItem("confirmedTransactions", JSON.stringify(confirmedTransactions));
    }
    confirmedTransactions.data = [
      ["Date", "Price"],
      ...(await this.prepareChartData(confirmedTransactions)),
    ];
    this.setState({
        confirmedTransactions: {
        data: [...confirmedTransactions.data],
        title: confirmedTransactions.name
      },
    });
  };

  prepareChartData = (rowData) => {
    const data = rowData.values.map((value) => {
      value.x = Moment(value.x * 1000).format("DD-MM-YYYY");
      return Object.values(value);
    });
    return data;
  };

  render() {
    const marketPrice = this.state.marketPrice;
    
    const tradeVolume = this.state.tradeVolume;
    const confirmedTransactions = this.state.confirmedTransactions;

    return (
    <div>
        {marketPrice && <ChartCmp chartData={marketPrice} />}
        {tradeVolume && <ChartCmp chartData={tradeVolume} />}
        {confirmedTransactions && <ChartCmp chartData={confirmedTransactions} />}
    </div>
    );
  }
}
