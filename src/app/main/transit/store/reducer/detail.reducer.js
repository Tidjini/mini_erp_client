import * as Actions from "../actions/";

const initialState = {
  id: "",
  debut: null,
  chauffeur: "",
  camion: "",
  tare_initial: 0.0,
  sortie_depot: null,
  arrive_port: null,
  diff_depot_port: 0,
  tare_port: 0.0,
  tare_diff: 0.0,
  brut_port: 0.0,
  net_port: 0.0,
  sortie_port: null,
  arrive_depot: null,
  diff_port_depot: 0,
  brut_depot: 0.0,
  brut_diff: 0.0,
  tare_final: 0.0,
  net_depot: 0.0,
  net_diff: 0.0,
  cloture: false,
  statue: 0,
  fin: null,
  durre: 0,
  log: [],
  transit_operation: "",
  numero: "",
};
const detail = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DETAIL: {
      const { payload } = action;
      const { log } = payload;

      return {
        ...payload,
        log: [...log],
      };
    }

    default: {
      return state;
    }
  }
};

export default detail;
