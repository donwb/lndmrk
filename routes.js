app = module.parent.exports.app;

var SiteController = require('./controllers/site');
var AdminController = require('./controllers/admin');

app.get('/', SiteController.index);
app.get('/p/:pagenum', SiteController.page);
app.get('/detail/:imageName', SiteController.detail);
app.get('/tag/:tagDetail', SiteController.tagDetail);

app.get('/admin', AdminController.admin);
app.post('/admin/tag/add', AdminController.addTag);
app.get('/admin/tag/delete/:tagname', AdminController.deleteTag);
app.post('/admin/images/add', AdminController.addImage);