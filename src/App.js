import React from 'react';
import './App.css';
import Content from './components/Content';
import SideBar from './components/SideBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Front-end Online Store</h1>
        <Content />
        <SideBar />
      </div>
    );
  }
}

export default App;
