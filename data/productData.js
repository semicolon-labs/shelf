/**
 * @author: Shubham Sharma
 * 
 * This file accounts for all products related database transactions
 * Implements
 * 1. getProducts()
 * 2. addProduct()
 * 3. editProduct()
 * 4. deleteProduct()
 * 5. viewProduct()
 */

//Include modules
var pool = require('./dataPooler');
var config = require('./../config/config.js');

/**
 * Fetches product list from the database
 */
function getProducts(limit, callback){
    pool.any(`SELECT id, name, userid, author, datetime from shelf.products
                ORDER BY datetime DESC
                LIMIT $1 `, [limit])
    .then(function(data){
        if(data.length==0)
            callback("There are no products available!");
        else
            callback(data);
    })
    .catch(function(error){
        console.log(error);
        callback("Error");
    });
}

module.exports = {getProducts: getProducts};