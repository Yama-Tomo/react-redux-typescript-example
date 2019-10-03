import * as React from 'react';
import { Input } from './generics/input';

export interface Props {
  data: {
    info: string;
    name: string;
    email: string;
  },
  handlers: {
    onNameChanged: (v: string) => void;
    onEmailChanged: (v: string) => void;
  }
}

export default (props: Props) => {
  return (
    <>
      <p>{props.data.info}</p>
      <Input
        type="text"
        placeholder="name"
        value={props.data.name}
        onChange={(e) => props.handlers.onNameChanged(e.target.value)}
      />
      <Input
        type="text"
        placeholder="email"
        value={props.data.email}
        onChange={(e) => props.handlers.onEmailChanged(e.target.value)}
      />
    </>
  );
};
