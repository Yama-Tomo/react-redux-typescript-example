import React from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router';
import NameContainer from './containers/name';
import CounterContainer from './containers/counter';
import SearchContainer from './containers/search';
import { Link } from 'react-router-dom';

const H2 = styled.h2`
  background-color: #454545;
  color: #f08282;
`;

const Separator = styled.hr`
  width: 100%;
`;

const NavBars = styled.div`
  & a { color: white; }
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <H2>react sample</H2>
        <NavBars>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/basic-input">Basic redux usage</Link></p>
          <p><Link to="/counter">Counter</Link></p>
          <p><Link to="/autocomplete-with-redux-saga">Redux saga - autocomplete</Link></p>
        </NavBars>
        <Separator />
        <Switch>
          <Route exact path="/">
            <></>
          </Route>
          <Route path="/basic-input">
            <ThemeProvider theme={{padding: 5}}>
              <NameContainer />
            </ThemeProvider>
          </Route>
          <Route path="/counter" >
            <CounterContainer />
          </Route>
          <Route path="/autocomplete-with-redux-saga" >
            <SearchContainer />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
