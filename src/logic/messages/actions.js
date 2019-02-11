const ROOT = 'MESSAGES';

export const FETCH = ROOT + '/FETCH';
export const FETCH_SUCCESS = ROOT + '/FETCH_SUCCESS';
export const FETCH_FAILURE = ROOT + '/FETCH_FAILURE';

export const FETCH_ONE = ROOT + '/FETCH_ONE';
export const FETCH_ONE_SUCCESS = ROOT + '/FETCH_ONE_SUCCESS';
export const FETCH_ONE_ERROR = ROOT + '/FETCH_ONE_ERROR';

export const FETCH_CHANNEL = ROOT + '/FETCH_CHANNEL';
export const FETCH_CHANNEL_SUCCESS = ROOT + '/FETCH_CHANNEL_SUCCESS';
export const FETCH_CHANNEL_ERROR = ROOT + '/FETCH_CHANNEL_ERROR';

export const FETCH_CHANNELS = ROOT + '/FETCH_CHANNELS';
export const FETCH_CHANNELS_SUCCESS = ROOT + '/FETCH_CHANNELS_SUCCESS';
export const FETCH_CHANNELS_ERROR = ROOT + '/FETCH_CHANNELS_ERROR';

export const CREATE_MESSAGE = ROOT + '/CREATE_MESSAGE';
export const CREATE_MESSAGE_SUCCESS = ROOT + '/CREATE_MESSAGE_SUCCESS';
export const CREATE_MESSAGE_ERROR = ROOT + '/CREATE_MESSAGE_ERROR';

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

export function createMessage (payload) {
  return {
    type: CREATE_MESSAGE,
    payload,
    authCall: true
  };
}

export function fetchOne (payload) {
  return {
    type: FETCH_ONE,
    payload
  };
}

export function fetchChannel (payload) {
  return {
    type: FETCH_CHANNEL,
    payload,
    authCall: true
  };
}

export function fetchChannels (payload) {
  return {
    type: FETCH_CHANNELS,
    payload,
    authCall: true
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

export function clearlert (payload) {
  return {
    type: CLEAR_ALERT,
    payload
  };
}
