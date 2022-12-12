export function sum_ecriture(ecritures) {
  let debit = 0.0;
  let credit = 0.0;

  ecritures.forEach((ecriture) => {
    debit += Number(ecriture.debit);
    credit += Number(ecriture.credit);
  });

  const solde_debit = debit - credit;
  const solde_credit = credit - debit;

  return {
    debit: debit,
    credit: credit,
    solde_debit: Number(parseFloat(solde_debit).toFixed(4)),
    solde_credit: Number(parseFloat(solde_credit).toFixed(4)),
  };
}
