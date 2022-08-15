/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaCcVisa, FaBarcode, FaCcMastercard, FaCreditCard } from 'react-icons/fa';

export default class Checkout extends Component {
  state = {
    cartItems: [],
    fullName: '',
    cpf: '',
    email: '',
    adress: '',
    cep: '',
    phone: '',
    paymentType: '',
  }

  componentDidMount() {
    this.setState({
      cartItems: JSON.parse(localStorage.getItem('cart')) });
  }

  checkDuplicated = () => {
    const { cartItems } = this.state;

    const itemsToShow = [];

    cartItems.filter((each) => {
      const duplicated = itemsToShow.some((item) => item.id === each.id);

      if (!duplicated) {
        itemsToShow.push(each);
        return true;
      }
      return false;
    });

    return itemsToShow;
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({
      [name]: value,
    });
  }

    validateFormOnClick = () => {
      const { fullName, cpf, email, cep, adress, phone, paymentType } = this.state;
      const validateFields = fullName.length === 0
        || cpf.length === 0
        || email.length === 0
        || cep.length === 0
        || adress.length === 0
        || phone.length === 0
        || paymentType.length === 0;
      this.setState({ validateFields }, () => {
        const { clearCart, history } = this.props;
        const { push } = history;
        if (!validateFields) {
          clearCart();
          push('/');
        }
      });
    }

    render() {
      const itemsToShow = this.checkDuplicated();
      const { validateFields } = this.state;
      const { getCartItemQuantity, totalPrice } = this.props;
      return (
        <div className="checkout-container">
          <form className="checkout-form">
            <div className="buyer-data">
              <div className="full-name-container">
                <input
                  type="text"
                  placeholder="Nome Completo"
                  data-testid="checkout-fullname"
                  name="fullName"
                  onChange={ this.handleChange }
                  className="full-name-input"
                />
              </div>
              <div className="grid">
                <div className="cpf-container">
                  <input
                    type="text"
                    placeholder="CPF"
                    data-testid="checkout-cpf"
                    name="cpf"
                    onChange={ this.handleChange }
                    className="cpf-input"
                  />
                </div>
                <div className="email-container">
                  <input
                    type="email"
                    placeholder="E-mail"
                    data-testid="checkout-email"
                    name="email"
                    onChange={ this.handleChange }
                    className="email_input"
                  />
                </div>
                <div className="phone-container">
                  <input
                    type="text"
                    placeholder="Telefone"
                    data-testid="checkout-phone"
                    name="phone"
                    onChange={ this.handleChange }
                    className="phone-input"
                  />
                </div>
                <div className="cep-container">
                  <input
                    type="text"
                    placeholder="CEP"
                    data-testid="checkout-cep"
                    name="cep"
                    onChange={ this.handleChange }
                    className="cep-input"
                  />
                </div>
              </div>
              <div className="adress-container">
                <input
                  type="text"
                  placeholder="Endereço"
                  data-testid="checkout-address"
                  name="adress"
                  onChange={ this.handleChange }
                  className="adress-input"
                />
              </div>
            </div>
            <div className="payment">
              <p>Método de Pagamento</p>
              <div className="icons">
                <label htmlFor="boleto" className="boleto-container">
                  <FaBarcode
                    className="boleto"
                  />
                  <input
                    type="radio"
                    id="boleto"
                    name="paymentType"
                    data-testid="ticket-payment"
                    onChange={ this.handleChange }
                    className="boleto-radio"
                  />
                  Boleto
                </label>
                <label htmlFor="visa" className="visa-container">
                  <FaCcVisa
                    className="visa"
                  />
                  <input
                    type="radio"
                    name="paymentType"
                    data-testid="visa-payment"
                    id="visa"
                    onChange={ this.handleChange }
                    className="visa-radio"
                  />
                  Visa
                </label>
                <label htmlFor="master" className="master-container">
                  <FaCcMastercard
                    className="master"
                  />
                  <input
                    type="radio"
                    name="paymentType"
                    data-testid="master-payment"
                    id="master"
                    onChange={ this.handleChange }
                    className="master-radio"
                  />
                  MasterCard
                </label>
                <label htmlFor="elo" className="elo-container">
                  <FaCreditCard
                    className="elo"
                  />
                  <input
                    type="radio"
                    name="paymentType"
                    data-testid="elo-payment"
                    id="elo"
                    onChange={ this.handleChange }
                    className="elo-radio"
                  />
                  Elo
                </label>
              </div>
            </div>
            <div>
              { validateFields && (
                <span
                  data-testid="error-msg"
                >
                  Campos inválidos
                </span>
              )}
              <div className="btn-container">
                <button
                  type="button"
                  data-testid="checkout-btn"
                  onClick={ this.validateFormOnClick }
                  className="chk-btn"
                >
                  Finalizar compra
                </button>

              </div>
            </div>
          </form>
          <div
            className="purchase-summary"
          >
            <p>Resumo da compra</p>
            <div>
              { itemsToShow.map((item) => {
                const { id, price, thumbnail, title } = item;
                return (
                  <div key={ id }>
                    <p>{ title }</p>
                    <img
                      src={ thumbnail }
                      alt={ title }
                    />
                    <span>
                      { price.toLocaleString('pt-BR',
                        { style: 'currency',
                          currency: 'brl',
                          minimumFractionDigits: 2 }) }

                    </span>
                    <span>
                      Quantidade:
                      { getCartItemQuantity(id) }
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              Total:
              { totalPrice().toLocaleString('pt-BR',
                { style: 'currency',
                  currency: 'brl',
                  minimumFractionDigits: 2 }) }
            </div>
          </div>
          {/* <Link
            to="/carrinho"
          >
            <p>Voltar para o carrinho</p>
          </Link> */}
        </div>
      );
    }
}

Checkout.propTypes = {
  getCartItemQuantity: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
