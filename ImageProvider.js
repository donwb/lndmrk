var db = require('./config/db');
var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Img = new Schema({
    name            : {type: String, required: true},
    description     : {type: String, required: true},
    filename        : {type: String, required: true},
    tags			: [String]
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Img', Img);

var Img = mongoose.model('Img');

ImageProvider = function(){};

ImageProvider.prototype.getImages = function(callback) {
	Img.find({}, function(err, images){
		callback(null, images);
	})
};


ImageProvider.prototype.pageImages = function(s, l, callback) {
    Img.find({}, ['name', 'description', 'filename', 'tags'] , {skip: s, limit: l}, function(err, images){
    	//console.log(images);
        callback(null, images);
    })
};

exports.ImageProvider = ImageProvider;

