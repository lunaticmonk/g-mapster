var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var User = require('./models/user');
var hash = require('./my_modules/smallfunc');
var session = require('client-sessions');
var port = process.env.PORT || 8000;

mongoose.connect('mongodb://sumedh:sumedh@ds139448.mlab.com:39448/gmapster');

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended : true }));
app.use(session({
  cookieName: 'session',
  secret: 'g-mapster',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.set('view engine', 'ejs');

router.get('/', function(req, res){
	res.redirect('/user');
});

app.route('/login')
	.get(function(req, res){
		res.render('pages/login');
	})

	.post(function(req, res){
		User.find({ email : req.body.email }, function(err, user){
			if(err)
				throw err
			else{
				if(user[0].password == hash(req.body.password)){
					req.session.user = user[0];
					res.redirect('/home');
				}
				else{
					res.render('pages/login');
				}
			}
		});
	});

// Signing up of a user
app.route('/signup')
	.get(function(req, res){
		res.render('pages/signup');
	})

	.post(function(req, res){
		console.log(req.body.firstname, req.body.lastname);
			var newUser = new User({			
				firstname : req.body.firstname,
				lastname : req.body.lastname,
				email : req.body.email,
				admin : false
			});
			newUser.password = newUser.create_hash(req.body.password);
			newUser.save(function(err){
				if(err)
					console.error(err);
				console.log('new user saved successfully');
			});
			res.redirect('/signup');
	});

router.get('/user', function(req, res){
	res.render('pages/user');
});

router.get('/home', function(req, res){
	res.render('pages/home');
});

router.get('/logout', function(req, res){
	req.session.destroy();
	res.send('Logged out successfully');
});

app.use('/', router);
app.listen(port);
console.log('server started');