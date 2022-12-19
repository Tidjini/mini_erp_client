import React from "react";
import useBreakPoints from "app/hooks/useBreakPoints";
import Button from "./Button";

export default function CollectionActions(props) {
  const size = useBreakPoints();
  const [display, setDisplay] = React.useState("flex");
  const actions = [
    {
      label: "Ajouter",
      style: {
        backgroundColor: "#2a9d8f",
      },
      callback: function (event) {
        console.log(event.target);
      },
      icon: "add",
    },
    {
      label: "Edit",
      style: {
        backgroundColor: "#219ebc",
      },
      callback: function (event) {
        console.log(event.target);
      },
      icon: "add",
    },
    {
      label: "Delete",
      style: {
        backgroundColor: "#ef233c",
      },
      callback: function (event) {
        console.log(event.target);
      },
      icon: "add",
    },
  ];
  React.useEffect(() => {
    function changeDisplay() {
      switch (size) {
        case "xs":
          if (actions.length > 1) setDisplay("none");
          break;

        default:
          setDisplay("flex");
          break;
      }
    }
    changeDisplay();
  }, [size]);

  return (
    <React.Fragment>
      <div style={{ display: display, alignItems: "center" }}>
        {actions.map((item, id) => (
          <Button
            key={id}
            style={{ ...item.style }}
            onClick={item.callback}
            content={item.label}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </React.Fragment>
  );
}
