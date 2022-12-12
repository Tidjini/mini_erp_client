import React, { useEffect, useState } from "react";
import { FuseScrollbars } from "@fuse";
import { Table as BaseTable, TableBody } from "@material-ui/core";
import { table } from "app/composants/table/styles";
import TableHead from "app/composants/table/TableHead";
import TableRow from "app/composants/table/TableRow";
import { convertItemToColumns } from "app/helpers/utils";

export default function Table(props) {
  const {
    cells,
    data,
    columns,
    clicks,
    key,
    onReachEnd,
    onDoubleClickItem,
    onClickItem,
    CustomRow,
    CustomHeader,
    scrollOnTop,
  } = props;

  function onTest(e, item) {
    alert(item.numero);
  }

  return (
    // <div className="inner-scroll" style={table.container}>
    <FuseScrollbars
      style={table.scrollBar}
      enable={true}
      onYReachEnd={(element) => {
        onReachEnd && onReachEnd(element);
      }}
      onScrollDown={(element) => {}}
      onScrollUp={(element) => {}}
      scrollToTopOnChildChange={scrollOnTop || false}
    >
      <BaseTable size="small" stickyHeader>
        {CustomHeader && <CustomHeader cells={cells} />}
        {!CustomHeader && <TableHead cells={cells} />}
        <TableBody>
          {data &&
            data.map((item, index) => {
              if (CustomRow)
                return (
                  <CustomRow
                    key={index}
                    item={item}
                    onDoubleClick={onDoubleClickItem}
                    onClick={onClickItem}
                  />
                );
              else {
                const cols = convertItemToColumns(item, columns, clicks);
                return (
                  <TableRow
                    item={item}
                    key={index}
                    cols={cols}
                    onDoubleClickItem={onDoubleClickItem}
                    onClickItem={onClickItem}
                  />
                );
              }
            })}
        </TableBody>
      </BaseTable>
    </FuseScrollbars>
    // </div>
  );
}
