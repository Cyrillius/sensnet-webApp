

(function(Backbone, Sensnet){

  Sensnet.app.views = {};
  /**
   * This class is used to handle the get made by the user
   * @class Router
   */
  var Router  = Backbone.Marionette.AppRouter.extend({
    routes: {
    	'welcome' :                                               'welcome',
        'home' :                                                  'home',
        'addServer' :                                             'addServer',
        'server/:serverId' :                                      'server',
        'server/:serverId/device/:deviceId' :                     'device',
        'server/:serverId/device/:deviceId/sensor/:sensorId' :    'sensor',
        'servers' :                                               'servers',
        'server/:serverId/devices' :                              'devices',
        'server/:serverId/device/:deviceId/sensors' :             'sensors',
        '*actions' :                                              'welcome'
    },
    
    /**
     * initialize and display the welcome view
     * @public
     * @memberof Router
     * @param null
     * @return null
     */
    welcome: function() {
    	var welcomeView = Sensnet.Factories.Home.welcomeBody();
        Sensnet.app.body.show(welcomeView);
        welcomeView.innerWelcome.show(Sensnet.Factories.Server.addServerForm());    
    },
    
    /**
     * display the home view
     * @public
     * @memberof Router
     * @param null
     * @return null
     */
    home: function() {
    	Sensnet.app.body.show(Sensnet.Factories.Home.homeBody());
    	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
    },
    
    /**
     * display the form to add a server
     * @public
     * @memberof Router
     * @param null
     * @return null
     */
    addServer: function() { 
    	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
    	var addServerBody = Sensnet.Factories.Server.addServerForm();
    	Sensnet.app.body.show(addServerBody);
    },
	
	 /**
     * display a server
     * @public
     * @memberof Router
     * @param serverId the id of the server
     * @return null
     */
    server: function(serverId) {
    	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
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
    device: function(serverId, deviceId) {
    	console.log("navigate to the device! Bitch!");
    	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
    	var deviceBody = Sensnet.Factories.Device.deviceBody(serverId, deviceId);
    	Sensnet.app.body.show(deviceBody);
    	
    },	
    
     /**
     * display a sensor
     * @public
     * @memberof Router
     * @param sensorId the id of the sensor
     * @return null
     */
    sensor: function(serverId, deviceId, sensorId) {
     	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
    	var sensorBody = Sensnet.Factories.Sensor.sensorBody(serverId, deviceId, sensorId);
    	Sensnet.app.body.show(sensorBody);  	
    },  
    
	 /**
     * display a list of servers
     * @public
     * @memberof Router
     * @param serverId the id of the server
     * @return null
     */
    servers: function() {
    	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
    	var serversBody = Sensnet.Factories.Server.serversBody();
    	Sensnet.app.body.show(serversBody);
    	
    },
    
    
     /**
     * display a list of devices
     * @public
     * @memberof Router
     * @param deviceId the id of the device
     * @return null
     */
    devices: function(serverId) {
    	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
    	var devicesBody = Sensnet.Factories.Device.devicesBody(serverId);
    	Sensnet.app.body.show(devicesBody);
    	
    },	
    
     /**
     * display a list of sensors
     * @public
     * @memberof Router
     * @param sensorId the id of the sensor
     * @return null
     */
    sensors: function(serverId, deviceId) {
     	Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());
    	var sensorsBody = Sensnet.Factories.Sensor.sensorsBody(serverId, deviceId);
    	Sensnet.app.body.show(sensorsBody);  	
    }  
       
    });
    
	Sensnet.Router = Router;
	
})(Backbone, Sensnet);