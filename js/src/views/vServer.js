(function(Backbone, _, Sensnet){

    /** 
     * This class is used to define the form view to add a server
     * @class VServerProfile
     */
	var VServerProfile = Marionette.ItemView.extend({

		// the html template used
		template : '#server-profile',

	    // change the tag name of the template  
		tagName : 'form',                               // by default backbone produce <div> template.. </div> here we change <div> in <form>

		// handle the events of the view
		events : {
			'click .save' : 'saveForm'
		},

		/**
        * Constructor of VServerProfile class
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */
		initialize: function() {
	        this.model = new Sensnet.Models.Server(); //create a new server with default value
	    },
		
		/**
        * this method is called when we click on the save. It add the server into the application
        * @memberof VServerProfile
        * @param null
        * @return null
        */
		saveForm : function() {

			//get the name of the server
			var name = $('#serverName').val();

			//get the server ip 
			var ip = $('#serverIp').val();

			//get the server port
			var port = $('#serverPort').val();

			//get the model of the view
			var model = this.model;

			// try to find the server into our list of servers
			var tempModel = Sensnet.app.servers.findWhere({ "ip": ip, "port": port });

			// if the server exist into the list
			if(tempModel !== null && tempModel !== undefined){
				//destroy the server model we have just created
				model.trigger("destroy",this.model);
				//replace the model of this view by the model found
				model = tempModel;
				// update the name of the server
				model.set({"name":name});			
			}
			// if the server doesn't exist into the list
			else{
				// update the attributes of the server
				 model.set({"name":name,"ip":ip,"port":port});	
			}

			//initialize the websocket connection
	        model.initSocket();
	        
	        // if the connection is etablished go to the home view
	        model.on("onConnectionSuccess", function(){
	        	Sensnet.app.servers.add(model);
				Sensnet.app.router.navigate('home', {trigger: true});
			});

			// if the connection failed
	        model.on("onConnectionFailed", function(){
				//@TODO inform the user he have to change  some parameters because the connection failed
				model.trigger("destroy",this.model);
			});

		}
	});

	Sensnet.Views.VServerProfile= VServerProfile;

    /** 
     * This class is used to define a table view of the server
     * @class ServerTable
     */
	var VServerTable = Marionette.ItemView.extend({
		
		// the html template used
		template : '#server-table',

		// handle the events of the model
		modelEvents : {
			'change' : 'render',
			'sync' : 'render'
		},

		// handle the events of the view
		events: {
	        'click .delete-server': 'deleteServer'
	    },

        /**
        * this method is called when the sensor is rendered
        * @memberof VServerTable
        * @param null
        * @return null
        */
		onRender : function() {
			console.log("table was rendered");
		},

        /**
        * this method is called when we click on delete button. It delete the server
        * @memberof VServerTable
        * @param null
        * @return null
        */
		deleteServer: function(){
			this.model.trigger("destroy",this.model);
		}

	});

	Sensnet.Views.VServerTable= VServerTable;

	 /** 
     * This class is used to define a table view of a list of servers
     * @class ServersTable
     */
	var VServersTable = Backbone.Marionette.CollectionView.extend({

		//define the child view
	    childView: Sensnet.Views.VServerTable

	});

	Sensnet.Views.VServersTable= VServersTable;

})(Backbone, _, Sensnet);