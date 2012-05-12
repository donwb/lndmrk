var express = require('express');
var app = module.exports = express.createServer();


var ImageProvider = require('./ImageProvider').ImageProvider;
var ImageProvider =  new ImageProvider();
var TagProvider = require('./TagProvider').TagProvider;
var TagProvider = new TagProvider();

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

app.get('/p/:pagenum', function(req, res){
  // need some error checking for input param
  
  var next = ((req.params.pagenum - 1) * 12);
  ImageProvider.pageImages(next, 12, function(err, images){
    res.render('index', {layout: true,
      locals: {
        title: 'Landmark Coasters',
        images: images
      }});
  })

});

app.get('/detail/:imageName', function(req, res){
  
  var imageName = req.params.imageName;
  console.log(imageName);

  ImageProvider.getImageByName(imageName, function(err, image){
    console.log(image);

    res.render('detail', {
    layout: false,
      locals: {
        img: image }
    });
  });
  
});

app.get('/tag/:tagName', function(req, res) {
    var tagname = req.params.tagName;
    console.log(tagname);

    ImageProvider.getImagesByTagname(tagname, function(err, images) {
        TagProvider.getTags(function(err, tags){
            res.render('index', {
            layout: true, locals: {
                title: tagname + ' images',
                tags: tags,
                images: images
            }
            });
        });
        
    });

});

app.get('/admin', function(req, res){
    TagProvider.getTags(function(err, tags){
        res.render('admin', {layout: true,
        locals: {
            title: 'admin',
            tags: tags
        }});
    })
    
});

app.get('/', function(req, res) {
  ImageProvider.pageImages(0, 12, function(err, images) {
    TagProvider.getTags(function(err, tags) {
    
      res.render('index', { layout: true,
          locals: {
              title: 'Landmark coasters',
              tags: tags,
              images: images
          }
      });
    });

    });

});

app.post('/admin/tag/add', function(req, res){
    console.log(req.body.tag);
    TagProvider.Save(req.body.tag, function(err){
        res.redirect('/admin');
    })
});

// totally understand this should be a post..
app.get('/admin/tag/delete/:tagname', function(req, res) {
    var tagname = req.params.tagname;
    console.log(tagname);

    TagProvider.Delete(tagname, function(err){
        res.redirect('/admin');
    })
});

var port = process.env.PORT || 3000;
if(!module.parent){
  app.listen(port);
  console.log("Express server listenting on port " + port);
}
