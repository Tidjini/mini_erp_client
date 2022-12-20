import React from "react";
//thirds
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { Icon, Typography } from "@material-ui/core";
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

function DateTime({ item }) {
  const { created_date, created_time } = item;
  return (
    <TableCell align={"left"} style={{ width: 60 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: forecolors.default,
          }}
        >
          {created_date}
        </Typography>
        <span
          style={{
            fontSize: 11,
            fontWeight: "300",
            color: forecolors.second,
          }}
        >
          {created_time}
        </span>
      </div>
    </TableCell>
  );
}
function StatueComponent({ item }) {
  const { statue, statue_label } = item;

  const [color, setColor] = React.useState("#414962");
  const [backcolor, setBackcolor] = React.useState("#41496220");

  React.useEffect(() => {
    switch (statue) {
      case "a":
        setColor("#FFB703");
        setBackcolor("#FFB70320");
        break;
      case "p":
        setColor("#E76F51");
        setBackcolor("#E76F5120");
        break;
      case "t":
        setColor("#2A9D8F");
        setBackcolor("#2A9D8F20");
        break;
      case "c":
        setColor("#E63946");
        setBackcolor("#E6394620");
        break;

      default:
        setColor("#414962");
        setBackcolor("#41496220");
        break;
    }
  }, [statue]);
  return (
    <TableCell align="center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          backgroundColor: backcolor,
          padding: "7px 20px",
        }}
      >
        <Typography
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: color,
          }}
        >
          {statue_label}
        </Typography>
      </div>
    </TableCell>
  );
}

function Closed({ item }) {
  return (
    <TableCell align={"right"}>
      <Icon
        style={{
          color: item.closed
            ? item.statue === "c"
              ? "#E63946"
              : "#2A9D8F"
            : "#414962",
        }}
      >
        {item.closed ? (item.statue === "c" ? "cancel" : "done_all") : "cached"}
      </Icon>
    </TableCell>
  );
}

export default function TaskRow(props) {
  const { data: item, onClick } = props;

  return (
    <StyledTableRow onClick={() => onClick(item)}>
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
      <StatueComponent item={item} />
      <DateTime item={item} />
      <Closed item={item} />
    </StyledTableRow>
  );
}
