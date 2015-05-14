var express = require('express');
var app = express();
var server = require('http').createServer(app);
var q = require('q');
var db = require('./migration/sqlSchema.js');
var path = require("path");
var nodes = { };
var usernames = {};
server.listen(process.env.PORT || 3000);

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use(express.methodOverride());
app.use(express.bodyParser());  
app.use(app.router);
app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  	db.User().findAll({where:{IsDeleted: false},order: "'id' DESC"}).then(function(d){
	 	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	 	res.render('users',{"UserInfo":d});
	 	res.send(d);
	 });
});

app.get('/create/user', function(req, res) {
	res.render('createuser');
});

//all record
app.get('/users', function (req, res, next) {
	 db.User().findAll({where:{IsDeleted: false},order: "'id' DESC"}).then(function(d){
	 	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	 	res.render('users',{"UserInfo":d});
	 	res.send(d);
	 });
});

//fetch by id
app.get('/user/:id', function(req, res) {
	db.User().find(req.params.id).then(function(d) {
		res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
		res.render("userinfo",{"UserInfo":d});
		res.send(d);
		res.end();
	});
});

//create record
app.post('/userpost',function(req,res){
	db.User().findOrCreate({
		where: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			IsDeleted:false
		}
	});
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.end();
});

//update record
app.put('/userput',function(req,res){
	db.User().find(req.body.id).then(function(d){
  		if(d){
    		d.updateAttributes({
      			firstName: req.body.firstName,
      			lastName: req.body.lastName
    		});
    	}
	});
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.end();
});

//delete record
app.get('/delete/user/:id',function(req,res){
	db.User().find(req.params.id).then(function(d){
		if(d){
				d.updateAttributes({
      			IsDeleted: true,
    		});
		}
	});
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
	res.redirect('users');
	res.end();
});