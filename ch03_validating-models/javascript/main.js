// Validating Backbone Model Attributes

// Sometimes we want to ensure validation on attributes
// (e.g check that the age is a positive number)
var Person = Backbone.Model.extend({
	defaults: {
		name: 'John Smith',
		age: 27,
		occupation: "Designer"
	},

	// The validate method is automatically triggered by Backbone
	// when you .set() an attribute (not at object creation!)
	validate: function(attrs) {
		// attrs is the full object
		if ( attrs.age < 0 ) {
			return 'Age must be positive.';
		}

		if ( ! attrs.name ) {
			return 'Name must be something.'
		}
	},

	work: function(){
		return this.get('name') + ' is working';
	}
});

var john = new Person();

// Validation is only applied if specified
john.set('age', -27, {validate:true}); // return false, not the error text

// To also return the error text, we need to listen to the 'invalid' event
john.on('invalid', function(model, error) {
	console.log(error);
});

john.set('age', -27, {validate:true}); // return false + the error text
john.set('name', '', {validate:true}); // return false + the error text