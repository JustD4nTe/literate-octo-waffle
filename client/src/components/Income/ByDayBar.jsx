import React, { useEffect } from "react";
import "../../App.css";
import "../../index.css";
import { Bar } from "@nivo/bar";

export default function ByDayBar(props) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setData(props.incomeByDays);
  }, [props.incomeByDays]);

  return (
    <Bar
      data={data}
      width={500}
      height={500}
      keys={["Income Value"]}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Income value",
        legendPosition: "middle",
        legendOffset: -54,
        format: (value) =>
          `$${Number(value).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}`,
      }}
      tooltip={({ indexValue, value }) => (
        <span>
          {indexValue}:{" "}
          <strong>
            ${Number(value).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </strong>
        </span>
      )}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    />
  );
}