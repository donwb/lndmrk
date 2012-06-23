
exports.products = function(req, res){
	res.render('products.jade', {layout: true, locals: {
		title: 'Products'
	}});
};

