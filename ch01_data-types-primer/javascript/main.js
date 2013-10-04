// The Vanilla Javascript Model

var Someone = function(config) {
	this.name = config.name;
	this.age = config.age;
	this.occupation = config.occupation;
}

Someone.prototype.work = function() {
	return this.name + ' is working.';
}

// The Backbone Model

// Model is a single element
var Person = Backbone.Model.extend({
	// 1.
	// default values for 'attributes' go into a 'defaults' object
	// they only take effect if you don't overwrite them at definition
	defaults: {
		name: 'John Doe',
		age: 30,
		occupation: 'worker'

		// these values can be changed later with the 'set' helper
		// bob.set('name','bob') or
		// bob.set({name:'bob',occupation:'designer'})
	},

	// 2.
	// validation can block certain values for certain attributes
	validate: function(attrs) {
		// to block bob.set('age', -49, {validate: true})
		// or bob.set('name', '', {validate: true})

		if ( attrs.age < 0 ) {
			return 'Age must be positive';
		}

		if ( !attrs.name ) {
			return 'Every person must have a name';
		}

		// WARNING: if we want the invalid strings to be 
		// returned, we have to listen!
		// bob.on('invalid', function(model, error){
		//	console.log(error);
		// })		
	},
	
	// 3. 
	// methods can be added in the extension
	work: function() {
		// best way to access attributes is the 'get' helper
		return this.get('name') + ' is working.';
	}
});

// Views are single element's representations

// Option 1: without templating 
// works but long ("anti-pattern")
var PersonView = Backbone.View.extend({
	// 1a. 
	// On what tag do we want to hook up? (default: div)
	tagName: 'li',

	// 1b.
	// On what class do we want to hook up?
	className: 'person',

	// 1c.
	// On what id do we want to hook up?
	id: 'a-special-person',

	// 2. 
	// What function do we want to run when we extend?
	initialize: function() {
		console.log(this.model.get('name'));
	},

	// 3. 
	// Render define the initialization of the View-Model 
	// relationship
	render: function() {
		this.$el.html( this.model.get('name') 
			+ ' (' + this.model.get('age') +')'
				+ ' - ' + this.model.get('occupation')  );

		return this;
	}

});

// Option 2: with internal templating 
var PersonViewIntTemplated = Backbone.View.extend({
	// 1a. 
	// On what tag do we want to hook up? (default: div)
	tagName: 'li',

	// 1b.
	// On what class do we want to hook up?
	className: 'person',

	// 1c.
	// On what id do we want to hook up?
	id: 'a-special-person',

	// 2.
	// Define a template with _.template
	template: _.template("<strong><%= name %></strong> (<%= age %>) - <%= occupation %>"),

	// 3. 
	// What function do we want to run when we extend?
	initialize: function() {
		console.log(this.model.get('name'));
	},

	// 4. 
	// Render define the initialization of the View-Model 
	// relationship
	render: function() {
		// call our _.template with the data (.toJSON)
		// from the model (this.model)
		this.$el.html( this.template(this.model.toJSON()) );

		return this;
	}

});

// Option 3: with external templating 
var PersonViewExtTemplated = Backbone.View.extend({
	// 1a. 
	// On what tag do we want to hook up? (default: div)
	tagName: 'li',

	// 1b.
	// On what class do we want to hook up?
	className: 'person',

	// 1c.
	// On what id do we want to hook up?
	id: 'a-special-person',

	// 2.
	// Grab a template with _.template
	template: _.template( $('#personTemplate').html() ),

	// 3. 
	// What function do we want to run when we extend?
	initialize: function() {
		console.log(this.model.get('name'));
	},

	// 4. 
	// Render define the initialization of the View-Model 
	// relationship
	render: function() {
		// call our _.template with the data (.toJSON)
		// from the model (this.model)
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}

});

var bob = new Person;

var bobView = new PersonView({ model: bob });
$(document.body).append(bobView.render().el);

var xav = new Person({name:'Xavier', age:26});

var xavViewIntTemplate = new PersonViewIntTemplated({ model: xav });
$(document.body).append(xavViewIntTemplate.render().el);

var jay = new Person({name:'Jay', age:36});

var jayViewExtTemplate = new PersonViewExtTemplated({ model: jay });
$(document.body).append(jayViewExtTemplate.render().el);
