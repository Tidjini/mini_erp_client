import { Grid } from "@material-ui/core";
import React from "react";
import { simpleFormStyles as styles } from "./styles";
import Input from "./Input";
import AppSelector from "./AppSelector";
import TextCompose from "./TextCompose";

export default function SimpleForm(props) {
  const { form, handleChange, inputs } = props;
  return (
    <Grid
      item
      container
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={styles.boxContainer}
    >
      <Grid container style={styles.box}>
        {inputs.map((item) => {
          const { name, label, style, input, items, type } = item;
          const { styleItem, grid } = style;

          let component = undefined;

          if (input === "input")
            component = (
              <Input
                key={name}
                name={name}
                placeholder={name}
                label={label}
                handleChange={handleChange}
                value={form[name]}
                style={{ ...styleItem, type: type }}
                grid={grid}
                type={type}
              />
            );
          else if (input === "selector")
            component = (
              <AppSelector
                key={name}
                name={name}
                label={label}
                value={form[name]}
                options={items}
                handleChange={handleChange}
                style={style}
                grid={style.grid}
              />
            );
          else if (input === "text_compse")
            component = (
              <TextCompose
                key={name}
                label={label}
                value={form[name]}
                style={styleItem}
                grid={style.grid}
                valueStyle={style.value}
                labelStyle={style.label}
                type={type}
              />
            );

          return component;
        })}
      </Grid>
    </Grid>
  );
}
