import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../state/store';
import { actions, selectors } from '../state/name';
import { createRenderFunction } from './utils';
import Component, { Props as InnerProps } from '../components/name';

const usePrepareInnerProps = (): InnerProps => {
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return {
    data: {
      info: selectors.nameAndEmail(rootState),
      ...rootState.name,
    },
    handlers: {
      onNameChanged: useCallback((v: string) => dispatch(actions.set({ name: v })), [dispatch]),
      onEmailChanged: useCallback((v: string) => dispatch(actions.set({ email: v })), [dispatch]),
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

