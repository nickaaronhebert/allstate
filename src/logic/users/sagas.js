/* eslint-disable no-console */
import { call, put, takeEvery } from 'redux-saga/effects';
import api from './api';
import * as actions from './actions';
import * as routerActions from '../router/actions';

function * fetchRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetch, payload);
    if (response) {
      yield put({
        type: actions.FETCH_SUCCESS,
        payload: response
      });
    } else {
      yield put({
        type: actions.FETCH_ERROR,
        payload: response
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function * fetchOneRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetchOne, payload);
    if (response) {
      yield put({
        type: actions.FETCH_ONE_SUCCESS,
        payload: response
      });
    } else {
      yield put({
        type: actions.FETCH_ONE_ERROR,
        payload: response
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function * saveRoute (action) {
  try {
    const { payload } = action;
    const response = yield call(api.fetch, payload);
    if (response) {
      yield put({
        type: actions.SAVE_SUCCESS,
        payload: response
      });
      yield put({
        type: routerActions.NAVIGATE_TO_ROUTE,
        payload: { to: `/organization/assessments/${action.payload.assessment}/edit`, replace: true }
      });
    } else {
      yield put({
        type: actions.SAVE_ERROR,
        payload: response
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function * updateRoute (action) {
  try {
    const { payload } = action;
    yield call(api.updateSessionUser, payload);
  } catch (err) {
    console.log(err);
  }
}

function * fetchInitialDataRoute () {
  try {
    yield put({
      type: actions.FETCH_INITIAL_DATA_SUCCESS,
      payload: null
    });
  } catch (err) {
    console.log(err);
  }
}

function * paymentReceivedRoute (action) {
  try {
    const { payload } = action;

    const response = yield call(api.paymentReceived, payload);
    
    if (response) {
      yield put({
        type: routerActions.NAVIGATE_TO_ROUTE,
        payload: { to: `/payment/received`, replace: true }
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function * sagas () {
  yield takeEvery(actions.FETCH, fetchRoute);
  yield takeEvery(actions.FETCH_ONE, fetchOneRoute);
  yield takeEvery(actions.SAVE, saveRoute);
  yield takeEvery(actions.UPDATE_SESSION_USER, updateRoute);
  yield takeEvery(actions.FETCH_INITIAL_DATA, fetchInitialDataRoute);
  yield takeEvery(actions.PAYMENT_RECEIVED, paymentReceivedRoute);
}

export default sagas;
