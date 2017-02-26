/**
* This file accounts for all database transactions
* Implements
* 1. getCities()
* 2. getClients()
*/

//Include modules
var pgp = require('pg-promise')();
var config = require('./../config/config.js');

//POOL config
var pool = pgp(config.DBMS_CONFIG);

/**
 * GET request
 * Returns list of cities available
 */
exports.getCities = function(req, res){
  pool.many('SELECT * FROM shelf.cities')
    .then(function(data){
      res.status(config.HTTP_CODES.OK).send(data);
    })
    .catch(function(error){
      console.log(error);
      res.status(config.HTTP_CODES.SERVER_ERROR).send(error);
    });
}

/**
 * GET request with query ?id = xxx
 * Returns client from a particular city
 */
exports.getClients = function(req, res){
  id = req.query.id;
  if(id===undefined)
      res.status(config.HTTP_CODES.BAD_REQUEST).send("Use ?id = xx to get client list");
  else{
      pool.many('SELECT * FROM shelf.clients WHERE "city-id" = $1', id)
        .then(function(data){
            res.status(config.HTTP_CODES.OK).send(data);
        })
        .catch(function(data){
          console.log(error);
          res.status(config.HTTP_CODES.SERVER_ERROR).send(error);
        });
  }
}