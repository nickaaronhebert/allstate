export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_REGISTER = 'SESSION_REGISTER';
export const SESSION_VALIDATE_EMAIL = 'SESSION_VALIDATE_EMAIL';

export const GET_ACTIVATE_STATUS = `GET_ACTIVATE_STATUS`;
export const GET_ACTIVATE_STATUS_SUCCESS = `GET_ACTIVATE_STATUS_SUCCESS`;
export const GET_ACTIVATE_STATUS_ERROR = `GET_ACTIVATE_STATUS_ERROR`;

export const VALIDATE_VENDOR = `VALIDATE_VENDOR`;
export const VALIDATE_VENDOR_SUCCESS = `VALIDATE_VENDOR_SUCCESS`;
export const VALIDATE_VENDOR_ERROR = `VALIDATE_VENDOR_ERROR`;

export const COMPLETE_USER_SETUP = 'COMPLETE_USER_SETUP';
export const COMPLETE_USER_SETUP_SUCCESS = 'COMPLETE_USER_SETUP_SUCCESS';
export const COMPLETE_USER_SETUP_ERROR = 'COMPLETE_USER_SETUP_ERROR';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const UPDATE_SESSION_TOKEN = 'UPDATE_SESSION_TOKEN';


export function sessionLogin (payload) {
  return {
    type: SESSION_LOGIN,
    payload: payload
  };
}

export function sessionValidateEmail (payload) {
  return {
    type: SESSION_VALIDATE_EMAIL,
    payload: payload
  };
}

export function sessionRegister (payload) {
  return {
    type: SESSION_REGISTER,
    payload: payload
  };
}

export function sessionLogout () {
  return {
    type: SESSION_LOGOUT
  };
}

export function confirmUserEmail (payload) {
  return {
    type: 'CONFIRM_USER_EMAIL',
    payload: payload
  };
}

export function getActivateStatus (payload) {
  return {
    type: GET_ACTIVATE_STATUS,
    payload: payload
  };
}

export function validateVendor (payload) {
  return {
    type: VALIDATE_VENDOR,
    payload: payload
  };
}

export function completeUserSetup (payload) {
  return {
    type: COMPLETE_USER_SETUP,
    payload,
    authCall: true
  };
}

export function forgotPassword (payload) {
  return {
    type: FORGOT_PASSWORD,
    payload,
    authCall: true
  };
}

export function resetPassword (payload) {
  return {
    type: RESET_PASSWORD,
    payload,
  };
}

export function updateSessionToken (payload) {
  return {
    type: UPDATE_SESSION_TOKEN,
    payload,
    authCall: true
  };
}
