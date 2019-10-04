import React from 'react';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import NameContainer from './containers/name';
import CounterContainer from './containers/counter';
import SearchContainer from './containers/search';

const H2 = styled.h2`
  background-color: #454545;
  color: #f08282;
`;

const Separator = styled.hr`
  width: 100%;
`;

// const T = ThemeProvider

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <H2>react sample</H2>
        <ThemeProvider theme={{padding: 5}}>
          <NameContainer />
        </ThemeProvider>
        <Separator />
        <CounterContainer />
        <Separator />
        <SearchContainer />
      </header>
    </div>
  );
}

export default App;
