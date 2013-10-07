// A SIMPLE NAMESPACING PATTERN

(function() {

//######################################################################
// MV* setup ###########################################################
//######################################################################

	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Helpers: {}
	};

	App.Helpers.template = function(id) {
		return _.template( $('#' + id).html() );
	};

	App.Models.Person = Backbone.Model.extend({
		defaults: {
			name: 'John Smith',
			age: 27,
			occupation: "Designer"
		}
	});

	App.Collections.People = Backbone.Collection.extend({
		model: App.Models.Person
	});

	App.Views.People = Backbone.View.extend({
		tagName: 'ul',
	
		render: function() {

			this.collection.each( function(a_model) {
				var personView = new App.Views.Person({ model: a_model });
				this.$el.append( personView.render().el );
			}, this); 

			return this;
		}
	});

	App.Views.Person = Backbone.View.extend({
		tagName: 'li',

		template: App.Helpers.template('personTemplate'),

		render: function() { 
			this.$el.html( this.template( this.model.toJSON() ) ); 
			return this;
		}
	});

//######################################################################
// Application #########################################################
//######################################################################

	var a_smurf_collection = new App.Collections.People([
		{
			name: 'papa Smurf',
			age: 120
		},
		{
			name: 'strong Smurf',
			age: 20
		},
		{
			name: 'smart Smurf',
			age: 29
		}
	]);

	var smurfsView = new App.Views.People({ collection: a_smurf_collection });
	$(document.body).append(smurfsView.render().el);

})();




