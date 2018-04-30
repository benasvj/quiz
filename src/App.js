import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';

class App extends Component {
  state={
    start:0
  }
  render() {
    return (
      <div className="App">
        testing
        <Header/>
      </div>
    );
  }
}

export default App;
