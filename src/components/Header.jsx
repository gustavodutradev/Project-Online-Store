import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { handleChange, searchRequest, cartList } = this.props;

    return (
      <div className="header-bar">
        <label htmlFor="home-initial-message">
          <input
            type="text"
            id="home-initial-message"
            onChange={ handleChange }
            placeholder="Digite aqui"
            data-testid="query-input"
            className="search-input"
          />
        </label>
        <button
          type="submit"
          data-testid="query-button"
          onClick={ searchRequest }
        >
          Buscar
        </button>
        <Link data-testid="shopping-cart-button" to="/carrinho">
          <span data-testid="shopping-cart-size">{cartList.length}</span>
          <button type="button">🛒</button>
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  cartList: PropTypes.instanceOf(Array).isRequired,
};

export default Header;
