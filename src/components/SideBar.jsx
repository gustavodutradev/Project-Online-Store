/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
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
  return (
    <div className="categories-container">
      {
        categoriesList.map((category) => (

          <button
            key={ category.id }
            type="button"
            data-testid="category"
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

export default SideBar;
