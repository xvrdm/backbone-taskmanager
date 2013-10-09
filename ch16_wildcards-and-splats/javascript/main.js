// WILDCARD AND SPLATS

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

	App.Routers.aRouter = Backbone.Router.extend({
		// Usually, the hash routes must be flexible and specific
		// e.g. to accept ids
		// We use the ":id", "*filename", ":query"... wildcards to get that power.
		// Whatever is sent through is also sent to the triggered method
		routes: {
			'': 'index',
			'show/:id': 'show',
			'download/*filename': 'download',
			'search/:query': 'search',
			'*other': 'default'
		},

		index: function() {
			console.log( 'Hi there from the index page' );
		},

		// The triggered method can accept the id
		show: function(id) {
			console.log( 'The show id was: ' + id );
		},

		// The triggered method can accept the filename
		download: function(filename) {
			console.log( 'The download filename was: ' + filename );
		},

		// The triggered method can accept the query
		search: function(query) {
			console.log( 'The search query was: ' + query );
		},

		// The triggered method can accept the other
		default: function(other) {
			console.log( other + ' doesnt lead anywhere, you\'re on the default route. ' );
		}
	});

//######################################################################
// Application #########################################################
//######################################################################

	new App.Routers.aRouter();
	Backbone.history.start();

})();




