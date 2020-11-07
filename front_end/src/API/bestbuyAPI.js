
// Import the best buy API for use and store the package in bby

// Make a call the the API by using the build in products method that comes with the best by API
// We then export the function for use in our front end
export function searchProducts(searchTerm, callback) {
    bby.products(`search=${searchTerm}`, { show: 'url,largeImage,longDescription,customerReviewAverage,condition,sku,name,salePrice' }).then(function (data) {
        callback(data);
    });
}
