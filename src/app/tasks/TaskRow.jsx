import React from "react";
//thirds
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F4F5",
    },
  },
}))(TableRow);
const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function TaskRow(props) {
  const { data: item } = props;

  return (
    <StyledTableRow key={item["id"]}>
      <StyledTableCell key="item" align={"left"}>
        {"" + item["id"]}
      </StyledTableCell>
    </StyledTableRow>
  );
}
