import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './ProductList.scss';
import axios from 'axios';

class ProductList extends Component {

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
    componentDidMount(){
        this.handleClick(this.props.match.params.query)
    }

    handleClick(query){
        axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + query+'&limit=4')
            .then(response => {
                this.setState({search: response.data.results})
                this.setState({filters: response.data.filters})
            })
    }

    detailProduct(id){
        axios.get('https://api.mercadolibre.com/items/'+id)
            .then(response => {
                this.setState({item: response.data})
                axios.get('https://api.mercadolibre.com/items/'+id+'/description')
                .then(response => {
                    this.setState({itemDescription: response.data})
                    this.setState({ search: [], filters:[] })
                })
            });
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
                        return(<span key={category.id}>{category.name}</span>)
                    })
                })
            }
        })
    }

    parsePrice(price){
        var values = Number(price).toFixed(2).split('.')
        var significant = this.parseThousands(values[0]);
        var decimals = values[1];
        return (
            <span>${significant}<small>{decimals}</small></span>
        )
    }

    parseThousands(price) {
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(price))
            price = price.replace(pattern, "$1.$2");
        return price;
    }

  render() {
    return (
      <div className="ProductList">
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
                                <Link to={`/items/${search.id}`} key={search.id}>
                                    <div className="item row">
                                        <figure className="figure col-auto">
                                            <img src={search.thumbnail} alt="" className="img-fluid"/>
                                        </figure>
                                        <div className="info col">
                                            <span className="price">
                                                {this.parsePrice(search.price)}
                                                {this.hasFreeShipping(search.shipping.free_shipping)}
                                            </span>
                                            <span className="zone text-rigth">Capital</span>
                                            <h2 className="title">
                                                {search.title}
                                            </h2>
                                        </div>
                                    </div>
                                </Link>
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


export default ProductList;
