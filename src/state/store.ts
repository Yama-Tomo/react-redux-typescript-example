import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';

import name from './name';
import counter from './counter';

const rootReducer = combineReducers({
  name: name.reducer,
  counter: counter.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default () =>
  configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), logger],
  });
