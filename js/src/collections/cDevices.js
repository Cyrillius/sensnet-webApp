(function(Backbone, Sensnet){ 

 	/** 
 	 * This class is used to define a device collection
 	 * @class DeviceCollection
 	 */
	var DeviceCollection = Backbone.Collection.extend({

		// set the model 
	    model: Sensnet.Models.Device ,

	});
	
	Sensnet.Collections.DeviceCollection = DeviceCollection;

})(Backbone, Sensnet);
