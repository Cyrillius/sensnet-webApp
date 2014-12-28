(function(Backbone, Sensnet){ 

	var SensorCollection = Backbone.Collection.extend({
	    model: Sensnet.Models.Sensor
	});
	
	Sensnet.Collections.SensorCollection = SensorCollection;

})(Backbone, Sensnet);
