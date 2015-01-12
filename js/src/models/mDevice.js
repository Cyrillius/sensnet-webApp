

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