import React, { Component } from "react";
import { Chart } from "react-google-charts";

export default class ChartCmp extends Component {
  state = {
    chartData: null,
    options: {
      title: "",
      legend: "none",
      curveType: "function",
      vAxis: {
        textStyle: { color: "#c6c6c6" },
      },
      hAxis: {
        textStyle: { color: "#c6c6c6" },
      },
      backgroundColor: {
        fill: "#393939",
      },
      colors: ["#E88C30"],
      titleTextStyle: { color: "#FFF" },
    },
  };
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;

    this.getChartData();
  } 
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  getChartData = () => {
    const { chartData } = this.props;
    if (chartData) {
      if(this._isMounted){
      this.setState({
        chartData: chartData.data,
        options: { ...this.state.options, title: chartData.title },
      });
    }
    }
  };
  setDataLength = (int = 0) => {
    if (this.state.chartData) {
      const data = [
        this.props.chartData.data[0],
        ...this.props.chartData.data.slice(int * -1),
      ];
      if(this._isMounted){
      this.setState({ chartData: data });
      }
    }
  };
  isMovesChart(){
      return this.state.options.title === 'Moves history'
  }

  render() {
    const isMadeMoves = this.props.chartData.data.length > 1
    const chartData = this.state.chartData;
    
    return (
      <div className="chart-container">
        {isMadeMoves && (
          <Chart  
          chartType="LineChart"
          data={chartData}
          options={this.state.options}
          />
          )}
        {!this.isMovesChart() &&
        (<div className="btns flex justify-start align-center">
          Time period:
          <button onClick={() => this.setDataLength(7)}>Week</button>
          <button onClick={() => this.setDataLength(30)}>Month</button>
        </div>)
        }
      </div>
    );
  }
}
