import { createSlice } from 'redux-starter-kit';
import { hasKey } from '../libs/functions/type_guard';

export type State = number;
const initialState = (): State => 0;

export const preloadedStateResolver = (unresolvedState: Object): State => {
  if (hasKey(unresolvedState, 'counter') && isFinite(parseFloat(String(unresolvedState.counter)))) {
    return parseFloat(String(unresolvedState.counter));
  }

  return initialState();
};

const slice = createSlice({
  slice: 'counter',
  initialState: initialState(),
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

export const actions = slice.actions;
export default slice;
