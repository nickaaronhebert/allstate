import { put, takeEvery, take, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as sessionActions from '../session/actions';
import * as modalActions from '../modals/actions';
import qs from 'qs';
import { push } from 'react-router-redux';


function* resolveRoute (action) {
  try {
    const {
      payload: {
        location,
        routeId,
      },
    } = action;

    var params;
    const { search = '' } = location;
    const queryParams = qs.parse(search.slice(1, search.length));
    switch (routeId) {
      case 'CONFIRM_USER_EMAIL':
        params = { id: params.id, emailConfirmationToken: queryParams.email_confirmation_token };
        yield put(sessionActions.sessionConfirmUserEmail(params));
        break;
      case 'GET_ACTIVATE_STATUS':
        yield put(sessionActions.getActivateStatus({ signupCode: queryParams.suc, sid: queryParams.sid }));
        break;
      case 'DASHBOARD':
        break;
      default:
        break;
    }
  } catch (err) {
    throw err;
  }
}

function* navigateToRoute (action) {
  try {
    yield put({
      type: modalActions.CLOSE_MODULE_HEADER,
    });
    yield put({
      type: actions.RESET_ROUTE_STATE,
      payload: null,
    });
    const {
      payload: {
        to,
        replace,
      },
    } = action;
    if (replace) {
      yield put(push('/'));
      yield put(push(to));
    } else {
      yield put(push(to));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* fetchRouteData (action) {
  try {
    for (var actionItem of action.payload) {
      yield put({
        type: actionItem.type,
        payload: actionItem.payload,
        authCall: actionItem.authCall,
        coreCall: actionItem.coreCall,
      });
      yield take(actionItem.type + '_SUCCESS');
    }

    yield put({
      type: actions.CONFIGURE_ROUTE_SUCCESS,
      payload: null,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

function* sagas () {
  yield takeEvery(actions.RESOLVE_ROUTE, resolveRoute);
  yield takeEvery(actions.NAVIGATE_TO_ROUTE, navigateToRoute);
  yield takeLatest(actions.FETCH_ROUTE_DATA, fetchRouteData);
}

export default sagas;
