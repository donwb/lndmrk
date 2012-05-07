var express = require('express');
var app = module.exports = express.createServer();


var ImageProvider = require('./ImageProvider').ImageProvider;
var ImageProvider =  new ImageProvider();


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
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//

app.get('/', function(req, res){
  ImageProvider.pageImages(0, 4, function(err, images){
    res.render('index', {layout: true,
    locals: {
      title: 'Landmark coasters',
      images: images
    }});
  })
  
});

app.get('/:pagenum', function(req, res){
  // need some error checking for input param
  
  var next = ((req.params.pagenum - 1) * 4);
  ImageProvider.pageImages(next, 4, function(err, images){
    res.render('index', {layout: true,
      locals: {
        title: 'Landmark Coasters',
        images: images
      }});
  })

});

var port = process.env.PORT || 3000;
if(!module.parent){
  app.listen(port);
  console.log("Express server listenting on port " + port);
}
