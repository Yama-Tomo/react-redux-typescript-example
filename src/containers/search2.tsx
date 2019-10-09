import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { actions, NOT_AUTOCOMPLETE_CHOICE } from '../state/search2';
import { createRenderFunction } from './utils';
import Component, { Props as InnerProps } from '../components/search';
import { keyCodes } from '../libs/constants/key';

const fetchPrefs = (searchWord: string): Promise<string[]> =>
  new Promise(resolve => {
    const data = ['aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima']
      .filter(v => v.indexOf(searchWord) !== -1);

    setTimeout(() => { resolve(data) }, Math.floor(Math.random() * 100));
  });

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 1000));

const usePrepareInnerProps = (): InnerProps => {
  const state = useSelector((state: RootState) => state.search2);
  const dispatch = useDispatch();
  const [fetchTrigger, setFetchTrigger] = useState<{onInput: string, onDownPress: string}>({ onInput: '', onDownPress: '' });
  const fetchAutocompleteQueues = useRef<string[]>([]);

  const setAutocomplete = useCallback(async (condition: string) => {
    const result = await fetchPrefs(condition);
    dispatch(actions.set({
      autocomplete: { prefecture: { items: result } }
    }));
  }, [dispatch]);

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

  // unmount process
  useEffect(() => {
    return () => {
      fetchAutocompleteQueues.current = [];
      setFetchTrigger({ onInput: '', onDownPress: '' })
    }
  }, []);

  useEffect(() => {
    fetchAutocompleteQueues.current.push(fetchTrigger.onInput);

    (async () => {
      await delay();

      const condition = fetchAutocompleteQueues.current.shift();
      if (condition && fetchAutocompleteQueues.current.length === 0) {
        await setAutocomplete(condition);
      }
    })();
  }, [fetchTrigger.onInput, setAutocomplete]);

  useEffect(() => {
    (async () => {
      if (fetchTrigger.onDownPress) {
        await setAutocomplete(fetchTrigger.onDownPress);
      }
    })();
  }, [fetchTrigger.onDownPress, setAutocomplete]);

  return {
    data: {
      prefecture: state.autocomplete.prefecture.cursor === NOT_AUTOCOMPLETE_CHOICE
        ? state.prefecture
        : state.autocomplete.prefecture.items[state.autocomplete.prefecture.cursor],
      autocomplete: state.autocomplete
    },
    handlers: {
      onPrefectureChanged: useCallback((v: React.ChangeEvent<HTMLInputElement>) => {
        ensureInputVal(v.target.value);
        setFetchTrigger({...fetchTrigger, ...{ onInput: v.target.value }})
      }, [ensureInputVal, fetchTrigger]),
      onPrefectureKeydown: useCallback((v: React.KeyboardEvent<HTMLInputElement>) => {
        if (v.keyCode === keyCodes.down) {
          dispatch(actions.setPrefAutocompleteCursor('down'));
          setFetchTrigger({...fetchTrigger, ...{ onDownPress: state.prefecture }});
          v.preventDefault();
        }

        if (v.keyCode === keyCodes.up) {
          dispatch(actions.setPrefAutocompleteCursor('up'));
          v.preventDefault();
        }

        if (v.keyCode === keyCodes.enter) {
          ensureInputVal((v.target as any).value);
        }
      }, [dispatch, ensureInputVal, state.prefecture, fetchTrigger]),
      onPrefectureBlur: useCallback(() => {
        resetAutocomplete();
        setFetchTrigger({ onInput: '', onDownPress: '' });
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
