import React from "react";
import axios from "axios";

import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import ComboBox from "app/composants/inputs/ComboBox";

export default function AppTierInput(props) {
  const { tier, setTier, direction, tous, afterSelection, style } = props;
  const [defaults, setDefaults] = React.useState([]);

  React.useEffect(() => {
    let query = "";
    if (tier !== undefined && tier.code !== undefined) {
      query = tier.code;
    }
    const link = `${DATA_SERVICE_URL}tiers/?search=${query}`;
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

  async function getTiers(query = "") {
    const link = `${DATA_SERVICE_URL}tiers/?search=${query}`;
    try {
      return axios.get(link);
    } catch (e) {}
  }
  return (
    <ComboBox
      label="Tiers"
      direction={direction}
      getOptions={getTiers}
      defaultOptions={defaults}
      id="code"
      display="raison_social"
      selected={tier}
      setSelected={(item) => {
        setTier(item);
      }}
      style={style}
      tous={tous}
      afterSelection={afterSelection}
    />
  );
}
