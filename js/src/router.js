

(function(Backbone, Sensnet){

  Sensnet.app.views = {};
  /**
   * This class is used to handle the get made by the user
   * @class Router
   */
  var Router  = Backbone.Marionette.AppRouter.extend({
    routes: {
    	'welcome' : 'welcome',
        'home' : 'home',
        'server/:serverId' : 'server',
        'device/:deviceId' : 'device',
        'sensor/:sensorId' : 'sensor',
        '*actions' : 'welcome'
    },
    
    /**
     * initialize and display the welcome view
     * @public
     * @memberof Router
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
     * display the home view
     * @public
     * @memberof Router
     * @param null
     * @return null
     */
    home: function() {
    	Sensnet.app.body.displayHome(); 
    	Sensnet.app.tree.displayTree();
    },
	
	 /**
     * display a server
     * @public
     * @memberof Router
     * @param serverId the id of the server
     * @return null
     */
    server: function(serverId) {
    	Sensnet.app.tree.displayTree();
    	var serverBody = Sensnet.Factories.Server.serverBody(serverId);
    	Sensnet.app.body.show(serverBody);
    	
    },
    
    
     /**
     * display a device
     * @public
     * @memberof Router
     * @param deviceId the id of the device
     * @return null
     */
    device: function(deviceId) {
    	Sensnet.app.tree.displayTree();
    	var deviceBody = Sensnet.Factories.Device.deviceBody(deviceId);
    	Sensnet.app.body.show(deviceBody);
    	
    },	
    
     /**
     * display a sensor
     * @public
     * @memberof Router
     * @param sensorId the id of the sensor
     * @return null
     */
    sensor: function(sensorId) {
     	Sensnet.app.tree.displayTree();
    	var sensorBody = Sensnet.Factories.Device.deviceBody(sensorId);
    	Sensnet.app.body.show(sensorBody);  	
    }  
       
    });
    
	Sensnet.Router = Router;
	
})(Backbone, Sensnet);