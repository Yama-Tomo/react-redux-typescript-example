import * as React from 'react';
import { Typography, Button, Theme } from '@material-ui/core';
import styled, { css } from 'styled-components';

export interface Props {
  data: {
    currentVal: number;
  },
  handlers: {
    onIncrementClicked: () => void;
    onDecrementClicked: () => void;
  }
}

const margin = css`
  margin: ${(props: { theme: Theme }) => props.theme.spacing(1)}px
`;

const Num = styled(Typography)`
  ${margin}
`;

const StyledBtn = styled(Button)`
  ${margin}
`;

// NOTE: 無駄な再描画をしなくて済むようにボタンだけは別コンポーネントへ切り出す
const Buttons = React.memo((props: Props['handlers']) => {
  return (
    <>
      <StyledBtn
        variant="contained"
        color="primary"
        onClick={props.onIncrementClicked}
      >
        increment
      </StyledBtn>
      <StyledBtn
        variant="contained"
        color="secondary"
        onClick={props.onDecrementClicked}
      >
        decrement
      </StyledBtn>
    </>
  );
});

export default (props: Props) => {
  return (
    <>
      <Num variant="h5" component="h2">{props.data.currentVal}</Num>
      <Buttons {...props.handlers} />
    </>
  );
};
