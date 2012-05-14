app = module.parent.exports.app;

var ImageProvider = require('./../models/ImageProvider').ImageProvider;
var ImageProvider =  new ImageProvider();
var TagProvider = require('./../models/TagProvider').TagProvider;
var TagProvider = new TagProvider();


app.get('/admin', function(req, res){
  ImageProvider.getImages(function(err, images){
    TagProvider.getTags(function(err, tags){
        res.render('admin', {layout: true,
        locals: {
            title: 'admin',
            images: images,
            tags: tags
        }});
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

app.post('/admin/images/add', function(req, res){
  var name = req.body.name;
  var description = req.body.description;
  var filename = req.body.filename;
  var tags = req.body.tags;

  console.log(name, description, filename, tags);

  ImageProvider.save(name, description, filename, tags, function(err){
    if(err) console.log('shit' + err);

    res.redirect('/admin');

  })
});
