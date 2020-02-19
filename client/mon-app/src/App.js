import React from 'react';
import VinaddTestDev from './VinTestDev/vinAdd';
import VintagTestDev from './VinTestDev/vinAddTag';
import VinsearchTestDev from './VinTestDev/vinSearch';
import VinupdateTestDev from './VinTestDev/vinUpdate';
import UserCreateTestDev from './UserTestDev/userCreate';
import UserConnectTestDev from './UserTestDev/userConnect';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <VinaddTestDev/>
        <VinsearchTestDev/>
        <VinupdateTestDev/>
        <VintagTestDev/>
        <UserCreateTestDev/>
        <UserConnectTestDev/>
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
      </header>
    </div>
  );
}

export default App;
