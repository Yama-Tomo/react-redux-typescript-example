import React from 'react';
import './App.css';
import styled from 'styled-components';
import NameContainer from './containers/name';
import CounterContainer from './containers/counter';

const H2 = styled.h2`
  background-color: #454545;
  color: #f08282;
`;

const Separator = styled.hr`
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <H2>react sample</H2>
        <NameContainer />
        <Separator />
        <CounterContainer />
      </header>
    </div>
  );
}

export default App;
