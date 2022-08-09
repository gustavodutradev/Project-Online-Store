/* eslint-disable react/no-unused-state */
// Main Imports
import React from 'react';
import './App.css';
// Logic Imports
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import * as api from './services/api';
// Component Imports
import Carrinho from './components/Carrinho';
import Content from './components/Content';
import SideBar from './components/SideBar';
import Header from './components/Header';

class App extends React.Component {
  state = {
    searchInput: '',
    clickSearch: false,
    searchResult: {
      results: [],
    },
    cartList: [],
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  addToCart = ({ target }) => {
    const { searchResult, cartList } = this.state;
    const { results } = searchResult;
    const productAddedToCart = results
      .filter((productItem) => productItem.id === target.id);
    this.setState({ cartList: [...cartList, ...productAddedToCart] });
  }

  searchRequest = async () => {
    const { searchInput } = this.state;
    const request = await api.getProductsFromCategoryAndQuery('', searchInput);

    this.setState({
      searchResult: request,
      clickSearch: true,
    });
  }

  setFilterCategory = async (categoryId) => {
    const { searchInput } = this.state;
    const request = await api.getProductsFromCategoryAndQuery(categoryId, searchInput);

    this.setState({
      searchResult: request,
      clickSearch: true,
    });
  }

  render() {
    const { searchInput, searchResult, clickSearch, filter, cartList } = this.state;

    return (
      <BrowserRouter>
        <h1>Front-end Online Store</h1>
        <div className="header">

          <Header
            handleChange={ this.handleChange }
            searchRequest={ this.searchRequest }
          />
        </div>
        <div className="page-body">
          <Switch>
            <Route exact path="/">
              <SideBar
                setFilterCategory={ this.setFilterCategory }
              />
              <Content
                searchInput={ searchInput }
                searchResult={ searchResult }
                filter={ filter }
                clickSearch={ clickSearch }
                addToCart={ this.addToCart }
              />
            </Route>
            <Route exact path="/carrinho">
              <Carrinho
                cartList={ cartList }
              />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
