import { createSlice, PayloadAction } from 'redux-starter-kit';
import { call, put, delay, takeLatest, all, select } from 'redux-saga/effects';
import { ResolvedType } from '../types/promise';
import { RootState } from './store';

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
  slice: 'search',
  initialState: initialState(),
  reducers: {
    setPref: (state, action: PayloadAction<string>) => {
      state.prefecture = action.payload;
    },
    fetchAutocomplete:(state, action: PayloadAction<string>) => {},
    setPrefAutocomplete: (state, action: PayloadAction<string[]>) => {
      state.autocomplete.prefecture.items = action.payload;
    },
    resetPrefAutocompleteCursor:(state, action: PayloadAction<void>) => {
      state.autocomplete.prefecture.cursor =
        initialState().autocomplete.prefecture.cursor;
    },
    setPrefAutocompleteCursorDown: (state, action: PayloadAction<void>) => {
      const prefAutocomplete = state.autocomplete.prefecture;

      if (prefAutocomplete.items.length - 1  > prefAutocomplete.cursor) {
        prefAutocomplete.cursor += 1;
      }
    },
    setPrefAutocompleteCursorUp: (state, action: PayloadAction<void>) => {
      const prefAutocomplete = state.autocomplete.prefecture;

      if (prefAutocomplete.cursor >= 0) {
        prefAutocomplete.cursor -= 1;
      }
    },
  }
});

function* fetchPrefs(searchWord: string) {
  // NOTE: 現実的にはAPIへ通信する
  const request = (_searchWord: string): Promise<string[]> => new Promise(resolve => {
    const data = ['aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima']
      .filter(v => v.indexOf(_searchWord) !== -1);

    setTimeout(() => { resolve(data) }, Math.floor(Math.random() * 100));
  });

  if (searchWord) {
    const apiResponse: ResolvedType<ReturnType<typeof request>> = yield call(request, searchWord);
    yield put(actions.setPrefAutocomplete(apiResponse))
  } else {
    yield put(actions.setPrefAutocomplete([]));
  }
}

function* handleFetchPrefAutocomplete() {
  yield all([
    takeLatest<ReturnType<typeof actions.fetchAutocomplete>>(
      actions.fetchAutocomplete.type,
      function* (action) {
        yield delay(1000);
        yield fetchPrefs(action.payload);
      }
    ),
    takeLatest<ReturnType<typeof actions.setPrefAutocompleteCursorDown>>(
      actions.setPrefAutocompleteCursorDown.type,
      function* () {
        const rootState: RootState = yield select();
        if (!rootState.search.autocomplete.prefecture.items.length) {
          yield fetchPrefs(rootState.search.prefecture);
        }
      }
    )
  ]);
}

export function* saga() {
  yield all( [
    handleFetchPrefAutocomplete()
  ]);
}

export const actions = slice.actions;
export default slice;
