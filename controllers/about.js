var StoreProvider = require('./../models/StoresProvider').StoreProvider;
var StoreProvider =  new StoreProvider();
var ShowProvider = require('./../models/ShowProvider').ShowProvider;
var ShowProvider = new ShowProvider();


exports.index = function(req, res){
	res.render('about.jade', {layout: true, locals: {title: 'About Us'}});
}

exports.stores = function(req, res){
	console.log('in stores');
	StoreProvider.getStores(function(err, stores){
		res.send(stores);
	})
}

exports.getShowsByYear = function(req, res) {
	var year = req.params.year;
	ShowProvider.getShowsByYear(year, function(err, shows){
		res.send(shows);
	})
	console.log('year: ' + year);
}