var Movie 			= require('./models/movie');
var express 		= require('express'),
	app				= express(),					// define our app using express
	bodyParser		= require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// ===========================================================================
var router = express.Router();						// get an instance of the express Router



// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
});


// more routes for our API will happen here

// on routes that end in /movie
router.route('/movies')

	// create a movie (accessed at POST /api/movies)
	.post(function(req, res) {

		var movie = new Movie();		// create a new instance of the Movie model
		movie.name = req.body.name;		// set the movies name (comes from the request)

		// save the movie and check for errors
		movie.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Movie created!' });
		});

	})

	// get all the movies (accessed at GET /api/movies)
	.get(function(req, res) {
		Movie.find(function(err, movies) {
			if (err)
				res.send(err);

			res.json(movies);
		});
	});

// on routes that end in /movies/:movie_id
router.route('/movies/:movie_id')

	// get the movie with that id (accessed at GET /api/movies/:movie_id)
	.get(function(req, res) {
		Movie.findById(req.params.movie_id, function(err, movie) {
			if (err)
				res.send(err);
			res.json(movie);
		});
	})

	// update the movie with this id (accessed at PUT /api/movies/:movie_id)
	.put(function(req, res) {

		// use our movie model to find the movie we want
		Movie.findById(req.params.movie_id, function(err, movie) {

			if (err)
				res.send(err);

			movie.name = req.body.name;		// update the movies info

			// save the movie
			movie.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message:  'Movie updated!' });
			});
		});

	})

	.delete(function(req, res) {
		Movie.remove({
			_id: req.params.movie_id
		}, function(err, movie) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully delete' })
		});

	});




module.exports = router;      // somehow connects back to server.js (??)