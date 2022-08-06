import React, { Component } from 'react';
import * as api from '../services/api';

class Content extends Component {
  state = {
    searchInput: '',
    clickSearch: false,
    searchResult: [],
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  searchRequest = async () => {
    const { searchInput } = this.state;
    const request = await api.getProductsFromCategoryAndQuery('', searchInput);
    const { results } = await request;

    let arrayOfItens = 'Nenhum produto foi encontrado';

    if (results.length > 0) {
      arrayOfItens = results.map((product) => (
        <div key={ product.id } data-testid="product">
          <div>
            <img
              src={ product.thumbnail }
              alt={ product.title }
            />
          </div>
          { product.title }
          <br />
          { product.price
            .toLocaleString('pt-BR',
              { style: 'currency',
                currency: product.currency_id,
                minimumFractionDigits: 2 }) }
        </div>
      ));
    }

    this.setState({
      searchResult: arrayOfItens,
      clickSearch: true,
    });
  }

  render() {
    // Input Handler - Checker
    const { searchInput, searchResult, clickSearch } = this.state;
    const searchMinLimit = 0;
    const searchRule = searchInput.length > searchMinLimit;

    return (
      <div>
        <label htmlFor="home-initial-message">
          <input
            type="text"
            id="home-initial-message"
            onChange={ this.handleChange }
            placeholder="Digite aqui"
            data-testid="query-input"
          />
        </label>
        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.searchRequest }
        >
          Buscar
        </button>
        {searchRule ? '' : (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        { clickSearch && searchResult }
      </div>
    );
  }
}

export default Content;
