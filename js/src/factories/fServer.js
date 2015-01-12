(function(Backbone, _, Sensnet){
	Sensnet.Factories.Server = {

		/** 
		* This function is used to initialize the table view of the server
		* @public
		* @param serverId the id of the server
		* @return the view of the sensor
		*/
		serverBody: function(serverId){	
			var server = Sensnet.app.servers.get(serverId); 
		    var serverView = new Sensnet.Views.VServerTable({model:server});
			return serverView;
		},	

		/** 
		* This function is used to initialize the table view of the servers list 
		* @public
		* @return the view of a servers list
		*/
		serversBody: function(){	
		    var servers = Sensnet.app.servers; 
		    var serversView = new Sensnet.Views.VServersTable({collection:servers});
			return serversView;
		},

		/** 
		* This function is used to initialize the form view to add a server 
		* @public
		* @return the view of a servers list
		*/
	    addServerForm: function(){
		    var addServerView = new Sensnet.Views.VServerProfile();
			return addServerView;
		}	
	};

})(Backbone, _, Sensnet);