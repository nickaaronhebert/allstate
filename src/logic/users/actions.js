const ROOT = 'USERS';

export const FETCH = `${ROOT}/FETCH`;
export const FETCH_SUCCESS = `${ROOT}/FETCH_SUCCESS`;
export const FETCH_ERROR = `${ROOT}/FETCH_ERROR`;

export const FETCH_ONE = `${ROOT}/FETCH_ONE`;
export const FETCH_ONE_SUCCESS = `${ROOT}/FETCH_ONE_SUCCESS`;
export const FETCH_ONE_ERROR = `${ROOT}/FETCH_ONE_ERROR`;

export const SAVE = `${ROOT}/SAVE`;
export const SAVE_SUCCESS = `${ROOT}/SAVE_SUCCESS`;
export const SAVE_ERROR = `${ROOT}/SAVE_ERROR`;

export const DELETE = `${ROOT}/DELETE`;
export const DELETE_SUCCESS = `${ROOT}/DELETE_SUCCESS`;
export const DELETE_ERROR = `${ROOT}/DELETE_ERROR`;

export const INVITE = `${ROOT}/INVITE`;
export const INVITE_SUCCESS = `${ROOT}/INVITE_SUCCESS`;
export const INVITE_ERROR = `${ROOT}/INVITE_ERROR`;

export const RESET_PASSWORD = `${ROOT}/RESET_PASSWORD`;
export const RESET_PASSWORD_SUCCESS = `${ROOT}/RESET_PASSWORD_SUCCESS`;
export const RESET_PASSWORD_ERROR = `${ROOT}/RESET_PASSWORD_ERROR`;

export const FETCH_INITIAL_DATA_BEGIN = `${ROOT}/FETCH_INITIAL_DATA_BEGIN`;
export const FETCH_INITIAL_DATA = `${ROOT}/FETCH_INITIAL_DATA`;
export const FETCH_INITIAL_DATA_SUCCESS = `${ROOT}/FETCH_INITIAL_DATA_SUCCESS`;
export const FETCH_INITIAL_DATA_ERROR = `${ROOT}/FETCH_INITIAL_DATA_ERROR`;

export const UPDATE_SESSION_USER = `${ROOT}/UPDATE_SESSION_USER`;
export const UPDATE_SESSION_USER_SUCCESS = `${ROOT}/UPDATE_SESSION_USER_SUCCESS`;
export const UPDATE_SESSION_USER_ERROR = `${ROOT}/UPDATE_SESSION_USER_ERROR`;

export const UPDATE_SESSION_USER_PASSWORD = `${ROOT}/UPDATE_SESSION_USER_PASSWORD`;
export const UPDATE_SESSION_USER_PASSWORD_SUCCESS = `${ROOT}/UPDATE_SESSION_USER_PASSWORD_SUCCESS`;
export const UPDATE_SESSION_USER_PASSWORD_ERROR = `${ROOT}/UPDATE_SESSION_USER_PASSWORD_ERROR`;

export const CHECK_INVITED_STATUS = `${ROOT}/CHECK_INVITED_STATUS`;
export const CHECK_INVITED_STATUS_SUCCESS = `${ROOT}/CHECK_INVITED_STATUS_SUCCESS`;
export const CHECK_INVITED_STATUS_ERROR = `${ROOT}/CHECK_INVITED_STATUS_ERROR`;

export const COMPLETE_INVITE_SETUP = `${ROOT}/COMPLETE_INVITE_SETUP`;
export const COMPLETE_INVITE_SETUP_SUCCESS = `${ROOT}/COMPLETE_INVITE_SETUP_SUCCESS`;
export const COMPLETE_INVITE_SETUP_ERROR = `${ROOT}/COMPLETE_INVITE_SETUP_ERROR`;

export const PAYMENT_RECEIVED = `${ROOT}/PAYMENT_RECEIVED`;
export const PAYMENT_RECEIVED_SUCCESS = `${ROOT}/PAYMENT_RECEIVED_SUCCESS`;
export const PAYMENT_RECEIVED_ERROR = `${ROOT}/PAYMENT_RECEIVED_ERROR`;

export function fetch (payload) {
  return {
    type: FETCH,
    payload,
    authCall: true
  };
}

export function fetchOne (payload) {
  return {
    type: FETCH_ONE,
    payload,
    authCall: true
  };
}

export function save (payload) {
  return {
    type: SAVE,
    payload,
    authCall: true
  };
}

export function destroy (payload) {
  return {
    type: DELETE,
    payload,
    authCall: true
  };
}

export function invite (payload) {
  return {
    type: INVITE,
    payload,
    authCall: true
  };
}

export function resetPassword (payload) {
  return {
    type: RESET_PASSWORD,
    payload,
    authCall: true
  };
}

export function fetchInitialData (payload) {
  return {
    type: FETCH_INITIAL_DATA,
    payload,
    authCall: true
  };
}

export function fetchInitialDataBegin (payload) {
  return {
    type: FETCH_INITIAL_DATA_BEGIN,
    payload,
    authCall: true
  };
}

export function updateSessionUser (payload) {
  return {
    type: UPDATE_SESSION_USER,
    payload,
    authCall: true
  };
}

export function updateSessionUserPassword (payload) {
  return {
    type: UPDATE_SESSION_USER_PASSWORD,
    payload,
    authCall: true
  };
}

export function checkInvitedStatus (payload) {
  return {
    type: CHECK_INVITED_STATUS,
    payload
  };
}

export function completeInviteSetup (payload) {
  return {
    type: COMPLETE_INVITE_SETUP,
    payload
  };
}

export function paymentReceived (payload) {
  return {
    type: PAYMENT_RECEIVED,
    payload,
    authCall: true
  };
}
