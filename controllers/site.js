var ImageProvider = require('./../models/ImageProvider').ImageProvider;
var ImageProvider =  new ImageProvider();
var TagProvider = require('./../models/TagProvider').TagProvider;
var TagProvider = new TagProvider();

exports.page = function(req, res){
  // need some error checking for input param
  
  var next = ((req.params.pagenum - 1) * 12);
  ImageProvider.pageImages(next, 12, function(err, images){
    TagProvider.getTags(function(err, tags){
      res.render('index', {layout: true,
      locals: {
        title: 'Landmark Coasters',
        tags: tags,
        images: images
      }});
    })
    
  })

};

exports.detail = function(req, res){
  
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
  
};

exports.tagDetail = function(req, res){
    var tagname = req.params.tagname;
    console.log('tagname: ' + tagname);

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

};

exports.index = function(req, res){
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
};
