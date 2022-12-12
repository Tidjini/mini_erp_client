export * from "./demande.actions";
export * from "./articles.actions";
export * from "./attachements.actions";

export function initError() {
  return {
    type: "[DEMANDE] ERROR",
    payload: "",
  };
}
