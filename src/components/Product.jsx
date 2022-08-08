import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends Component {
  render() {
    const { result, match } = this.props;
    const { params: { id } } = match;
    const object = result.filter((item) => `:${item.id}` === id);
    const { title, thumbnail, price } = object[0];

    return (
      <div data-testid="product-detail-link">
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">{ title }</p>
        <p data-testid="product-detail-price">{ price }</p>

        <Link
          to="/carrinho"
        >
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            🛒
          </button>
        </Link>
      </div>
    );
  }
}

Product.propTypes = {
  result: propTypes.string.isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;
