import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import WagonVide from "./WagonVide";
import Wagon from "./Wagon";
import { FuseAnimateGroup } from "@fuse";
import PhaseDetails from "./PhaseDetails";

export default function Phase(props) {
  const {
    list,
    title,
    icon,
    detailStyle,
    containerStyle,
    titleStyle,
    maxDisplay,
    style,
    onSelectWagon,
    onUnselectWagon,
    onSelectAll,
    onUnselectAll,
    nextOperation,
    width,
    phase,
  } = props;

  const [empty, setEmpty] = useState([]);

  useEffect(() => {
    if (list.length < maxDisplay) {
      const es = maxDisplay - list.length;
      setEmpty(Array(es).fill(0));
    } else {
      setEmpty([]);
    }
  }, [list, maxDisplay]);

  return (
    <Grid xs={width} item style={{ padding: 10, ...style }}>
      <div style={titleStyle}>
        <img
          alt={title}
          src={`assets/images/app_production/${icon}`}
          style={{ width: 18, height: 18, marginRight: 5 }}
        />
        <Typography style={{ fontSize: 12, fontWeight: "700" }}>
          {title}
        </Typography>

        <PhaseDetails
          buttonStyle={{
            marginLeft: 20,
            boxShadow: "none",
            backgroundColor: "#f77f00",
            color: "#EFF1FF",
            height: 28,
            fontSize: 12,
            textTransform: "none",
            ...detailStyle,
          }}
          phase={phase}
          list={list}
          onSelectWagon={onSelectWagon}
          onUnselectWagon={onUnselectWagon}
          nextOperation={nextOperation}
          title={title}
          icon={icon}
          containerStyle={containerStyle}
          titleStyle={titleStyle}
          maxDisplay={maxDisplay}
          style={style}
          onSelectAll={onSelectAll}
          onUnselectAll={onUnselectAll}
        />
      </div>

      <Grid container style={containerStyle}>
        {list.map(
          (wagon, index) =>
            index <= maxDisplay - 1 && (
              <FuseAnimateGroup
                enter={{
                  animation: "transition.slideUpIn",
                  duration: "500",
                }}
                leave={{
                  animation: "transition.slideDownOut",
                  duration: "500",
                }}
              >
                <Wagon
                  key={index}
                  numero={wagon.numero}
                  operation={wagon.phase_actuel}
                  produit={wagon.produit_object}
                  onSelectWagon={onSelectWagon}
                  onUnselectWagon={onUnselectWagon}
                  nextOperation={nextOperation}
                  selected={wagon.selected}
                />
              </FuseAnimateGroup>
            )
        )}

        {empty.map((wagon, index) => (
          <FuseAnimateGroup
            enter={{
              animation: "transition.slideUpIn",
              duration: "500",
            }}
            leave={{
              animation: "transition.slideDownOut",
              duration: "500",
            }}
          >
            <WagonVide key={index} />
          </FuseAnimateGroup>
        ))}
      </Grid>
      {/* </FuseAnimateGroup> */}
    </Grid>
  );
}
