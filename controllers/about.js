exports.index = function(req, res){
	res.render('about.jade', {layout: true, locals: {title: 'About Us'}});
}