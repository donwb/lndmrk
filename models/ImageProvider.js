var logger = require('winston');
config = require('./../config');
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
mongoose.connection.on('error', function() {});
mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Img', Img);

var Img = mongoose.model('Img');

ImageProvider = function(){};

ImageProvider.prototype.getImages = function(callback) {
    logger.info('getting images');
	Img.find({}, function(err, images){
        logger.log('info', 'returned images', images);
		callback(null, images);
	})
};


ImageProvider.prototype.pageImages = function(s, l, callback) {
    logger.info('paging images');
    Img.find({}, ['name', 'description', 'filename', 'tags'] , {skip: s, limit: l}, function(err, images){
    	logger.log('info', 'Images', images);
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

