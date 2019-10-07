import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';

import * as nameModule from './name';
import * as counterModule from './counter';
import * as searchModule from './search';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  name: nameModule.default.reducer,
  counter: counterModule.default.reducer,
  search: searchModule.default.reducer,
});

const rootSaga = function* () {
  yield all([
    searchModule.saga()
  ]);
};

export type RootState = ReturnType<typeof rootReducer>;

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), logger, sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
