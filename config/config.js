/**
 * This is the configuration file.
 * It stores all the configuration parameters for our server!
*/

var config = {}


//PORT NUMBER FOR WEB APP
config.PORT_NUMBER = 8082;
config.GAPI_CLIENT_ID = "650846058520-b26gdetrc197epdebmpee04oftiuecve.apps.googleusercontent.com";
config.DBMS_CONFIG = {
    user: 'postgres',
    database: 'postgres',
    host: '127.0.0.1',
    port: '5432',
    password: process.env.DB_PASSWORD
};
config.PERMITTED_URLS = ["/", "/check-login", "/logout", "/login"];

module.exports = config;
