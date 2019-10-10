import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import { all } from 'redux-saga/effects';
import { isObject } from '../libs/functions/type_guard';
import { NestedPartial } from '../types/util';

import * as nameModule from './name';
import * as counterModule from './counter';
import * as searchModule from './search';
import * as search2Module from './search2';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  name: nameModule.default.reducer,
  counter: counterModule.default.reducer,
  search: searchModule.default.reducer,
  search2: search2Module.default.reducer,
});

const preloadedStateResolver = (state: unknown): NestedPartial<RootState> => {
  if (!isObject(state)) {
    return {};
  }

  return {
    name: nameModule.preloadedStateResolver(state),
    counter: counterModule.preloadedStateResolver(state),
  };
};

const rootSaga = function* () {
  yield all([
    searchModule.saga()
  ]);
};

export type RootState = ReturnType<typeof rootReducer>;

export default (preloadedState?: unknown) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedStateResolver(preloadedState),
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
