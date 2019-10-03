import * as React from 'react';
import { Props } from '../containers/name';
import { Input } from './generics/input';

export default (props: Props) => {
  return (
    <>
      <p>{props.nameAndEmail}</p>
      <Input
        type="text"
        placeholder="name"
        value={props.name.name}
        onChange={(e) => props.updateName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="email"
        value={props.name.email}
        onChange={(e) => props.updateEmail(e.target.value)}
      />
    </>
  );
};
