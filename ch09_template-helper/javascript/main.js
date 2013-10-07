// TEMPLATE HELPER

//######################################################################
// MV* setup ###########################################################
//######################################################################

// A template helper method
var hm_template = function(id) {
	return _.template( $('#' + id).html() );
}

// Person model
var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Smith',
		age: 27,
		occupation: "Designer"
	}
});

// A list of person
var PeopleCollection = Backbone.Collection.extend({
	model: Person
});

// A view for all people
var PeopleView = Backbone.View.extend({
	tagName: 'ul',
	
	render: function() {

		this.collection.each( function(a_model) {
			var personView = new PersonView({ model: a_model });
			this.$el.append( personView.render().el );
		}, this); 

		return this;
	}	
});

// The view for a person
var PersonView = Backbone.View.extend({

	tagName: 'li',

	template: hm_template('personTemplate'),

	render: function() { 
		this.$el.html( this.template( this.model.toJSON() ) ); 
		return this;
	}
});

//######################################################################
// Application #########################################################
//######################################################################

var a_smurf_collection = new PeopleCollection([
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
console.log("a_smurf_collection:")
console.log(a_smurf_collection.toJSON());

// Individual smurf can be given name later
var papa_smurf = a_smurf_collection.at(0);

// which might make it easier to update their value
papa_smurf.set('age',45);

var smurfsView = new PeopleView({ collection: a_smurf_collection });
$(document.body).append(smurfsView.render().el);

