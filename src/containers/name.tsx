import { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../state/store';
import { actions, selectors } from '../state/name';
import { containerFactory } from './factory';
import Component from '../components/name';

const usePrepareProps = () => {
  const name = useSelector((state: RootState) => state.name);
  const nameAndEmail = useSelector((state: RootState) => selectors.nameAndEmail(state));

  const dispatch = useDispatch();
  const updateName = useCallback((v: string) => dispatch(actions.updateName(v)), [dispatch]);
  const updateEmail = useCallback((v: string) => dispatch(actions.updateEmail(v)), [dispatch]);

  return { name, updateName, updateEmail, nameAndEmail };
};

export type Props = ReturnType<typeof usePrepareProps>;

export default containerFactory(Component, usePrepareProps);
