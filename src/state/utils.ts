import { PayloadAction } from 'redux-starter-kit';
import { NestedPartial } from '../types/util';
import mergeWith from 'lodash/mergeWith';

export const set = <T>() => (state: T, action: PayloadAction<NestedPartial<T>>) =>
  mergeWith(state, action.payload, (org: unknown, update: unknown) => {
    if (Array.isArray(org) && Array.isArray(update)) {
      return update;
    }
  });
