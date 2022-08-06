// Main Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
  render() {
    // Props Import
    const { searchInput, searchResult, clickSearch } = this.props;

    // Input Checker
    const searchMinLimit = 0;
    const searchRule = searchInput.length > searchMinLimit;

    return (
      <div className="search-results">
        {searchRule ? '' : (
          <div data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
        )}
        { clickSearch && (searchResult.length > 0
          ? searchResult
          : <div>Nenhum produto foi encontrado</div>) }
      </div>
    );
  }
}

Content.propTypes = {
  searchInput: PropTypes.string.isRequired,
  searchResult: PropTypes.instanceOf(Array).isRequired,
  clickSearch: PropTypes.bool.isRequired,
};

export default Content;
