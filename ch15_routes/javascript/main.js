// ROUTES

(function() {

//######################################################################
// MV* setup ###########################################################
//######################################################################

	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Helpers: {},
		Routers: {}
	};

	// Routers are extended from Backbone.Router
	App.Routers.aRouter = Backbone.Router.extend({
		// Routes are specified in the "routes" object
		// Each keyword has to have a "#" before it in the URL
		// They trigger method later defined
		routes: {
			'': 'index',
			'show': 'show'
		},

		// in case of www.blabla.com/index.html
		// or www.blabla.com/index.html#
		index: function() {
			console.log( 'Hi there from the index page' );
		},

		// in case of www.blabla.com/index.html#show
		show: function() {
			console.log( 'Hi there from the show url' );
		}

	});

//######################################################################
// Application #########################################################
//######################################################################

	// For a router to work, 
	// 1. we need to create and instance of it
	new App.Routers.aRouter();
	// 2. And start the Backbone history
	Backbone.history.start();

})();




