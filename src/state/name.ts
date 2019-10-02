import { createSlice, PayloadAction } from 'redux-starter-kit';
import { RootState } from './store';

const slice = createSlice({
  slice: 'name',
  initialState: {
    name: '',
    email: ''
  },
  reducers: {
    updateName: (state, action: PayloadAction<string>) => { state.name = action.payload },
    updateEmail: (state, action: PayloadAction<string>) => { state.email = action.payload },
  }
});

export const selectors = {
  nameAndEmail: (state: RootState) => `name: ${state.name.name} - email: ${state.name.email}`
};

// TODO: sagaの実装をこのファイルに入れる

export const actions = slice.actions;
export default slice;
