import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import axios from 'axios';


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
        axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + this.state.query+'&limit=4')
            .then(response => {
                console.log('res')
                console.log(response)
                this.setState({search: response.data.results})
                this.setState({filters: response.data.filters})
                console.log('y la data?')
                console.log(this.state.search)
            })
        e.preventDefault();
    }

    detailProduct(id){
        console.log('id')
        console.log(id)
        axios.get('https://api.mercadolibre.com/items/'+id)
            .then(response => {
                this.setState({item: response.data})
                console.log(this.state.item)
            });
        axios.get('https://api.mercadolibre.com/items/'+id+'/description')
        .then(response => {
            this.setState({itemDescription: response.data})
            console.log(this.state.itemDescription)
        })
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    hasFreeShipping(show){
        if(show){
            return(
                <div className="free-shipping">Envio Gratis</div>
            )
        }
    }

    showCategories(){
        return this.state.filters.map(filter => {
            if(filter.id == "category") {
                return filter.values.map(value =>{
                     return value.path_from_root.map(category => {
                        return(<span>{category.name}</span>)
                    })
                })
            }
        })
    }


  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}


        <nav className="navbar navbar-expand-lg">
            <div className="container col-md-10">
                <a className="navbar-brand col-1" href="/">
                    Mercado Libre Argentina - Donde comprar y vender de todo
                </a>
                <form  onSubmit={this.handleClick} className="input-group col-11">
                    <input type="text" name="query" onChange={this.handleChange} value={this.state.query} className="form-control" placeholder="Nunca dejes de buscar" autocomplete="off"/>
                    <div className="input-group-append">
                        <button className="btn" onClick={this.handleClick} type="button">Buscar</button>
                    </div>
                </form>
            </div>
        </nav>
        <div className="container">
            <div className="row">
                <div className="categories">
                    {
                        this.showCategories()
                    }
                </div>
                <div className="list-items col-12">
                    {
                        this.state.search.map(search => {
                            return (
                                <div className="item row" key={search.id}>
                                    <figure className="figure col-3">
                                        <img src={search.thumbnail} alt="" className="img-fluid"/>
                                    </figure>
                                    <div className="info col-9">
                                        <span className="price">
                                            <a onClick={() => this.detailProduct(search.id)}>
                                                ${search.price}
                                            </a>
                                            {this.hasFreeShipping(search.shipping.free_shipping)}
                                        </span>
                                        <span className="zone text-rigth">Capital</span>
                                        <h2 className="title">
                                            <a onClick={() => this.detailProduct(search.id)}>
                                                {search.title}
                                            </a>
                                        </h2>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
