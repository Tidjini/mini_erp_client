import { Card, Icon } from "@material-ui/core";
import React from "react";
import { Colors } from "app/main/Config";

var formatter = new Intl.NumberFormat("dz-DZ", {
  style: "currency",
  currency: "DZD",
});
export default function AppRecapCompte(props) {
  const { compte } = props;

  return (
    <Card
      style={{
        minHeight: 100,
        margin: 10,
        background: compte.color_card,
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
          {compte.title}
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
              compte.value === 0
                ? compte.color
                : compte.value > 0
                ? Colors.static_positive
                : Colors.static_negative,
          }}
        >
          {formatter.format(compte.value)}
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
              compte.value === 0
                ? compte.color
                : compte.value > 0
                ? Colors.static_positive
                : Colors.static_negative,
            marginLeft: 5,
            fontWeight: "800",
          }}
        >
          {compte.value === 0
            ? "arrow_forward"
            : compte.value > 0
            ? "arrow_upward"
            : "arrow_downward"}
        </Icon>
      </div>
      {/* {compte.non_lettrables && (
        <h1
          style={{
            margin: "10px 5px",
            fontSize: 14,
            color: compte.color,
            fontWeight: "400",
          }}
        >
          {"Ecritures non léttrables " + compte.non_lettrables}
        </h1>
      )} */}

      {/* {compte.banque && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: "0px 5px",
              fontSize: 12,
              fontWeight: "400",
              color:
                compte.banque >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
            }}
          >
            {"Banque (512) " + formatter.format(compte.banque)}
          </h1>
          <Icon
            style={{
              background: "#f1f1f110",
              borderRadius: 12,
              textAlign: "center",
              width: 14,
              height: 14,
              fontSize: 16,
              display: "flex",
              justifycontent: "center",
              alignItems: "center",
              color:
                compte.banque >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
              marginLeft: 5,
              fontWeight: "800",
            }}
          >
            {compte.banque >= 0 ? "arrow_upward" : "arrow_downward"}
          </Icon>
        </div>
      )}
      {compte.caisse && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: "5px 5px",
              fontSize: 12,
              fontWeight: "400",
              color:
                compte.caisse >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
            }}
          >
            {"Caisse (531) " + formatter.format(compte.caisse)}
          </h1>
          <Icon
            style={{
              background: "#f1f1f110",
              borderRadius: 12,
              textAlign: "center",
              width: 14,
              height: 14,
              fontSize: 16,
              display: "flex",
              justifycontent: "center",
              alignItems: "center",
              color:
                compte.caisse >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
              marginLeft: 5,
              fontWeight: "800",
            }}
          >
            {compte.caisse >= 0 ? "arrow_upward" : "arrow_downward"}
          </Icon>
        </div>
      )} */}

      {/* {compte.deductible && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: "0px 5px",
              fontSize: 12,
              fontWeight: "400",
              color:
                compte.deductible >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
            }}
          >
            {"Déductible (445662) " + formatter.format(compte.deductible)}
          </h1>
          <Icon
            style={{
              background: "#f1f1f110",
              borderRadius: 12,
              textAlign: "center",
              width: 14,
              height: 14,
              fontSize: 16,
              display: "flex",
              justifycontent: "center",
              alignItems: "center",
              color:
                compte.deductible >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
              marginLeft: 5,
              fontWeight: "800",
            }}
          >
            {compte.deductible >= 0 ? "arrow_upward" : "arrow_downward"}
          </Icon>
        </div>
      )} */}
      {/* {compte.collecte && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: "5px 5px",
              fontSize: 12,
              fontWeight: "400",
              color:
                compte.collecte >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
            }}
          >
            {"Collectée (4457) " + formatter.format(compte.collecte)}
          </h1>
          <Icon
            style={{
              background: "#f1f1f110",
              borderRadius: 12,
              textAlign: "center",
              width: 14,
              height: 14,
              fontSize: 16,
              display: "flex",
              justifycontent: "center",
              alignItems: "center",
              color:
                compte.collecte >= 0
                  ? Colors.static_positive
                  : Colors.static_negative,
              marginLeft: 5,
              fontWeight: "800",
            }}
          >
            {compte.collecte >= 0 ? "arrow_upward" : "arrow_downward"}
          </Icon>
        </div>
      )} */}
    </Card>
  );
}
