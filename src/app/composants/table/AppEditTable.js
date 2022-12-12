import React from "react";
import { Table, TableBody, TableRow } from "@material-ui/core";
import { FuseScrollbars } from "@fuse";
import AppEditTableHeader from "./AppEditTableHeader";

export default function AppEditTable(props) {
  const { cells } = props;
  return (
    <div>
      <FuseScrollbars
        style={{
          flex: "1 1 auto",
          height: "100%",
          overflow: "auto",
          "-webkit-overflow-scrolling": "touch",
        }}
        enable={true}
        onYReachEnd={(ve) => {
          console.log("Scroll Y");
        }}
        onXReachEnd={(ve) => {
          console.log("Scroll X");
        }}
        scrollToTopOnChildChange={false}
      >
        <Table
          aria-labelledby="tableTitle"
          className="min-w-md"
          size="small"
          stickyHeader
          stickyFooter
        >
          <AppEditTableHeader cells={cells} height={32} />
          <TableBody
            style={{
              overflow: "visible",
            }}
          >
            {ecritures.map((ecriture, index) => (
              <EcritureRow
                key={index}
                line={index}
                row={ecriture}
                selected={selected}
                setSelected={setSelected}
                save={save}
                entete={enteteState}
              />
            ))}
            <TableRow className="h-4 cursor-pointer" />
            <EcritureRow
              line={ecritures.length + 1}
              row={defaultEcriture}
              selected={selected}
              setSelected={setSelected}
              save={save}
              entete={enteteState}
            />
          </TableBody>
          {/* <TableFooter></TableFooter> */}
        </Table>
      </FuseScrollbars>
    </div>
  );
}
