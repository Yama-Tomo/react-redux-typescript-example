import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../state/store';
import { actions, NOT_AUTOCOMPLETE_CHOICE } from '../state/search';
import { createRenderFunction } from './utils';
import Component, { Props as InnerProps } from '../components/search';
import * as React from 'react';

const keys = {
  up: 38,
  down: 40,
  enter: 13
};

const usePrepareInnerProps = (): InnerProps => {
  const state = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

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
        dispatch(actions.setPref(inputVal));
        dispatch(actions.fetchAutocomplete(inputVal));
        dispatch(actions.resetPrefAutocompleteCursor());
      }, [dispatch]),
      onPrefectureKeydown: useCallback((v: React.KeyboardEvent<HTMLInputElement>) => {
        if (v.keyCode === keys.down) {
          dispatch(actions.setPrefAutocompleteCursorDown());
          v.preventDefault();
        }

        if (v.keyCode === keys.up) {
          dispatch(actions.setPrefAutocompleteCursorUp());
          v.preventDefault();
        }

        if (v.keyCode === keys.enter) {
          dispatch(actions.setPref((v.target as any).value));
          dispatch(actions.resetPrefAutocompleteCursor());
          dispatch(actions.setPrefAutocomplete([]));
        }
      }, [dispatch]),
      onPrefectureBlur: useCallback(() => {
        dispatch(actions.resetPrefAutocompleteCursor());
        dispatch(actions.setPrefAutocomplete([]));
      }, [dispatch]),
    }
  };
};

export default () => {
  const innerProps = usePrepareInnerProps();

  return createRenderFunction(Component)(innerProps);
};
