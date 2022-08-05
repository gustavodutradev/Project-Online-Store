/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Carrinho from './components/Carrinho';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Front-end Online Store</h1>
        <Switch>
          <Route exact path="/" component={ Content } />
          <Route exact path="/carrinho" component={ Carrinho } />
        </Switch>
      </div>
    );
  }
}

export default App;
