var config = require('./../config');
var mongoose = require('mongoose');

var ImageProvider = require('./../models/ImageProvider').ImageProvider;
var ImageProvider =  new ImageProvider();
var TagProvider = require('./../models/TagProvider').TagProvider;
var TagProvider = new TagProvider();

config.setDevelopmentConfig();
var db = config.DatabaseConfig;

mongoose.connect('mongodb://lndmrk:passw0rd@dbh61.mongolab.com:27617/lndmrk');

function computeTags(callback) {
	var tagNames = [];

	TagProvider.getTags(function(err, tags){
		callback(tags);
	});

	return tagNames;

};

function match(tag, callback){
	ImageProvider.getImagesByTagname(tag, function(err, images){
		//console.log('tag: ' + tag + ':' + images.length);
		callback(images.length);
	});
}

console.log('computing tags');

computeTags(function(tags) {
	console.log(tags);

	tags.forEach(function(tag){
		console.log(tag);
		match(tag.name, function(total){
			console.log('t:' + tag.name + total);
			tag.count = total;
			TagProvider.Edit(tag, function(err, tag){
				console.log('tag saved');
			})
		});
	});
	
});



console.log('done');


