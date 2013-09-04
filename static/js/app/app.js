(function() {

	window.App = Em.Application.create({
		LOG_TRANSITIONS: true,
		LOG_VIEW_LOOKUPS: true,
		LOG_ACTIVE_GENERATION: true,
		LOG_BINDING: true,
		rootElement: "#ember-application"
	});

	App.Store = DS.Store.extend({
		revision: 12,
		adapter: DS.RESTAdapter.create()
	});

}).call(this);