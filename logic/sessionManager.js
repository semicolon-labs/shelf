/**
  * @author: Shubham Sharma
  *  
  * This is the session management file
  * accounts for the user session management.
  * GAPI authentication; Cookie management;
  * Implements
  * 1. login()
  * 2. logout()
  * 3. checkLogin()
  * 4. verifyToken()
  * 5. checkLoginInternal()
  * 6. getUserDetails()
*/

//Include modules
var config = require('./../config/config.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var userData = require("./../data/userData");

/**
 * POST request with token, domain in body
 * Adds auth cookie if token and domain are verified
 * If user does not exists make a new user in the database
 */
exports.login = function(req, res){
  var token = req.body.idtoken;
  //token verification
  verifyToken(token, function(status){
    if(status){
      req.session.auth = {userToken: token};
      //fetch user details
      getUserDetails(req, function(userData){
        //add user if it does not exists
        userData.checkUserExists(userData, function(info){
          if(info=="error")
            res.status(config.HTTP_CODES.SERVER_ERROR).send("Error");
          else{
            res.status(config.HTTP_CODES.OK).send("Login successfull");
          }
        });
      });
    }else{
      res.status(config.HTTP_CODES.FORBIDDEN).send("Invalid token");
    }
  });
}

/**
 * Makes a call to googleapis and gets token info
 * Returns username, id and email of the user
 */
function getUserDetails(req, callback){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+req.session.auth.userToken);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if(xhr.readystate == XMLHttpRequest.DONE){
        if(xhr.status===config.HTTP_CODES.OK){
          var raw = JSON.parse(xhr.responseText);
            details = {username: raw.given_name,
                        email: raw.email,
                        domain: raw.hd
                      };
            callback(details);
        }else {
          console.log("Status not 200")
          callback("Error");
        }
    }
  };
  xhr.send();
}

/**
 * Verifies the token from googleapis
 * Checks client id and hosted domain for the request
 */
function verifyToken(token, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+token);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      //200 is verified and 400 is error
      if(xhr.readystate == XMLHttpRequest.DONE){
          if(xhr.status===config.HTTP_CODES.OK){
              var raw = JSON.parse(xhr.responseText);
              userData.getUniversityId(raw.hd, function(id){
                if(id==="error"){
                  callback(false);
                }
                else if(raw.email_verified==="true"&&raw.aud===config.GAPI_CLIENT_ID){
                  callback(true);
                }else {
                  callback(false);
                }
              });
          }else {
            callback(false);
          }
      }
    };
    xhr.send();
}

/**
 * GET request to logout
 * Deletes auth cookie
 */
exports.logout = function(req, res){
  if(req.session&&req.session.auth&&req.session.auth.userToken){
      delete req.session.auth;
      res.status(config.HTTP_CODES.OK).send("Logged out!");
  }
  else
    res.status(config.HTTP_CODES.FORBIDDEN).send("First log in to log out!")
}

/**
 * GET request to check log in
 * Returns user information if logged in
 */
exports.checkLogin = function(req, res){
  if(req.session&&req.session.auth&&req.session.auth.userToken){
    getUserDetails(req, function(data){
      if(data==="Error")
        res.status(config.HTTP_CODES.SERVER_ERROR).send("Error");
      else
        res.status(config.HTTP_CODES.OK).send(data);
    });
  }else
    res.status(config.HTTP_CODES.FORBIDDEN).send("False");
}
