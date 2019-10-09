import React from 'react';
import { Route, RouteProps } from 'react-router';
import PrivateRoute from './containers/private_route';
import Home from './components/home';
import NameContainer from './containers/name';
import CounterContainer from './containers/counter';
import SearchContainer from './containers/search';
import Search2Container from './containers/search2';

type RouteData = { routeOpts: RouteProps, render: (props: RouteProps & { key: string }) => JSX.Element };

const home: RouteData = {
  routeOpts: { path: '/', exact: true },
  render: (props) => <Route {...props}><Home /></Route>
};

const name: RouteData = {
  routeOpts: { path: '/basic-input' },
  render: (props) => <Route {...props}><NameContainer /></Route>
};

const counter: RouteData = {
  routeOpts: { path: '/counter' },
  render: (props) => <Route {...props}><CounterContainer /></Route>
};

const search: RouteData = {
  routeOpts: { path: '/autocomplete-with-redux-saga' },
  render: (props) => <Route {...props}><SearchContainer /></Route>
};

const search2: RouteData = {
  routeOpts: { path: '/autocomplete-with-hooks' },
  render: (props) => <Route {...props}><Search2Container /></Route>
};

const secret: RouteData = {
  routeOpts: { path: '/secret' },
  render: (props) => <PrivateRoute {...props}><div>secret</div></PrivateRoute>
};

export const routes = {
  home,
  name,
  counter,
  search,
  search2,
  secret,
};

export default routes;
