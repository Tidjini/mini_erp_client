export const ecriture = {
  journal: "",
  folio: 1,
  date: "",
  piece: "",
  compte: "", //code
  auxiliere: "", //code
  reference: "",
  label: "",
  debit: 0.0,
  credit: 0.0,
  lettre_state: false,
  lettre: "",
};

export const ecritures = [
  {
    "000065": [
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "601",
        auxiliere: "FOUNR. ATS SECURE", //code
        reference: "FACT/001",
        label: "CONSTATION ACHAT FORUNISSEUR HT....",
        debit: 5000.0,
        credit: 0.0,
        lettre_state: false,
        lettre: "",
      },
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "44566",
        auxiliere: "FOUNR. ATS SECURE", //code
        reference: "FACT/001",
        label: "CONSTATION ACHAT FORUNISSEUR TVA....",
        debit: 950.0,
        credit: 0.0,
        lettre_state: false,
        lettre: "",
      },
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "445662",
        auxiliere: "FOUNR. ATS SECURE", //code
        reference: "FACT/001",
        label: "REGLMENT FACUTRE FORUNISSEUR TVA....",
        debit: 0.0,
        credit: 5000.0,
        lettre_state: false,
        lettre: "",
      },
    ],
  },
  {
    "000066": [
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "601",
        auxiliere: "FOUNR. AUTRE .INC", //code
        reference: "FACT/001",
        label: "CONSTATION ACHAT FORUNISSEUR HT....",
        debit: 1900.0,
        credit: 0.0,
        lettre_state: false,
        lettre: "",
      },
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "44566",
        auxiliere: "FOUNR. ATS SECURE", //code
        reference: "FACT/001",
        label: "CONSTATION ACHAT FORUNISSEUR TVA....",
        debit: 361.0,
        credit: 0.0,
        lettre_state: false,
        lettre: "",
      },
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "445662",
        auxiliere: "FOUNR. ATS SECURE", //code
        reference: "FACT/001",
        label: "REGLMENT FACUTRE FORUNISSEUR TVA....",
        debit: 0.0,
        credit: 2261.0,
        lettre_state: false,
        lettre: "",
      },
    ],
  },
  {
    "000067": [
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "601",
        auxiliere: "FOUNR. AUTRE .INC", //code
        reference: "FACT/001",
        label: "CONSTATION ACHAT FORUNISSEUR HT....",
        debit: 100.0,
        credit: 0.0,
        lettre_state: false,
        lettre: "",
      },
      {
        journal: "ACHAT",
        folio: 1,
        date: "29/12/2021",
        piece: "000065",
        compte: "44566",
        auxiliere: "FOUNR. ATS SECURE", //code
        reference: "FACT/001",
        label: "CONSTATION ACHAT FORUNISSEUR TVA....",
        debit: 19.0,
        credit: 0.0,
        lettre_state: false,
        lettre: "",
      },
    ],
  },
];

Array.prototype.sum = function (prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop];
  }
  return total;
};

export const sum_ecriture = (ecriture) => {
  const results = [];
  ecriture.forEach((e) => {
    const debit = e.sum("debit");
    const credit = e.sum("credit");
    const solde = debit - credit;
    results.push(debit, credit, solde);
  });
  return results;
};

export const LabelCell = {
  cellStyle: {
    border: "1px solid #9E9E9E60",
    borderWidth: "0 1px 1px 1px",
    width: 445,
  },
  displayStyle: {
    fontSize: 12,
  },
  inputWidth: "auto",
  inputHeight: 36,
  format: "",
  type: "text",
  placeholder: "libelle",
  name: "libelle",
  direction: "row",
  label: "",
  display: "",
  id: "",
};

export const TierCell = {
  cellStyle: {
    border: "1px solid #9E9E9E60",
    borderWidth: "0 0 1px 1px",
    width: 110,
  },
  inputWidth: "auto",
  inputHeight: 36,
  format: "",
  type: "list",
  placeholder: "tier",
  name: "tier",
  direction: "row",
  label: "",
  display: "raison_social",
  id: "code",
};
