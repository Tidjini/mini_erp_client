import React from "react";
import { Button } from "@material-ui/core";

export default function CollectionActions(props) {
  const actions = [
    {
      label: "Ajouter",
      style: { backgroundColor: "green" },
      callback: function (event) {
        console.log(event.target);
      },
      icon: "add",
    },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {actions.map((item, id) => (
        <Button key={id} style={{ ...item.style }} onClick={item.callback}>
          {item.label}
        </Button>
      ))}

      {/* <Button style={{ backgroundColor: "blue" }}>Editer</Button> */}
      {/* <Button style={{ backgroundColor: "red" }}>Supprimer</Button> */}
    </div>
  );
}
