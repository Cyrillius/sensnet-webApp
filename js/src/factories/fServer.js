(function(Backbone, _, Sensnet){
Sensnet.Factories.Server = {
	serverBody: function(serverId){	
		var server = Sensnet.app.servers.get(serverId); 
	    var serverView = new Sensnet.Views.VServerTable({model:server});
		return serverView;
	},	
	serversBody: function(){	
	    var servers = Sensnet.app.servers; 
	    var serversView = new Sensnet.Views.VServersTable({collection:servers});
		return serversView;
	},
    addServerForm: function(){
	    var addServerView = new Sensnet.Views.VServerProfile();
		return addServerView;
	}	
};

})(Backbone, _, Sensnet);