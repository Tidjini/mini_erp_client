export const GET_EMPLOYEES = "[EMPLOYE] GET_EMPLOYEES";
export const GET_TASKS = "[EMPLOYE] GET_TASKS";
export const SEARCH_EMPLOYEE = "[EMPLOYE] SEARCH_EMPLOYEE";

export function getEmployees() {
  return {
    type: GET_EMPLOYEES,
  };
}

export function getTasks() {
  return {
    type: GET_TASKS,
  };
}

export function searchEmployees(searchValue) {
  return {
    type: SEARCH_EMPLOYEE,
  };
}

export function getEmployee(id) {
  return {
    type: SEARCH_EMPLOYEE,
    payload: id,
  };
}
