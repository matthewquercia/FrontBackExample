
// Import necessary files
import React from 'react';
import axios from 'axios';

import './../components/styles/content_styling.css';

// This is the HTML we use for an individual products. We pass the props variable to this component
// which is really just the state from app.js
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = { product: this.props.prod };
    }

    //Used to share the post by adding the post to the users Post array in the DB
    sharePost = () => {
        axios.post("http://localhost:3001/api/addPost", {
            post: this.state.product
        });
        alert("Shared post!");
    }

    //renders the html needed to view the product information
    render() {
        return (
            <div className="card center_products">
                <div className="card-header">
                    <b>{this.props.prod.name}</b>
                </div>
                <div className="card-body">
                    <img src={this.props.prod.largeImage} alt="product image" />
                    <p className="card-text"> <b>Description:</b> {this.props.prod.longDescription}</p>
                    <p className="card-text"> <b>Customer Rating:</b> {this.props.prod.customerReviewAverage}</p>
                    <p className="card-text"> <b>Condition:</b> {this.props.prod.condition}</p>
                    <p className="card-text"> <b>Price:</b> ${this.props.prod.salePrice}</p>
                    <a href={this.props.prod.url} className="btn btn-primary">Buy now</a>
                    <input onClick={() => this.sharePost()} className="btn btn-primary button-padding25" type="submit" value="Share Deal" />
                </div>
            </div >
        )
    }
}

//exports the product component for use in other comps
export default Product;