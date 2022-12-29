import React, { useContext, useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { FuseScrollbars, FuseMessage, FuseDialog, FuseSuspense } from "@fuse";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import ToolbarLayout1 from "./components/ToolbarLayout1";
import FooterLayout1 from "./components/FooterLayout1";
import LeftSideLayout1 from "./components/LeftSideLayout1";
import RightSideLayout1 from "./components/RightSideLayout1";
import NavbarWrapperLayout1 from "./components/NavbarWrapperLayout1";
import clsx from "clsx";
import AppContext from "app/AppContext";

import { default as Notification } from "app/composants.v2/notification/Generic";
import usePieSocket from "../../../app/hooks/services/usePieSocket";
import ReactHowler from "react-howler";

import { Button, Typography } from "@material-ui/core";
import history from "@history";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    "&.boxed": {
      maxWidth: 1280,
      margin: "0 auto",
      boxShadow: theme.shadows[3],
    },
    "&.scroll-body": {
      "& $wrapper": {
        height: "auto",
        flex: "0 0 auto",
        overflow: "auto",
      },
      "& $contentWrapper": {},
      "& $content": {},
    },
    "&.scroll-content": {
      "& $wrapper": {},
      "& $contentWrapper": {},
      "& $content": {},
    },
    "& .navigation": {
      "& .list-subheader-text, & .list-item-text, & .item-badge, & .arrow-icon":
        {
          transition: theme.transitions.create("opacity", {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeInOut,
          }),
        },
    },
  },
  wrapper: {
    display: "flex",
    position: "relative",
    width: "100%",
    height: "100%",
    flex: "1 1 auto",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 3,
    overflow: "hidden",
    flex: "1 1 auto",
  },
  content: {
    position: "relative",
    display: "flex",
    overflow: "auto",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
    "-webkit-overflow-scrolling": "touch",
    zIndex: 2,
  },
}));

function Layout1(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);

  const dispatch = useDispatch();
  const appContext = useContext(AppContext);
  const classes = useStyles(props);
  const { routes } = appContext;

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

  switch (config.scroll) {
    case "body": {
      return (
        <div
          id="fuse-layout"
          className={clsx(classes.root, config.mode, "scroll-" + config.scroll)}
        >
          {config.leftSidePanel.display && <LeftSideLayout1 />}

          <div className="flex flex-1 flex-col overflow-hidden relative">
            {config.toolbar.display &&
              config.toolbar.style === "fixed" &&
              config.toolbar.position === "above" && <ToolbarLayout1 />}

            <FuseScrollbars className="overflow-auto" scrollToTopOnChildChange>
              {config.toolbar.display &&
                config.toolbar.style !== "fixed" &&
                config.toolbar.position === "above" && <ToolbarLayout1 />}

              <div className={classes.wrapper}>
                {config.navbar.display && config.navbar.position === "left" && (
                  <NavbarWrapperLayout1 />
                )}

                <div className={classes.contentWrapper}>
                  {config.toolbar.display &&
                    config.toolbar.position === "below" && <ToolbarLayout1 />}

                  <div className={classes.content}>
                    <FuseDialog />

                    <FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

                    {props.children}
                  </div>

                  {config.footer.display &&
                    config.footer.position === "below" && <FooterLayout1 />}

                  {/* <SettingsPanel/> */}
                </div>

                {config.navbar.display &&
                  config.navbar.position === "right" && (
                    <NavbarWrapperLayout1 />
                  )}
              </div>

              {config.footer.display &&
                config.footer.style !== "fixed" &&
                config.footer.position === "above" && <FooterLayout1 />}
            </FuseScrollbars>

            {config.footer.display &&
              config.footer.style === "fixed" &&
              config.footer.position === "above" && <FooterLayout1 />}
          </div>

          {config.rightSidePanel.display && <RightSideLayout1 />}

          <FuseMessage />
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
        </div>
      );
    }
    case "content":
    default: {
      return (
        <div
          id="fuse-layout"
          className={clsx(classes.root, config.mode, "scroll-" + config.scroll)}
        >
          {config.leftSidePanel.display && <LeftSideLayout1 />}

          <div className="flex flex-1 flex-col overflow-hidden relative">
            {config.toolbar.display && config.toolbar.position === "above" && (
              <ToolbarLayout1 />
            )}

            <div className={classes.wrapper}>
              {config.navbar.display && config.navbar.position === "left" && (
                <NavbarWrapperLayout1 />
              )}

              <div className={classes.contentWrapper}>
                {config.toolbar.display &&
                  config.toolbar.position === "below" &&
                  config.toolbar.style === "fixed" && <ToolbarLayout1 />}

                <FuseScrollbars
                  className={classes.content}
                  scrollToTopOnChildChange
                >
                  {config.toolbar.display &&
                    config.toolbar.position === "below" &&
                    config.toolbar.style !== "fixed" && <ToolbarLayout1 />}

                  <FuseDialog />

                  <FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

                  {props.children}

                  {config.footer.display &&
                    config.footer.position === "below" &&
                    config.footer.style !== "fixed" && <FooterLayout1 />}
                </FuseScrollbars>

                {config.footer.display &&
                  config.footer.position === "below" &&
                  config.footer.style === "fixed" && <FooterLayout1 />}

                {/* <SettingsPanel/> */}
              </div>

              {config.navbar.display && config.navbar.position === "right" && (
                <NavbarWrapperLayout1 />
              )}
            </div>

            {config.footer.display && config.footer.position === "above" && (
              <FooterLayout1 />
            )}
          </div>

          {config.rightSidePanel.display && <RightSideLayout1 />}

          <FuseMessage />
        </div>
      );
    }
  }
}

export default Layout1;
