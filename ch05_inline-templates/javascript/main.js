// Inline Template

var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Smith',
		age: 27,
		occupation: "Designer"
	}
});

var PersonView = Backbone.View.extend({

	tagName: 'li',

	// An underscore template can be used to define our data rendering
	template: _.template("<strong><%= name %></strong> (<%= age %>) - <%= occupation %>"),

	initialize: function() {
		console.log('View created');
		console.log(this.model);
	},

	// We just need to let render know that it should use our template
	// with the model's data
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
	}
});

var john = new Person;
var view = new PersonView({ model: john });
view.render();
console.log(view.el);