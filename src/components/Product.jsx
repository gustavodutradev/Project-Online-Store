/* eslint-disable react/jsx-max-depth */
/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import propTypes from 'prop-types';

const HIGHEST_RATING = 5;

class Product extends Component {
  state = {
    evaluations: [],
    email: '',
    grade: '',
    details: '',
    displayError: false,
  }

  componentDidMount() {
    const { location } = this.props;
    const { state: { thisProd } } = location;
    const { id } = thisProd;

    this.setState({
      evaluations: JSON.parse(localStorage.getItem(id)) || [],
    });
  }

  createEvaluation = (id) => {
    const { email, grade, details } = this.state;

    if (!this.isValidEmail(email)
    || grade.length < 1) {
      this.setState({
        displayError: true,
      });
      return;
    }

    const thisEvaluation = {
      email,
      grade,
      details,
    };

    const previousEvaluationList = JSON.parse(localStorage.getItem(id)) || [];
    const newEvaluationList = [...previousEvaluationList, thisEvaluation];
    localStorage.setItem(id, JSON.stringify(newEvaluationList));
    this.setState({
      displayError: false,
      email: '',
      grade: '',
      details: '',
      evaluations: newEvaluationList,
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      displayError: false,
    });

    const { name } = target;
    const value = target.type === 'radio' ? target.id : target.value;
    this.setState({
      [name]: value,
    });
  }

  isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  mountElement = (array) => {
    const elements = array.map((each, index) => (
      <div key={ index } className="evaluation">
        <div className="evaluation-email-grade">
          <div data-testid="review-card-email" className="evaluation-email">
            { each.email }
          </div>
          <div data-testid="review-card-rating" className="evaluation-grade">
            { each.grade }
          </div>
        </div>
        <div data-testid="review-card-evaluation" className="evaluation-details">
          { each.details }
        </div>
      </div>));
    return elements;
  }

  render() {
    const { evaluations, email, details, displayError } = this.state;

    const { location, addToCartDetails } = this.props;
    const { state: { thisProd } } = location;
    const { title, thumbnail, price, id, shipping } = thisProd;
    const { free_shipping: freeShipping } = shipping;

    let evaluationsToShow = [];
    if (evaluations.length > 0) {
      evaluationsToShow = this.mountElement(evaluations);
    }

    const radioInputs = [];

    for (let i = 1; i <= HIGHEST_RATING; i += 1) {
      const thisRadio = (
        <label key={ i } htmlFor={ i } className="label-checkbox">
          <input
            type="radio"
            name="grade"
            id={ i }
            data-testid={ `${i}-rating` }
            onChange={ this.handleChange }
          />
          { i }
        </label>

      );
      radioInputs.push(thisRadio);
    }

    const TITLE_LENGTH = 85;

    return (
      <div className="main-product-container">
        <div className="product-container">
          <section className="photo-and-product">
            <img
              src={ thumbnail }
              alt={ title }
              data-testid="product-detail-image"
              className="product-image"
            />
            <div className="title-price-button">
              <div className="free-shipping">
                { freeShipping && (<span data-testid="free-shipping">FRETE GRÁTIS</span>) }
              </div>
              <p data-testid="product-detail-name" className="product-title-details">
                { title.length > TITLE_LENGTH ? `${title.slice(0, TITLE_LENGTH)}...` : title }
              </p>
              <p data-testid="product-detail-price" className="product-price-details">
                { price.toLocaleString('pt-BR',
                  { style: 'currency',
                    currency: 'brl',
                    minimumFractionDigits: 2 }) }
              </p>
              <button
                id={ id }
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ () => addToCartDetails(thisProd) }
                className="add-cart-button details-btn"
              >
                Adicionar ao carrinho
              </button>
            </div>
          </section>

          <section className="evaluations-section">
            <div className="evaluations-div">
              { evaluationsToShow.length < 1 && (
                <span className="evaluation-title">
                  Este produto ainda não possui avaliações.
                  <br />
                  Faça a primeira!
                </span>) }
              { evaluationsToShow }
              <span className="white-shadow">______________________________________________</span>
            </div>

            <form className="evaluations-form">

              <div className="email-checkbox-div">
                <input
                  type="email"
                  data-testid="product-detail-email"
                  name="email"
                  id="email"
                  value={ email }
                  placeholder="Seu e-mail"
                  onChange={ this.handleChange }
                  className="email-input input"
                />
                { radioInputs }
              </div>

              <textarea
                data-testid="product-detail-evaluation"
                cols="30"
                rows="7"
                name="details"
                value={ details }
                placeholder="Faça sua avaliação desse produto!"
                onChange={ this.handleChange }
                className="textarea input"
              />
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ () => this.createEvaluation(id) }
                className="add-cart-button evaluation-btn"
              >
                Enviar
              </button>
              <div className="invalid-fields">
                { displayError && (<span data-testid="error-msg">Campos inválidos</span>) }
              </div>
            </form>
          </section>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  location: propTypes.instanceOf(Object).isRequired,
  addToCartDetails: propTypes.func.isRequired,
};

export default Product;
