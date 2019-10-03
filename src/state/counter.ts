import { createSlice } from 'redux-starter-kit';

export type State = number;
const initialState: State = 0;

const slice = createSlice({
  slice: 'counter',
  initialState,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

export const actions = slice.actions;
export default slice;
