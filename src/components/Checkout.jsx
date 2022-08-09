import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
      const { getCartItemQuantity } = this.props;
      return (
        <form>
          <br />
          <br />
          <fieldset>
            <p>Resumo da compra</p>
            <section>
              { itemsToShow.map((item) => {
                const { id, price, thumbnail, title } = item;
                return (
                  <section key={ id }>
                    <p>{ title }</p>
                    <img
                      src={ thumbnail }
                      alt={ title }
                    />
                    <span>{ price }</span>
                    <br />
                    <span>{ getCartItemQuantity(id) }</span>
                  </section>
                );
              })}
            </section>
            <section>
              Total
            </section>
          </fieldset>
          <fieldset>
            <p>Informações do Comprador</p>
            <section>
              <input
                type="text"
                placeholder="Nome Completo"
                data-testid="checkout-fullname"
                name="fullName"
                onChange={ this.handleChange }
              />
            </section>
            <section>
              <input
                type="text"
                placeholder="CPF"
                data-testid="checkout-cpf"
                name="cpf"
                onChange={ this.handleChange }
              />
            </section>
            <section>
              <input
                type="email"
                placeholder="E-mail"
                data-testid="checkout-email"
                name="email"
                onChange={ this.handleChange }
              />
            </section>
            <section>

              <input
                type="text"
                placeholder="Telefone"
                data-testid="checkout-phone"
                name="phone"
                onChange={ this.handleChange }
              />
            </section>
            <section>
              <input
                type="text"
                placeholder="CEP"
                data-testid="checkout-cep"
                name="cep"
                onChange={ this.handleChange }
              />
            </section>
            <section>

              <input
                type="text"
                placeholder="Endereço"
                data-testid="checkout-address"
                name="adress"
                onChange={ this.handleChange }
              />
            </section>
            <br />
            <fieldset>
              <p>Método de Pagamento</p>
              <section>
                <input
                  type="radio"
                  id="boleto"
                  name="paymentType"
                  data-testid="ticket-payment"
                  onChange={ this.handleChange }
                />
                Boleto
                <input
                  type="radio"
                  name="paymentType"
                  data-testid="visa-payment"
                  id="visa"
                  onChange={ this.handleChange }
                />
                <input
                  type="radio"
                  name="paymentType"
                  data-testid="master-payment"
                  id="master"
                  onChange={ this.handleChange }
                />
                <input
                  type="radio"
                  name="paymentType"
                  data-testid="elo-payment"
                  id="elo"
                  onChange={ this.handleChange }
                />

              </section>
            </fieldset>
            <br />
            <section>
              { validateFields && (
                <span
                  data-testid="error-msg"
                >
                  Campos inválidos
                </span>
              )}
              <button
                type="button"
                data-testid="checkout-btn"
                onClick={ this.validateFormOnClick }
              >
                Finalizar compra
              </button>
            </section>
          </fieldset>
          <Link
            to="/carrinho"
          >
            <p>Voltar para o carrinho</p>
          </Link>
        </form>
      );
    }
}

Checkout.propTypes = {
  getCartItemQuantity: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
