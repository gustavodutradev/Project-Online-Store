/* eslint-disable react/no-unused-state */
// Main Imports
import React from 'react';
import './App.css';
// Logic Imports
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import * as api from './services/api';
// Component Imports
import Carrinho from './components/Carrinho';
import Content from './components/Content';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Product from './components/Product';
import Checkout from './components/Checkout';

class App extends React.Component {
  state = {
    searchInput: '',
    clickSearch: false,
    searchResult: {
      results: [],
    },
    cartList: JSON.parse(localStorage.getItem('cart')) || [],
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  updateStorage = () => {
    const { cartList } = this.state;
    localStorage.setItem('cart', JSON.stringify(cartList));
  }

  addToCart = (id) => {
    const { searchResult, cartList } = this.state;
    const { results } = searchResult;
    const productAddedToCart = results
      .filter((productItem) => productItem.id === id);
    this.setState({ cartList: [...cartList, ...productAddedToCart] }, () => {
      this.updateStorage();
    });
  }

  addToCartDetails = (product) => {
    const { cartList } = this.state;
    this.setState({ cartList: [...cartList, product] }, () => {
      this.updateStorage();
    });
  }

  updateCartQuantity = (id, numb, obj) => {
    const { cartList } = this.state;

    // Checa quantos itens tem no carrinho
    const thisProdList = cartList.filter((each) => each.id === id);

    // Pega um dos itens do carrinho
    const indexOfProd = cartList.lastIndexOf(obj);
    console.log(indexOfProd);

    // IF para reduzir
    if (numb < 0 && thisProdList.length > 1) {
      const newArray = cartList.filter((_each, index) => index !== indexOfProd);
      this.setState({
        cartList: newArray,
      });
      return;
    }

    // IF para aumentar
    if (numb > 0) {
      this.setState({ cartList: [...cartList, cartList[indexOfProd]] });
    }
  }

  removeProduct = (id) => {
    const { cartList } = this.state;

    // Pegar todos os itens que não são o removido
    const newProdList = cartList.filter((each) => each.id !== id);

    this.setState({
      cartList: newProdList,
    }, () => {
      this.updateStorage();
    });
  }

  getCartItemQuantity = (id) => {
    const { cartList } = this.state;
    const thisProdList = cartList.filter((each) => each.id === id);
    return thisProdList.length;
  }

  clearCart = () => {
    this.setState({ cartList: [] }, () => {
      this.updateStorage();
    });
  }

  // setStockMaxQuantity = () => {
  //   const { cartList } = this.state;
  //   const { available_quantity } = cartList;
  //   if(qtd produto > que qtd estoque)
  // }

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
    const { searchInput, searchResult, clickSearch, cartList } = this.state;

    return (
      <BrowserRouter>
        <Link to="/">
          <h1>Front-end Online Store</h1>
        </Link>

        <div className="header">

          <Header
            handleChange={ this.handleChange }
            searchRequest={ this.searchRequest }
            cartList={ cartList }
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
                clickSearch={ clickSearch }
                addToCart={ this.addToCart }
              />
            </Route>
            <Route
              exact
              path="/carrinho"
              render={ (props) => (<Carrinho
                { ...props }
                cartList={ cartList }
                updateCartQuantity={ this.updateCartQuantity }
                getCartItemQuantity={ this.getCartItemQuantity }
                removeProduct={ this.removeProduct }
              />) }
            />
            <Route
              exact
              path="/product/:id"
              render={ (props) => (<Product
                { ...props }
                addToCartDetails={ this.addToCartDetails }
              />) }
            />
            <Route
              exact
              path="/checkout"
              render={ (props) => (
                <Checkout
                  { ...props }
                  getCartItemQuantity={ this.getCartItemQuantity }
                  clearCart={ this.clearCart }
                />
              ) }
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
