import React, { Component } from 'react';
// import BotaoCarrinhoDeCompra from './BotaoCarrinhoDeCompra';
import { Link } from 'react-router-dom';

class Content extends Component {
  state = {
    searchInput: '',
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  render() {
    const { searchInput } = this.state;
    const searchMinLimit = 0;
    const searchRule = searchInput.length > searchMinLimit;

    return (
      <div>
        <label htmlFor="home-initial-message">
          <input
            type="text"
            id="home-initial-message"
            onChange={ this.handleChange }
            placeholder="Digite aqui"
          />
        </label>
        { searchRule ? '' : (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        {/* <BotaoCarrinhoDeCompra /> */}
        <Link data-testid="shopping-cart-button" to="/carrinho">
          <button type="submit">🛒</button>
        </Link>
      </div>
    );
  }
}

export default Content;
