/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import Carrinho from './components/Carrinho';
import Content from './components/Content';
import SideBar from './components/SideBar';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Front-end Online Store</h1>
          <Link data-testid="shopping-cart-button" to="/carrinho">
            <button type="submit">🛒</button>
          </Link>
          <Switch>
            <Route exact path="/">
              <Content />
              <SideBar />
            </Route>
            <Route exact path="/carrinho" component={ Carrinho } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
