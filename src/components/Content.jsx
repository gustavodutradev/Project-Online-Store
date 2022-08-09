/* eslint-disable no-unused-vars */
// Main Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Content extends Component {
  findThisProd = (id) => {
    const { searchResult: { results } } = this.props;
    const object = results.find((item) => item.id === id);
    return object;
  }

  createProductCard = (product) => {
    const { addToCart } = this.props;
    return (
      <div
        data-testid="product"
        key={ product.id }
      >
        <Link
          to={ {
            pathname: `/product/${product.id}`,
            state: {
              thisProd: this.findThisProd(product.id),
            },
          } }
          data-testid="product-detail-link"
        >
          <div>
            <img
              src={ product.thumbnail }
              alt={ product.title }
            />
          </div>
          { product.title }
          <br />
          { product.price
            .toLocaleString('pt-BR',
              { style: 'currency',
                currency: product.currency_id,
                minimumFractionDigits: 2 }) }
        </Link>
        <button
          id={ product.id }
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addToCart(product.id) }
        >
          🛒
        </button>
      </div>
    );
  }

  render() {
    // Props Import
    const { searchInput, searchResult, clickSearch } = this.props;
    const { results } = searchResult;

    const arrayOfItens = results
      .map((product) => this.createProductCard(product));

    // Input Checker
    const searchMinLimit = 0;
    const searchRule = searchInput.length > searchMinLimit;

    return (
      <div className="search-results">
        {searchRule ? '' : (
          <div data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
        )}
        { clickSearch && (arrayOfItens.length > 0
          ? arrayOfItens
          : <div>Nenhum produto foi encontrado</div>) }
      </div>
    );
  }
}

Content.propTypes = {
  searchInput: PropTypes.string.isRequired,
  searchResult: PropTypes.instanceOf(Object).isRequired,
  clickSearch: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Content;
