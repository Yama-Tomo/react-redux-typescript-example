import React from 'react';

import logo from '../logo.svg';
import styled, { keyframes } from 'styled-components';
import { Theme } from '@material-ui/core';

const animation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img`
  animation: ${animation} infinite 20s linear;
  height: 20vmin;
  pointer-events: none;
`;

const Wrap = styled.div`
  background-color: ${(props: { theme: Theme }) => props.theme.palette.background.paper};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default () => {
  return (
    <Wrap>
      <Logo alt='logo' src={logo} />
      <p style={{'fontSize': '1.3rem'}}>Welcome to React example</p>
    </Wrap>
  );
};
