import { createSlice } from 'redux-starter-kit';

const slice = createSlice({
  slice: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

export const actions = slice.actions;
export default slice;
