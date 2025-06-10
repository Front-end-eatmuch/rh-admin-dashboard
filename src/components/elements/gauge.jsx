import React, { useState, useEffect } from "react";
import { Gauge } from "@ant-design/charts";

const GaugeChart: React.FC = () => {
  var [percent, setPercent] = useState(0.2);
  var [rangeColor, setRangeColor] = useState("#F4664A");
  var color = ["#F4664A", "#FAAD14", "#30BF78"];
  var ref;

  var getColor = function getColor(percent) {
    return percent < 0.4 ? color[0] : percent < 0.6 ? color[1] : color[2];
  };
  var config = {
    percent,
    range: { color: rangeColor },
    indicator: {
      pointer: { style: { stroke: "#D0D0D0" } },
      pin: { style: { stroke: "#D0D0D0" } },
    },
    axis: {
      label: {
        formatter: function formatter(v) {
          return Number(v) * 100;
        },
      },
      subTickLine: { count: 3 },
    },
    statistic: {
      content: {
        formatter: function formatter(_ref) {
          var percent = _ref.percent;
          return "Rate: ".concat((percent * 100).toFixed(0), "%");
        },
      },
      style: { fontSize: 60 },
    },
    animation: false,
  };
  useEffect(() => {
    var data = percent;
    var interval = setInterval(function () {
      if (data >= 0.85) {
        clearInterval(interval);
      } else {
        data += 0.095;
        setPercent(data);
        setRangeColor(getColor(data));
      }
    }, 500);
  }, []);

  return <Gauge {...config} chartRef={(chartRef) => (ref = chartRef)} />;
};

export default GaugeChart;
