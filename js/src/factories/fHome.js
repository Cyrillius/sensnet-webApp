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
	}	
};

Sensnet.app.tree.displayTree = function(){ Sensnet.app.tree.show(Sensnet.Factories.Home.homeSide());};
Sensnet.app.body.displayHome = function(){ Sensnet.app.body.show(Sensnet.Factories.Home.homeBody());};


})(Backbone, _, Sensnet);