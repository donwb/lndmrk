app = module.parent.exports.app;

var SiteController = require('./controllers/site');
var AdminController = require('./controllers/admin');
var ProductsController = require('./controllers/products');
var AboutController = require('./controllers/about');

app.get('/', SiteController.index);
app.get('/p/:pagenum', SiteController.page);
app.get('/detail/:imageName', SiteController.detail);
app.get('/tag/:tagname', SiteController.tagDetail);

app.get('/admin', AdminController.admin);
app.post('/admin/tag/add', AdminController.addTag);
app.get('/admin/tag/delete/:tagname', AdminController.deleteTag);
app.post('/admin/images/add', AdminController.addImage);
app.post('/admin/show/add', AdminController.addShow);


app.get('/products', ProductsController.products);

app.get('/about', AboutController.index);
app.get('/about/stores', AboutController.stores);

// this route is for blitz.io testing
app.get('/mu-3fb8ca5b-1a109a61-53cb32bd-c47e007e', function(req, res){
	res.send('42');
})

