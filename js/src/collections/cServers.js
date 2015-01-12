(function(Backbone, Sensnet){ 

 	/** 
 	 * This class is used to define a server collection
 	 * @class ServerCollection
 	 */
	var ServerCollection = Backbone.Collection.extend({

		// set the model 
	    model: Sensnet.Models.Server

	});
	
	Sensnet.Collections.ServerCollection = ServerCollection;

})(Backbone, Sensnet);
