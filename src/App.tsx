import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import { RouteProps, Switch } from 'react-router';
import routes from './routes'
import { keys } from './libs/functions/object';

import styled, { CSSObject, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AppBar,Typography,CssBaseline, Toolbar, Drawer, List, ListItem, ListItemText, Theme } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles';
import * as Themes from './theme';
import { Link } from 'react-router-dom';
import { ListItemTextProps } from '@material-ui/core/ListItemText';

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

const NavItem = (props: { currentPath: string, to: RouteProps['path'], itemProps: ListItemTextProps }) => {
  const to = Array.isArray(props.to) ? props.to.join() : String(props.to);
  return (
    <ListItem selected={props.currentPath === to} button component={Link} to={to}>
      <ListItemText {...props.itemProps} />
    </ListItem>
  );
};

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
                    <NavItem
                      currentPath={currentPath}
                      to={routes.home.routeOpts.path}
                      itemProps={{ primary: 'home' }}
                    />
                    <NavItem
                      currentPath={currentPath}
                      to={routes.name.routeOpts.path}
                      itemProps={{ primary: 'basic redux usage' }}
                    />
                    <NavItem
                      currentPath={currentPath}
                      to={routes.counter.routeOpts.path}
                      itemProps={{ primary: 'counter' }}
                    />
                    <NavItem
                      currentPath={currentPath}
                      to={routes.search.routeOpts.path}
                      itemProps={{ primary: 'redux saga', secondary: 'autocomplete' }}
                    />
                    <NavItem
                      currentPath={currentPath}
                      to={routes.search2.routeOpts.path}
                      itemProps={{ primary: 'hooks', secondary: 'autocomplete' }}
                    />
                  </List>
                </StyledDrawer>
              </StyledThemeProvider>
            </MuiThemeProvider>
            <Main>
              {!isHome && <ToolbarSpacing />}
              <Switch>
                {keys(routes).map(key => {
                  const route = routes[key];
                  return route.render({...route.routeOpts, key})
                })}
              </Switch>
            </Main>
          </Container>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
