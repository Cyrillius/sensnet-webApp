/*                                                                         ᕦ(ò_ó*)ᕤ    
*      ┗(＾0＾)┓             ##                                                          
*                        #  #                                 #                        
*                        #      ##   ###    ###  ###    ##   ####                      
*                         ##   #  #  #  #  #     #  #  #  #   #                        
*                           #  ####  #  #   ##   #  #  ####   #                        
*                        #  #  #     #  #     #  #  #  #      #                        
*                         ##    ##   #  #  ###   #  #   ##     ##                      
*                                                                                      
*                                                                                      
*                                                                                      
*      #  #                     ##               #  #        ##           #            
*      #  #                    #  #              #  #         #                        
*      #  #   ##    ###        #      ##         #  #   ###   #     ###  ##     ###    
*      ####  #  #  #    #####   ##   #  #        #  #  #  #   #    #  #   #    #       
*      #  #  ####   ##            #  #  #         ##   #  #   #    #  #   #     ##     
*      #  #  #        #        #  #  #  #         ##   # ##   #    # ##   #       #    
*      #  #   ##   ###          ##    ##          ##    # #  ###    # #  ###   ###     
*                                                                                      
* sensnet.js  V0.1  (2015-01-11, 17:56)       
*                                                                                      
* Cyril Praz                                                                           
*/
                                                                                   



/**     
* @namespace Sensnet
*/

/* create a Namespace for our project*/
var Sensnet = {
	/**     
	* @namespace Sensnet.Views
	*/
	Views : {},
	/**     
	* @namespace Sensnet.Collections
	*/
	Collections : {},
	/**     
	* @namespace Sensnet.Models
	*/
	Models : {},
	/**     
	* @namespace Sensnet.Factories
	*/
	Factories : {}
};
/* create a new instance of the Marionette app */
Sensnet.app = new Backbone.Marionette.Application();

/* add the initial region which will contain the app */
Sensnet.app.addRegions({
        header: '#sensnetHeader',
        tree: '#sensnetTree',
        body: '#sensnetBody',
        template: '#sensnetTemplate'
    });
    

Sensnet.app.addInitializer(function(){
	
	var $w = $(window);
    var $d = $(document);
    var servers = new Sensnet.Collections.ServerCollection();
    Sensnet.app.servers=servers;
    
});

/* Handle some Events */

Sensnet.app.on("start", function(){
	
 	console.log("Sensnet App has started!");
	 if (Backbone.history){                             //when the application has started create a Router object
	    Sensnet.app.router = new Sensnet.Router();
	    Backbone.history.start();
	} 
});
Sensnet.app.on("onSuccess", function(msg){
	
	 $.jGrowl(msg, {                                   //display a notification when the event onSucess is triggered
		theme: 'alert-success',
		life: 4000 ,
		animateOpen: {
			height: "show"
		}
	});
});
Sensnet.app.on("onWarning", function(msg){            //display a notification when the event onWarning is triggered
	
	 $.jGrowl(msg, {
		theme: 'alert-warning',
		life: 3000,
		animateOpen: {
			height: "show"
		},
		animateClose: {
			height: "hide"
		}
	});
});
Sensnet.app.on("onError", function(msg){              //display a notification when the event onError is triggered
	
	 $.jGrowl(msg, {
		theme: 'alert-danger',
		life: 6000
	});
});

/* initialize the javscript application when the page is loaded */
$(function(){
	$( '#content').load( "template/template.html",function(){Sensnet.app.start();} );
});
// ===================================================


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
// ===================================================
(function(Backbone, Sensnet){
	
Sensnet.Test = {};	
var onInitMsg = {
	"event":"onInit",
    "devices": [
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        },
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        },
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        },
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        }
    ]
};


Sensnet.Test.onInitMsg=onInitMsg;


})(Backbone, Sensnet);
// ===================================================

(function(Backbone, Sensnet){ 
 
 	/** 
     * This class is used to define a sensor
 	 * @class Sensor
 	 */
 	var Sensor = Backbone.Model.extend({

        /**
        * initialize a Sensor object
        * @memberof Sensor
        * @param null
        * @return null
        */
        initialize: function(){
          this.set({sensorId: this.cid});
          this.set({name: 'Sensor '+this.get('sensorId')});
        },

        // add some default attribute to a Device model
        defaults: {
            type: '',              // the type of sensor (motion,temperature,humidity)
            port: '',              // the port on the nrf board
            value: 0,              // the value sended by the sensor
            unit:'unknow',          // the unity of the value
            model: "sensor"       // used into the html template
        },
        
        /**
        * set the url where the sensor can be reached   
        * @memberof Sensor
        * @param url a string with an url
        * @return null
        */
        setUrl: function(url){
        	this.set({"url":url});
        },

        /**
        * this method is used to generate a JSON object representing this object
        * @memberof Sensor
        * @param null
        * @return a JSON object representing the Device object
        */
        toJSON: function(){
            var attr = Backbone.Model.prototype.toJSON.call(this);

			attr.name = this.get('name');
            attr.mac = this.get('mac');
            attr.port = this.get('port');

            return attr;
        }

    });

    Sensnet.Models.Sensor = Sensor;
    
})(Backbone, Sensnet);
// ===================================================
(function(Backbone, Sensnet){ 

 	/** 
 	 * This class is used to define a sensor collection
 	 * @class SensorCollection
 	 */
	var SensorCollection = Backbone.Collection.extend({

		// set the model 
	    model: Sensnet.Models.Sensor
	});
	
	Sensnet.Collections.SensorCollection = SensorCollection;

})(Backbone, Sensnet);

// ===================================================


(function(Backbone, Sensnet){
 
 	/** 
 	 * This class is used to define a bluetooth slave object
 	 * @class Device
 	 */
 	var Device = Backbone.Model.extend({

        /**
        * initialize a Device object
        * @memberof Device
        * @param null
        * @return null
        */
        initialize: function(){
          this.set({deviceId: this.cid});

          this.set({name: 'Device '+this.get('deviceId')});
          
          var sensors = this.get("sensors");
          if(sensors === null || sensors === undefined){
             var coll = new Sensnet.Collections.SensorCollection();
             this.set({"sensors" : coll});
          }

          sensors = this.get("sensors");
          if( !(sensors instanceof Sensnet.Collections.SensorCollection)){
            var col = new Sensnet.Collections.SensorCollection(sensors);
            this.set({"sensors" : col});
          }
          

        },


        // add some default attribute to a Device model
        defaults: {
            mac: '',              // the bluetooth MAC of the device
            model: "device"       // used into the html template
        },

        /**
        * set the url where the device can be reached and its sensors  
        * @memberof Device
        * @param url a string with an url
        * @return null
        */
        setUrl: function(url){
        	this.set({"url":url});
        	var col = this.get("sensors");
          //for each sensors set the url
          col.forEach(function(model) {
    		    model.setUrl(url+"/sensor/"+model.get("sensorId"));
			    });
        },

        /**
        * this method is used to generate a JSON object representing this object
        * @memberof Device
        * @param null
        * @return a JSON object representing the Device object
        */
        toJSON: function(){
          var attr = Backbone.Model.prototype.toJSON.call(this);
		      attr.name = this.get('name');
          attr.mac = this.get('mac');
          attr.sensors = this.get('sensors');

          return attr;
        }

    });

    Sensnet.Models.Device = Device;
 })(Backbone, Sensnet);
// ===================================================
(function(Backbone, Sensnet){ 

 	/** 
 	 * This class is used to define a device collection
 	 * @class DeviceCollection
 	 */
	var DeviceCollection = Backbone.Collection.extend({

		// set the model 
	    model: Sensnet.Models.Device ,

	});
	
	Sensnet.Collections.DeviceCollection = DeviceCollection;

})(Backbone, Sensnet);

// ===================================================


(function(Backbone, Sensnet,console){ 

  	/** 
     * This class is used to define a server
 	 * @class Server
 	 */
 	var Server = Backbone.Model.extend({

 		/**
        * initialize a Server object
        * @memberof Server
        * @param null
        * @return null
        */
        initialize: function(){
          this.set({serverId: this.cid});
          // verify if a name exist and if not create one
          var name = this.get("name");
          if(!name){
            this.set({name: 'Server '+this.get('serverId')});
          }

          // verify if a lis of device exist and if not create one
          var devices = this.get("devices");
          if (devices === null || devices === undefined){
          	var coll = new Sensnet.Collections.DeviceCollection();
            this.set("devices",coll);
          }

          devices = this.get("devices");
          if( !(devices instanceof Sensnet.Collections.DeviceCollection)){
            var col = new Sensnet.Collections.DeviceCollection(devices);
            this.set({"devices" : col});
          }
             
          //set the url
          this.setUrl('server/'+this.get('serverId'));
        },

        // add some default attribute to a server model
        defaults: {
            ip: '127.0.0.1',        // the ip adress of the server
            port: '8080',           // the ip port of the server
            status: "unknow",       // the state of the server ("unknow","connected","disconnected")
            model: "server"         // used into the html template
        },
        
        /**
        * set the url where the server can be reached and its devices 
        * @memberof Server
        * @param url a string with an url
        * @return null
        */
        setUrl: function(url){
        	this.set({"url":url});
        	var col = this.get("devices");
          	col.forEach(function(model) {
    		   model.setUrl(url+"/device/"+model.get("deviceId"));
			});
        },

        /**
        * this method is used to generate a JSON object representing this object
        * @memberof Server
        * @param null
        * @return a JSON object representing the Device object
        */
        toJSON: function(){
            var attr = Backbone.Model.prototype.toJSON.call(this);
			attr.name = this.get('name');
            attr.ip = this.get('ip');
            attr.port = this.get('port');

            return attr;
        },

        /**
        * this method is initiakize a websocket connection
        * @memberof Server
        * @param null
        * @return null
        */
        initSocket: function(){
        	this.addr = "ws://"+this.get("ip")+":"+this.get("port");
        	this.stream = Sensnet.Factories.Connection.websocket(this, this.addr);
        	this.on('socket_open',this.socketOpen,this); 
        	this.on('socket_close',this.socketClose,this); 
        	this.on('socket_error',this.socketError,this); 
        	this.on('socket_message',this.socketMessage,this); 
        },

        /**
        * this method is called by the websocket socket when the connection is etablished
        * @memberof Server
        * @param e an event  object (not used here)
        * @return null
        */
        socketOpen: function(e){
			console.log("socketOpen");
			Sensnet.app.trigger('onSuccess', "The connection with "+this.addr+" is now open");
			this.trigger("onConnectionSuccess");
			this.set("status","connected");
		},

        /**
        * this method is called by the websocket socket when the connection is closed
        * @memberof Server
        * @param e an event  object (not used here)
        * @return null
        */
        socketClose: function(e){
			console.log("socketClose");
			Sensnet.app.trigger('onWarning', "The connection with "+this.addr+" is close");
			this.set("status","disconnected");
		},

        /**
        * this method is called by the websocket socket when there is a problem with the conection
        * @memberof Server
        * @param e an event  object (not used here)
        * @return null
        */
        socketError: function(e){
			console.log("socketError");
			Sensnet.app.trigger('onError', "An Error has just happen with "+this.addr+" !");
			this.trigger("onConnectionFailed");
			this.set("status","error");
		},

        /**
        * this method is called by the websocket socket when a message is arrived
        * @memberof Server
        * @param null
        * @return attr a JSON object representing the Device object
        */
        socketMessage: function(data){
			switch(data.event){

				// onInit Event: initialize the website
				case "onInit":
					console.log(data);
                    this.set({"devices" : new Sensnet.Collections.DeviceCollection(data.devices)});
					this.setUrl('server/'+this.get('serverId'));
				break;

				// onDeviceChange Event: update a device
				case "onDeviceChange":
					console.log(data);
					var d = this.get('devices').where({mac: data.device.mac});
					if(d.length >=1){
						d[0].set( {mac: data.device.mac});
						var s = d[0].get('sensors').models;
						if(s.length >=2){
							s[0].set(data.device.sensors[0]);
							s[1].set(data.device.sensors[1]);
						}
					}		
				break;

				//onSensorChange Event: update a sensor
				case "onSensorChange":
					console.log(data);
					var e = this.get('devices').where({mac: data.mac});
					if(e.length >=1){
						var t = e[0].get('sensors').where({port:data.sensor.port});
						if (t.length >=1){
							t[0].set(data.sensor);
						}
					}
				break;
			}
		}
          

    });

    Sensnet.Models.Server = Server;
  
  })(Backbone, Sensnet,console);

// ===================================================
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

// ===================================================
(function(Backbone, Sensnet){ 

    /** 
     * This class is used to define the welcome view
     * @class WelcomeView
     */
	var WelcomeView = Backbone.Marionette.LayoutView.extend({

		// the html template used
	    template: "#welcome-template",

	    // add a region where we can display others view
	    regions: {
	      innerWelcome: "#inner-welcome",
	     } 
	});

	
	Sensnet.Views.WelcomeView = WelcomeView;


})(Backbone, Sensnet);
// ===================================================
(function(Backbone, _, Sensnet){

	/** 
	 * This class is used to define a table view of the device
	 * @class VDeviceTable
	 */
	var VDeviceTable = Marionette.ItemView.extend({
		
		// the html template used
		template : '#device-table',

		// handle the events of the model
		modelEvents : {
			'change' : 'render',
			'sync' : 'render'
		},

        /**
        * this method is called when the sensor is rendered
        * @memberof VDeviceTable
        * @param null
        * @return null
        */
		onRender : function() {
			console.log("table was rendered");
		},

	});

	Sensnet.Views.VDeviceTable= VDeviceTable;

	/** 
	 * This class is used to define a table view of a list of devices
	 * @class VDevicesTable
	 */
	var VDevicesTable = Backbone.Marionette.CollectionView.extend({

		//define the child view
	    childView: Sensnet.Views.VDeviceTable
	    
	});

	Sensnet.Views.VDevicesTable= VDevicesTable;

})(Backbone, _, Sensnet);

// ===================================================
(function(Backbone, _, Sensnet){

	/** 
	 * This class is used to define a table view of the sensor
	 * @class VSensorTable 
	 */
	var VSensorTable = Marionette.ItemView.extend({
		
		// the html template used
		template : '#sensor-table',

		// handle the events of the model
		modelEvents : {
			'change' : 'render',
			'sync' : 'render'
		},

	    /**
        * this method is called when the sensor is rendered
        * @memberof VSensorTable
        * @param null
        * @return null
        */
		onRender : function() {
			console.log("table was rendered");
		},

	});

	Sensnet.Views.VSensorTable= VSensorTable;

	/** 
	 * This class is used to define a table view of a list of sensors
	 * @class VSensorsTable 
	 */
	var VSensorsTable = Backbone.Marionette.CollectionView.extend({

		//define the child view
	    childView: Sensnet.Views.VSensorTable
	    
	});

	Sensnet.Views.VSensorsTable= VSensorsTable;

})(Backbone, _, Sensnet);
// ===================================================
(function(Backbone, _, Sensnet){

    /** 
     * This class is used to define the form view to add a server
     * @class VServerProfile
     */
	var VServerProfile = Marionette.ItemView.extend({

		// the html template used
		template : '#server-profile',

	    // change the tag name of the template  
		tagName : 'form',                               // by default backbone produce <div> template.. </div> here we change <div> in <form>

		// handle the events of the view
		events : {
			'click .save' : 'saveForm'
		},

		/**
        * Constructor of VServerProfile class
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */
		initialize: function() {
	        this.model = new Sensnet.Models.Server(); //create a new server with default value
	    },
		
		/**
        * this method is called when we click on the save. It add the server into the application
        * @memberof VServerProfile
        * @param null
        * @return null
        */
		saveForm : function() {

			//get the name of the server
			var name = $('#serverName').val();

			//get the server ip 
			var ip = $('#serverIp').val();

			//get the server port
			var port = $('#serverPort').val();

			//get the model of the view
			var model = this.model;

			// try to find the server into our list of servers
			var tempModel = Sensnet.app.servers.findWhere({ "ip": ip, "port": port });

			// if the server exist into the list
			if(tempModel !== null && tempModel !== undefined){
				//destroy the server model we have just created
				model.trigger("destroy",this.model);
				//replace the model of this view by the model found
				model = tempModel;
				// update the name of the server
				model.set({"name":name});			
			}
			// if the server doesn't exist into the list
			else{
				// update the attributes of the server
				 model.set({"name":name,"ip":ip,"port":port});	
			}

			//initialize the websocket connection
	        model.initSocket();
	        
	        // if the connection is etablished go to the home view
	        model.on("onConnectionSuccess", function(){
	        	Sensnet.app.servers.add(model);
				Sensnet.app.router.navigate('home', {trigger: true});
			});

			// if the connection failed
	        model.on("onConnectionFailed", function(){
				//@TODO inform the user he have to change  some parameters because the connection failed
				model.trigger("destroy",this.model);
			});

		}
	});

	Sensnet.Views.VServerProfile= VServerProfile;

    /** 
     * This class is used to define a table view of the server
     * @class ServerTable
     */
	var VServerTable = Marionette.ItemView.extend({
		
		// the html template used
		template : '#server-table',

		// handle the events of the model
		modelEvents : {
			'change' : 'render',
			'sync' : 'render'
		},

		// handle the events of the view
		events: {
	        'click .delete-server': 'deleteServer'
	    },

        /**
        * this method is called when the sensor is rendered
        * @memberof VServerTable
        * @param null
        * @return null
        */
		onRender : function() {
			console.log("table was rendered");
		},

        /**
        * this method is called when we click on delete button. It delete the server
        * @memberof VServerTable
        * @param null
        * @return null
        */
		deleteServer: function(){
			this.model.trigger("destroy",this.model);
		}

	});

	Sensnet.Views.VServerTable= VServerTable;

	 /** 
     * This class is used to define a table view of a list of servers
     * @class ServersTable
     */
	var VServersTable = Backbone.Marionette.CollectionView.extend({

		//define the child view
	    childView: Sensnet.Views.VServerTable

	});

	Sensnet.Views.VServersTable= VServersTable;

})(Backbone, _, Sensnet);
// ===================================================
(function(Backbone, Sensnet){ 

    /** 
     * This class is used to define the view of sensors into the tree
     * @class SensorsViewTree
     */
    var SensorsViewTree = Backbone.Marionette.ItemView.extend({

        // the html template used
        template: "#node-template",

        // handle the events of the model
    	modelEvents : {
    		'change' : 'render',                       // when the model change update the view
    		'sync' : 'render'                          // when the model is synced update the view
    	}, 

        // handle the events of the view
    	events: {
            'click .display.sensor': 'displaySensor',  // display the information about the sensor when we click on the sensor into the tree
        }, 

        // change the tag name of the template  
        tagName: "ul",                                 // by default backbone produce <div> template.. </div> here we change <div> in <ul>

        // add some class
        className:"tree sensor",

        /**
        * this method is called when we click on the sensor into the tree view. It display the information about the sensor
        * @memberof SensorsViewTree
        * @param null
        * @return null
        */
        displaySensor: function(){
        	Sensnet.app.router.navigate(this.model.get("url"),{trigger:true}); 	
        },

        /**
        * this method is called when the sensor is rendered
        * @memberof SensorsViewTree
        * @param null
        * @return null
        */
        onRender : function() {
    		console.log("sensor was rendered");
    		this.$(".display.sensor span").addClass("new");                                       //add a small yellow star next to the sensor
    		setTimeout(function(){ this.$(".display.sensor span").removeClass("new"); }, 500);    //after 500 ms remove the star
    	},
    });

    Sensnet.Views.SensorsViewTree = SensorsViewTree;

    /** 
     * This class is used to define the view of device into the tree.
     * It's a composite view, it's mean that this view integrate a view of  a collection inside the model view
     * @class DevicesViewTree
     */
    var DevicesViewTree =  Backbone.Marionette.CompositeView.extend({

        // the html template used
        template: "#node-template",

        // handle the events of the model
       	modelEvents : {
    	},

        // handle the events of the sensor collection
    	collectionEvents: {
       	},

        // handle the events of the view
    	events: {
            'click .display.device': 'displayDevice',
        },

        // change the tag name of the template 
        tagName: "ul",                                             // by default backbone produce <div> template.. </div> here we change <div> in <ul>

        // add some class
        className:"tree device",

        // set the child view, here the view of the sensors into the tree
    	childView: Sensnet.Views.SensorsViewTree,

        /**
        * Constructor of DevicesViewTree class
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */
        initialize: function() {
            this.collection = this.model.get("sensors");   // set the collection to display
        },

        /**
        * This method is called when we click on the device into the tree view. It display the information about the device
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */ 
        displayDevice: function(){
            console.log("BOUM2!!!");
            Sensnet.app.router.navigate(this.model.get("url"),{trigger:true});      
        },

        /**
        * This method is called when the device is rendered
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */     
        onRender : function() {
    		console.log("tree was rendered");
    		$(".display.device span").addClass("new");                                                   //add a small yellow star next to the sensor
    		setTimeout(function(){ jQuery(".display.device span").removeClass("new"); }, 500);           //after 500 ms remove the star
    	},

        /**
        * This method override the method to append the collectionview into the itemview.
        * By default the collection view will append the HTML of each ChildView into the element buffer, and then call jQuery's .append once at the end to move the HTML into the collection view's el.
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */  
        attachHtml: function(collectionView, itemView, index) {
            collectionView.$("li:first").append(itemView.el);      // put into the first li the html code of the collectionView
        }

    });


    Sensnet.Views.DevicesViewTree = DevicesViewTree;


    /** 
     * This class is used to define the view of the server into the tree.
     * It's a composite view, it's mean that this view integrate a view of  a collection inside the model view
     * @class ServersViewTree
     */
    var ServersViewTree =  Backbone.Marionette.CompositeView.extend({

        // the html template used
        template: "#node-template",	

        // handle the events of the model
    	modelEvents : {
    	},

        // handle the events of the device collection
    	collectionEvents: {
       	},

        // handle the events of the view
    	events: {
            'click .display.server': 'displayServer',
        },

        // change the tag name of the template
        tagName: "ul",                               // by default backbone produce <div> template.. </div> here we change <div> in <ul>   

        // add some class                   
        className:"tree server",         

        // set the child view, here the view of the devices into the tree            
        childView: Sensnet.Views.DevicesViewTree,
        
        /**
        * Constructor of ServersViewTree class
        * @memberof ServersViewTree
        * @param null
        * @return null
        */
        initialize: function() {
           this.collection = this.model.get('devices');
        },

        /**
        * This method is called when we click on the server into the tree view. It display the information about the server
        * @memberof ServersViewTree
        * @param null
        * @return null
        */ 
        displayServer: function(){
            Sensnet.app.router.navigate(this.model.get("url"),{trigger:true});  
        },

        /**
        * This method is called when the sensor is rendered
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */    
        onRender : function() {
            console.log("server was rendered");
            $(".display.server span").addClass("new");
            setTimeout(function(){ jQuery(".display.server span").removeClass("new"); }, 500);
        },

        /**
        * This method override the method to append the collectionview into the itemview.
        * By default the collection view will append the HTML of each ChildView into the element buffer, and then call jQuery's .append once at the end to move the HTML into the collection view's el.
        * @memberof ServersViewTree
        * @param null
        * @return null
        */  
        attachHtml: function(collectionView, itemView, index) {
            collectionView.$("li:first").append(itemView.el);      // put into the first li the html code of the collectionView
        }

    });

    Sensnet.Views.ServersViewTree = ServersViewTree;


    /** 
     * This class is used to define the view of thetree.
     * It's a composite view, it's mean that this view integrate a view of  a collection inside the model view
     * @class ServersViewTree
     */
    var TreeView = Backbone.Marionette.CompositeView.extend({

        // the html template used
    	template: "#tree-template",	

         // handle the events of the server collection
       	collectionEvents: {
       		'change' : 'render',
        	"sync": "render"
       	},

        // handle the events of the view
       	events: {
            'click .display.home': 'displayHome',              
    		'click .display.server-add': 'displayAddServer'
        },

        // set the child view, here the view of the servers into the tree
        childView: Sensnet.Views.ServersViewTree,

       /**
        * This method is called when we click on the Home line into the tree view. It display the home view
        * @memberof TreeView
        * @param null
        * @return null
        */ 
        displayHome: function(){
         	Sensnet.app.router.navigate("home",{trigger:true}); 	
        },

       /**
        * This method is called when we click on the add server line into the tree view. It display a form to add a server
        * @memberof TreeView
        * @param null
        * @return null
        */ 
        displayAddServer: function(){
         	Sensnet.app.router.navigate("addServer",{trigger:true}); 	
        },
    });

    Sensnet.Views.TreeView = TreeView;


})(Backbone, Sensnet);

// ===================================================
(function(Backbone, _, Sensnet){


  Sensnet.Factories.Connection = {

     /** 
     * This function is used to initialize a websocket connection
     * @public
     * @param model the model binded to this socket
     * @param addr the address of the websocket server (Ws://127.0.0.1:8080)
     * @return the socket
     */
  	websocket: function(model,addr){

      // the socket object
  		var socket;

      // check if the Websocket class exist
      if (typeof(WebSocket) !== 'undefined') {
        console.log("Using a standard websocket");
        //initialize the object
        socket = new WebSocket(addr);

      // if not check if the  MozWebSocket class exist
      } else if (typeof(MozWebSocket) !== 'undefined') {
        console.log("Using MozWebSocket");
        //initialize the object
        socket = new MozWebSocket(addr);

      // if not inform the user that his browser does not support websockets       
      } else {
        alert("Your browser does not support websocket!");
      }

      //dispath the events of the sockets
      socket.onopen = function (e) {
        model.trigger('socket_open', e);
      };

      socket.onmessage = function (e) {
        model.trigger('socket_message', JSON.parse(e.data));
      };
    
      socket.onclose = function (e) {
        model.trigger('socket_close', e);
      };

      socket.onerror = function (e) {
        model.trigger('socket_error', e);
      };

      // return the object
      return socket;
  	}

  };

})(Backbone, _, Sensnet);
// ===================================================
(function(Backbone, _, Sensnet){

	Sensnet.Factories.Device = {

		/** 
		* This function is used to initialize the table view of the device
		* @public
		* @param serverId the id of the server
		* @param deviceId the id of the device
		* @return the view of the device
		*/
		deviceBody: function(serverId, deviceId){	
			var server = Sensnet.app.servers.get(serverId);
			var device = server.get("devices").get(deviceId);
		    var deviceView = new Sensnet.Views.VDeviceTable({model:device});
			return deviceView;
		},	

		/** 
		* This function is used to initialize the table view of a devices list belong to the server
		* @public
		* @param serverId the id of the server
		* @return the view of a devices list
		*/
		devicesBody: function(serverId){	
			var server = Sensnet.app.servers.get(serverId);
			var devices = server.get("devices");
		    var devicesView = new Sensnet.Views.VDevicesTable({collection:devices});
			return devicesView;
		}
	};

})(Backbone, _, Sensnet);
// ===================================================
(function(Backbone, _, Sensnet){
	
	Sensnet.Factories.Home = {

		/** 
		* This function is used to initialize the side view when we display the home page
		* @public
		* @param null
		* @return the view of the tree
		*/
		homeSide: function (){
			var treeView = new Sensnet.Views.TreeView ({collection: Sensnet.app.servers}); 
	    	Sensnet.app.views.treeView = treeView; 
	    	return treeView;
		},

		/** 
		* This function is used to initialize the body view when we display the home page
		* @public
		* @param null
		* @return the home view
		*/
		homeBody: function(){
		    var homeView = new Sensnet.Views.VServersTable({collection: Sensnet.app.servers});
	    	Sensnet.app.views.homeView = homeView; 
			return homeView;
		},	

		/** 
		* This function is used to initialize the welcome view when we display the welcome page
		* @public
		* @param null
		* @return the welcome view
		*/
		welcomeBody: function(){
		    var welcomeView = new Sensnet.Views.WelcomeView();
	    	Sensnet.app.views.welcomeView = welcomeView; 
			return welcomeView;
		},	
	};

})(Backbone, _, Sensnet);
// ===================================================
(function(Backbone, _, Sensnet){

	Sensnet.Factories.Sensor = {

		/** 
		* This function is used to initialize the table view of the sensor
		* @public
		* @param serverId the id of the server
		* @param deviceId the id of the device
		* @param sensorId the id of the sensor
		* @return the view of the sensor
		*/
		sensorBody: function(serverId, deviceId, sensorId){	
			var server = Sensnet.app.servers.get(serverId);
			var device = server.get("devices").get(deviceId);
			var sensor = device.get("sensors").get(sensorId);
		    var sensorView = new Sensnet.Views.VSensorTable({model:sensor});
			return sensorView;
		},	

		/** 
		* This function is used to initialize the table view of a sensors list belong to the device
		* @public
		* @param serverId the id of the server
		* @param deviceId the id of the device
		* @return the view of a sensors list
		*/
		sensorsBody: function(serverId, deviceId){	
			var server = Sensnet.app.servers.get(serverId);
			var device = server.get("devices").get(deviceId);
			var sensors = device.get("sensors");
		    var sensorsView = new Sensnet.Views.VSensorsTable({collection:sensors});
			return sensorsView;
		}
	};

})(Backbone, _, Sensnet);
// ===================================================
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