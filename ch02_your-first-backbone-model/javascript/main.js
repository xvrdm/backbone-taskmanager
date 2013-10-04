// The Vanilla Javascript Model vs Backbone Model

// ###################################
// A Person model in Vanilla Javascript
console.log("#############")
console.log("Vanilla model")

var Vanilla_Person = function(config) {
	this.name = config.name;
	this.age = config.age;
	this.occupation = config.occupation;
};

Vanilla_Person.prototype.work = function() {
	return this.name + ' is working';
};

var a_vanilla_person = new Vanilla_Person({
	name: "Jay", 
	age: 27,
	occupation: "Designer" 
});

console.log(a_vanilla_person.name);
console.log(a_vanilla_person.work());

// ###################################
// A Person model in Backbone
console.log("#############")
console.log("Backbone model")

// New model are created by extending the Backbone.model
var Person = Backbone.Model.extend({
	// Defaults values for attribute are assigned in the "defaults" object
	defaults: {
		name: 'John Smith',
		age: 27,
		occupation: "Designer"
	},

	// Methods can be defined directly in the model
	work: function(){
		return this.get('name') + ' is working';
	}
});

// Attributes are read with the .get(attr) function
var john = new Person();
console.log(john.get('name'));
console.log(john.get('age'));
console.log(john.work());

// Default values can be overwritten at creation
var albert = new Person({name: 'Albert', age: 89});
console.log(albert.get('name'));
console.log(albert.get('age'));
console.log(albert.work());

// Attribute's values can be changed with the .set() function
console.log(albert.get('occupation'));
albert.set('occupation','Developer');
console.log(albert.get('occupation'));

// To check all attribute's values, test this in the console
albert.toJSON();