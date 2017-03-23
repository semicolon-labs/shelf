/**
 * @author: Shubham Sharma
 * 
 * Setup file of the app.
 */

//Include modules
var express = require('express');
var morgan = require('morgan');
var config = require('./config.js');
var router = require('./router.js');
var bodyParser = require('body-parser');
var session = require('express-session');

/**
 * Authenticates the traffic prior to routing
 */
function authChecker(req, res, next) {
    if (req.session.auth || config.PERMITTED_URLS.indexOf(req.path)>-1)
        next();
    else if(req.query.filePath&&!req.query.filePath.includes("html"))
        next();
    else
        res.redirect("/");
}

//DEFINE THE APP
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000*60*60}
}));
//app.use(authChecker); //temporarily comment out for development
app.use('/', router);

//START THE APP
app.listen(config.PORT_NUMBER, function () {
  console.log(`Shelf is up and running.`);
  console.log(config.PORT_NUMBER);
});
