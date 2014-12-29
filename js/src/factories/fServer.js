(function(Backbone, _, Sensnet){
Sensnet.Factories.Server = {
	serverBody: function(id){	
		var model = Sensnet.app.servers.get(id); 
	    var serverView = new Sensnet.Views.VServerTable({model:model});
		return serverView;
	},	
    addServerForm: function(){
	    var homeView = new Sensnet.Views.VServersTable({collection: Sensnet.app.servers});
    	Sensnet.app.views.homeView = homeView; 
		return homeView;
	}	
};

})(Backbone, _, Sensnet);