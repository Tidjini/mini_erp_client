export const comptes = [
  {
    name: "num_compte",
    placeholder: "N° Compte (Max 6)",
    type: "number",
    label: "N° Compte",
    maxLength: 6,
    readOnly: 1,
    onlyDigit: true,
  },
  {
    name: "intitule",
    placeholder: "Intitulé (Max 100)",
    type: "text",
    label: "Intitulé",
    maxLength: 100,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "tier",
    placeholder: "",
    type: "boolean",
    label: "Tier",
    maxLength: 0,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "appliquer_rapprochement",
    placeholder: "",
    type: "boolean",
    label: "Appliquer Rapprochement",
    maxLength: 0,
    readOnly: 0,
    onlyDigit: false,
  },
];

export const journal = [
  {
    name: "code",
    placeholder: "Code (Max 10)",
    type: "text",
    label: "Code",
    maxLength: 6,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "intitule",
    placeholder: "Intitule (Max 60)",
    type: "text",
    label: "Intitule",
    maxLength: 60,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "nature",
    placeholder: "Nature (Max 30)",
    type: "text",
    label: "Nature",
    maxLength: 30,
    readOnly: 0,
    onlyDigit: false,
  },
];

export const tier = [
  {
    name: "code",
    placeholder: "Code (Max 10)",
    type: "text",
    label: "Code",
    maxLength: 6,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "raison_social",
    placeholder: "Raison Social (Max 60)",
    type: "text",
    label: "raison_social",
    maxLength: 60,
    readOnly: 0,
    onlyDigit: false,
  },
];

export const banque = [
  {
    name: "code",
    placeholder: "Code (Max 10)",
    type: "text",
    label: "Code",
    maxLength: 6,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "raison_social",
    placeholder: "Raison Social (Max 60)",
    type: "text",
    label: "raison_social",
    maxLength: 60,
    readOnly: 0,
    onlyDigit: false,
  },
];

export const periode = [
  {
    name: "code",
    placeholder: "Code (Max 10)",
    type: "text",
    label: "Code",
    maxLength: 6,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "label",
    placeholder: "Label (Max 60)",
    type: "text",
    label: "Label",
    maxLength: 60,
    readOnly: 0,
    onlyDigit: false,
  },
];
