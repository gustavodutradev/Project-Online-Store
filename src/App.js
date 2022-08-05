import React from 'react';
import './App.css';
import CarrinhoDeCompra from './components/BotaoDoCarrinho';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Front-end Online Store</h1>
        <Router>
          <Content />
          <CarrinhoDeCompra />
          <Route path=>

          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
