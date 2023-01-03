import React from "react";
//thirds
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { Icon, Typography } from "@material-ui/core";
import { forecolors } from "app/composants.v2/constants";
import { useSelector } from "react-redux";

export default function ProfileRow(props) {
  const { data: item, onClick, onDoubleClick, selectedItem } = props;

  const user = useSelector(({ auth }) => auth.user.data);

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
      <StatueComponent item={item} selectedItem={selectedItem} />
      <TableCell align={"left"} style={{ minWidth: 100 }}>
        <Typography style={{ fontSize: 12, fontWeight: "700" }}>
          {item.label}
        </Typography>
      </TableCell>
      <TableCell align={"left"} style={{ minWidth: 200 }}>
        <Typography style={{ fontSize: 12, fontWeight: "600" }}>
          {item.description}
        </Typography>
      </TableCell>
      {(user.is_admin || user.is_staff) && (
        <TableCell align={"left"}>
          <Typography
            style={{ fontSize: 12, fontWeight: "700", color: "#414962" }}
          >
            {item.creator_name}
          </Typography>
        </TableCell>
      )}

      {(user.is_admin || user.is_staff) && (
        <TableCell align={"left"}>
          <Typography
            style={{ fontSize: 12, fontWeight: "700", color: "#B61F1F" }}
          >
            {item.receiver_name}
          </Typography>
        </TableCell>
      )}
      {/* <StatueComponent item={item} /> */}
      <DateTime item={item} />
      {(user.is_admin || user.is_staff) && <Closed item={item} />}
    </TableRow>
  );
}
