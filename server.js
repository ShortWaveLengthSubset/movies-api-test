// server.js

// BASE SETUP
// ===========================================================================

// call the packages we need
var express			= require('express'),			// call express
	app				= express(),					// define our app using express
	bodyParser		= require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port 			= process.env.PORT || 8080;		// set our port

var mongoose 		= require('mongoose');
mongoose.connect('mongodb://moviesuser:moviespassword@ds031632.mongolab.com:31632/movies-api-test'); // connect to our database

// REGISTER OUR ROUTES -------------------------------------------------------
// all of our api routes will be prefixed with /api
var routes = require('./app/routes');
app.use('/api', routes);

//test render
app.use(express.static(__dirname + '/views'))

// START THE SERVER
// ===========================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app; 								// connects server.js to other node js files (??)