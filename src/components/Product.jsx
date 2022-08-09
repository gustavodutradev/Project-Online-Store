/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Product extends Component {
  render() {
    const { location, addToCartDetails } = this.props;
    const { state: { thisProd } } = location;

    const { title, thumbnail, price, id } = thisProd;

    return (
      <div>
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">{ title }</p>
        <p data-testid="product-detail-price">
          { price }
        </p>
        <button
          id={ id }
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addToCartDetails(thisProd) }
        >
          🛒
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  location: propTypes.instanceOf(Object).isRequired,
  addToCartDetails: propTypes.func.isRequired,
};

export default Product;
