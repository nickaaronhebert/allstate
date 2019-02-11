/* eslint-disable no-console */
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import createGlobalReducer from './base-reducer';
import globalSagas from './base-sagas';
import { sessionService } from 'redux-react-session';
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash/throttle';
import { saveState, loadState } from './local-storage';



const persistedSate = loadState();

if (persistedSate && persistedSate.containers) {
  persistedSate.containers.app.blockUi = false;
  persistedSate.containers.app.blockUi = false;
  persistedSate.containers.messages.channels = [];
  persistedSate.containers.modals.configurationVisible = false;
  persistedSate.containers.modals.dialogVisible = false;
  persistedSate.containers.router.routeDataLoaded = false;
  persistedSate.containers.router.routeDataLoading = false;
}

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const applyAuthToken = () => store => next => action => {
  action.payload = action.payload || {};
  if (action.authCall) {
    action.payload.authToken = store.getState().session.user.token;
  }
  return next(action);
};

const middlewares = [
  // Middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  sagaMiddleware,
  createLogger(),
];

const store = createStore(
  createGlobalReducer(),
  persistedSate,
  composeWithDevTools(applyMiddleware(...middlewares), applyMiddleware(applyAuthToken()))
);

store.subscribe(throttle(() => {
  saveState({
    containers: store.getState().containers
  });
}, 1000));

const options = { refreshOnCheckAuth: true, redirectPath: '/login', driver: 'COOKIES' };

sessionService.initSessionService(store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));

sagaMiddleware.run(globalSagas);

export default store;
