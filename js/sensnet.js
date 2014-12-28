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
* sensnet.js  V0.1  (2014-12-28, 18:10)       
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
	    Backbone.history.start({});
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
    	'welcome' : 'welcome',
        'home' : 'home',
        'servers/:serverId' : 'server',
        'devices/:deviceId' : 'device',
        'sensors/:sensorId' : 'sensor',
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
     * initialize and display the home view
     * @public
     * @memberof Router
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
     * @public
     * @memberof Router
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
     * @public
     * @memberof Router
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
     * @public
     * @memberof Router
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
   /* Device Model */
 
 	/** 
 	 * This class is used to define a bluetooth slave object
 	 * @class Device
 	 */
 	var Device = Backbone.Model.extend({
        initialize: function(){
          this.set({deviceId: this.cid,model: "device"});
          this.set({name: 'Device '+this.get('deviceId')});
          var sensors = this.get("sensors");
          if (sensors){
             this.set({"sensors" : new Sensnet.Collections.SensorCollection(sensors)});
          }

        },

        idAttribute: 'deviceId',

        defaults: {
            mac: '',
            sensors:[]
        },

        urlRoot: '/sensnet/devices/',

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
   /* Sensor Model */
 
 	/** 
     * This class is used to define a sensor
 	 * @class Sensor
 	 */
 	var Sensor = Backbone.Model.extend({
        initialize: function(){
          this.set({sensorId: this.cid,model: "sensor"});
          this.set({name: 'Sensor '+this.get('sensorId')});
        },

        idAttribute: 'sensorId',

        defaults: {
            type: '',
            port: '',
            value: 0,
            unit:'unknow',
            connected: false
        },

        urlRoot: '/sensnet/sensors/',

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


(function(Backbone, Sensnet,console){ 
   /* Server Model */
 
  	/** 
     * This class is used to define a server
 	 * @class Server
 	 */
 	var Server = Backbone.Model.extend({
        initialize: function(){
          this.set({serverId: this.cid,model: "server"});
          this.set({name: 'Server '+this.get('serverId')});
          var devices = this.get("devices");
          if (!devices){
             this.set("devices", new Sensnet.Collections.DeviceCollection());
          }
        },

        idAttribute: 'serverId',

        defaults: {
        	name: 'Server',
            ip: '127.0.0.1',
            port: '8080',
            status: "unknow",

        },

        urlRoot: '/sensnet/servers/',

        toJSON: function(){
            var attr = Backbone.Model.prototype.toJSON.call(this);

			attr.name = this.get('name');
            attr.ip = this.get('ip');
            attr.port = this.get('port');

            return attr;
        },
        initSocket: function(){
        	this.addr = "ws://"+this.get("ip")+":"+this.get("port");
        	this.stream = Sensnet.Factories.Connection.websocket(this.addr);
        	this.stream.on('socket_open',this.socketOpen,this); 
        	this.stream.on('socket_close',this.socketClose,this); 
        	this.stream.on('socket_error',this.socketError,this); 
        	this.stream.on('socket_message',this.socketMessage,this); 
        },
        socketOpen: function(e){
			console.log("socketOpen");
			Sensnet.app.trigger('onSuccess', "The connection with "+this.addr+" is now open");
			this.trigger("onConnectionSuccess");
			this.set("status","connected");
			this.stream.socket.send(JSON.stringify(Sensnet.Test.onInitMsg));
		},
        socketClose: function(e){
			console.log("socketClose");
			Sensnet.app.trigger('onWarning', "The connection with "+this.addr+" is close");
			this.set("status","disconnected");
		},
        socketError: function(e){
			console.log("socketError");
			Sensnet.app.trigger('onError', "An Error has just happen with "+this.addr+" !");
			this.trigger("onConnectionFailed");
		},
        socketMessage: function(data){
			switch(data.event){
				case "onInit":
					console.log(data);
					var col = new Sensnet.Collections.DeviceCollection(data.devices);
					this.set("devices",col);
					//var treeView = new Sensnet.Views.TreeView ({collection: Sensnet.app.servers});  
    				//Sensnet.app.tree.show(treeView);

				break;
				case "onDeviceChange":
					console.log(data);
					var d = this.get('devices').where({mac: data.device.mac});
					if(d.length >=1){
						d[0].set( {mac: data.device.mac});
						var s = d[0].get('sensors').models;
						if(s.length >=1){
							s[0].set(data.device.sensors[0]);
							s[1].set(data.device.sensors[1]);
						}
					}
					
				break;
				case "onSensorChange":
					console.log(data);
					var e = this.get('devices').where({mac: data.mac});
					if(e.length >=1){
						var t = d[0].get('sensors').where({port:data.sensor.port});
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

	var SensorCollection = Backbone.Collection.extend({
	    model: Sensnet.Models.Sensor
	});
	
	Sensnet.Collections.SensorCollection = SensorCollection;

})(Backbone, Sensnet);

// ===================================================
(function(Backbone, Sensnet){ 

	var DeviceCollection = Backbone.Collection.extend({
	    model: Sensnet.Models.Device
	});
	
	Sensnet.Collections.DeviceCollection = DeviceCollection;

})(Backbone, Sensnet);

// ===================================================
(function(Backbone, Sensnet){ 

	var ServerCollection = Backbone.Collection.extend({
	    model: Sensnet.Models.Server
	});
	
	Sensnet.Collections.ServerCollection = ServerCollection;

})(Backbone, Sensnet);

// ===================================================
(function(Backbone, Sensnet){ 

var WelcomeView = Backbone.Marionette.LayoutView.extend({
    template: "#welcome-template",
    regions: {
      innerWelcome: "#inner-welcome",
     } 
});
Sensnet.Views.WelcomeView = WelcomeView;


})(Backbone, Sensnet);
// ===================================================

// ===================================================
var VDeviceTable = Marionette.ItemView.extend({
	

	template : '#device-table',
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	},

	onRender : function() {
		console.log("table was rendered");
	},

});

Sensnet.Views.VDeviceTable= VDeviceTable;
// ===================================================

// ===================================================
var VSensorTable = Marionette.ItemView.extend({
	

	template : '#sensor-table',
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	},

	onRender : function() {
		console.log("table was rendered");
	},

});

Sensnet.Views.VSensorTable= VSensorTable;
// ===================================================
(function(Backbone, _, Sensnet){

var VServerProfile = Marionette.ItemView.extend({
	
	initialize: function() {
        this.model = new Sensnet.Models.Server();
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
		if(model !== null && model !== undefined){
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
// ===================================================
(function(Backbone, Sensnet){ 
// The recursive tree view
var SensorsViewTree = Backbone.Marionette.ItemView.extend({
    template: "#node-template",
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	}, 
	events: {
        'click .display.sensor': 'displaySensor',
		'click .remove': 'removeSensor'
    },   
    tagName: "ul",
    className:"tree sensor",
    displaySensor: function(){
    	console.log("BOUM1!!!");
    	var sensorView = new Sensnet.Views.VSensorTable({model:this.model});
    	Sensnet.app.body.show(sensorView);  
    	
    },
    removeSensor: function(){
    	
    },
    onRender : function() {
		console.log("sensor was rendered");
		this.$(".display.sensor span").addClass("new");
		setTimeout(function(){ this.$(".display.sensor span").removeClass("new"); }, 500);
	},
});
Sensnet.Views.SensorsViewTree = SensorsViewTree;

var DevicesViewTree =  Backbone.Marionette.CompositeView.extend({
    template: "#node-template",
   	modelEvents : {
		//'change' : 'render',
		//'sync' : 'render'
	},
	collectionEvents: {
		//'change' : 'render',
    	//"sync": "render"
   	},
	events: {
        'click .display.device': 'displayDevice',
		'click .remove': 'removeDevice'
    },
    tagName: "ul",
    className:"tree device",
	childView: Sensnet.Views.SensorsViewTree,
    initialize: function() {
        this.collection = this.model.get("sensors");
    },
    onRender : function() {
		console.log("tree was rendered");
		$(".display.device span").addClass("new");
		setTimeout(function(){ jQuery(".display.device span").removeClass("new"); }, 500);
	},

    appendHtml: function(collectionView, itemView) {
        collectionView.$("li:first").append(itemView.el);
    },
    displayDevice: function(){
    	console.log("BOUM2!!!");
    	var deviceView = new Sensnet.Views.VDeviceTable({model:this.model});
    	Sensnet.app.body.show(deviceView);      	
    },
    removeDevice: function(){
    	
    }
});
Sensnet.Views.DevicesViewTree = DevicesViewTree;


var ServersViewTree =  Backbone.Marionette.CompositeView.extend({
    template: "#node-template",	
	modelEvents : {
		//'change' : 'render',
		//'sync' : 'render'
	},
	collectionEvents: {
		//'change' : 'render',
    	//"sync": "render"
   	},
	events: {
        'click .display.server': 'displayServer',
		'click .remove': 'hideWelcome'
    },
    tagName: "ul",
    className:"tree server",
    childView: Sensnet.Views.DevicesViewTree,
    
    initialize: function() {
       this.collection = this.model.get('devices');
    },

    appendHtml: function(collectionView, itemView) {
        collectionView.$("li:first").append(itemView.el);
    },
    displayServer: function(){
     	console.log("BOUM3!!!");
    	var serverView = new Sensnet.Views.VServerTable({model:this.model});
    	Sensnet.app.body.show(serverView);     	
    },
    removeServer: function(){
    	
    },
    onRender : function() {
		console.log("server was rendered");
		$(".display.server span").addClass("new");
		setTimeout(function(){ jQuery(".display.server span").removeClass("new"); }, 500);
	},
});
Sensnet.Views.ServersViewTree = ServersViewTree;



var TreeView = Backbone.Marionette.CollectionView.extend({
    childView: Sensnet.Views.ServersViewTree,
   	collectionEvents: {
   		'change' : 'render',
    	"sync": "render"
   	}
});

Sensnet.Views.TreeView = TreeView;


})(Backbone, Sensnet);

// ===================================================
(function(Backbone, _, Sensnet){

Sensnet.Factories.Connection = {
	websocket: function(addr){
		 this.addr = addr;
        _.extend(this, Backbone.Events);
  		 var self = this;
  
        if (typeof(WebSocket) !== 'undefined') {
          console.log("Using a standard websocket");
          self.socket = new WebSocket(this.addr);
        } else if (typeof(MozWebSocket) !== 'undefined') {
          console.log("Using MozWebSocket");
          self.socket = new MozWebSocket(this.addr);
        } else {
          alert("Your browser does not support web sockets. No stats for you!");
        }
      
        self.socket.onopen = function (e) {
          self.trigger('socket_open', e);
        };
        self.socket.onmessage = function (e) {
          self.trigger('socket_message', JSON.parse(e.data));
        };
      
        self.socket.onclose = function (e) {
          self.trigger('socket_close', e);
        };
        self.socket.onerror = function (e) {
          self.trigger('socket_error', e);
        };
        return this;
	}

};

})(Backbone, _, Sensnet);
// ===================================================
(function(jQuery, $){
	
jQuery.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};
 
  $.each(arrayData, function() {
    var value;
    if (this.value !== null) {
      value = this.value;
    } else {
      value = '';
    }
    if (objectData[this.name] !== null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }
      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });
return objectData;
};

})(jQuery, $);

// ===================================================

// ===================================================
