import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";

const PieChart: React.FC = (props) => {
  var config = {
    appendPadding: 0,
    data: props.data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      // type: "inner",
      offset: "-50%",
      content: function content(_ref) {
        var percent = _ref.percent;
        return (percent * 100).toFixed(2) + "%";
      },
      style: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center"
      }
    },
    interactions: [{ type: "element-active" }]
  };
  return <Pie {...config} />;
};

export default PieChart;
