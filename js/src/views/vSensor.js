var VSensorTable = Marionette.ItemView.extend({
	

	template : '#sensor-table',
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	},

	onRender : function() {
		console.log("table was rendered");
	},

});

Sensnet.Views.VSensorTable= VSensorTable;

var VSensorsTable = Backbone.Marionette.CollectionView.extend({
    childView: Sensnet.Views.VSensorTable
});

Sensnet.Views.VSensorsTable= VSensorsTable;