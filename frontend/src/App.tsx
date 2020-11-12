import * as React from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import Board from './components/Board';

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Board />
    </div>
  );
};
export default App;
