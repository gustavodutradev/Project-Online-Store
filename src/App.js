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
    searchResult: [],
    cartList: [],
    resultsArray: [],
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  createProductCard = (product) => (
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
      <br />
      <button
        id={ product.id }
        type="button"
        data-testid="product-add-to-cart"
        onClick={ this.addToCart }
      >
        🛒
      </button>
    </div>
  )

  addToCart = ({ target }) => {
    const { resultsArray, cartList } = this.state;
    const productAddedToCart = resultsArray
      .filter((productItem) => productItem.id === target.id);
    this.setState({ cartList: [...cartList, ...productAddedToCart] });
    console.log(resultsArray);
  }

  searchRequest = async () => {
    const { searchInput } = this.state;
    const request = await api.getProductsFromCategoryAndQuery('', searchInput);
    const { results } = await request;
    this.setState({
      resultsArray: results,
    });

    const arrayOfItens = results.map((product) => this.createProductCard(product));

    this.setState({
      searchResult: arrayOfItens,
      clickSearch: true,
    });
  }

  setFilterCategory = async (categoryId) => {
    const { searchInput } = this.state;
    const request = await api.getProductsFromCategoryAndQuery(categoryId, searchInput);
    const { results } = await request;

    const arrayOfItens = results.map((product) => this.createProductCard(product));

    this.setState({
      searchResult: arrayOfItens,
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
