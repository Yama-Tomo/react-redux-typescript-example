import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../state/store';
import { actions } from '../state/counter';
import { createRenderFunction } from './utils';
import Component, { Props as InnerProps } from '../components/counter';

const usePrepareInnerProps = (): InnerProps => {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return {
    data: {
      currentVal: rootState.counter
    },
    handlers: {
      onIncrementClicked: useCallback(() => dispatch(actions.increment()), [dispatch]),
      onDecrementClicked: useCallback(() => dispatch(actions.decrement()), [dispatch]),
    }
  };
};

export interface Props {
  render?: React.FC<InnerProps>
}

export default (props: Props) => {
  const innerProps = usePrepareInnerProps();

  return createRenderFunction(Component, props.render)(innerProps);
};

