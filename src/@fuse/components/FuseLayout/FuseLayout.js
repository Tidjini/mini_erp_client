import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/store/actions";
import { FuseLayouts } from "@fuse";
import _ from "@lodash";
import history from "@history";
import AppContext from "app/AppContext";
import { default as Notification } from "app/composants.v2/notification/Generic";
import usePieSocket from "app/hooks/services/usePieSocket";
import ReactHowler from "react-howler";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '& code:not([class*="language-"])': {
      color: theme.palette.secondary.dark,
      backgroundColor: "#F5F5F5",
      padding: "2px 3px",
      borderRadius: 2,
      lineHeight: 1.7,
    },
    "& table.simple tbody tr td": {
      borderColor: theme.palette.divider,
    },
    "& table.simple thead tr th": {
      borderColor: theme.palette.divider,
    },
    "& a:not([role=button])": {
      color: theme.palette.secondary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    '& [class^="border-"]': {
      borderColor: theme.palette.divider,
    },
    '& [class*="border-"]': {
      borderColor: theme.palette.divider,
    },
  },
}));

function FuseLayout(props) {
  const dispatch = useDispatch();
  const defaultSettings = useSelector(({ fuse }) => fuse.settings.defaults);
  const settings = useSelector(({ fuse }) => fuse.settings.current);

  const classes = useStyles(props);
  const appContext = useContext(AppContext);
  const { routes } = appContext;

  useEffect(() => {
    function routeSettingsCheck() {
      const matched = matchRoutes(routes, props.location.pathname)[0];

      if (matched && matched.route.settings) {
        const routeSettings = _.merge(
          {},
          defaultSettings,
          matched.route.settings
        );
        if (!_.isEqual(settings, routeSettings)) {
          dispatch(Actions.setSettings(_.merge({}, routeSettings)));
        }
      } else {
        if (!_.isEqual(settings, defaultSettings)) {
          dispatch(Actions.resetSettings());
        }
      }
    }

    routeSettingsCheck();
  }, [defaultSettings, dispatch, props.location.pathname, routes, settings]);

  //

  const Layout = FuseLayouts[settings.layout.style];
  const [open, setOpen] = React.useState(false);
  const { task } = usePieSocket();

  React.useEffect(() => {
    if (task) {
      setOpen(true);
      if (howlerRef.current) {
        howlerRef.current.seek(0);
        howlerRef.current.play();
      }
    }
  }, [task]);
  const howlerRef = React.useRef(null);
  const actions = (state) => {
    const { statue, statue_label } = state;
    const colors = {
      fore: "#414962",
      back: "#41496220",
    };
    switch (statue) {
      case "a":
        colors.fore = "#FFB703";
        colors.back = "#FFB70320";

        break;
      case "p":
        colors.fore = "#E76F51";
        colors.back = "#E76F5120";
        break;
      case "t":
        colors.fore = "#2A9D8F";
        colors.back = "#2A9D8F20";
        break;
      case "c":
        colors.fore = "#E63946";
        colors.back = "#E6394620";
        break;

      default:
        colors.fore = "#414962";
        colors.back = "#41496220";
        break;
    }
    return (
      <div
        style={{
          paddingTop: 20,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: colors.back,
            padding: "7px 20px",
          }}
        >
          <Typography
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.fore,
            }}
          >
            {statue_label}
          </Typography>
        </div>
        <Button
          style={{
            backgroundColor: "#0a9396",
            color: "white",
            fontSize: 11,
            textTransform: "none",
          }}
        >
          Confirmation
        </Button>
      </div>
    );
  };
  return (
    <Layout classes={{ root: classes.root }} {...props}>
      {task && (
        <Notification
          data={task}
          open={open}
          setOpen={setOpen}
          onClick={(event) => {
            if (task.id) {
              history.push(`/task/${task.id}`);
            }
            setOpen(false);
          }}
        >
          {actions(task.statue)}
        </Notification>
      )}
      <ReactHowler
        src="assets/sounds/notification-03.mp3"
        ref={howlerRef}
        playing={open}
      />
    </Layout>
  );
}

export default withRouter(React.memo(FuseLayout));
