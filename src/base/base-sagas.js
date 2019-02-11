import { fork, all } from 'redux-saga/effects';
import Logic from '../logic';

const sagas = Object.keys(Logic).map((module) => Logic[module].sagas);

function * globalSagas () {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  yield all([...globalSagasForks]);
}

export default globalSagas;
