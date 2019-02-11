const ROOT = 'ROUTER';

export const RESOLVE_ROUTE = `${ROOT}/RESOLVE_ROUTE`;
export const RESET_ROUTE_STATE = `${ROOT}/RESET_ROUTE_STATE`;

export const NAVIGATE_TO_ROUTE = `${ROOT}/NAVIGATE_TO_ROUTE`;

export const SET_PARAMETERS = `${ROOT}/SET_PARAMETERS`;

export const CONFIGURE_ROUTE = `${ROOT}/CONFIGURE_ROUTE`;
export const CONFIGURE_ROUTE_SUCCESS = `${ROOT}/CONFIGURE_ROUTE_SUCCESS`;
export const CONFIGURE_ROUTE_ERROR = `${ROOT}/CONFIGURE_ROUTE_ERROR`;

export const FETCH_ROUTE_DATA = `${ROOT}/FETCH_ROUTE_DATA`;
export const FETCH_ROUTE_DATA_START = `${ROOT}/FETCH_ROUTE_DATA_START`;

export function resolveRoute (payload) {
  return {
    type: RESOLVE_ROUTE,
    payload: payload
  };
}

export function navigateToRoute (payload) {
  return {
    type: NAVIGATE_TO_ROUTE,
    payload: payload
  };
}

export function setParameters (payload) {
  return {
    type: SET_PARAMETERS,
    payload: payload
  };
}

export function configureRoute (payload) {
  return {
    type: CONFIGURE_ROUTE,
    payload: payload
  };
}

export function fetchRouteData (payload) {
  return {
    type: FETCH_ROUTE_DATA,
    payload: payload
  };
}

export function fetchRouteDataStart (payload) {
  return {
    type: FETCH_ROUTE_DATA_START,
    payload: payload
  };
}
