import React from "react";
import axios from "axios";

import { URL, DATA_SERVICE_URL } from "app/main/helpers/endpoints";
import AppAutoComplete from "app/composants/inputs/AppAutoComplete";

export default function AppJournalInput(props) {
  const { journal, setJournal, width, height, direction, tous } = props;
  const [defaults, setDefaults] = React.useState([]);

  React.useEffect(() => {
    const link = `${DATA_SERVICE_URL}journals/`;
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

  async function getJournals(query = "") {
    const link = `${DATA_SERVICE_URL}journals/?search=${query}`;
    try {
      return axios.get(link);
    } catch (e) {}
  }
  return (
    <AppAutoComplete
      label="Journal"
      direction={direction}
      getOptions={getJournals}
      defaultOptions={defaults}
      id="code"
      display="intitule"
      selected={journal}
      setSelected={(item) => {
        setJournal(item);
      }}
      width={width}
      height={height}
      tous={tous}
    />
  );
}
