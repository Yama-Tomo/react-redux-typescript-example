import * as React from 'react';
import { Props } from '../containers/name';

export default (props: Props) => {
  return (
    <>
      <p>{props.nameAndEmail}</p>
      <input
        type="text"
        placeholder="name"
        value={props.name.name}
        onChange={(e) => props.updateName(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={props.name.email}
        onChange={(e) => props.updateEmail(e.target.value)}
      />
    </>
  );
};
