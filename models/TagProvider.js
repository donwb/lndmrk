config = require('./../myconfig');
var db = config.DatabaseConfig;


var mongoose = require('mongoose');

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId;

var Tag = new Schema({
    name            : {type: String, required: true},
    count           : {type: Number}
});

//mongoose.connection.on('error', function() {});

//mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Tag', Tag);

var Tag = mongoose.model('Tag');

TagProvider = function(){};

TagProvider.prototype.getTags = function(callback) {
    Tag.find({}, function(err, tags) {
        callback(null, tags);
    })
}


TagProvider.prototype.Save = function(tag, callback) {
    var t = new Tag();
    t.name = tag;

    t.save(function(err) {
        callback(err);
    })

};

TagProvider.prototype.Edit = function(tag, callback){
    tag.save(function(err){
        callback(tag);
    })
}

TagProvider.prototype.Delete = function(tag, callback) {
    Tag.find({ "name": tag }, function(err, tags) {
        tags.forEach(function(t) {
            t.remove();
            callback(null);
        })
    })
};


exports.TagProvider = TagProvider;