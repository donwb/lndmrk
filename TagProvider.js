var db = require('./config/db');
var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Tag = new Schema({
    name            : {type: String, required: true}
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Tag', Tag);

var Tag = mongoose.model('Tag');

TagProvider = function(){};

TagProvider.prototype.getTags = function(callback) {
    Tag.find({}, function(err, tags) {
        callback(null, tags);
    })
}


exports.TagProvider = TagProvider;