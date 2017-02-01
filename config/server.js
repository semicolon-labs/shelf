var express = require('express');
var morgan = require('morgan');
var config = require('./config.js');
var router = require('./router.js');
var app = express();
app.use(morgan('combined'));

app.use('/', router);

//START THE APP
app.listen(config.PORT_NUMBER, function () {
  console.log(`Shelf is up and running.`);
  console.log(config.PORT_NUMBER);
});
