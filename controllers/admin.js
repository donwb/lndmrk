var logger = require('winston');

var ImageProvider = require('./../models/ImageProvider').ImageProvider;
var ImageProvider =  new ImageProvider();
var TagProvider = require('./../models/TagProvider').TagProvider;
var TagProvider = new TagProvider();
var ShowProvider = require('./../models/ShowProvider').ShowProvider;
var ShowProvider = new ShowProvider();

exports.admin = function(req, res){
  ImageProvider.getImages(function(err, images){
    TagProvider.getTags(function(err, tags){
        res.render('admin', {layout: true,
        locals: {
            title: 'admin',
            images: images,
            shows: [],
            tags: tags
        }});
    });
  });
};


exports.addTag = function(req, res){
    console.log(req.body.tag);
    TagProvider.Save(req.body.tag, function(err){
        res.redirect('/admin');
    })
};

// totally understand this should be a post..
exports.deleteTag = function(req, res){
    var tagname = req.params.tagname;
    console.log(tagname);

    TagProvider.Delete(tagname, function(err){
        res.redirect('/admin');
    })
};

exports.addImage = function(req, res){
  var name = req.body.name;
  var description = req.body.description;
  var filename = req.body.filename;
  var tags = req.body.tags;

  console.log(name, description, filename, tags);

  ImageProvider.save(name, description, filename, tags, function(err){
    if(err) console.log('shit' + err);

    res.redirect('/admin');

  })
};

exports.addShow = function(req, res){
  var date = req.body.showDate,
      name = req.body.name,
      location = req.body.location,
      link = req.body.link,
      year = req.body.year;

      logger.info(date + ':' + name + ':' + location + ':' + link + ':' + year);

      ShowProvider.addShow({date: date, name: name, location: location, link: link, year: year}, function(err, show){
        if(err) console.log('shit: ' + err);
        res.redirect('/admin');
      });
}
