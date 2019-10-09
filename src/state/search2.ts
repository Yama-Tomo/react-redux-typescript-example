import { createSlice, PayloadAction } from 'redux-starter-kit';
import { set } from './utils';
import { LOCATION_CHANGE } from 'connected-react-router';

interface State {
  prefecture: string;
  autocomplete: {
    prefecture: {
      items: string[];
      cursor: number;
    }
  }
}

export const NOT_AUTOCOMPLETE_CHOICE = -1;
const initialState = (): State => ({
  prefecture: '',
  autocomplete: {
    prefecture: {
      items: [],
      cursor: NOT_AUTOCOMPLETE_CHOICE
    }
  },
});

const slice = createSlice({
  slice: 'search2',
  initialState: initialState(),
  reducers: {
    set: set<State>(),
    setPrefAutocompleteCursor: (state, action: PayloadAction<'up' | 'down' | 'reset'>) => {
      const prefAutocomplete = state.autocomplete.prefecture;

      if (action.payload === 'down') {
        if (prefAutocomplete.items.length - 1  > prefAutocomplete.cursor) {
          prefAutocomplete.cursor += 1;
        }
      }

      if (action.payload === 'up') {
        if (prefAutocomplete.cursor >= 0) {
          prefAutocomplete.cursor -= 1;
        }
      }

      if (action.payload === 'reset') {
        prefAutocomplete.cursor = initialState().autocomplete.prefecture.cursor;
      }
    },
  },
  extraReducers: {
    [LOCATION_CHANGE]: () => initialState(),
  }
});

export const actions = slice.actions;
export default slice;
