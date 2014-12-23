
(function(Backbone, Sensnet){
	
  Sensnet.app.views = {};
  //define some route
  var Router  = Backbone.Marionette.AppRouter.extend({
    routes: {
    	'welcome' : 'welcome',
        'home' : 'home',
        'servers/:serverId' : 'server',
        'devices/:deviceId' : 'device',
        'sensors/:sensorId' : 'sensor',
        '*actions' : 'welcome'
    },
    
    // Welcome
    welcome: function() {
    	var welcomeView = new Sensnet.Views.WelcomeView();
    	Sensnet.app.body.show(welcomeView);
    	var addServerView = new Sensnet.Views.VServerProfile();   
    	welcomeView.innerWelcome.show(addServerView);
    },
    // Home
    home: function() {
    	var homeView = new Sensnet.Views.VServersTable({collection: Sensnet.app.servers});
    	Sensnet.app.views.homeView = homeView; 
    	Sensnet.app.body.show(homeView);  
    	
    	var treeView = new Sensnet.Views.TreeView ({collection: Sensnet.app.servers}); 
    	Sensnet.app.views.treeView = treeView; 
    	Sensnet.app.tree.show(treeView);
    },
	
    server: function(serverId) {
    	Sensnet.app.side.displayTree();
    	var serverBody = Sensnet.Factories.Server.serverBody(serverId);
    	Sensnet.app.body.show(serverBody);
    	
    },
    device: function(servername, devicename) {
    	Sensnet.app.side.displayTree();
    	var deviceBody = Sensnet.Factories.Device.deviceBody(deviceId);
    	Sensnet.app.body.show(deviceBody);
    	
    },	
    sensor: function(servername, devicename, sensorport) {
     	Sensnet.app.side.displayTree();
    	var sensorBody = Sensnet.Factories.Device.deviceBody(sensorId);
    	Sensnet.app.body.show(sensorBody);  	
    }  
       
    });
    
	Sensnet.Router = Router;
	
})(Backbone, Sensnet);