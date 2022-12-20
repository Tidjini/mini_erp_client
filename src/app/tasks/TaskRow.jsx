import React from "react";
//thirds
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { forecolors } from "app/composants.v2/constants";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F4F5",
    },
  },
}))(TableRow);

function Caption({ item }) {
  return (
    <TableCell align={"left"} style={{ width: 60 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
          borderRadius: 40,
          borderWidth: 4,
          borderColor: item.backcolor,
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: item.forecolor,
          }}
        >
          {item.caption}
        </Typography>
        <span
          style={{
            fontSize: 11,
            fontWeight: "300",
            color: item.forecolor,
          }}
        >
          {item.id}
        </span>
      </div>
    </TableCell>
  );
}

export default function TaskRow(props) {
  const { data: item } = props;

  return (
    <StyledTableRow>
      <Caption item={item} />
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
      <TableCell align={"left"}>
        <Typography
          style={{ fontSize: 12, fontWeight: "700", color: "#414962" }}
        >
          {item.creator_name}
        </Typography>
      </TableCell>
      <TableCell align={"left"}>
        <Typography
          style={{ fontSize: 12, fontWeight: "700", color: "#B61F1F" }}
        >
          {item.receiver_name}
        </Typography>
      </TableCell>
    </StyledTableRow>
  );
}
