// DESTROY TASK 

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

	App.Models.Task = Backbone.Model.extend({

		initialize: function() {
			this.on('invalid',function(model, error) {
				console.log(error);
			});
		},

		validate: function(attrs) {
			if ( ! $.trim(attrs.title) ) {
				return 'A task requires a valid title.';
			}
		}
	});

	App.Collections.TasksList = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Views.TasksList = Backbone.View.extend({
		tagName: 'ul',

		// When a model is added to the collection (via the AddTask view)
		// we just run method addTaskViewToListView
		initialize: function() {
			this.collection.on('add', this.addTaskViewToListView, this);
		},

		render: function() {
			this.collection.each(this.addTaskViewToListView, this);
			return this;
		},

		addTaskViewToListView: function(task) {
			var taskView = new App.Views.Task({ model: task });
			this.$el.append( taskView.render().el );
		}
	});

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',

		template: App.Helpers.template('taskTemplate'),

		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},

		events: {
			'click span': 'clickSpan',
			'click .edit': 'editTask',
			'click .delete': 'delete'
		},

		clickSpan: function() {
			alert('you clicked the span!');
		},

		editTask: function() {
			var editedTask = prompt('Change the text:', this.model.get('title'));
			if ( ! editedTask ) return;
			this.model.set('title', editedTask, {validate:true});
		},

		delete: function() {
			this.model.destroy();
			console.log(tasksList);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	App.Views.AddTask = Backbone.View.extend({
		// We directly target an element on the page, rather
		// than creating a wrapper
		el: '#addTask',

		events: {
			'submit': 'submit'
		},

		initialize: function() {
			// When targeting existing element, their content is 
			// accessible from start
			console.log(this.el.innerHTML);
		},

		submit: function(e) {
			// We prevent the default submit process
			e.preventDefault();
			// Then we can do whatever method we want
			// e.g console logging something
			console.log("submitted");
			// or e.g creating a new task
			var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
			var newTask = new App.Models.Task({ title: newTaskTitle, priority: 3	});
			tasksList.add(newTask);
		}
	});

//######################################################################
// Application #########################################################
//######################################################################

	window.tasksList = new App.Collections.TasksList([
		{
			title: 'Buy tools',
			priority: 2
		},
		{
			title: 'Buy milk',
			priority: 3
		},
		{
			title: 'Buy bread',
			priority: 1
		}
	]);

	// We create a new view for AddTask that will be linked to the 
	// existing collection
	var addTaskView = new App.Views.AddTask( { collection: tasksList } );

	var tasksListView = new App.Views.TasksList({ collection: tasksList });

	$('.tasks').html( tasksListView.render().el );
})();




