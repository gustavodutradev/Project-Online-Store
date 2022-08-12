/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable react/jsx-max-depth */
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
    const { shipping } = product;
    const { free_shipping: freeShipping } = shipping;
    return (
      <div
        data-testid="product"
        key={ product.id }
      >
        <div className="product-card">
          <Link
            to={ {
              pathname: `/product/${product.id}`,
              state: {
                thisProd: this.findThisProd(product.id),
              },
            } }
            data-testid="product-detail-link"
          >
            <img
              src={ product.thumbnail }
              alt={ product.title }
            />
            <div className="product-info">
              <span className="price">
                { product.price
                  .toLocaleString('pt-BR',
                    { style: 'currency',
                      currency: 'brl',
                      minimumFractionDigits: 2 }) }
              </span>
              <span className="product-title">
                { product.title.length > 85 ? `${product.title.slice(0, 85)}...` : product.title }
              </span>
              { freeShipping && (
                <span
                  data-testid="free-shipping"
                  className="free-shipping-content"
                >
                  FRETE
                  <br />
                  GRÁTIS
                </span>
              ) }
              <div className="button-container-fake" />
            </div>
          </Link>
          <div className="button-container">
            <button
              id={ product.id }
              type="button"
              className="add-cart-button"
              data-testid="product-add-to-cart"
              onClick={ () => addToCart(product.id) }
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    // Props Import
    const { searchResult, clickSearch } = this.props;
    const { results } = searchResult;

    const arrayOfItens = results
      .map((product) => this.createProductCard(product));

    // Input Checker
    const searchRule = clickSearch;

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
  searchResult: PropTypes.instanceOf(Object).isRequired,
  clickSearch: PropTypes.bool.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Content;
