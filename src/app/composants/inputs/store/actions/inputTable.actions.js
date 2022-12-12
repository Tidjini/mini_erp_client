import * as Data from "./fake";

export const GET_TABLE_DATA = "[APP_INPUT_TABLE] GET_TABLE_DATA";

export function getTableData(collectionName) {
  let data = [];
  switch (collectionName) {
    case "comptes":
      data = Data.comptes;
      break;
    case "tiers":
      data = Data.tiers;
      break;
    case "banques":
      data = Data.banques;
      break;
    default:
      data = Data.comptes;
      break;
  }

  return {
    type: GET_TABLE_DATA,
    payload: data,
  };
}
