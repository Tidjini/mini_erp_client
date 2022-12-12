import React from "react";
// import CollectionResponse from "./CollectionResponse";
import useCollection from "app/hooks/useCollection";

export default function CategoryCollection() {
  const unites = useCollection("unites");
  const categories = useCollection("categories");
  const tvas = useCollection("tvas");

  React.useEffect(() => {
    console.log("init");
    // setTimeout(() => {
    //   tvas.deleteItem({
    //     id: 2,
    //     tva: "9%",
    //     value: 0.9,
    //   });
    // }, 5000);
  });

  // const unites = useCollection({
  //   name: "unites",
  //   filters: {
  //     category: "Volume",
  //   },
  // });
  // const { tvas } = useCollection({ name: "tvas" });

  return (
    <div>
      <div>{unites.data.length}</div>
      <div>{categories.data.length}</div>
      <div>{tvas.data.length}</div>
    </div>
  );
}
