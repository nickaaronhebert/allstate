import { takeEvery, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
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

function* clearAlert (action) {
  try {
    yield delay(5000);
    yield put({
      type: actions.CLEAR_ALERT,
      payload: { id: action.payload.id },
    });
  } catch (err) {
    throw err;
  }
}

function* sagas () {
  yield takeEvery(actions.FETCH, fetchRoute);
  yield takeEvery(actions.FETCH_ONE, fetchOneRoute);
  yield takeEvery(actions.SAVE, saveRoute);
  yield takeEvery(actions.DELETE, deleteRoute);
  yield takeEvery(actions.PUSH_ALERT, clearAlert);
}

export default sagas;
