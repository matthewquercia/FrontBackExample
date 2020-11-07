import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
// Import our necessary files as well as packages for use within our app
import ProductList from './ProductList';
import * as bby from './../API/bestbuyAPI';
import axios from "axios";

// create a class component that extends the react component so that we can use its methods ex. render()
class App extends React.Component {
    state = { products: [] };

    // Make a call to our server using a fetch method to retrieve user data
    getDataFromDb = () => {
        fetch("http://localhost:3001/api/getData")
            .then(data => data.json())
            .then(res => console.log(res.data));
    };

    componentDidMount = () => {
        this.onTermSubmit("Samsung");
    }

    // This method is used to pass the search string from the search bar into the bby.searchproducts API
    // which we exported from the bestBuyAPI.js file
    onTermSubmit = (prod) => {
        bby.searchProducts(prod, (data) => {
            this.setState({ products: data.products });
        });
        this.getDataFromDb();
    };

    // Render our combined components
    render() {
        return (
            <div>
                <NavBar onFormSubmit={this.onTermSubmit} usersEmailAddress={this.props.usersEmailAddress} />
                <ProductList productList={this.state.products} />
                <Footer />
            </div>
        )
    }
}

export default App;