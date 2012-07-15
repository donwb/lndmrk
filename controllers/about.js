var StoreProvider = require('./../models/StoresProvider').StoreProvider;
var StoreProvider =  new StoreProvider();

exports.index = function(req, res){
	res.render('about.jade', {layout: true, locals: {title: 'About Us'}});
}

exports.stores = function(req, res){
	console.log('in stores');
	StoreProvider.getStores(function(err, stores){
		console.log(stores);
		res.send(stores);
	})
}