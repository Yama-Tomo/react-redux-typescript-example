import React from 'react';
import Home from './components/home';
import NameContainer from './containers/name';
import CounterContainer from './containers/counter';
import SearchContainer from './containers/search';
import { RouteProps } from 'react-router';

type Keys = 'home' | 'name' | 'counter' | 'search';
type Routes = Record<Keys, { routeOpts: RouteProps, render: () => JSX.Element }>;

export const routes: Routes = {
  home: {
    routeOpts: { path: '/', exact: true },
    render: () => <Home />
  },
  name: {
    routeOpts: { path: '/basic-input' },
    render: () => <NameContainer />
  },
  counter: {
    routeOpts: { path: '/counter' },
    render: () => <CounterContainer />
  },
  search: {
    routeOpts: { path: '/autocomplete-with-redux-saga' },
    render: () => <SearchContainer />
  },
};

export default routes;
