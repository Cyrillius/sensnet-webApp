
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