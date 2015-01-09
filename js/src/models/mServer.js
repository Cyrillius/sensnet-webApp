

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
          this.set({serverId: this.cid,model: "server"});
          this.set({name: 'Server '+this.get('serverId')});
          var devices = this.get("devices");
          if (!devices){
          	var coll = new Sensnet.Collections.DeviceCollection(devices);
            this.set("devices",coll);
          }
          this.setUrl('server/'+this.get('serverId'));
        },

        // add some default attribute to a server model
        defaults: {
        	name: 'Server',         // the name of the server 
            ip: '127.0.0.1',        // the ip adress of the server
            port: '8080',           // the ip port of the server
            status: "unknow",       // the state of the server ("unknow","connected","disconnected")

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
					var col = new Sensnet.Collections.DeviceCollection(data.devices);
					this.set("devices",col);
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
