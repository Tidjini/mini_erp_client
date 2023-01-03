import React from "react";
//thirds
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { Icon, Typography } from "@material-ui/core";
import { forecolors } from "app/composants.v2/constants";
import { useSelector } from "react-redux";
import useUserStateInfo from "app/hooks/useUserStateInfo";

export default function ProfileRow(props) {
  const { data: item, onClick, onDoubleClick, selectedItem } = props;

  const user = useSelector(({ auth }) => auth.user.data);
  const { stateInfo } = useUserStateInfo(item.statue);

  return (
    <TableRow
      onClick={() => onClick(item)}
      onDoubleClick={() => onDoubleClick()}
      style={{
        cursor: "pointer",
        backgroundColor:
          selectedItem && selectedItem.id === item.id
            ? "#2FB1A040"
            : "transparent",
      }}
    >
      <TableCell align={"left"} style={{ width: 72, alignItems: "center" }}>
        <img
          style={{
            width: 48,
            height: 42,
            borderRadius: 24,
          }}
          src="assets/images/man.png"
        />
      </TableCell>
      <TableCell align={"left"}>
        <Typography style={{ fontSize: 14, fontWeight: "700" }}>
          {item.name}
        </Typography>
      </TableCell>
      <TableCell align={"left"}>
        <Typography
          style={{
            padding: "5px 20px",
            borderRadius: 15,
            width: 150,

            fontSize: 11,
            fontWeight: "700",
            textAlign: "center",
            ...stateInfo,
          }}
        >
          {stateInfo.text.toUpperCase()}
        </Typography>
      </TableCell>
      <TableCell>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "flex-end",
          }}
        >
          <Typography
            style={{
              fontWeight: "700",
              color: "#355070",
              marginRight: 14,
            }}
          >
            {item.distance}
          </Typography>
          <Icon
            style={{
              color: "#355070",
            }}
          >
            directions
          </Icon>
        </div>
      </TableCell>
      <TableCell align={"right"}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "flex-end",
          }}
        >
          <Typography
            style={{ fontWeight: "700", color: "#355070", marginRight: 14 }}
          >
            {item.duration}
          </Typography>
          <Icon
            style={{
              color: "#fca311",
            }}
          >
            access_time
          </Icon>
        </div>
      </TableCell>
      <TableCell>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: "700",
            color: "#2b2d42",
            width: 36,
            height: 36,
            borderRadius: 28,
            backgroundColor: "#90e0ef50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.task_count}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
