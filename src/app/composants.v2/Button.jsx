import React from "react";
import Button from "@material-ui/core/Button";
import { margins } from "./constants";
import useBreakPoints from "app/hooks/useBreakPoints";

export default function BaseButton(props) {
  const { content, style } = props;
  const [fontSize, setFontSize] = React.useState(14);
  const size = useBreakPoints();

  React.useEffect(() => {
    function changeDisplaySize() {
      switch (size) {
        case "xs":
        case "sm":
          setFontSize(12);
          break;

        default:
          setFontSize(14);
          break;
      }
    }
    changeDisplaySize();
  }, [size]);
  return (
    <Button
      {...props}
      style={{
        fontSize: fontSize,
        textTransform: "uppercase",
        backgroundColor: "blue",
        color: "white",
        marginRight: margins.default,
        ...style,
      }}
    >
      {content}
    </Button>
  );
}
