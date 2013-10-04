// The Vanilla Javascript Model
// A Quiz model in Vanilla Javascript

var Quiz = function(title) {
	this.title = title;
};

var a_quiz = new Quiz("My quiz's title");
console.log(a_quiz.title);

// A Person model in Vanilla Javascript

var Person = function(config) {
	this.name = config.name;
	this.age = config.age;
	this.occupation = config.occupation;
};

Person.prototype.work = function() {
	return this.name + ' is working';
};

var a_person = new Person({
	name: "Jay", 
	age: 27,
	occupation: "Designer" 
});

console.log(a_person.name);
console.log(a_person.work());