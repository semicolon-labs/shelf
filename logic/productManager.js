/**
 * @author: Shubham Sharma
 * 
 * This is the product management file
 * accounts for product adding, removal, editing and fetching
 * Implements
 * 1. getProducts()
 * 2. addProduct()
 * 3. deleteProduct()
 * 4. editProduct()
 * 5. viewProduct()
 */

//Include modules
var config = require('./../config/config.js');
var productData = require('./../data/productData');

/**
 * Gets product list from the database
 * Limits to /limit=? products. 
 * DEFAULT: 10 and MAX: 20
 */
function getProducts(req, res){
    var limit = req.query.limit;
    //check for query parameter
    if(limit&&!isNaN(limit)&&limit<=20&&limit>0){
        productData.getProducts(limit, function(data){
            if(data==="Error")
                res.status(config.HTTP_CODES.SERVER_ERROR).send("Error fetching data");
            else
                res.status(config.HTTP_CODES.OK).send(JSON.stringify(data));
        });
    }else{
        res.redirect("/get-products?limit=10");
    }
}

module.exports = {getProducts: getProducts};