import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CarrinhoDeCompra extends Component {
  // state = {
  //   name: '',
  // }

  // handleButtonClick = () => {
  //   const button =
  // }

  render() {
    return (
      <Link to="/carrinho">
        <div data-testid="shopping-cart-empty-message">
          <button type="submit">🛒</button>
        </div>
      </Link>
    );
  }
}
