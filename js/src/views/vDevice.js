var VDeviceTable = Marionette.ItemView.extend({
	

	template : '#device-table',
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	},

	onRender : function() {
		console.log("table was rendered");
	},

});

Sensnet.Views.VDeviceTable= VDeviceTable;