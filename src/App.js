import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {

    constructor(){
        super()
        this.state = {
            query: '',
            search: []
        }
        //this.query=''

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + this.state.query)
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
        axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + id)
            .then(response => console.log(response))
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleClick}>
            <input name="query" onChange={this.handleChange} value={this.state.query} type="text" placeholder="Busqueda"/>
            <button type="submit" className="btn light-blue darken-4">buscar</button>
        </form>

        {
            this.state.search.map(search => {
                return (
                    <tr key={search._id}>

                            <td>
                                <a onClick={() => this.detailProduct(search._id)}>
                                    {search.title}
                                </a>
                            </td>
                            <td>
                                <a onClick={() => this.detailProduct(search._id)}>
                                    {search.price}
                                </a>
                            </td>
                    </tr>
                )
            })
        }

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
