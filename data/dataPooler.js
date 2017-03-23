/**
 * @author: Shubham Sharma
 * 
 * Common pool file for all database transactions
 */

//Include modules
var pgp = require('pg-promise')();
var config = require('./../config/config.js');
pool = pgp(config.DBMS_CONFIG);

module.exports = pool;