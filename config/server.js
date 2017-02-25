var express = require('express');
var morgan = require('morgan');
var config = require('./config.js');
var router = require('./router.js');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000*60*60}
}));
app.use('/', router);


//START THE APP
app.listen(config.PORT_NUMBER, function () {
  console.log(`Shelf is up and running.`);
  console.log(config.PORT_NUMBER);
});
