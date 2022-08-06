/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class SideBar extends Component {
  state = {
    categoriesList: [],
  }

  componentDidMount() {
    this.getCategoriesResponse();
  }

getCategoriesResponse = async () => {
  const categories = await api.getCategories();
  this.setState({ categoriesList: categories });
}

render() {
  const { categoriesList } = this.state;
  const { setFilterCategory } = this.props;
  return (
    <div className="categories-container">
      {
        categoriesList.map((category) => (

          <button
            key={ category.id }
            type="button"
            data-testid="category"
            onClick={ () => setFilterCategory(category.id) }
          >
            {' '}
            { category.name }
            {' '}
          </button>
        ))
      }
    </div>
  );
}
}

SideBar.propTypes = {
  setFilterCategory: PropTypes.func.isRequired,
};

export default SideBar;
