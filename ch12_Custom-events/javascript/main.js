// CUSTOM EVENTS

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
		// console log the error if any
		initialize: function() {
			this.on('invalid',function(model, error) {
				console.log(error);
			});
		},

		// verify that we do not enter empty/space title
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

		// To make sure the view update when some events happen
		// we can make it listen at all time to change 
		initialize: function() {
			// The underscore method "on" can be used for monitoring
			this.model.on('change', this.render, this);
		},

		events: {
			'click span': 'clickSpan',
			'click .edit': 'editTask'
		},

		clickSpan: function() {
			alert('you clicked the span!');
		},

		editTask: function() {
			var editedTask = prompt('Change the text:', this.model.get('title'));
			//if ( ! editedTask ) return;
			this.model.set('title', editedTask, {validate:true});
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




