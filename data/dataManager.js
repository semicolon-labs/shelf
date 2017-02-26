/**
* This file accounts for all database transactions
* Implements
* 1. getCities()
*/

//Include modules
var pgp = require('pg-promise')();
var config = require('./../config/config.js');

//POOL config
var pool = pgp(config.DBMS_CONFIG);

exports.getCities = function(req, res){
  pool.many("SELECT * FROM shelf.cities")
    .then(function(data){
      res.status(200).send(data);
    })
    .catch(function(error){
      console.log(error);
      res.status(500).send(error);
    });
}
