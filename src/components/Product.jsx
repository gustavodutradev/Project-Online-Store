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
      <div key={ index }>
        <div data-testid="review-card-email">
          { each.email }
        </div>
        <div data-testid="review-card-rating">
          { each.grade }
        </div>
        <div data-testid="review-card-evaluation">
          { each.details }
        </div>
        <br />
      </div>));
    return elements;
  }

  render() {
    const { evaluations, email, grade, details, displayError } = this.state;

    const { location, addToCartDetails } = this.props;
    const { state: { thisProd } } = location;
    const { title, thumbnail, price, id } = thisProd;

    let evaluationsToShow = [];
    if (evaluations.length > 0) {
      evaluationsToShow = this.mountElement(evaluations);
    }

    const radioInputs = [];

    for (let i = 1; i <= HIGHEST_RATING; i += 1) {
      const thisRadio = (
        <label key={ i } htmlFor={ i }>
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
        <form>
          <input
            type="email"
            data-testid="product-detail-email"
            name="email"
            id="email"
            value={ email }
            placeholder="Seu e-mail"
            onChange={ this.handleChange }
          />
          { radioInputs }
          <br />
          <textarea
            data-testid="product-detail-evaluation"
            cols="30"
            rows="10"
            name="details"
            value={ details }
            placeholder="Faça sua avaliação desse produto!"
            onChange={ this.handleChange }
          />
          <br />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ () => this.createEvaluation(id) }
          >
            Enviar
          </button>
        </form>
        <div>
          { displayError && (<span data-testid="error-msg">Campos inválidos</span>) }
        </div>
        <div>
          Avaliações:
          { evaluationsToShow }
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
