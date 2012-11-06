config = require('./../config')
var db = config.DatabaseConfig

var mongoose = require('mongoose')

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId

var Store = new Schema({
    name            : {type: String, required: true},
    address	        : {type: String, required: true}
})

mongoose.connection.on('error', function() {});
mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name)

mongoose.model('Store', Store)

var Store = mongoose.model('Store')

StoreProvider = function(){}

StoreProvider.prototype.getStores = function(callback){
	Store.find({}, function(err, stores){
		callback(null, stores)
	})
}

exports.StoreProvider = StoreProvider;
