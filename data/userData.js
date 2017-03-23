/**
 * @author: Shubham Sharma
 * 
 * This file accounts for all user related database transactions
 * Implements
 * 1. checkUserExists()
 * 2. getUniversityId()
 */

//Include modules
var pool = require('./dataPooler');
var config = require('./../config/config.js');

/**
 * If user details does not exist in the database, create new user.
 */
function checkUserExists(userInfo, callback){
  getUniversityId(userInfo.domain, function(id){
      pool.none(`INSERT INTO shelf.users(username, email, uid) 
                    SELECT $1, $2, $3
                    WHERE NOT EXISTS(
                      SELECT username, email FROM shelf.users WHERE email = $2
                    )`, [userInfo.username, userInfo.email, id])
      .then(function(){
        callback("done");
      })
      .catch(function(error){
        console.log(error);
        callback("error");
      });
  });
}

/**
 * Returns university id from domain
 */
function getUniversityId(domain, callback){
  pool.one('SELECT id FROM shelf.universities WHERE domain=$1', [domain])
  .then(function(data){
    callback(data.id);
  })
  .catch(function(error){
    callback("error");
  });
}

module.exports = {getUniversityId: getUniversityId,
                  checkUserExists: checkUserExists}