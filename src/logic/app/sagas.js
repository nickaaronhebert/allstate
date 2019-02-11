import { takeEvery, put } from 'redux-saga/effects';
import { notification } from 'antd';
import * as routerActions from '../router/actions';

function * handleErrorsRoute (action) {
  try {
    const { payload } = action;
    switch (payload.message) {
      case 'jwt expired':

        notification['warning']({
          message: 'Session Expired',
          description: 'The session has expired. In order to protect your security, we have logged you out automatically. Please log in again.'
        });
        yield put({
          type: routerActions.NAVIGATE_TO_ROUTE,
          payload: { to: `/logout`, replace: false }
        });
        break;
      default:
        break;
    }
  } catch (err) {
    throw err;
  }
}

function * sagas () {
  yield takeEvery(action => /ERROR/.test(action.type), handleErrorsRoute);
}

export default sagas;
