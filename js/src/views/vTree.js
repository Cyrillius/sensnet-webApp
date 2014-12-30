(function(Backbone, Sensnet){ 
// The recursive tree view
var SensorsViewTree = Backbone.Marionette.ItemView.extend({
    template: "#node-template",
	modelEvents : {
		'change' : 'render',
		'sync' : 'render'
	}, 
	events: {
        'click .display.sensor': 'displaySensor',
		'click .remove': 'removeSensor'
    },   
    tagName: "ul",
    className:"tree sensor",
    displaySensor: function(){
    	Sensnet.app.router.navigate(this.model.get("url"),{trigger:true}); 	
    },
    removeSensor: function(){
    	
    },
    onRender : function() {
		console.log("sensor was rendered");
		this.$(".display.sensor span").addClass("new");
		setTimeout(function(){ this.$(".display.sensor span").removeClass("new"); }, 500);
	},
});
Sensnet.Views.SensorsViewTree = SensorsViewTree;

var DevicesViewTree =  Backbone.Marionette.CompositeView.extend({
    template: "#node-template",
   	modelEvents : {
		//'change' : 'render',
		//'sync' : 'render'
	},
	collectionEvents: {
		//'change' : 'render',
    	//"sync": "render"
   	},
	events: {
        'click .display.device': 'displayDevice',
		'click .remove': 'removeDevice'
    },
    tagName: "ul",
    className:"tree device",
	childView: Sensnet.Views.SensorsViewTree,
    initialize: function() {
        this.collection = this.model.get("sensors");
    },
    onRender : function() {
		console.log("tree was rendered");
		$(".display.device span").addClass("new");
		setTimeout(function(){ jQuery(".display.device span").removeClass("new"); }, 500);
	},

    appendHtml: function(collectionView, itemView) {
        collectionView.$("li:first").append(itemView.el);
    },
    displayDevice: function(){
    	console.log("BOUM2!!!");
    	Sensnet.app.router.navigate(this.model.get("url"),{trigger:true});     	
    },
    removeDevice: function(){
    	
    }
});
Sensnet.Views.DevicesViewTree = DevicesViewTree;


var ServersViewTree =  Backbone.Marionette.CompositeView.extend({
    template: "#node-template",	
	modelEvents : {
		//'change' : 'render',
		//'sync' : 'render'
	},
	collectionEvents: {
		//'change' : 'render',
    	//"sync": "render"
   	},
	events: {
        'click .display.server': 'displayServer',
		'click .remove': 'hideWelcome'
    },
    tagName: "ul",
    className:"tree server",
    childView: Sensnet.Views.DevicesViewTree,
    
    initialize: function() {
       this.collection = this.model.get('devices');
    },

    appendHtml: function(collectionView, itemView) {
        collectionView.$("li:first").append(itemView.el);
    },
    displayServer: function(){
     	Sensnet.app.router.navigate(this.model.get("url"),{trigger:true}); 	
    },
    removeServer: function(){
    	
    },
    onRender : function() {
		console.log("server was rendered");
		$(".display.server span").addClass("new");
		setTimeout(function(){ jQuery(".display.server span").removeClass("new"); }, 500);
	},
});
Sensnet.Views.ServersViewTree = ServersViewTree;



var TreeView = Backbone.Marionette.CompositeView.extend({
	template: "#tree-template",	
    childView: Sensnet.Views.ServersViewTree,
   	collectionEvents: {
   		'change' : 'render',
    	"sync": "render"
   	},
   	events: {
        'click .display.home': 'displayHome',
		'click .display.server-add': 'displayAddServer'
    },
    displayHome: function(){
     	Sensnet.app.router.navigate("home",{trigger:true}); 	
    },
    displayAddServer: function(){
     	Sensnet.app.router.navigate("addServer",{trigger:true}); 	
    },
});

Sensnet.Views.TreeView = TreeView;


})(Backbone, Sensnet);
