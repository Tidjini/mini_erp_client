export const SELECT_PROFILE = "[MESSAGE PANEL] SELECT PROFILE";

export function selectProfile(profile) {
  return {
    type: SELECT_PROFILE,
    payload: profile,
  };
}
