(function(Backbone, _, Sensnet){

var VServerProfile = Marionette.ItemView.extend({
	
	initialize: function() {
        this.model = new Sensnet.Models.Server;
    },
    
    
	tagName : 'form',
	template : '#server-profile',
	events : {
		'click .save' : 'saveForm'
	},
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	},

	onRender : function() {

	},
	
	saveForm : function(e) {
		e.preventDefault();
		var name = $('#serverName').val();
		var ip = $('#serverIp').val();
		var port = $('#serverPort').val();
		var model = Sensnet.app.servers.findWhere({ "ip": ip, "port": port });
		if(model!=null){
			this.model.destroy();
			this.model = model;
			model.set({"name":name});			
		}
		else{
			 model = this.model;	
			 model.set({"name":name,"ip":ip,"port":port});	 
		}
        model.initSocket();
        
        model.on("onConnectionSuccess", function(){
        	Sensnet.app.servers.add(model);
			Sensnet.app.router.navigate('home', {trigger: true});
		});
        model.on("onConnectionFailed", function(){
			model.destroy();
		});
	}
});

Sensnet.Views.VServerProfile= VServerProfile;

var VServerTable = Marionette.ItemView.extend({
	

	template : '#server-table',
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	},

	onRender : function() {
		console.log("table was rendered");
	},

});

Sensnet.Views.VServerTable= VServerTable;

var VServersTable = Backbone.Marionette.CollectionView.extend({
    childView: Sensnet.Views.VServerTable
});

Sensnet.Views.VServersTable= VServersTable;

})(Backbone, _, Sensnet);