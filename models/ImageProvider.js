var logger = require('winston');
config = require('./../myconfig');
var db = config.DatabaseConfig;

var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Img = new Schema({
    name            : {type: String, required: true},
    description     : {type: String, required: false},
    filename        : {type: String, required: true},
    tags			: [String]
});

///console.log('image provider: ' + mongoose.connect)
//mongoose.connection.on('error', function() {});
mongoose.model('Img', Img);

var Img = mongoose.model('Img');

ImageProvider = function(){};

ImageProvider.prototype.getImages = function(callback) {
	Img.find({}, function(err, images){
		callback(null, images);
	})
};


ImageProvider.prototype.pageImages = function(s, l, callback) {
    logger.info('paging images');
    Img.find({}, ['name', 'description', 'filename', 'tags'] , {skip: s, limit: l, sort: {name: 1 }}, function(err, images){
        callback(null, images);
    })
};

ImageProvider.prototype.getImageByName = function(imageName, callback){
    Img.findOne({name: imageName}, function(err, image){
        callback(null, image);
    });
};

ImageProvider.prototype.getImagesByTagname = function(tagname, callback){
    Img.find({"tags":tagname}, function(err, images){
        callback(null, images);
    });
};

ImageProvider.prototype.save = function(name, description, filename, tags, callback) {
    var img = new Img();

    img.name = name;
    img.description = description;
    img.filename = filename;
    img.tags = tags;

    img.save(function(err){
        callback(err);
    })
};


exports.ImageProvider = ImageProvider;

