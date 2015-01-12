(function(Backbone, _, Sensnet){
	
	Sensnet.Factories.Home = {

		/** 
		* This function is used to initialize the side view when we display the home page
		* @public
		* @param null
		* @return the view of the tree
		*/
		homeSide: function (){
			var treeView = new Sensnet.Views.TreeView ({collection: Sensnet.app.servers}); 
	    	Sensnet.app.views.treeView = treeView; 
	    	return treeView;
		},

		/** 
		* This function is used to initialize the body view when we display the home page
		* @public
		* @param null
		* @return the home view
		*/
		homeBody: function(){
		    var homeView = new Sensnet.Views.VServersTable({collection: Sensnet.app.servers});
	    	Sensnet.app.views.homeView = homeView; 
			return homeView;
		},	

		/** 
		* This function is used to initialize the welcome view when we display the welcome page
		* @public
		* @param null
		* @return the welcome view
		*/
		welcomeBody: function(){
		    var welcomeView = new Sensnet.Views.WelcomeView();
	    	Sensnet.app.views.welcomeView = welcomeView; 
			return welcomeView;
		},	
	};

})(Backbone, _, Sensnet);