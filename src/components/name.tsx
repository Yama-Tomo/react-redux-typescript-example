import * as React from 'react';
import { TextField, FormControl } from '@material-ui/core';

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
      <FormControl fullWidth>
        <TextField
          label="name"
          placeholder='please input your name'
          value={props.data.name}
          onChange={(e) => props.handlers.onNameChanged(e.target.value)}
          margin="normal"
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          label="e-mail"
          placeholder='please input your e-mail'
          value={props.data.email}
          onChange={(e) => props.handlers.onEmailChanged(e.target.value)}
          margin="normal"
        />
      </FormControl>
    </>
  );
};
