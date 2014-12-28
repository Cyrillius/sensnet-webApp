
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