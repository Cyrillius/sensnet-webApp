(function(Backbone, Sensnet){ 

	var ServerCollection = Backbone.Collection.extend({
	    model: Sensnet.Models.Server
	});
	
	Sensnet.Collections.ServerCollection = ServerCollection;

})(Backbone, Sensnet);
