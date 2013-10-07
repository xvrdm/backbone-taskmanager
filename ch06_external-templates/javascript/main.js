// External Template

var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Smith',
		age: 27,
		occupation: "Designer"
	}
});

var PersonView = Backbone.View.extend({

	tagName: 'li',

	// Underscore's template can be fetched from the html with jQuery
	template: _.template( $('#personTemplate').html() ),

	initialize: function() {
		console.log('View created');
		console.log(this.model);
	},

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
	}
});

var john = new Person;
var view = new PersonView({ model: john });
view.render();
console.log(view.el);