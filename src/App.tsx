import React from 'react';
import logo from './logo.svg';
import './App.css';
import CodeEditor from './components/Editor';

function App() {
  return (
    <div className="App">
            <h1>My Web Extension Code Editor</h1>
            <CodeEditor />
    </div>
  );
}

export default App;
