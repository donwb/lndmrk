var express = require('express');
var config = require('./config/config');

var app = module.exports = express.createServer();

// config shit
var pub = __dirname + '/public';

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(pub));
  app.use(app.router);
});

// env config
app.configure('development', function() {
    config.setDevelopmentConfig();
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var port = process.env.PORT || config.EnvConfig.port;
if(!module.parent){
  app.listen(port);
  console.log("Express server listenting on port " + port);
}

module.exports.app = app;
module.exports.config = config;
require('./routes');

