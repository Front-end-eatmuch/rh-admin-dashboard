import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Area, Column, Pie, Bar } from "@ant-design/charts";
import "../styles/linechart.css";

class ColumnChart extends Component {
  state = {};

  componentDidMount() {}

  render() {
    // const data = [
    //   { days: "2021-05-01", order: 3 },
    //   { days: "2021-05-02", order: 4 },
    //   { days: "2021-05-03", order: 3.5 },
    //   { days: "2021-05-04", order: 5 },
    //   { days: "2021-05-05", order: 4.9 },
    //   { days: "2021-05-06", order: 6 },
    //   { days: "2021-05-07", order: 7 },
    //   { days: "2021-05-08", order: 9 },
    //   { days: "2021-05-09", order: 13 }
    // ];

    const config = {
      data: this.props.data,
      height: 300,
      xField: "days",
      yField: "order",
      // point: {
      //   size: 5,
      //   shape: "diamond"
      // },
      label: {
        style: {
          fill: "#aaa"
        }
      }
    };
    return <Column {...config} />;
  }
}

export default ColumnChart;
