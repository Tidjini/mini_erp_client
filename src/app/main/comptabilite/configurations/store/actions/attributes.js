export const dossier = [
  {
    name: "entreprise",
    placeholder: "Entreprise (Max 100)",
    type: "text",
    label: "Entreprise",
    maxLength: 100,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "database_name",
    placeholder: "Database (Max 100)",
    type: "text",
    label: "Base De Données",
    maxLength: 100,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "address",
    placeholder: "Address (Max 255)",
    type: "text",
    label: "Address",
    maxLength: 100,
    readOnly: 0,
    onlyDigit: false,
  },
];

export const exercice = [
  {
    name: "annee",
    placeholder: "Année (Max 4)",
    type: "text",
    label: "Année",
    maxLength: 4,
    readOnly: 1,
    onlyDigit: false,
  },
  {
    name: "intitule",
    placeholder: "Intitule (Max 100)",
    type: "text",
    label: "Intitule",
    maxLength: 100,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "debut",
    placeholder: "Début",
    type: "date",
    label: "Début",
    maxLength: 100,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "fin",
    placeholder: "Fin",
    type: "date",
    label: "Fin",
    maxLength: 100,
    readOnly: 0,
    onlyDigit: false,
  },
];

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
    placeholder: "Nature (Max 60)",
    type: "selection",
    items: ["Trésorerie", "Opération Divers", "Achats", "Ventes"],
    label: "Nature",
    maxLength: 60,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "compte",
    placeholder: "N° Compte",
    type: "text",
    label: "N° Compte",
    maxLength: 60,
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
    label: "Raison Social",
    maxLength: 60,
    readOnly: 0,
    onlyDigit: false,
  },
];

export const dashboard = [
  {
    name: "title",
    placeholder: "Code (Max 100)",
    type: "text",
    label: "Titre",
    maxLength: 100,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "function",
    placeholder: "Label (Max 255)",
    type: "text",
    label: "Fonction",
    maxLength: 255,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "color",
    placeholder: "Label (Max 10)",
    type: "text",
    label: "Color",
    maxLength: 10,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "color_card",
    placeholder: "Label (Max 10)",
    type: "text",
    label: "Color Card",
    maxLength: 10,
    readOnly: 0,
    onlyDigit: false,
  },
  {
    name: "icon",
    placeholder: "Label (Max 50)",
    type: "text",
    label: "Icon",
    maxLength: 50,
    readOnly: 0,
    onlyDigit: false,
  },
];
