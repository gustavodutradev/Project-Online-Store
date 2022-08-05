import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BotaoCarrinhoDeCompra extends Component {
  render() {
    return (
      <div>
        <Link to="/carrinho">
          <button data-testid="shopping-cart-button" type="submit">🛒</button>
        </Link>
      </div>
    );
  }
}
