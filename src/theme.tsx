import { createMuiTheme, Theme } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import React from 'react';

export const main = createMuiTheme({
  palette: {
    primary: {
      main: "#009688",
      dark: "#00796B",
      light: "#B2DFDB"
    },
    secondary: {
      main: "#FFC107"
    },
    text: {
      primary: "#212121",
      secondary: "#757575"
    }
  }
});

export const dark = createMuiTheme({
  palette: {
    background: {
      default: "#3e464c",
      paper: "#3e464c"
    },
    primary: {
      main: "#009688",
      dark: "#00796B",
      light: "#B2DFDB"
    },
    divider: 'white',
    text: {
      primary: "#fff",
      secondary: "#ccc",
    }
  }
});

export const ThemeProvider = (props: { theme?: Theme, children?: React.ReactChild }) => (
  <MuiThemeProvider theme={props.theme}>
    <StyledThemeProvider theme={props.theme}>
      {props.children}
    </StyledThemeProvider>
  </MuiThemeProvider>
);
