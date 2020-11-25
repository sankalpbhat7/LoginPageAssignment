import React from 'react';
import './App.css';

import Login from './components/LoginPage/Login.jsx';
import HooksExample from './components/Demo/HooksExample.jsx';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/* <HooksExample /> */}
        <Login />
      </header>
    </div>
  );
}

export default App;
