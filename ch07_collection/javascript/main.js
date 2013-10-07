// Collection

// Person model
var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Smith',
		age: 27,
		occupation: "Designer"
	}
});

// A list of person
// Groups of element based on the same model are called Collection
// They are created by extending Backbone.Collection
var PeopleCollection = Backbone.Collection.extend({
	// Here we tell the collection which model it will use
	model: Person
});

// The view for a person
var PersonView = Backbone.View.extend({

	tagName: 'li',

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

var a_people_collection = new PeopleCollection;
a_people_collection.add(john);
console.log("After adding one person, a_people_collection:")
console.log(a_people_collection.toJSON());

var jane = new Person({name:'jane'});
var georges = new Person({name:'georges'});
a_people_collection.add(jane);
a_people_collection.add(georges);
console.log("After adding two more people, a_people_collection:")
console.log(a_people_collection.toJSON());

// Another thing we can do is define our model element right at
// collection declaration
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
