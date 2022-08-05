/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import CarrinhoDeCompra from './components/CarrinhoDeCompra';
import Carrinho from './components/Carrinho';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Front-end Online Store</h1>
        {/* <Switch> */}
        <Content />
        <CarrinhoDeCompra />
        {/* </Switch> */}
      </div>
    );
  }
}

export default App;
