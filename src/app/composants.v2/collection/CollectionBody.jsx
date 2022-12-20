import React from "react";
//thirds
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
//application
import { forecolors } from "../constants";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F4F5",
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#E7E9EF",
    color: forecolors.default,
    fontSize: 12,
    fontWeight: "700",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function CollectionBody(props) {
  const { data, cells, eventHandlers, children } = props;
  return (
    <TableBody>
      {data && data.map((row) => setRow(children, row, cells, eventHandlers))}
    </TableBody>
  );
}

function setRow(CustomRow, item, cells, eventHandlers, pk = "id") {
  if (Boolean(CustomRow)) return <CustomRow data={item} />;
  return (
    <StyledTableRow key={item[pk]} {...eventHandlers}>
      {cells &&
        cells.map((cell) => (
          <StyledTableCell
            key={cell.id}
            component={cell.component}
            scope={cell.scope}
            align={cell.align || "left"}
            style={{ ...cell.style }}
          >
            {"" + item[cell.id]}
          </StyledTableCell>
        ))}
    </StyledTableRow>
  );
}
