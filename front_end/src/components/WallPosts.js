import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import user from './styles/man.png';
import './../components/styles/content_styling.css';

//Creates a class called wallposts which will extend from the react component
class WallPosts extends React.Component {
    //this will render the list of posts to be display for the users friends
    render() {
        return (
            <div className="card center_products">
                <div className="card-header">
                    <img src={user} height="50px" width="50px" />
                    <b>&nbsp;&nbsp;Posted by:</b> {this.props.prod.first} {this.props.prod.last}
                </div>
                <div className="card-body">
                    <h4 className="card-text">{this.props.prod.name}</h4>
                    <img src={this.props.prod.largeImage} alt="product image" />
                    <p className="card-text"> <b>Description:</b> {this.props.prod.longDescription}</p>
                    <p className="card-text"> <b>Customer Rating:</b> {this.props.prod.customerReviewAverage}</p>
                    <p className="card-text"> <b>Condition:</b> {this.props.prod.condition}</p>
                    <p className="card-text"> <b>Price:</b> ${this.props.prod.salePrice}</p>
                    <a href={this.props.prod.url} className="btn btn-primary">Buy now</a>
                </div>
            </div>
        )
    }
}

//exports the wall of posts to the main component for displaying purposes
export default WallPosts;