import React, { Component } from 'react';

class Content extends Component {
  state = {
    searchInput: '',
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  render() {
    const { searchInput } = this.state;
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
          />
        </label>
        { searchRule ? '' : (
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}

      </div>
    );
  }
}

export default Content;
