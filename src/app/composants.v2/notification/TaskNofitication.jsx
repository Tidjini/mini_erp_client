import React from "react";

import { default as Notification } from "./Generic";
import usePieSocket from "app/hooks/services/usePieSocket";
import ReactHowler from "react-howler";

import { Button, Typography } from "@material-ui/core";
import history from "@history";

export default function TaskNofitication() {
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
    <React.Fragment>
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
    </React.Fragment>
  );
}
