import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import logger from 'redux-logger';

import * as nameModule from './name';
import * as counterModule from './counter';

const rootReducer = combineReducers({
  name: nameModule.default.reducer,
  counter: counterModule.default.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default () =>
  configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), logger],
  });
