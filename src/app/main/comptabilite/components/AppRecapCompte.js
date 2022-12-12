import { Card, Icon } from "@material-ui/core";
import React from "react";
import { Colors } from "app/main/Config";

var formatter = new Intl.NumberFormat("dz-DZ", {
  style: "currency",
  currency: "DZD",
});
export default function AppRecapCompte(props) {
  const { compte, onCompteClick } = props;

  return (
    <Card
      style={{
        minHeight: 100,
        margin: 10,
        background: compte.color_card,
        borderRadius: 5,
        padding: 10,
        cursor: compte.compte && "pointer",
      }}
      onClick={(e) => {
        onCompteClick(compte.compte);
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
            color: compte.color,
          }}
        >
          {compte.icon}
        </Icon>
        <h6
          style={{
            margin: "8px 5px",
            fontSize: 24,
            fontWeight: "normal",
            color: compte.color,
          }}
        >
          {compte.title.toUpperCase()}
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
              compte.value.solde_debit === 0.0 &&
              compte.value.solde_credit === 0.0
                ? compte.color
                : compte.value.solde_debit > 0
                ? Colors.static_positive
                : Colors.static_negative,
          }}
        >
          {compte.value.solde_debit != 0 &&
            formatter.format(compte.value.solde_debit)}
          {compte.value.solde_credit != 0 &&
            formatter.format(compte.value.solde_credit)}

          {compte.value.solde_debit == 0 &&
            compte.value.solde_credit == 0 &&
            formatter.format(0.0)}
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
              compte.value.solde_debit === 0.0 &&
              compte.value.solde_credit === 0.0
                ? compte.color
                : compte.value.solde_debit > 0
                ? Colors.static_positive
                : Colors.static_negative,
            marginLeft: 5,
            fontWeight: "800",
          }}
        >
          {compte.value.solde_debit === 0.0 && compte.value.solde_credit === 0.0
            ? "arrow_forward"
            : compte.value.solde_debit > 0
            ? "arrow_upward"
            : "arrow_downward"}
        </Icon>
      </div>
    </Card>
  );
}
