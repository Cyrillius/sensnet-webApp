

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
          	 var col = new Sensnet.Collections.SensorCollection(sensors);
             this.set({"sensors" : col});
             
          }

        },

        idAttribute: 'deviceId',

        defaults: {
            mac: '',
            sensors:[]
        },

        urlRoot: '/sensnet/devices/',
        
        setUrl: function(url){
        	this.set({"url":url});
        	var col = this.get("sensors");
          	col.forEach(function(model) {
    		   model.setUrl(url+"/sensor/"+model.get("sensorId"));
			});
        },

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