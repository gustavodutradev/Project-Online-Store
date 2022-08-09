import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Carrinho extends Component {
  checkDuplicated = () => {
    const { cartList } = this.props;

    const itemsToShow = [];

    cartList.filter((each) => {
      const duplicated = itemsToShow.some((item) => item.id === each.id);

      if (!duplicated) {
        itemsToShow.push(each);
        return true;
      }
      return false;
    });

    return itemsToShow;
  }

  render() {
    const { cartList,
      updateCartQuantity,
      getCartItemQuantity,
      removeProduct } = this.props;
    const DECREASE = -1;
    const INCREASE = 1;

    const itemsToShow = this.checkDuplicated();

    return (
      <div>
        { cartList.length > 0 ? (
          <div>
            { itemsToShow.map((cartItem) => {
              const { thumbnail, price, title, id } = cartItem;
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
                  <button
                    type="button"
                    onClick={ () => updateCartQuantity(id, DECREASE, cartItem) }
                    data-testid="product-decrease-quantity"
                  >
                    -
                  </button>
                  <span data-testid="shopping-cart-product-quantity">
                    { getCartItemQuantity(id) }
                  </span>
                  <button
                    type="button"
                    onClick={ () => updateCartQuantity(id, INCREASE, cartItem) }
                    data-testid="product-increase-quantity"
                  >
                    +
                  </button>
                  <div>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => removeProduct(id) }
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
            <div>
              <br />
              <Link
                to="/checkout"
              >
                <button
                  data-testid="checkout-products"
                  type="button"
                >
                  Checkout
                </button>
              </Link>
            </div>
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
  updateCartQuantity: PropTypes.func.isRequired,
  getCartItemQuantity: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};
