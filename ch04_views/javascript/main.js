// Views

var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Smith',
		age: 27,
		occupation: "Designer"
	}
});

// Views are representation of a single element
// Views are created by extending Backbone.View
var PersonView = Backbone.View.extend({

	// Views are given both an html tag "viewName.el"
	// and jquery element "viewName.$el". Default is div,
	// but this can be changed
	tagName: 'li',

	// Views can also have classes and/or id
	className: 'person',
	id: 'someone',

	// Views can have method that run at "creation" (or "extension")
	// this.model shows how we can access the given model
	initialize: function() {
		console.log('View created');
		console.log(this.model);
	},

	// When we want to populate our view with our model's data,
	// we use .render() to define what goes where and action
	render: function() {
		// The hard-coded method (without template)
		// This can get long and messy very quickly
		this.$el.html( this.model.get('name') + ' (' 
			+ this.model.get('age') + ') - '
			+ this.model.get('occupation')
		);
	}
});

var john = new Person;

// The model for the view is given at definition
console.log("We now initialize:")
var view = new PersonView({ model: john });

console.log("We now render:")
view.render();
console.log(view.el);