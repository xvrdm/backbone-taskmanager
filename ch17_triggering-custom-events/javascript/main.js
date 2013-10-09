// TRIGGERING CUSTOM EVENTS

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

	// 2. Create a new event's trigger and give it the flexibility that comes 
	// with Backbone.Events
	var vent = _.extend({}, Backbone.Events);


	App.Views.Appointment = Backbone.View.extend({
		// 4. Then our view listen for events on that "vent" trigger 
		// and fire a method when it triggers
		initialize: function() {
			vent.on('appointment:show', this.show, this);
		},

		show: function(id) {
			// 5. The id is now usable within the View
			console.log( 'showing the appointment with id of ' + id );
			// 6. In a collection View, it could be used to get a specific model
			// var appointment = this.collection.get(id);
			// 7. And maybe generate its own personal View
			// var appointmentView = new App.Views.SingleAppointment ({ model: appointment });
			// 8. And append the resulting html 
			// $(document.body).append(appointmentView.render().el);
		}
	});

	App.Routers.aRouter = Backbone.Router.extend({
		routes: {
			'': 'index',
			// 1. Lets imagine that the user want to see a specific appointment
			'appointment/:id': 'showAppointment'
		},

		index: function() {
			console.log( 'Hi there from the index page' );
		},

		// 3. Usually we want to do as little as possible in the router.
		// The best practice is just to use event's trigger, that will be 
		// listened somewhere else
		showAppointment: function(appointmentId) {
			vent.trigger('appointment:show', appointmentId);
		}
	});

//######################################################################
// Application #########################################################
//######################################################################

	new App.Views.Appointment;

	new App.Routers.aRouter();
	Backbone.history.start();

})();




