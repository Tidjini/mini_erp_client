import React from "react";
import AppEditTableHeader from "app/composants/table/AppEditTableHeader";

export default function EcritureHeader(props) {
  const cells = [
    {
      content: "Compte",
      contentStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#474747",
        textDecoration: "underline",
      },
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: "1px 0 1px 1px",
        background: "#e8e8e8",
      },
    },
    {
      content: "Tier",
      contentStyle: {
        fontSize: 12,
        fontWeight: "bold",
      },
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: "1px 0 1px 1px",
        background: "#e8e8e8",
      },
    },
    {
      content: "Label",
      contentStyle: {
        fontSize: 12,
      },
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: "1px 0 1px 1px",
        background: "#e8e8e8",
      },
    },
    {
      content: "Date Échéance",
      contentStyle: {
        fontSize: 12,
      },
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: "1px 0 1px 1px",
        background: "#e8e8e8",
      },
    },
    {
      content: "Débit",
      contentStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#218277",
        textAlign: "right",
        marginRight: 5,
      },
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: "1px 0 1px 1px",
        background: "#e8e8e8",
      },
    },
    {
      content: "Crédit",
      contentStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#C53D1B",
        textAlign: "right",
        marginRight: 5,
      },
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: "1px 0 1px 1px",
        background: "#e8e8e8",
      },
    },
    {
      content: "Action",
      contentStyle: {
        fontSize: 16,
        fontWeight: "bold",
      },
      cellStyle: {
        border: "1px solid #9E9E9E60",
        borderWidth: "1px",
        background: "#e8e8e8",
      },
    },
  ];
  return <AppEditTableHeader cells={cells} height={32} />;
}
