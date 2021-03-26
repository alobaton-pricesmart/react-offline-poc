import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConnectionContext from './context/connection/ConnectionContext';

function App() {
  return (
    <ConnectionContext.Consumer>
      {context => (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
              </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <p>{context.hasNetworkConnection && context.hasInternetAccess ? 'You are online :)' : 'You are offline :('}</p>
          </header>
        </div>
      )}
    </ConnectionContext.Consumer>
  );
}

export default App;
