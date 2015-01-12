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