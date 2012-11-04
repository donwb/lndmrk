var express = require('express');
var config = require('./config/config');
var mongoose = require('mongoose');

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
    console.log('running dev config');

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

    var db = config.DatabaseConfig;
    mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name)
});

app.configure('production', function(){
  config.setProductionConfig();
  console.log('running prod config');

  app.use(express.errorHandler());

  var db = config.DatabaseConfig;
    mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name)
});

var port = process.env.port || config.EnvConfig.port;
console.log('port: ' + port);

app.listen(port);
console.log("Express server listenting on port " + port);


module.exports.app = app;
module.exports.config = config;
require('./routes');

