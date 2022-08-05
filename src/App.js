import React from 'react';
import './App.css';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Front-end Online Store</h1>
        <Content />
      </div>
    );
  }
}

export default App;
