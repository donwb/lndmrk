config = require('./../config')
var db = config.DatabaseConfig

var mongoose = require('mongoose')

var Schema = mongoose.Schema, ObjectID = Schema.ObjectId

var Show = new Schema({
    showDate            : {type: String, required: true},
    name	            : {type: String, required: true},
    location			: {type: String, required: true},
    link				: {type: String, required: true},
    year				: {type: Number, required: true}
});

mongoose.model('Show', Show)

var Show = mongoose.model('Show')

ShowProvider = function(){}

ShowProvider.prototype.getShows = function(callback){
	Show.find({}, function(err, shows){
		callback(null, shows)
	})
}

ShowProvider.prototype.getShowsByYear = function(year, callback) {
	Show.find({year: year}, function(err, shows) {
		callback(null, shows);
	})
}

ShowProvider.prototype.addShow = function(show, callback) {
	var s = new Show();
	s.showDate = show.date;
	s.name = show.name;
	s.location = show.location;
	s.link = show.link;
	s.year = show.year;

	s.save(function(err, show) {
		callback(show);
	});
};

exports.ShowProvider = ShowProvider;