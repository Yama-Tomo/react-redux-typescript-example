import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../state/store';
import { actions, NOT_AUTOCOMPLETE_CHOICE } from '../state/search';
import { createRenderFunction } from './utils';
import Component, { Props as InnerProps } from '../components/search';
import { keyCodes} from '../libs/constants/key';

const usePrepareInnerProps = (): InnerProps => {
  const state = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const resetAutocomplete = useCallback(() => {
    dispatch(actions.set({
      autocomplete: { prefecture: { items: [] } }
    }));

    dispatch(actions.setPrefAutocompleteCursor('reset'));
  }, [dispatch]);

  const ensureInputVal = useCallback((prefecture: string) => {
    dispatch(actions.set({ prefecture }));
    resetAutocomplete();
  }, [dispatch, resetAutocomplete]);

  return {
    data: {
      prefecture: state.autocomplete.prefecture.cursor === NOT_AUTOCOMPLETE_CHOICE
        ? state.prefecture
        : state.autocomplete.prefecture.items[state.autocomplete.prefecture.cursor],
      autocomplete: state.autocomplete
    },
    handlers: {
      onPrefectureChanged: useCallback((v: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = v.target.value;

        ensureInputVal(inputVal);
        dispatch(actions.fetchAutocomplete(inputVal));
      }, [dispatch, ensureInputVal]),
      onPrefectureKeydown: useCallback((v: React.KeyboardEvent<HTMLInputElement>) => {
        if (v.keyCode === keyCodes.down) {
          dispatch(actions.setPrefAutocompleteCursor('down'));
          dispatch(actions.fetchAutocompleteWhenCursorDown());
          v.preventDefault();
        }

        if (v.keyCode === keyCodes.up) {
          dispatch(actions.setPrefAutocompleteCursor('up'));
          v.preventDefault();
        }

        if (v.keyCode === keyCodes.enter) {
          ensureInputVal((v.target as any).value);
        }
      }, [dispatch, ensureInputVal]),
      onPrefectureBlur: useCallback(() => {
        resetAutocomplete();
      }, [resetAutocomplete]),
      onPrefectureAutocompleteClicked: useCallback((v) => {
        ensureInputVal(v);
      }, [ensureInputVal])
    }
  };
};

export default () => {
  const innerProps = usePrepareInnerProps();

  return createRenderFunction(Component)(innerProps);
};
