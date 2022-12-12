import { ecriture_default } from "../EcritureConfig";

export function initialize(
  setEcriture,
  setTierSelected,
  setCompteSelected,
  setDateEcheance,
  row
) {
  setEcriture({ ...row });
  if (row.third !== undefined && row.third !== null) {
    setTierSelected({ ...row.third });
  }
  if (row.account !== undefined && row.account !== null) {
    setCompteSelected({ ...row.account });
  }

  if (
    row.date_echeance !== null &&
    row.date_echeance !== undefined &&
    row.date_echeance !== ""
  ) {
    const laDate = new Date(row.date_echeance);
    setDateEcheance(laDate.toISOString().substring(0, 10));
  }
}

//DONE
export function onCompteEnter(compte, dispatch, Actions, line) {
  if (compte === null || compte === undefined || compte === "") return;
  else if (compte.num_compte === "") return;
  else if (compte.tier) switchToCell(2, dispatch, Actions, line);
  else switchToCell(3, dispatch, Actions, line);
}

//DONE
export function onCompteDoubleClick(compte, dispatch, Actions, line) {
  switchToCell(1, dispatch, Actions, line);
}

//DONE
export function onTierEnter(tier, dispatch, Actions, line) {
  if (tier === null || tier === undefined) return;
  switchToCell(3, dispatch, Actions, line);
}
//DONE
export function onTierDoubleClick(compte, dispatch, Actions, line) {
  if (compte === null || compte === undefined || compte === "")
    switchToCell(1, dispatch, Actions, line);
  else if (compte.num_compte === "") switchToCell(1, dispatch, Actions, line);
  else if (compte.tier) switchToCell(2, dispatch, Actions, line);
  else switchToCell(3, dispatch, Actions, line);
}
//DONE
export function onLabelEnter(value, dispatch, Actions, line) {
  switchToCell(4, dispatch, Actions, line);
}

//DONE
export function onLabelDoubleClick(compte, tier, dispatch, Actions, line) {
  if (compte === null || compte === undefined || compte === "")
    switchToCell(1, dispatch, Actions, line);
  else if (compte.num_compte === "") switchToCell(1, dispatch, Actions, line);
  // todo if is required else if (compte.tier && (tier === null || tier === undefined))
  //   switchToCell(2, dispatch, Actions, line);
  else switchToCell(3, dispatch, Actions, line);
}
//DONE
export function onDateEnter(credit, dispatch, Actions, line) {
  if (credit > 0.0) switchToCell(6, dispatch, Actions, line);
  else switchToCell(5, dispatch, Actions, line);
}

//DONE
export function onDateDoubleClick(compte, tier, dispatch, Actions, line) {
  if (compte === null || compte === undefined || compte === "")
    switchToCell(1, dispatch, Actions, line);
  else if (compte.num_compte === "") switchToCell(1, dispatch, Actions, line);
  // todo if is required else if (compte.tier && (tier === null || tier === undefined))
  //   switchToCell(2, dispatch, Actions, line);
  else switchToCell(4, dispatch, Actions, line);
}

//DONE
export function onDebitOrCreditEnter(
  event,
  ecriture,
  setEcriture,
  compteSelected,
  setCompteSelected,
  tierSelected,
  setTierSelected,
  dispatch,
  Actions,
  line,
  save
) {
  let applySave = false;
  switch (event.target.name) {
    case "debit":
      if (event.target.value <= 0.0) switchToCell(6, dispatch, Actions, line);
      else applySave = true;
      break;
    case "credit":
      if (event.target.value <= 0.0) switchToCell(5, dispatch, Actions, line);
      else applySave = true;
      break;

    case "action":
      if (ecriture.debit <= 0 && ecriture.credit <= 0)
        switchToCell(5, dispatch, Actions, line);
      else applySave = true;
      break;

    default:
      break;
  }
  if (applySave === false) return;

  saveEcriture(
    ecriture,
    setEcriture,
    compteSelected,
    setCompteSelected,
    tierSelected,
    setTierSelected,
    dispatch,
    Actions,
    line,
    save
  );
}

//DONE
export function onDebitDoubleClick(
  compte,
  tier,
  credit,
  dispatch,
  Actions,
  line
) {
  if (compte === null || compte === undefined || compte === "")
    switchToCell(1, dispatch, Actions, line);
  else if (compte.num_compte === "") switchToCell(1, dispatch, Actions, line);
  // todo if is required else if (compte.tier && (tier === null || tier === undefined))
  //   switchToCell(2, dispatch, Actions, line);
  else if (credit > 0.0) switchToCell(6, dispatch, Actions, line);
  else switchToCell(5, dispatch, Actions, line);
}

//DONE
export function onCreditDoubleClick(
  compte,
  tier,
  debit,
  dispatch,
  Actions,
  line
) {
  if (compte === null || compte === undefined || compte === "")
    switchToCell(1, dispatch, Actions, line);
  else if (compte.num_compte === "") switchToCell(1, dispatch, Actions, line);
  // todo if is required else if (compte.tier && (tier === null || tier === undefined))
  //   switchToCell(2, dispatch, Actions, line);
  else if (debit > 0.0) switchToCell(5, dispatch, Actions, line);
  else switchToCell(6, dispatch, Actions, line);
}

export function switchToCell(cell, dispatch, Actions, line) {
  dispatch(Actions.setEditCell(cell));
  dispatch(Actions.setEditLine(line));
}

export function onCellDoubleClick(
  cell,
  compteSelected,
  tierSelected,
  ecriture,
  dispatch,
  Actions,
  line
) {
  switch (cell) {
    case 2: //tier
      if (compteSelected != null && compteSelected.tier === true)
        switchToCell(2, dispatch, Actions, line);
      break;
    case 5: //debit
      if (ecriture.credit > 0) switchToCell(6, dispatch, Actions, line);
      else switchToCell(5, dispatch, Actions, line);
      break;
    case 6: //credit
      if (ecriture.debit > 0) switchToCell(5, dispatch, Actions, line);
      else switchToCell(6, dispatch, Actions, line);
      break;
    default:
      switchToCell(cell, dispatch, Actions, line);
  }

  //   if (
  //     cell > 1 &&
  //     (compteSelected === null ||
  //       compteSelected === undefined ||
  //       Object.keys(compteSelected).length === 0)
  //   ) {
  //     switchToCell(1, dispatch, Actions, line);
  //     return;
  //   } else if (
  //     cell === 2 &&
  //     compteSelected.tier === true &&
  //     (tierSelected === null || tierSelected === undefined)
  //   ) {
  //     switchToCell(2, dispatch, Actions, line);
  //   } else if (cell === 6 && ecriture.debit > 0) {
  //     switchToCell(5, dispatch, Actions, line);
  //   } else if (cell === 5 && ecriture.credit > 0) {
  //     switchToCell(6, dispatch, Actions, line);
  //   } else {
  //   }
}

export function handleChange(event, setEcriture, setDate) {
  event.persist();
  let laDate = undefined;
  switch (event.target.name) {
    case "date":
      try {
        laDate = new Date(event.target.value);
        //date = moment(event.target.value).toDate(); //new Date();
      } catch (error) {
        laDate = undefined;
      }

      if (laDate === undefined || laDate.toString() === "Invalid Date") break;
      else {
        setDate(laDate.toISOString().substring(0, 10));

        setEcriture((form) => ({
          ...form,
          [event.target.name]: laDate.toISOString(),
        }));
        break;
      }

    default:
      if (event.target.type === "number") {
        setEcriture((ecriture) => ({
          ...ecriture,
          [event.target.name]: Number(event.target.value),
        }));
      } else {
        setEcriture((ecriture) => ({
          ...ecriture,
          [event.target.name]: event.target.value,
        }));
      }

      break;
  }
}

export function saveEcriture(
  ecriture,
  setEcriture,
  compteSelected,
  setCompteSelected,
  tierSelected,
  setTierSelected,
  dispatch,
  Actions,
  line,
  save
) {
  if (compteSelected === null) {
    switchToCell(1, dispatch, Actions, line);
    return;
  }

  ecriture.compte = compteSelected.num_compte;
  ecriture.account = compteSelected;
  if (tierSelected !== null && tierSelected !== undefined) {
    ecriture.tier = tierSelected.code;
    ecriture.third = tierSelected;
  }
  save(ecriture);

  setEcriture({
    ...ecriture_default,
    account: { ...ecriture_default.account },
    third: { ...ecriture_default.third },
    daily: { ...ecriture_default.daily },
  });
  setCompteSelected({ ...ecriture_default.account });
  setTierSelected({ ...ecriture_default.third });

  switchToCell(1, dispatch, Actions, line);
}
export function onEditEcriture(
  journal,
  dispatch,
  showMessage,
  compteSelected,
  tierSelected,
  ecriture,
  edit,
  Actions,
  line
) {
  if (journal === null) {
    dispatch(
      showMessage({
        message: "Journal n'a pas été modifier",
        variant: "warning",
        autoHideDuration: 2300,
        anchorOrigin: {
          vertical: "bottom", //top bottom
          horizontal: "center", //left center right
        },
      })
    );
  } else {
    ecriture.journal = journal.code;
    //ecriture.periode = periode.code;
  }
  if (compteSelected === null) {
    switchToCell(2, dispatch, Actions, line);
  } else if (ecriture.credit <= 0 && ecriture.debit <= 0) {
    switchToCell(7, Actions, line);
  } else {
    if (edit) {
      ecriture.tier =
        tierSelected != null
          ? tierSelected
          : {
              code: null,
              raison_social: "",
            };

      ecriture.compte = compteSelected;
      ecriture.compte_code = ecriture.compte.code;
      ecriture.tier_code = ecriture.tier.code;
      ecriture.banque_code = ecriture.banque.code;

      edit(ecriture);
    }
  }
}

export function onInputPressEnter(
  event,
  edit_cell,
  compteSelected,
  setTierSelected,
  tierSelected,
  ecriture,
  row,
  journal,
  dispatch,
  showMessage,
  setEcriture,
  setCompteSelected,
  Actions,
  line,
  save
) {
  //   if (
  //     edit_cell > 1 &&
  //     (compteSelected === null ||
  //       compteSelected === undefined ||
  //       Object.keys(compteSelected).length === 0)
  //   ) {
  //     switchToCell(1, dispatch, Actions, line);
  //     return;
  //   }

  switch (edit_cell) {
    case 1:
      if (compteSelected === null) {
        switchToCell(1, dispatch, Actions, line);
      } else if (compteSelected.tier) {
        switchToCell(2, dispatch, Actions, line);
      } else {
        setTierSelected(null);
        switchToCell(3, dispatch, Actions, line);
      }
      break;
    case 2:
      if (tierSelected === null) {
        switchToCell(2, dispatch, Actions, line);
      } else {
        switchToCell(3, dispatch, Actions, line);
      }
      break;

    case 4:
      if (ecriture.credit > 0) {
        switchToCell(6, dispatch, Actions, line);
      } else {
        switchToCell(5, dispatch, Actions, line);
      }
      break;

    case 5:
      //if debit  <= 0 go to credit otherwise add or modify this ecriture
      if (event.target.value <= 0) {
        switchToCell(6, dispatch, Actions, line);
      } else {
        // onSaveEcriture(
        //   journal,
        //   dispatch,
        //   showMessage,
        //   compteSelected,
        //   tierSelected,
        //   ecriture,
        //   setEcriture,
        //   save,
        //   setTierSelected,
        //   setCompteSelected,
        //   Actions,
        //   line
        // );

        switchToCell(1, dispatch, Actions, line, showMessage);
      }
      break;
    case 6:
      //if credit  <= 0 go to debit otherwise add or modify this ecriture
      if (event.target.value <= 0 && ecriture.debit <= 0) {
        switchToCell(5, dispatch, Actions, line);
      } else {
        // onSaveEcriture(
        //   journal,
        //   dispatch,
        //   showMessage,
        //   compteSelected,
        //   tierSelected,
        //   ecriture,
        //   setEcriture,
        //   save,
        //   setTierSelected,
        //   setCompteSelected,
        //   Actions,
        //   line
        // );

        switchToCell(1, dispatch, Actions, line, showMessage);
      }
      break;

    default:
      switchToCell(edit_cell + 1, dispatch, Actions, line);
      break;
  }
}

export function getNumLigne(ecritures) {
  let max = 0;

  ecritures.forEach((ecriture) => {
    if (ecriture.num_ligne > max) max = ecriture.num_ligne;
  });

  return max + 1;
}
