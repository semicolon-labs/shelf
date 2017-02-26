/**
 * This is the router file.
 * It manages all routing and directing!
*/

//Include modules
var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../logic/User');
var Product = require('../logic/Product');
var sessionManager = require('../logic/sessionManager');
var dataManager = require('../data/dataManager');

//www.example.com/public/?filePath=js/jquery.js
router.get('/public', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/', req.query.filePath));
});

/** TEST ROUTE */
router.get('/test-product', function(req, res){
	res.sendFile(path.join(__dirname, '/../templates', 'product.html'));
});

/** SESSION routes */
router.post('/login', function(req ,res){
	sessionManager.login(req, res);
});

router.get('/logout', function(req ,res){
	sessionManager.logout(req, res);
});

router.get('/check-login', function(req, res){
	sessionManager.checkLogin(req, res);
});

/** DATA routes */
router.get('/get-cities', function(req, res){
	dataManager.getCities(req, res);
});

//INDEX redirection for / or any invalid url
router.get('/*', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/html/index.html'));
});

module.exports = router;
