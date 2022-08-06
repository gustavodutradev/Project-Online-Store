import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { handleChange, searchRequest } = this.props;

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
          <button type="submit">🛒</button>
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
};

export default Header;
