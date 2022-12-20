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

export default function TaskRow(props) {
  const { data: item } = props;

  return (
    <StyledTableRow>
      <TableCell align={"left"} style={{ width: 60 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 40,
            borderWidth: 4,
            borderColor: item.backcolor,
          }}
        >
          <Typography
            style={{
              fontSize: 14,
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
    </StyledTableRow>
  );
}
