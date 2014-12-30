(function(Backbone, _, Sensnet){
Sensnet.Factories.Sensor = {
	sensorBody: function(serverId, deviceId, sensorId){	
		var server = Sensnet.app.servers.get(serverId);
		var device = server.get("devices").get(deviceId);
		var sensor = device.get("sensors").get(sensorId);
	    var sensorView = new Sensnet.Views.VSensorTable({model:sensor});
		return sensorView;
	},	
	sensorsBody: function(serverId, deviceId){	
		var server = Sensnet.app.servers.get(serverId);
		var device = server.get("devices").get(deviceId);
		var sensors = device.get("sensors");
	    var sensorsView = new Sensnet.Views.VSensorsTable({collection:sensors});
		return sensorsView;
	}
};

})(Backbone, _, Sensnet);