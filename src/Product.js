import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './Product.scss';
import axios from 'axios';

class Product extends Component {

    constructor(){
        super()
        this.state = {
            query: '',
            search: [],
            item:[],
            itemDescription:'',
            filters:[],
            image:'',
            price_significants: '0',
            price_decimals: '00'
        }

    }
    componentDidMount(){
        this.detailProduct(this.props.match.params.id)
    }

    detailProduct(id){
        axios.get('https://api.mercadolibre.com/items/'+id)
            .then(response => {
                this.setState({item: response.data, image: response.data.pictures[0].url})
                this.parsePrice(response.data.price.toString())
                console.log(response.data)
                axios.get('https://api.mercadolibre.com/items/'+id+'/description')
                .then(response => {
                    this.setState({itemDescription: response.data.plain_text})
                    this.setState({ search: [], filters:[] })
                })
            });
    }

    parsePrice(price){
        var values = Number(price).toFixed(2).split('.')
        var significant = values[0];
        var decimals = values[1];
        this.setState({price_significants: this.parseThousands(significant), price_decimals: decimals})
    }

    parseThousands(price) {
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(price))
            price = price.replace(pattern, "$1.$2");
        return price;
    }

    conditionProduct(){
        let value = 'Usado'
        if(this.state.item.condition === "new"){
            value = 'Nuevo'
        }
        return value
    }

    render() {
        return (

            <div className="container">
                 <div className="row">
                     <div className="categories">
                        <span>Celulares y Teléfonos</span>
                        <span>Celulares y Smartphones</span>
                        <span>iPhone</span>
                     </div>
                     <div className="product col-12">
                         <div className="row">
                             <div className="col-8">
                                 <figure>
                                     <img src={this.state.image} alt="" className="img-fluid w-100"/>
                                 </figure>
                                 <div className="description">
                                     <span>Descripción del producto</span>
                                     <p>{this.state.itemDescription}</p>
                                 </div>
                             </div>
                             <div className="col-4">
                                 <span className="condition">{this.conditionProduct()}</span> - <div className="sales">{this.state.item.sold_quantity
                                 } vendidos</div>
                                 <h2 className="title">{this.state.item.title}</h2>
                                 <span className="price">${this.state.price_significants} <small>{this.state.price_decimals}</small></span>
                                 <button className="btn buy">Comprar</button>
                             </div>
                         </div>
                     </div>

                 </div>
             </div>
        )
    }
}

export default Product;
