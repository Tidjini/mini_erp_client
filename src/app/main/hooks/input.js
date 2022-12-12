import { useState, useEffect } from "react";

export function useInputSize(style) {
  const [size, setSize] = useState(["auto", 36]);

  useEffect(() => {
    if (style && style.horizontal) setSize(["auto", 36]);
    else setSize(["auto", 71]);
  }, [style]);

  return size;
}

// export function useInputStyle(inputStyle) {
//   const [container, setContainer] = useState({
//     borderRadius: "4px 4px 4px 4px",
//     padding: 5,
//     height: 36,
//   });

//   const gridStyle = {
//     borderRadius: "4px 4px 4px 4px",
//     padding: 5,
//   };

//   const form = {
//     display: "flex",
//     flexDirection: style && style.horizontal ? "row" : "column",
//     alignItems:
//       style && style.horizontal && !style.multiline ? "center" : "start",
//   };

//   const label = {
//     fontWeight: "700",
//     textTransform: "uppercase",
//     marginRight: 5,
//   };

//   const inputContainer = {
//     background: "#C1C1C110",
//     borderWidth: "1px",
//     borderColor: "#b7b7a490",
//     borderRadius: "4px",
//     boxShadow: "1px 3px 3px #9E9E9E20",
//     padding: 5,
//     height: style.height,
//     width: "100%",
//   };
//   const icon = { color: "#2b2d42" };

//   const input = {
//     color: "#2b2d42",
//     fontSize: 14,
//     width: "100%",
//     marginLeft: 4,
//   };

//   useEffect(() => {
//     if (inputStyle === undefined) return;

//     const { container } = inputStyle;

//     setContainer({
//       borderRadius: "4px 4px 4px 4px",
//       padding: 5,
//       height: 36,
//       ...container,
//       height: container.36,

//     });

//     if (style && style.horizontal) setSize(["auto", 36]);
//     else setSize(["auto", 71]);
//   }, [inputStyle]);

//   return { container };
// }
