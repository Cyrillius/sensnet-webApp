(function(Backbone, _, Sensnet){
Sensnet.Factories.Home = {
	homeSide: function (){
		var treeView = new Sensnet.Views.TreeView ({collection: Sensnet.app.servers}); 
    	Sensnet.app.views.treeView = treeView; 
    	return treeView;
	},
	homeBody: function(){
	    var homeView = new Sensnet.Views.VServersTable({collection: Sensnet.app.servers});
    	Sensnet.app.views.homeView = homeView; 
		return homeView;
	},	
	welcomeBody: function(){
	    var welcomeView = new Sensnet.Views.WelcomeView();
    	Sensnet.app.views.welcomeView = welcomeView; 
		return welcomeView;
	},	
};

Sensnet.app.tree.displayTree = function(){ Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());};
Sensnet.app.body.displayHome = function(){ Sensnet.app.body.show(Sensnet.Factories.Home.homeBody());};
Sensnet.app.body.displayWelcome = function(){ 
	var welcomeView = Sensnet.Factories.Home.welcomeBody();
	Sensnet.app.body.show(welcomeView);
	welcomeView.innerWelcome.show(Sensnet.Factories.Server.addServerForm());		
};

})(Backbone, _, Sensnet);