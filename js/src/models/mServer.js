

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
          	var coll = new Sensnet.Collections.DeviceCollection(devices);
            this.set("devices",coll);
          }
          this.setUrl('server/'+this.get('serverId'));
        },

        idAttribute: 'serverId',

        defaults: {
        	name: 'Server',
            ip: '127.0.0.1',
            port: '8080',
            status: "unknow",

        },

        urlRoot: '/sensnet/servers/',
        
        setUrl: function(url){
        	this.set({"url":url});
        	var col = this.get("devices");
          	col.forEach(function(model) {
    		   model.setUrl(url+"/device/"+model.get("deviceId"));
			});
        },

        toJSON: function(){
            var attr = Backbone.Model.prototype.toJSON.call(this);
			attr.name = this.get('name');
            attr.ip = this.get('ip');
            attr.port = this.get('port');

            return attr;
        },
        initSocket: function(){
        	this.addr = "ws://"+this.get("ip")+":"+this.get("port");
        	this.stream = Sensnet.Factories.Connection.websocket(this, this.addr);
        	this.on('socket_open',this.socketOpen,this); 
        	this.on('socket_close',this.socketClose,this); 
        	this.on('socket_error',this.socketError,this); 
        	this.on('socket_message',this.socketMessage,this); 
        },
        socketOpen: function(e){
			console.log("socketOpen");
			Sensnet.app.trigger('onSuccess', "The connection with "+this.addr+" is now open");
			this.trigger("onConnectionSuccess");
			this.set("status","connected");
			this.stream.send(JSON.stringify(Sensnet.Test.onInitMsg));
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
			this.set("status","error");
		},
        socketMessage: function(data){
			switch(data.event){
				case "onInit":
					console.log(data);
					var col = new Sensnet.Collections.DeviceCollection(data.devices);
					this.set("devices",col);
					this.setUrl('server/'+this.get('serverId'));
				break;
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
