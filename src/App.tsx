import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import { Route, Switch } from 'react-router';

import styled, { CSSObject, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AppBar,Typography,CssBaseline, Toolbar, Drawer, List, ListItem, ListItemText, Theme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles';
import * as Themes from './theme';
import { Link } from 'react-router-dom';

import Home from './components/home';
import NameContainer from './containers/name';
import CounterContainer from './containers/counter';
import SearchContainer from './containers/search';

const Container = styled.div`
  display: flex;
`;

const StyledAppBar = styled(AppBar)`
  z-index: ${(props: { theme: Theme }) => props.theme.zIndex.drawer + 1};
`;

const drawerWidth = 200;
const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  
  > div {
    width: ${drawerWidth}px;
  }
`;

const Main = styled.main`
  padding: ${(props: { theme: Theme }) => props.theme.spacing(2)}px;
  flex-grow: 1;
  min-height: 100vh;
`;

const ToolbarSpacing = styled.div((props: { theme: Theme }) => props.theme.mixins.toolbar as CSSObject);

const App: React.FC = () => {
  const currentPath = useSelector((state: RootState) => state.router.location.pathname);
  const isHome = currentPath === '/';

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={isHome ? Themes.dark : Themes.main}>
        <StyledThemeProvider theme={isHome ? Themes.dark : Themes.main}>
          <Container>
            <CssBaseline />
            <StyledAppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" noWrap>React redux typescript example</Typography>
              </Toolbar>
            </StyledAppBar>
            <MuiThemeProvider theme={Themes.dark}>
              <StyledThemeProvider theme={Themes.dark}>
                <StyledDrawer variant="permanent">
                  <ToolbarSpacing />
                  <List>
                    <ListItem selected={currentPath === '/'} button component={Link} to='/'>
                      <ListItemText primary={'home'} />
                    </ListItem>
                    <ListItem selected={currentPath === '/basic-input'} button component={Link} to='/basic-input'>
                      <ListItemText primary={'basic redux usage'} />
                    </ListItem>
                    <ListItem selected={currentPath === '/counter'} button component={Link} to='/counter'>
                      <ListItemText primary={'counter'} />
                    </ListItem>
                    <ListItem selected={currentPath === '/autocomplete-with-redux-saga'} button component={Link} to='/autocomplete-with-redux-saga'>
                      <ListItemText primary={'redux saga'} secondary={'autocomplete'} />
                    </ListItem>
                  </List>
                </StyledDrawer>
              </StyledThemeProvider>
            </MuiThemeProvider>
            <Main>
              {!isHome && <ToolbarSpacing />}
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/basic-input">
                  <NameContainer />
                </Route>
                <Route path="/counter" >
                  <CounterContainer />
                </Route>
                <Route path="/autocomplete-with-redux-saga" >
                  <SearchContainer />
                </Route>
              </Switch>
            </Main>
          </Container>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
