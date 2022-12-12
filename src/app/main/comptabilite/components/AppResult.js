import { Card, Grid, Icon } from "@material-ui/core";
import React from "react";
import { Colors } from "app/main/Config";

var formatter = new Intl.NumberFormat("dz-DZ", {
  style: "currency",
  currency: "DZD",
});
export default function AppResult(props) {
  const { result } = props;
  return (
    <Card
      style={{
        minHeight: 100,
        margin: 10,
        background: result.color_card,
        borderRadius: 5,
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Icon
          style={{
            background: "#f1f1f110",
            borderRadius: 6,
            textAlign: "center",
            width: 42,
            height: 42,
            fontSize: 28,
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
            color: result.color,
          }}
        >
          {result.icon}
        </Icon>
        <h6
          style={{
            margin: "8px 5px",
            fontSize: 24,
            fontWeight: "normal",
            color: result.color,
          }}
        >
          {result.label}
        </h6>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            margin: "10px 5px",
            fontSize: 28,
            color:
              result.solde >= 0
                ? Colors.static_positive
                : Colors.static_negative,
          }}
        >
          {formatter.format(result.solde)}
        </h1>
        <Icon
          style={{
            background: "#f1f1f110",
            borderRadius: 12,
            textAlign: "center",
            width: 36,
            height: 36,
            fontSize: 16,
            display: "flex",
            justifycontent: "center",
            alignItems: "center",
            color:
              result.solde >= 0
                ? Colors.static_positive
                : Colors.static_negative,
            marginLeft: 5,
            fontWeight: "800",
          }}
        >
          {result.solde >= 0 ? "arrow_upward" : "arrow_downward"}
        </Icon>
      </div>
      {(result.actif || result.charge) && (
        <Grid container>
          <Grid
            item
            style={{
              borderRadius: 5,
              alignItems: "center",
            }}
            xs={12}
            md={6}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                style={{
                  background: "#f1f1f110",
                  borderRadius: 6,
                  textAlign: "center",
                  width: 32,
                  height: 32,
                  fontSize: 18,
                  display: "flex",
                  justifycontent: "center",
                  alignItems: "center",
                  color: result.color,
                }}
              >
                call_to_action
              </Icon>
              <h6
                style={{
                  margin: "0px 5px",
                  fontSize: 16,
                  fontWeight: "normal",
                  color: result.color,
                }}
              >
                {result.actif && "ACTIF:"}
                {result.charge && "CHARGE:"}
              </h6>
              <h1
                style={{
                  margin: "10px 5px",
                  fontSize: 18,
                  color:
                    result.charge !== undefined
                      ? Colors.static_negative
                      : Colors.static_positive,
                }}
              >
                {result.charge && formatter.format(result.charge)}
                {result.actif && formatter.format(result.actif)}
              </h1>
            </div>
          </Grid>
          <Grid
            item
            style={{
              borderRadius: 5,
              alignItems: "center",
            }}
            xs={12}
            md={6}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon
                style={{
                  background: "#f1f1f110",
                  borderRadius: 6,
                  textAlign: "center",
                  width: 32,
                  height: 32,
                  fontSize: 18,
                  display: "flex",
                  justifycontent: "center",
                  alignItems: "center",
                  color: result.color,
                }}
              >
                call_to_action
              </Icon>
              <h6
                style={{
                  margin: "0px 5px",
                  fontSize: 16,
                  fontWeight: "normal",
                  color: result.color,
                }}
              >
                {result.passif && "PASSIF:"}
                {result.produit && "PRODUIT:"}
              </h6>
              <h1
                style={{
                  margin: "10px 5px",
                  fontSize: 18,
                  color:
                    result.produit !== undefined
                      ? Colors.static_positive
                      : Colors.static_negative,
                }}
              >
                {result.produit && formatter.format(result.produit)}
                {result.passif && formatter.format(result.passif)}
              </h1>
            </div>
          </Grid>
        </Grid>
      )}
    </Card>
  );
}
