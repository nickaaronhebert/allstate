import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import api from './api';

function* fetchRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetch, payload);
    if (response) {
      yield put({
        type: actions.FETCH_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: actions.FETCH_ERROR,
        payload: response,
      });
    }
  } catch (err) {
    throw err;
  }
}

function* fetchOneRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetchOne, payload);
    if (response) {
      yield put({
        type: actions.FETCH_ONE_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: actions.FETCH_ONE_ERROR,
        payload: response,
      });
    }
  } catch (err) {
    throw err;
  }
}

function* fetchChannelRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetchChannel, payload);
    if (response) {
      yield put({
        type: actions.FETCH_CHANNEL_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: actions.FETCH_CHANNEL_ERROR,
        payload: response,
      });
    }
  } catch (err) {
    throw err;
  }
}

function* fetchChannelsRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetchChannels, payload);
    if (response) {
      yield put({
        type: actions.FETCH_CHANNELS_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: actions.FETCH_CHANNELS_ERROR,
        payload: response,
      });
    }
  } catch (err) {
    throw err;
  }
}

function* saveRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetchOne, payload);
    if (response) {
      yield put({
        type: actions.SAVE_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: actions.SAVE_ERROR,
        payload: response,
      });
    }
  } catch (err) {
    throw err;
  }
}

function* createMessageRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.createMessage, payload);
    if (response) {
      yield put({
        type: actions.CREATE_MESSAGE_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: actions.CREATE_MESSAGE_ERROR,
        payload: response,
      });
    }
  } catch (err) {
    debugger;
    throw err;
  }
}

function* deleteRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.delete, payload);
    if (response) {
      yield put({
        type: actions.DELETE_SUCCESS,
        payload: response,
      });
    } else {
      yield put({
        type: actions.DELETE_ERROR,
        payload: response,
      });
    }
  } catch (err) {
    throw err;
  }
}

function* sagas () {
  yield takeEvery(actions.FETCH, fetchRoute);
  yield takeEvery(actions.FETCH_ONE, fetchOneRoute);
  yield takeEvery(actions.CREATE_MESSAGE, createMessageRoute);
  yield takeEvery(actions.FETCH_CHANNEL, fetchChannelRoute);
  yield takeEvery(actions.FETCH_CHANNELS, fetchChannelsRoute);
  yield takeEvery(actions.SAVE, saveRoute);
  yield takeEvery(actions.DELETE, deleteRoute);
}

export default sagas;
