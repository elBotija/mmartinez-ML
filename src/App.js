import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import ProductList from './ProductList.js';
import Product from './Product.js';

class App extends Component {

    constructor(){
        super()
        this.state = {
            query: '',
            search: [],
            item:[],
            itemDescription:[],
            filters:[]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        this.props.history.push(`/items？search=${this.state.query}`)
        e.preventDefault()
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg">
            <div className="container col-md-10">
                <a className="navbar-brand" href="/">
                    Mercado Libre Argentina - Donde comprar y vender de todo
                </a>
                <form onSubmit={this.handleClick} className="input-group">
                    <input type="text" name="query" onChange={this.handleChange} value={this.state.query} className="form-control" placeholder="Nunca dejes de buscar" autoComplete="off"/>
                    <div className="input-group-append">
                        <button className="btn" onClick={this.handleClick} type="button"></button>
                    </div>
                </form>
            </div>
        </nav>
        <div className="container">
            <div className="row">
                <Route path="/items？search=:query" component={ProductList}/>
            </div>
        </div>
        <Route path="/items/:id" component={Product}/>
      </div>
    );
  }
}

export default withRouter(App);
