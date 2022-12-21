import React from "react";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

export default function CollectionPagination(props) {
  return (
    <TableFooter>
      <TableRow>
        {/* <TablePagination
          rowsPerPageOptions={[50]}
          colSpan={3}
          count={10}
          rowsPerPage={50}
          page={1}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onPageChange={(e) => {
            console.log("on Page change ", e);
          }}
          onRowsPerPageChange={(e) => {
            console.log("on Page onRowsPerPageChange ", e);
          }}
        /> */}
      </TableRow>
    </TableFooter>
  );
}
