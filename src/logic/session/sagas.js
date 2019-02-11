import { call, put, takeEvery } from 'redux-saga/effects';
import sessionAPI from './api';
import * as routerActions from '../router/actions';
import * as actions from './actions';
import * as notificationActions from '../notifications/actions';
import { notification } from 'antd';

function * sessionLoginSaga (action) {
  try {
    const response = yield call(sessionAPI.login, action.payload.userName, action.payload.password);
    if (response.user) {

      yield put({
        type: 'SESSION_LOGIN_SUCCESS',
        payload: response.user
      });
      if (response.user.role == 'decorator') {
        yield put(routerActions.navigateToRoute({ to: 'decorator/dashboard', replace: false }));  
      } else if (response.user.role == 'user') {
        yield put(routerActions.navigateToRoute({ to: '/dashboard', replace: false }));  
      }
      
    } else {
      if (response.error == 'validateEmail') {
        yield put(notificationActions.pushAlert({
          text: 'Your email has not been validated yet. Please check your email',
          type: 'warning'
        }));
      }
      else {
        notification['warning']({
          message: 'Log in failed',
          description: 'Please try again'
        });  
      }
      
    }
  } catch (e) {
    yield put({
      type: 'SESSION_LOGIN_ERROR',
      payload: e
    });
  }
}

function * sessionValidateEmailSaga (action) {
  try {
    if (!action.payload.scode) {
      yield put(routerActions.navigateToRoute({ to: 'validate/error', replace: false }));
      return;
    }
    const response = yield call(sessionAPI.validateEmail, action.payload);
    if (response) {

      if (response.status == 'active') {
        yield put(notificationActions.pushAlert({
          text: 'Your email has now be activated. You can now login.',
          type: 'success'
        }));
        yield put(routerActions.navigateToRoute({ to: '/login', replace: false }));  
      } else {
        yield put(notificationActions.pushAlert({
          text: 'Your email could not be validated. Please try again later.',
          type: 'warning'
        }));
        yield put(routerActions.navigateToRoute({ to: '/login', replace: false }));  
      }
      
    } else {
      notification['warning']({
        message: `We were unable to validate your email.`,
        description: `Please try again later.`
      });
    }
  } catch (e) {
    yield put({
      type: 'SESSION_LOGIN_ERROR',
      payload: e
    });
  }
}

function * sessionRegisterSaga (action) {
  try {
    const response = yield call(sessionAPI.register, action.payload);
    if (response.user) {
      yield put(notificationActions.pushAlert({
          text: 'Sign up successful. Please check your email for account activation link.',
          type: 'success'
        }));
      yield put(routerActions.navigateToRoute({ to: '/signup/success', replace: false }));
    } else {
      notification['warning']({
        message: 'Log in failed',
        description: 'Please try again'
      });
    }
    
  } catch (e) {
    yield put({
      type: 'SESSION_REGISTER_ERROR',
      payload: e
    });
  }
}

function * updateSessionTokenSaga (action) {
  try {
    const response = yield call(sessionAPI.updateSessionToken, action.payload);
    debugger;
    return response;
    
  } catch (e) {
    yield put({
      type: 'UPDATE_SESSION_TOKEN_ERROR',
      payload: e
    });
  }
}

function * sessionLogoutSaga () {
  try {
    const check = yield call(sessionAPI.logout);
    if (check) {
      yield put({
        type: 'SESSION_LOGOUT_SUCCESS'
      });

      yield put(routerActions.navigateToRoute({ to: '/login', replace: false }));
    } else {
      throw new Error('Error Occured');
    }
  } catch (e) {
    yield put({
      type: 'SESSION_LOGOUT_ERROR',
      payload: e
    });
  }
}

function * forgotPasswordRoute (action) {
  try {
    const response = yield call(sessionAPI.forgotPassword, action.payload);
    yield put(routerActions.navigateToRoute({ to: '/login', replace: false }));
    notification['success']({
      message: `Password Reset Successfully Sent`,
      description: `Please check ${action.payload.email} for reset instructions.`
    });
    yield put({
      type: actions.FORGOT_PASSWORD_SUCCESS,
      payload: response
    });
  } catch (e) {
    let error = JSON.parse(e.message);
    yield put(notificationActions.pushAlert({
      text: error.response.data.message,
      type: 'warning'
    }));
    yield put({
      type: actions.FORGOT_PASSWORD_ERROR,
      payload: e
    });
  }
}

function * resetPasswordRoute (action) {
  try {
    const response = yield call(sessionAPI.resetPassword, action.payload);
    yield put(routerActions.navigateToRoute({ to: '/login', replace: false }));
    notification['success']({
      message: `Password Reset Successful`,
      description: `You can now sign in with your new password.`
    });
    yield put({
      type: actions.RESET_PASSWORD_SUCCESS,
      payload: response
    });
  } catch (e) {
    notification['error']({
      message: `Password Reset Unsuccessful`,
      description: `Looks like your reset token has expired. Please request a new reset token and try again.`
    });
  }
}


function * sessionSagas () {
  yield takeEvery('SESSION_LOGIN', sessionLoginSaga);
  yield takeEvery('SESSION_VALIDATE_EMAIL', sessionValidateEmailSaga);
  yield takeEvery('SESSION_REGISTER', sessionRegisterSaga);
  yield takeEvery('SESSION_LOGOUT', sessionLogoutSaga);
  yield takeEvery(actions.UPDATE_SESSION_TOKEN, updateSessionTokenSaga);
  yield takeEvery(actions.FORGOT_PASSWORD, forgotPasswordRoute);
  yield takeEvery(actions.RESET_PASSWORD, resetPasswordRoute);
}

export default sessionSagas;
