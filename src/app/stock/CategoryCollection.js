import React from "react";
// import CollectionResponse from "./CollectionResponse";
import useCollection from "app/hooks/useCollection";
import useView from "app/hooks/useView";
import Input from "app/composants.v2/Input";
import Container from "app/composants.v2/Container";
import { Grid } from "@material-ui/core";

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
    <Container>
      <Container md={4}>
        <Input label="TVA" style={{}} />
        <Input label="TVA" style={{}} />
      </Container>
      <Container md={4}>
        <Input label="TVA2" style={{}} lg={6} />
        <Input label="TVA2" style={{}} lg={6} />
        <Input label="TVA2" style={{}} lg={6} />
        <Input label="TVA2" style={{}} lg={6} />
      </Container>
      <Container>
        <Input label="TVA3" style={{}} />
        <Input label="TVA3" style={{}} />
      </Container>
      {/* <Grid
        item
        md={3}
        contianer
        direction="row"
        style={{ background: "#00000030" }}
      >
        <Input label="TVA4" style={{}} md={6} />
        <Input label="TVA4" style={{}} md={6} />
      </Grid> */}
    </Container>
  );
}
