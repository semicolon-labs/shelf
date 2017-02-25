/**
 * This is the router file.
 * It manages all routing and directing!
*/

var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../logic/User');
var Product = require('../logic/Product');
var sessionManager = require('../logic/sessionManager');

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/html/index.html'));
});

router.get('/public/js/:fileName', function(req, res){
	res.sendFile(path.join(__dirname, '/../public/js', req.params.fileName));
});

/**router.get('/test', function(req, res){
	var Shubham = new User("16BLC1041", "Shubham", "shubhamsharma1172@gmail.com", "VIT Chennai", "8272980776");
	var Book1 = new Product("00001", Shubham, "Computer Science with Java", "IMAGE", "It is a XIIth standard book",
	 												"Computer Science", 500, Product.CONDITION_GOOD, Product.NEGOTIABLE_YES);
	res.send(Book1.getDetails());
});

router.get('/get-time', function(req, res){
	res.send(new Date(new Date().getTime()).toUTCString());
});

router.get('/test-product', function(req, res){
	res.sendFile(path.join(__dirname, '/../templates', 'product.html'));
});*/

/** Session stuff */
router.post('/login', function(req ,res){
	sessionManager.login(req, res);
});

router.get('/logout', function(req ,res){
	sessionManager.logout(req, res);
});

router.get('/check-login', function(req, res){
	sessionManager.checkLogin(req, res);
});

module.exports = router;
