
// Import necessary files
import React from 'react';
import Product from './Product';

// We use a product list to display multiple products to the page
const ProductList = (props) => {
    // Simple map function which is native to JS. Used to render a Product component with the values
    // passed back by the JSON object
    const listOfProducts = props.productList.map((prod) => {
        return <Product key={prod.sku} prod={prod} />
    });

    return (
        <div>
            {listOfProducts}
        </div>
    )
}

//exports the ProductList for use in other components
export default ProductList;