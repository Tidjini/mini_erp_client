import React from "react";
import { Card, Icon, Typography } from "@material-ui/core";
import { Line } from "react-chartjs-2";

export default function Statistique2(props) {
  const { title, current, displayGrowth, data, chartStyle } = props;

  return (
    <Card
      style={{
        width: "100%",
        minHeight: 200,
        marginTop: 10,
        //   backgroundColor: "#e63946",
        backgroundColor: current.growth <= 0 ? "#ef233c20" : "#2ec4b610",
        borderRadius: 10,
        // cursor: "pointer",
        // ...styles,
      }}
    >
      <div className="p-16 pb-0 flex flex-row flex-wrap items-end">
        <div className="pr-8">
          <Typography className="h3" color="textSecondary">
            {title}
          </Typography>
          <Typography className="text-36 font-600 leading-none mt-8">
            {current.total}
          </Typography>
        </div>
        {displayGrowth && (
          <div className="flex flex-row items-end">
            {current.growth > 0 && (
              <Icon className="text-green mr-4">trending_up</Icon>
            )}
            {current.growth < 0 && (
              <Icon className="text-red mr-4">trending_down</Icon>
            )}
            <Typography
              className="font-700"
              style={{
                color: current.growth <= 0 ? "#e76f51" : "#2ec4b6",
              }}
            >
              {current.growth}%
            </Typography>
          </div>
        )}
      </div>

      <div
        style={{
          width: "100%",
          padding: 0,
          paddingTop: 10,
          marginTop: 10,
        }}
      >
        <Line
          data={{
            labels: data.labels,
            datasets: data.datasets.map((obj, index) => {
              return {
                ...obj,

                padding: 0,
                width: "100%",
                margin: 0,
                pointRadius: 4,
                pointBackgroundColor: "#2ec4b6CC",
                borderColor: "#2ec4b6CC",
                backgroundColor: "#2ec4b620",
                ...chartStyle,
              };
            }),
          }}
          options={{
            ...data.options,
            layout: {
              padding: 0,
              height: 100,
            },
          }}
        />
      </div>
    </Card>
  );
}
