 /**
 *@file This file define the Sensor Model of the project 
 *@author Cyril Praz
 *@version V0.2
 */

(function(Backbone, Sensnet){ 
   /* Sensor Model */
 
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