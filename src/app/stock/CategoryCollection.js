import React from "react";
// import CollectionResponse from "./CollectionResponse";
import useCollection from "app/hooks/useCollection";
import useView from "app/hooks/useView";
import Input from "app/composants.v2/Input";

export default function CategoryCollection() {
  const unites = useCollection("unites");
  const categories = useCollection("categories");
  const tvas = useCollection("tvas");
  const { form, handleChange } = useView(
    "tvas",
    { id: null, tva: "", value: 0.0 },
    1
  );

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
      <div>{form.id}</div>
      <div>{form.tva}</div>
      <div>{form.value}</div>
      <Input
        name="value"
        placeholder="value"
        handleChange={handleChange}
        value={form.value}
        style={{ margin: 5 }}
        horizontal={true}
        type="number"
        label={"Tva".toUpperCase()}
        xs={0}
        mdDown
      />
    </div>
  );
}
