import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { sessionReducer } from 'redux-react-session';
import Logic from '../logic';

const reducers = {};
Object.keys(Logic).map((module) => reducers[module] = Logic[module].reducer);

const containersReducer = {
  containers: combineReducers(reducers)
};

const createGlobalReducer = () => (
  combineReducers({
    ...containersReducer,
    route: routerReducer,
    session: sessionReducer
  })
);

export default createGlobalReducer;
