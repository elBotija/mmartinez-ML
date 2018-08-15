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
            itemDescription:[]
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

            {
                this.state.search.map(search => {
                    return (
                        <div key={search.id}>

                                <span>
                                    <a onClick={() => this.detailProduct(search.id)}>
                                        {search.title}
                                    </a>
                                </span>
                                <span>
                                    <a onClick={() => this.detailProduct(search.id)}>
                                        {search.price}
                                    </a>
                                </span>
                        </div>
                    )
                })
            }
      </div>
    );
  }
}

export default App;
