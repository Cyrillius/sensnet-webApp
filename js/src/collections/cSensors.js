(function(Backbone, Sensnet){ 

 	/** 
 	 * This class is used to define a sensor collection
 	 * @class SensorCollection
 	 */
	var SensorCollection = Backbone.Collection.extend({

		// set the model 
	    model: Sensnet.Models.Sensor
	});
	
	Sensnet.Collections.SensorCollection = SensorCollection;

})(Backbone, Sensnet);
