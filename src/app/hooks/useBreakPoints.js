import React from "react";
import useWindowSize from "./useWindowSize";

export default function useBreakPoints() {
  const size = useWindowSize();

  const [type, setType] = React.useState("lg");

  React.useEffect(() => {
    function handleChanges() {
      if (size.width <= 767) setType("xs");
      if (size.width > 767 && size.width <= 991) setType("sm");
      if (size.width > 991 && size.width <= 1199) setType("md");
      if (size.width > 1199 && size.width <= 1200) setType("lg");
      if (size.width > 1200) setType("xl");
    }
    handleChanges();
  }, [size]);

  return type;
}
