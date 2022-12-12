import React from "react";
import { TableBody, TableRow } from "@material-ui/core";
import AppTableCell from "./AppTableCell";
import AppTableCellFooter from "./AppTableCellFooter";

export default function DevisAchatTableCompareBody(props) {
  const { body, footer, onCellClicked } = props;

  const footer_ht = footer[0].filter((item, index) => {
    return item !== "";
  });
  const footer_tva = footer[1].filter((item, index) => {
    return item !== "";
  });
  const footer_ttc = footer[2].filter((item, index) => {
    return item !== "";
  });

  // const [itemData, setItemData] = useState({ ...item, selected: -2 });

  return (
    <TableBody>
      {body.map((item) => (
        <TableRow>
          {item.row.map((column, index) => (
            <AppTableCell
              column={column}
              index={index}
              item={item}
              onClick={onCellClicked}
            />
          ))}
        </TableRow>
      ))}
      <TableRow>
        {footer_ht.map((column, index) => (
          <AppTableCellFooter column={column} index={index} colSpan={2} />
        ))}
      </TableRow>
      <TableRow>
        {footer_tva.map((column, index) => (
          <AppTableCellFooter column={column} index={index} colSpan={2} />
        ))}
      </TableRow>
      <TableRow>
        {footer_ttc.map((column, index) => (
          <AppTableCellFooter column={column} index={index} colSpan={2} />
        ))}
      </TableRow>
    </TableBody>
  );
}
