(function(Backbone, _, Sensnet){

	/** 
	 * This class is used to define a table view of the sensor
	 * @class VSensorTable 
	 */
	var VSensorTable = Marionette.ItemView.extend({
		
		// the html template used
		template : '#sensor-table',

		// handle the events of the model
		modelEvents : {
			'change' : 'render',
			'sync' : 'render'
		},

	    /**
        * this method is called when the sensor is rendered
        * @memberof VSensorTable
        * @param null
        * @return null
        */
		onRender : function() {
			console.log("table was rendered");
		},

	});

	Sensnet.Views.VSensorTable= VSensorTable;

	/** 
	 * This class is used to define a table view of a list of sensors
	 * @class VSensorsTable 
	 */
	var VSensorsTable = Backbone.Marionette.CollectionView.extend({

		//define the child view
	    childView: Sensnet.Views.VSensorTable
	    
	});

	Sensnet.Views.VSensorsTable= VSensorsTable;

})(Backbone, _, Sensnet);