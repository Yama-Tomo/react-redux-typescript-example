import { createSlice, PayloadAction } from 'redux-starter-kit';
import { RootState } from './store';
import { hasKey } from '../libs/functions/type_guard';

export interface State {
  name: string;
  email: string;
}

const initialState = (): State => ({
  name: '',
  email: ''
});

export const preloadedStateResolver = (unresolvedState: Object): State => {
  if (hasKey(unresolvedState, 'name') && hasKey(unresolvedState.name, ['name', 'email'] as const)) {
    return {
      name: String(unresolvedState.name.name),
      email: String(unresolvedState.name.email),
    };
  }

  return initialState();
};

const slice = createSlice({
  slice: 'name',
  initialState: initialState(),
  reducers: {
    updateName: (state, action: PayloadAction<string>) => { state.name = action.payload },
    updateEmail: (state, action: PayloadAction<string>) => { state.email = action.payload },
  }
});

export const selectors = {
  nameAndEmail: (state: RootState) => `name: ${state.name.name} - email: ${state.name.email}`
};

export const actions = slice.actions;
export default slice;
