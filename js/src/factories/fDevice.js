(function(Backbone, _, Sensnet){

	Sensnet.Factories.Device = {

		/** 
		* This function is used to initialize the table view of the device
		* @public
		* @param serverId the id of the server
		* @param deviceId the id of the device
		* @return the view of the device
		*/
		deviceBody: function(serverId, deviceId){	
			var server = Sensnet.app.servers.get(serverId);
			var device = server.get("devices").get(deviceId);
		    var deviceView = new Sensnet.Views.VDeviceTable({model:device});
			return deviceView;
		},	

		/** 
		* This function is used to initialize the table view of a devices list belong to the server
		* @public
		* @param serverId the id of the server
		* @return the view of a devices list
		*/
		devicesBody: function(serverId){	
			var server = Sensnet.app.servers.get(serverId);
			var devices = server.get("devices");
		    var devicesView = new Sensnet.Views.VDevicesTable({collection:devices});
			return devicesView;
		}
	};

})(Backbone, _, Sensnet);