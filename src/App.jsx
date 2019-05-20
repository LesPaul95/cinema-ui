import React from 'react';
import { Button } from '@material-ui/core/';
import { getNowPlaying } from './actions';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code> src/App.js </code>
           and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="contained" color="primary" onClick={() => console.log(getNowPlaying())}>
          first button
        </Button>
      </header>
    </div>
  );
}

export default App;
