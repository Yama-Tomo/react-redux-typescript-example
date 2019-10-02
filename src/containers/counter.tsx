import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../state/store';
import { actions } from '../state/counter';
import { containerFactory } from './factory';
import Component from '../components/counter';

const usePrepareProps = () => {
  const currentValue = useSelector((state: RootState) => state.counter);

  const dispatch = useDispatch();
  const increment = useCallback(() => dispatch(actions.increment()), [dispatch]);
  const decrement = useCallback(() => dispatch(actions.decrement()), [dispatch]);

  return { currentValue, increment, decrement };
};

export type Props = ReturnType<typeof usePrepareProps>;

export default containerFactory(Component, usePrepareProps);
