(function(Backbone, Sensnet){ 

	var DeviceCollection = Backbone.Collection.extend({
	    model: Sensnet.Models.Device
	});
	
	Sensnet.Collections.DeviceCollection = DeviceCollection;

})(Backbone, Sensnet);
