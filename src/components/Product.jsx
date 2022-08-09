/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Product extends Component {
  render() {
    const { location } = this.props;
    const { state: { thisProd } } = location;

    const { title, thumbnail, price } = thisProd;

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
      </div>
    );
  }
}

Product.propTypes = {
  location: propTypes.instanceOf(Object).isRequired,
};

export default Product;
