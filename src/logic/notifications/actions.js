const uuidv4 = require('uuid/v4');

const ROOT = 'NOTIFICATIONS';

export const FETCH = ROOT + '/FETCH';
export const FETCH_SUCCESS = ROOT + '/FETCH_SUCCESS';
export const FETCH_FAILURE = ROOT + '/FETCH_FAILURE';

export const FETCH_ONE = ROOT + '/FETCH_ONE';
export const FETCH_ONE_SUCCESS = ROOT + '/FETCH_ONE_SUCCESS';
export const FETCH_ONE_ERROR = ROOT + '/FETCH_ONE_ERROR';

export const SAVE = ROOT + '/SAVE';
export const SAVE_SUCCESS = ROOT + '/SAVE_SUCCESS';
export const SAVE_ERROR = ROOT + '/SAVE_ERROR';

export const DELETE = ROOT + '/DELETE';
export const DELETE_SUCCESS = ROOT + '/DELETE_SUCCESS';
export const DELETE_ERROR = ROOT + '/DELETE_ERROR';

export const PUSH_ALERT = ROOT + '/PUSH_ALERT';
export const CLEAR_ALERT = ROOT + '/CLEAR_ALERT';

export function fetch (payload) {
  return {
    type: FETCH,
    payload
  };
}

export function fetchOne (payload) {
  return {
    type: FETCH_ONE,
    payload
  };
}

export function save (payload) {
  return {
    type: SAVE,
    payload
  };
}

export function destroy (payload) {
  return {
    type: DELETE,
    payload
  };
}

export function pushAlert (payload) {
  return {
    type: PUSH_ALERT,
    payload: {
      id: uuidv4(),
      text: payload.text,
      type: payload.type
    }
  };
}

export function clearlert (payload) {
  return {
    type: CLEAR_ALERT,
    payload
  };
}
