// Import necessary files
import React from 'react';
import StandardNavBar from './StandardNavBar';
import Footer from './Footer';
import Product from './Product';
import WallPosts from './WallPosts';
import axios from 'axios';

// We use a product list to display multiple products to the page
class WallPostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { listOfPosts: [] };
    }
    // Simple map function which is native to JS. Used to render a Product component with the values
    // passed back by the JSON object
    getAllPosts = () => {
        var listOfWallPosts = [];
        return listOfWallPosts = this.state.listOfPosts.map((prod) => {
            return <WallPosts key={prod.sku} prod={prod} />
        });
    }

    //This function will get all the data needed for the wall post by using a fetch request
    componentDidMount = () => {
        // fetch("http://localhost:3001/api/getFriendPosts").then(data => data.json())
        //     .then(res => {
        //         this.setState({ listOfPosts: res.data })
        //         console.log(this.state.listOfPosts);
        //         this.getAllPosts();
        //     });
        fetch("http://localhost:3001/api/getData").then(data => data.json())
            .then(res => {
                var data = res.data;
                var post = [];
                data.forEach(function (user) {
                    if (user.LoggedIn === true) {
                        post = user.Posts;
                    }
                });
                this.setState({ listOfPosts: post });
                console.log(this.state.listOfPosts);
                this.getAllPosts();
            });
    }

    //This will render all the wall posts that the logged in users friends have
    render() {
        return (
            <div>
                {this.getAllPosts()}
            </div>
        )
    }
}

//exports the wallpostlist for use in other components
export default WallPostList;