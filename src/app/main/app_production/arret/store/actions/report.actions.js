import axios from "axios";
import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";

export const ETAT_ARRETS = "[ARRET] ETAT ARRET";
export const ETAT_ARRETS_ISSUE = "[ARRET] ETAT ARRET ISSUE";

export function etatArrets(annee, mois, label) {
  let promises = [];
  promises.push(
    axios.post(`${DATA_SERVICE_URL}production/production_arret/`, {
      annee: annee,
      mois: mois,
      label: label,
    })
  );

  return (dispatch) => {
    Promise.all(promises)
      .then((response) => {
        try {
          window.open(`${URL}media/etat_arret.pdf`, "_blank");
        } catch (error) {}
      })
      .catch((exception) => {});
  };
}
