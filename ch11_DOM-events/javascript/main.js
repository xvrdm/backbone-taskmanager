// DOM EVENTS

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

	App.Models.Task = Backbone.Model.extend({});

	App.Collections.TasksList = Backbone.Collection.extend({
		model: App.Models.Task
	});

	App.Views.TasksList = Backbone.View.extend({
		tagName: 'ul',

		render: function() {
			this.collection.each(this.addTaskViewToListView, this);
			return this;
		},

		addTaskViewToListView: function(task) {
			// 1. creating a new child view
			// 2. append to the root element

			// 1. creating a new child view
			var taskView = new App.Views.Task({ model: task });

			// 2. render and append to the root element
			this.$el.append( taskView.render().el );
		}
	});

	App.Views.Task = Backbone.View.extend({
		tagName: 'li',

		template: App.Helpers.template('taskTemplate'),

		// We can listen to event at view level
		// Listener are listed in event and trigger method
		events: {
			'click span': 'clickSpan',
			'click .edit': 'editTask'
		},

		clickSpan: function() {
			alert('you clicked the span!');
		},

		// The triggered methods can be used to edit the model
		editTask: function() {
			var editedTask = prompt('Change the text:', this.model.get('title'));
			this.model.set('title', editedTask);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		}
	});

//######################################################################
// Application #########################################################
//######################################################################

	var tasksList = new App.Collections.TasksList([
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

	var tasksListView = new App.Views.TasksList({ collection: tasksList });

	$('.tasks').html( tasksListView.render().el );
})();




