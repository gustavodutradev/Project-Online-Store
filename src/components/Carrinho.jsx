/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  render() {
    const { cartList } = this.props;
    const quantity = cartList.length;
    return (
      <div>
        { cartList.length > 0 ? (
          <div>
            <p data-testid="shopping-cart-product-quantity">
              {` A quantidade de produtos é: ${quantity} `}
            </p>
            { cartList.map((cartItem) => {
              const { thumbnail, price, title } = cartItem;
              return (
                <div key={ cartItem.id }>
                  <p data-testid="shopping-cart-product-name">{ title }</p>
                  <img src={ thumbnail } alt={ title } />
                  <p>
                    { price.toLocaleString('pt-BR',
                      { style: 'currency',
                        currency: cartItem.currency_id,
                        minimumFractionDigits: 2 }) }
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          </div>
        )}
      </div>
    );
  }
}

Carrinho.propTypes = {
  cartList: PropTypes.instanceOf(Array).isRequired,
};
