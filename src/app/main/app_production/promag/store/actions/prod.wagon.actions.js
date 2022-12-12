import apiService from "app/services/infrabitumService/ApiService";

export const WAGON_COLLECTION = "[PRODUCTION-PROCESS] WAGON_COLLECTION";
export const ERROR = "[PRODUCTION-PROCESS] ERROR";
export const LOADING = "[PRODUCTION-PROCESS] LOADING";

const LINK = "production/wagons";

const EMPILEMENT = "EMPILEMENT";
const ENFOURNEMENT = "ENFOURNEMENT";
const DEFOURNEMENT = "DEFOURNEMENT";
const EMBALLAGE = "EMBALLAGE";
const ATTENTE = "ATTENTE";

const operation = {
  wagons: [],
  produit: null,
  equipe: null,
  responsable: null,
  poste: null,
  phase: "ATTENTE",
  date: "",
};

export function dispatchLoading(dispatch, loading) {
  dispatch({
    type: LOADING,
    payload: loading,
  });
}

function separateWagons(wagons) {
  const attentes = [];
  const empliements = [];
  const enfournements = [];
  const defournements = [];
  const emballages = [];

  wagons.map((wagon, index) => {
    if (wagon.phase_actuel === ATTENTE) attentes.push(wagon);
    if (wagon.phase_actuel === EMPILEMENT) empliements.push(wagon);
    if (wagon.phase_actuel === ENFOURNEMENT) enfournements.push(wagon);
    if (wagon.phase_actuel === DEFOURNEMENT) defournements.push(wagon);
    if (wagon.phase_actuel === EMBALLAGE) emballages.push(wagon);
  });

  return {
    attentes: attentes,
    empliements: empliements,
    enfournements: enfournements,
    defournements: defournements,
    emballages: emballages,
  };
}

export function getWagonCollection(page = 1, filters = {}) {
  apiService.init(LINK);

  return async (dispatch) => {
    dispatchLoading(dispatch, true);

    try {
      var data = await apiService.getCollection(page, filters);
      const {
        attentes,
        empliements,
        enfournements,
        defournements,
        emballages,
      } = separateWagons(data.results);
      dispatch({
        type: WAGON_COLLECTION,
        payload: {
          attentes: [...attentes],
          empliements: [...empliements],
          enfournements: [...enfournements],
          defournements: [...defournements],
          emballages: [...emballages],
        },
      });
    } catch (exception) {
      dispatch({
        type: ERROR,
        payload: exception,
      });
    }
    dispatchLoading(dispatch, false);
  };
}

export function setLoading(loading) {
  return {
    type: LOADING,
    payload: loading,
  };
}
