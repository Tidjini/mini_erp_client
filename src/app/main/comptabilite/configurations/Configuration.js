import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Button,
  IconButton,
  Icon,
} from "@material-ui/core";
import ConfigItem from "./ConfigItem";
import { FuseAnimate } from "@fuse";
import { AppInputSearch } from "app/composants/inputs";

import withReducer from "app/store/withReducer";
import reducer from "./store/reducer";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "./store/actions";
import ConfigurationTable from "./ConfigurationTable";

import { configurationStyles as styles } from "./ConfigurationConfig";

function Configuration() {
  const [menuAnimation, setMenuAnimation] = useState({
    animation: "transition.slideRightIn",
    delay: 200,
  });
  const [contentAnimation, setContentAnimation] = useState({
    animation: "transition.slideDownOut",
    delay: 0,
  });
  const [displayContent, setDisplayContent] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(true);

  const dispatch = useDispatch();

  // const config = useSelector(({ configuration }) => configuration.config);
  function onContentHide(e) {
    setMenuAnimation({
      animation: "transition.slideRightIn",
      delay: 200,
    });
    setContentAnimation({
      animation: "transition.slideDownOut",
      delay: 0,
    });
    setTimeout(() => {
      setDisplayMenu(true);
      setDisplayContent(false);
    }, 200);
  }

  function showContent(e) {
    setMenuAnimation({
      animation: "transition.slideRightOut",
      delay: 200,
    });
    setContentAnimation({
      animation: "transition.slideUpIn",
      delay: 300,
    });
    setTimeout(() => {
      setDisplayMenu(false);
      setDisplayContent(true);
    }, 300);
  }

  function switchConfig(name) {
    dispatch(Actions.switchConfig(name));
  }

  return (
    <div>
      <Grid container style={styles.container}>
        <Grid item xs={9}>
          <Typography style={styles.title}>
            <span style={styles.titleSpan}>Param</span>étrage
            {/* <span style={styles.titleSpan}> et Con</span>figuration */}
          </Typography>
          <Typography style={styles.description}>
            Parametrez vos table de base et vos comptes
          </Typography>
        </Grid>
        <Grid item xs={3} style={styles.icon_container}>
          <img
            alt="state"
            src={"assets/images/compta/config.png"}
            style={styles.icon}
          />
        </Grid>
        <Grid item xs={6} md={3} lg={2} style={styles.info_item}>
          <img
            alt="state"
            src={"assets/images/compta/folder_open.png"}
            style={{ ...styles.info_item_icon, backgroundColor: "#E6FBF4" }}
          />
          <div>
            <Typography style={styles.info_item_title}>PROMAG-DOC</Typography>
            <Typography style={styles.info_item_text}>
              Dossier Selectionné
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} md={3} lg={2} style={styles.info_item}>
          <img
            alt="state"
            src={"assets/images/compta/task.png"}
            style={styles.info_item_icon}
          />
          <div>
            <Typography style={styles.info_item_title}>
              Exercice 2022
            </Typography>
            <Typography style={styles.info_item_text}>
              Exercice Selectionné
            </Typography>
          </div>
        </Grid>

        <Grid item xs={6} md={3} lg={2} style={styles.info_item}>
          <img
            alt="state"
            src={"assets/images/compta/periode.png"}
            style={{ ...styles.info_item_icon, backgroundColor: "#FEF6E9" }}
          />
          <div>
            <Typography style={styles.info_item_title}>Janvier</Typography>
            <Typography style={styles.info_item_text}>
              Periode Actuel
            </Typography>
          </div>
        </Grid>
        <Divider className="my-16" style={styles.divider} />
        <Grid container style={{ display: displayMenu ? "flex" : "none" }}>
          <FuseAnimate
            animation={menuAnimation.animation}
            delay={menuAnimation.delay}
          >
            <Grid container>
              <ConfigItem
                title="Dossier"
                icon={"folder_close.png"}
                description="Liste des Dossiers"
                main={3000}
                second="Debit:   10 000.00 DA"
                third="Credit:   5 000.00 DA"
                onEdition={(e) => {
                  showContent(e);
                  switchConfig("dossiers");
                }}
              />
              <ConfigItem
                title="Exercices"
                icon={"task.png"}
                description="Liste des Exercices"
                main={3000}
                second="Debit:   10 000.00 DA"
                third="Credit:   5 000.00 DA"
                onEdition={(e) => {
                  showContent(e);
                  switchConfig("exercices");
                }}
              />
              <ConfigItem
                title="Comptes"
                icon={"account.png"}
                description="Liste des Comptes"
                main={5000}
                second="Debit:   10 000.00 DA"
                third="Credit:   5 000.00 DA"
                onEdition={(e) => {
                  showContent(e);
                  switchConfig("compte");
                }}
              />
              <ConfigItem
                title="Journaux"
                icon={"journal.png"}
                description="Liste des journaux"
                main={5000}
                second="Debit:   10 000.00 DA"
                third="Credit:   5 000.00 DA"
                onEdition={(e) => {
                  showContent(e);
                  switchConfig("journal");
                }}
              />
              <ConfigItem
                title="Tiers"
                icon={"tier.png"}
                description="Liste des Tiers"
                main={3000}
                second="Debit:   10 000.00 DA"
                third="Credit:   5 000.00 DA"
                onEdition={(e) => {
                  showContent(e);
                  switchConfig("tiers");
                }}
              />
              <ConfigItem
                title="Tab. de bord"
                icon={"dashboard.png"}
                description="Liste des Items"
                main={3000}
                second="Debit:   10 000.00 DA"
                third="Credit:   5 000.00 DA"
                onEdition={(e) => {
                  showContent(e);
                  switchConfig("dashboard");
                }}
              />
            </Grid>
          </FuseAnimate>
        </Grid>

        <div
          className="w-full"
          style={{
            display: displayContent ? "block" : "none",
          }}
        >
          <FuseAnimate
            animation={contentAnimation.animation}
            delay={contentAnimation.delay}
          >
            <ConfigurationTable onHidden={onContentHide} />
          </FuseAnimate>
        </div>
      </Grid>
    </div>
  );
}

export default withReducer("configuration", reducer)(Configuration);
