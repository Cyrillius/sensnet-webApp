/**
 *@file This file define  the Router Class of the project 
 *@author Cyril Praz
 *@version V0.2
 */

(function(Backbone, Sensnet){

  Sensnet.app.views = {};
  /**
   * @class Router Class
   * @description This class is used to handle the get made by the user
   */
  var Router  = Backbone.Marionette.AppRouter.extend({
    routes: {
    	'welcome' : 'welcome',
        'home' : 'home',
        'servers/:serverId' : 'server',
        'devices/:deviceId' : 'device',
        'sensors/:sensorId' : 'sensor',
        '*actions' : 'welcome'
    },
    
    /**
     * initialize and display the welcome view
     * @param null
     * @return null
     */
    welcome: function() {
    	var welcomeView = new Sensnet.Views.WelcomeView();
    	Sensnet.app.body.show(welcomeView);
    	var addServerView = new Sensnet.Views.VServerProfile();   
    	welcomeView.innerWelcome.show(addServerView);
    },
    
    /**
     * initialize and display the home view
     * @param null
     * @return null
     */
    home: function() {
    	var homeView = new Sensnet.Views.VServersTable({collection: Sensnet.app.servers});
    	Sensnet.app.views.homeView = homeView; 
    	Sensnet.app.body.show(homeView);  
    	
    	var treeView = new Sensnet.Views.TreeView ({collection: Sensnet.app.servers}); 
    	Sensnet.app.views.treeView = treeView; 
    	Sensnet.app.tree.show(treeView);
    },
	
	 /**
     * display a server
     * @param serverId the id of the server
     * @return null
     */
    server: function(serverId) {
    	Sensnet.app.side.displayTree();
    	var serverBody = Sensnet.Factories.Server.serverBody(serverId);
    	Sensnet.app.body.show(serverBody);
    	
    },
    
    
     /**
     * display a device
     * @param deviceId the id of the device
     * @return null
     */
    device: function(deviceId) {
    	Sensnet.app.side.displayTree();
    	var deviceBody = Sensnet.Factories.Device.deviceBody(deviceId);
    	Sensnet.app.body.show(deviceBody);
    	
    },	
    
     /**
     * display a sensor
     * @param sensorId the id of the sensor
     * @return null
     */
    sensor: function(sensorId) {
     	Sensnet.app.side.displayTree();
    	var sensorBody = Sensnet.Factories.Device.deviceBody(sensorId);
    	Sensnet.app.body.show(sensorBody);  	
    }  
       
    });
    
	Sensnet.Router = Router;
	
})(Backbone, Sensnet);