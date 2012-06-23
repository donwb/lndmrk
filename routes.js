app = module.parent.exports.app;
//config = module.parent.exports.config;
//console.log(module.parent);
//console.log(config);

var SiteController = require('./controllers/site');
var AdminController = require('./controllers/admin');
var ProductsController = require('./controllers/products')

app.get('/', SiteController.index);
app.get('/p/:pagenum', SiteController.page);
app.get('/detail/:imageName', SiteController.detail);
app.get('/tag/:tagname', SiteController.tagDetail);

app.get('/admin', AdminController.admin);
app.post('/admin/tag/add', AdminController.addTag);
app.get('/admin/tag/delete/:tagname', AdminController.deleteTag);
app.post('/admin/images/add', AdminController.addImage);

app.get('/products', ProductsController.products);

// this route is for blitz.io testing
app.get('/mu-3fb8ca5b-1a109a61-53cb32bd-c47e007e', function(req, res){
	res.send('42');
})

//module.exports.config = config;
//require('./models/ImageProvider');
//require('./models/TagProvider');