import { takeEvery, put, call } from 'redux-saga/effects';
import * as actions from './actions';
import * as sessionActions from '../session/actions';
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
    const response = yield call(api.create, payload);
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

function* updateRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.update, payload);
    if (response) {
      yield put({
        type: sessionActions.UPDATE_SESSION_TOKEN,
        payload: {authToken: action.payload.authToken},
      });
    } else {
      yield put({
        type: actions.UPDATE_ERROR,
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

function* sagas () {
  yield takeEvery(actions.FETCH, fetchRoute);
  yield takeEvery(actions.FETCH_ONE, fetchOneRoute);
  yield takeEvery(actions.SAVE, saveRoute);
  yield takeEvery(actions.UPDATE, updateRoute);
  yield takeEvery(actions.DELETE, deleteRoute);
}

export default sagas;
