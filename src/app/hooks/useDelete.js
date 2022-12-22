import React from "react";

// export default function useDelete({
//   api,
//   selectedItem,
//   onSelectItem,
//   data,
//   onDataChanged,
//   onMetaDataChanged,
//   pk = "id",
// }) {
//   const handleDelete = React.useCallback(() => {
//     if (!Boolean(selectedItem)) return;
//     const clean = data.filter(
//       (value, index, arr) => selectedItem[pk] != value[pk]
//     );

//     onDataChanged([...clean]);
//     api
//       .deleteItem(selectedItem)
//       .then((response) => {
//         // setData(response);
//         onSelectItem();
//         console.log(response);
//       })
//       .catch((exception) => {});
//   }, [selectedItem]);
// }
