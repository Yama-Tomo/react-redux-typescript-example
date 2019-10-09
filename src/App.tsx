import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import { RouteProps, Switch } from 'react-router';
import routes from './routes'
import { keys } from './libs/functions/object';

import styled, { CSSObject, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AppBar,Typography,CssBaseline, Toolbar, Drawer, List, ListItem, ListItemText, Theme, Hidden, IconButton } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Menu';
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

const StyledIconButton = styled(IconButton)((props: { theme: Theme }) => ({
  [props.theme.breakpoints.up('sm')]: {
    display: 'none',
  }
}));

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Main = styled.main`
  padding: ${(props: { theme: Theme }) => props.theme.spacing(2)}px;
  flex-grow: 1;
  height: 100%;
`;

const Footer = styled.footer`
  margin: auto;
  padding: 10px;
`

const ToolbarSpacing = styled.div((props: { theme: Theme }) => props.theme.mixins.toolbar as CSSObject);

const NavItem = (props: { currentPath: string, to: RouteProps['path'], itemProps: ListItemTextProps }) => {
  const to = Array.isArray(props.to) ? props.to.join() : String(props.to);
  return (
    <ListItem selected={props.currentPath === to} button component={Link} to={to}>
      <ListItemText {...props.itemProps} />
    </ListItem>
  );
};

const NavItems = React.memo((props: { currentPath: string }) => (
  <List>
    <NavItem
      currentPath={props.currentPath}
      to={routes.home.routeOpts.path}
      itemProps={{ primary: 'home' }}
    />
    <NavItem
      currentPath={props.currentPath}
      to={routes.name.routeOpts.path}
      itemProps={{ primary: 'basic redux usage' }}
    />
    <NavItem
      currentPath={props.currentPath}
      to={routes.counter.routeOpts.path}
      itemProps={{ primary: 'counter' }}
    />
    <NavItem
      currentPath={props.currentPath}
      to={routes.search.routeOpts.path}
      itemProps={{ primary: 'redux saga', secondary: 'autocomplete' }}
    />
    <NavItem
      currentPath={props.currentPath}
      to={routes.search2.routeOpts.path}
      itemProps={{ primary: 'hooks', secondary: 'autocomplete' }}
    />
    <NavItem
      currentPath={props.currentPath}
      to={routes.secret.routeOpts.path}
      itemProps={{ primary: 'secret'}}
    />
  </List>
));

const App: React.FC = () => {
  const currentPath = useSelector((state: RootState) => state.router.location.pathname);
  const isHome = currentPath === '/';
  const [mobileDrawerOpen, setMobileDrawer] = useState(false);
  const toggleMobileDrawer = () => setMobileDrawer(!mobileDrawerOpen);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={isHome ? Themes.dark : Themes.main}>
        <StyledThemeProvider theme={isHome ? Themes.dark : Themes.main}>
          <Container>
            <CssBaseline />
            <StyledAppBar position="fixed">
              <Toolbar>
                <StyledIconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleMobileDrawer}
                  edge="start"
                >
                  <MenuIcon />
                </StyledIconButton>
                <Typography variant="h6" noWrap>React redux typescript example</Typography>
              </Toolbar>
            </StyledAppBar>

            <MuiThemeProvider theme={Themes.main}>
              <StyledThemeProvider theme={Themes.main}>
                <Hidden smUp implementation="css">
                  <Drawer
                    variant="temporary"
                    open={mobileDrawerOpen}
                    onClose={toggleMobileDrawer}
                    ModalProps={{
                      keepMounted: true, // Better open performance on mobile.
                    }}
                  >
                    <NavItems currentPath={currentPath} />
                  </Drawer>
                </Hidden>
              </StyledThemeProvider>
            </MuiThemeProvider>

            <MuiThemeProvider theme={Themes.dark}>
              <StyledThemeProvider theme={Themes.dark}>
                <Hidden xsDown implementation="css">
                  <StyledDrawer variant="permanent">
                    <ToolbarSpacing />
                    <NavItems currentPath={currentPath} />
                  </StyledDrawer>
                </Hidden>
              </StyledThemeProvider>
            </MuiThemeProvider>

            <Wrap>
              <Main>
                <ToolbarSpacing />
                <Switch>
                  {keys(routes).map(key => {
                    const route = routes[key];
                    return route.render({...route.routeOpts, key})
                  })}
                </Switch>
              </Main>
              <Footer>
                Copyright © Yama-Tomo
                <a
                  href="https://github.com/Yama-Tomo/react-redux-typescript-example"
                  style={{ marginLeft: '10px' }}
                >
                  source code
                </a>
              </Footer>
            </Wrap>
          </Container>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default App;
