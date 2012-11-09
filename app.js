var express = require('express'),
    config = require('./config'),
    mongoose = require('mongoose'),
    logger = require('winston');

var app = module.exports = express.createServer();
logger.info('from winston');

// config shit
var pub = __dirname + '/public';

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(pub));
  app.use(app.router);
  //app.use(require('azure-logstreamer')());
});

// env config
app.configure('development', function() {
    config.setDevelopmentConfig();
    logger.info('running dev config');

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

   
});

app.configure('production', function(){
  config.setProductionConfig();
  logger.info('running prod config');

  app.use(express.errorHandler());

  //var db = config.DatabaseConfig;
    //mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name)
});

var port = process.env.port || config.EnvConfig.port;
logger.info('port: ' + port);

app.listen(port);
logger.info("Express server listenting on port " + port);

 var db = config.DatabaseConfig;
mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name)


module.exports.app = app;
module.exports.config = config;
require('./routes');

