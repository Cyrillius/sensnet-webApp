(function(Backbone, _, Sensnet){
Sensnet.Factories.Device = {
	deviceBody: function(serverId, deviceId){	
		var server = Sensnet.app.servers.get(serverId);
		var device = server.get("devices").get(deviceId);
	    var deviceView = new Sensnet.Views.VDeviceTable({model:device});
		return deviceView;
	},	
	devicesBody: function(serverId){	
		var server = Sensnet.app.servers.get(serverId);
		var devices = server.get("devices");
	    var devicesView = new Sensnet.Views.VDevicesTable({collection:devices});
		return devicesView;
	}
};

})(Backbone, _, Sensnet);