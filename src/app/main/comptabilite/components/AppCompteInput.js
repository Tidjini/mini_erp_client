import React from "react";
import axios from "axios";

import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import ComboBox from "app/composants/inputs/ComboBox";

export default function AppCompteInput(props) {
  const { compte, setCompte, direction, tous, afterSelection, style } = props;
  const [defaults, setDefaults] = React.useState([]);

  React.useEffect(() => {
    let query = "";
    if (compte !== undefined && compte.num_compte !== undefined) {
      query = compte.num_compte;
    }
    const link = `${DATA_SERVICE_URL}comptes/?search=${query}`;
    try {
      const request = axios.get(link);
      request
        .then((response) => {
          if (tous)
            setDefaults([
              { intitule: "Tous", code: "" },
              ...response.data.results,
            ]);
          else {
            setDefaults([...response.data.results]);
          }
        })
        .catch((error) => {});
    } catch (e) {}
  }, []);

  async function getComptes(query = "") {
    const link = `${DATA_SERVICE_URL}comptes/?search=${query}`;
    try {
      return axios.get(link);
    } catch (e) {}
  }
  return (
    <ComboBox
      label="Comptes"
      direction={direction}
      getOptions={getComptes}
      defaultOptions={defaults}
      id="num_compte"
      display="intitule"
      selected={compte}
      setSelected={(item) => {
        setCompte(item);
      }}
      style={style}
      tous={tous}
      afterSelection={afterSelection}
    />
  );
}
