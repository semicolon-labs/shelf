/**
  * This is the session management class
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
var config = require('./../config/config.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.login = function(req, res){
  var token = req.body.idtoken;
  verifyToken(token, function(status){
    if(status){
      req.session.auth = {userToken: token};
      res.status(200).send("Login successfull");
    }else{
      res.status(403).send("Invalid token");
    }
  });
}

function getUserDetails(req, callback){
  if(checkLoginInternal(req)){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+req.session.auth.userToken);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      if(xhr.readystate == XMLHttpRequest.DONE){
          if(xhr.status===200){
            var raw = JSON.parse(xhr.responseText);
              details = {username: raw.given_name,
                          id: raw.family_name,
                          email: raw.email};
              callback(details);
          }else {
            console.log("Status not 200")
            callback("Error");
          }
      }
    };
    xhr.send();
  }else {
    console.log("CHECKINTERNALFALSE");
    callback("Error");
  }
}

exports.checkLogin = function(req, res){
    if(checkLoginInternal(req)){
        getUserDetails(req, function(details){
          if(details==="Error")
            res.status(500).send("Error");
          else
            res.status(200).send(details);
        });
    }
    else
      res.status(403).send("false");
}

function checkLoginInternal(req){
  if(req.session&&req.session.auth&&req.session.auth.userToken)
      return true;
  return false;
}

function verifyToken(token, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+token);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      //200 is verified and 400 is error
      if(xhr.readystate == XMLHttpRequest.DONE){
          if(xhr.status===200){
              var raw = JSON.parse(xhr.responseText);
              if(raw.email_verified==="true"&&raw.aud===config.GAPI_CLIENT_ID&&raw.hd==="vitstudent.ac.in"){
                callback(true);
              }else {
                callback(false);
              }
          }else {
            callback(false);
          }
      }
    };
    xhr.send();
}

exports.logout = function(req, res){
  if(checkLoginInternal(req)){
    delete req.session.auth;
    res.status(200).send("Logged out!");
  }
  else
    res.status(403).send("First log in to log out!")
}
