(function(Backbone, _, Sensnet){

	/** 
	 * This class is used to define a table view of the device
	 * @class VDeviceTable
	 */
	var VDeviceTable = Marionette.ItemView.extend({
		
		// the html template used
		template : '#device-table',

		// handle the events of the model
		modelEvents : {
			'change' : 'render',
			'sync' : 'render'
		},

        /**
        * this method is called when the sensor is rendered
        * @memberof VDeviceTable
        * @param null
        * @return null
        */
		onRender : function() {
			console.log("table was rendered");
		},

	});

	Sensnet.Views.VDeviceTable= VDeviceTable;

	/** 
	 * This class is used to define a table view of a list of devices
	 * @class VDevicesTable
	 */
	var VDevicesTable = Backbone.Marionette.CollectionView.extend({

		//define the child view
	    childView: Sensnet.Views.VDeviceTable
	    
	});

	Sensnet.Views.VDevicesTable= VDevicesTable;

})(Backbone, _, Sensnet);
