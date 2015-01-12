(function(Backbone, Sensnet){ 

    /** 
     * This class is used to define the view of sensors into the tree
     * @class SensorsViewTree
     */
    var SensorsViewTree = Backbone.Marionette.ItemView.extend({

        // the html template used
        template: "#node-template",

        // handle the events of the model
    	modelEvents : {
    		'change' : 'render',                       // when the model change update the view
    		'sync' : 'render'                          // when the model is synced update the view
    	}, 

        // handle the events of the view
    	events: {
            'click .display.sensor': 'displaySensor',  // display the information about the sensor when we click on the sensor into the tree
        }, 

        // change the tag name of the template  
        tagName: "ul",                                 // by default backbone produce <div> template.. </div> here we change <div> in <ul>

        // add some class
        className:"tree sensor",

        /**
        * this method is called when we click on the sensor into the tree view. It display the information about the sensor
        * @memberof SensorsViewTree
        * @param null
        * @return null
        */
        displaySensor: function(){
        	Sensnet.app.router.navigate(this.model.get("url"),{trigger:true}); 	
        },

        /**
        * this method is called when the sensor is rendered
        * @memberof SensorsViewTree
        * @param null
        * @return null
        */
        onRender : function() {
    		console.log("sensor was rendered");
    		this.$(".display.sensor span").addClass("new");                                       //add a small yellow star next to the sensor
    		setTimeout(function(){ this.$(".display.sensor span").removeClass("new"); }, 500);    //after 500 ms remove the star
    	},
    });

    Sensnet.Views.SensorsViewTree = SensorsViewTree;

    /** 
     * This class is used to define the view of device into the tree.
     * It's a composite view, it's mean that this view integrate a view of  a collection inside the model view
     * @class DevicesViewTree
     */
    var DevicesViewTree =  Backbone.Marionette.CompositeView.extend({

        // the html template used
        template: "#node-template",

        // handle the events of the model
       	modelEvents : {
    	},

        // handle the events of the sensor collection
    	collectionEvents: {
       	},

        // handle the events of the view
    	events: {
            'click .display.device': 'displayDevice',
        },

        // change the tag name of the template 
        tagName: "ul",                                             // by default backbone produce <div> template.. </div> here we change <div> in <ul>

        // add some class
        className:"tree device",

        // set the child view, here the view of the sensors into the tree
    	childView: Sensnet.Views.SensorsViewTree,

        /**
        * Constructor of DevicesViewTree class
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */
        initialize: function() {
            this.collection = this.model.get("sensors");   // set the collection to display
        },

        /**
        * This method is called when we click on the device into the tree view. It display the information about the device
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */ 
        displayDevice: function(){
            console.log("BOUM2!!!");
            Sensnet.app.router.navigate(this.model.get("url"),{trigger:true});      
        },

        /**
        * This method is called when the device is rendered
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */     
        onRender : function() {
    		console.log("tree was rendered");
    		$(".display.device span").addClass("new");                                                   //add a small yellow star next to the sensor
    		setTimeout(function(){ jQuery(".display.device span").removeClass("new"); }, 500);           //after 500 ms remove the star
    	},

        /**
        * This method override the method to append the collectionview into the itemview.
        * By default the collection view will append the HTML of each ChildView into the element buffer, and then call jQuery's .append once at the end to move the HTML into the collection view's el.
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */  
        attachHtml: function(collectionView, itemView, index) {
            collectionView.$("li:first").append(itemView.el);      // put into the first li the html code of the collectionView
        }

    });


    Sensnet.Views.DevicesViewTree = DevicesViewTree;


    /** 
     * This class is used to define the view of the server into the tree.
     * It's a composite view, it's mean that this view integrate a view of  a collection inside the model view
     * @class ServersViewTree
     */
    var ServersViewTree =  Backbone.Marionette.CompositeView.extend({

        // the html template used
        template: "#node-template",	

        // handle the events of the model
    	modelEvents : {
    	},

        // handle the events of the device collection
    	collectionEvents: {
       	},

        // handle the events of the view
    	events: {
            'click .display.server': 'displayServer',
        },

        // change the tag name of the template
        tagName: "ul",                               // by default backbone produce <div> template.. </div> here we change <div> in <ul>   

        // add some class                   
        className:"tree server",         

        // set the child view, here the view of the devices into the tree            
        childView: Sensnet.Views.DevicesViewTree,
        
        /**
        * Constructor of ServersViewTree class
        * @memberof ServersViewTree
        * @param null
        * @return null
        */
        initialize: function() {
           this.collection = this.model.get('devices');
        },

        /**
        * This method is called when we click on the server into the tree view. It display the information about the server
        * @memberof ServersViewTree
        * @param null
        * @return null
        */ 
        displayServer: function(){
            Sensnet.app.router.navigate(this.model.get("url"),{trigger:true});  
        },

        /**
        * This method is called when the sensor is rendered
        * @memberof DevicesViewTree
        * @param null
        * @return null
        */    
        onRender : function() {
            console.log("server was rendered");
            $(".display.server span").addClass("new");
            setTimeout(function(){ jQuery(".display.server span").removeClass("new"); }, 500);
        },

        /**
        * This method override the method to append the collectionview into the itemview.
        * By default the collection view will append the HTML of each ChildView into the element buffer, and then call jQuery's .append once at the end to move the HTML into the collection view's el.
        * @memberof ServersViewTree
        * @param null
        * @return null
        */  
        attachHtml: function(collectionView, itemView, index) {
            collectionView.$("li:first").append(itemView.el);      // put into the first li the html code of the collectionView
        }

    });

    Sensnet.Views.ServersViewTree = ServersViewTree;


    /** 
     * This class is used to define the view of thetree.
     * It's a composite view, it's mean that this view integrate a view of  a collection inside the model view
     * @class ServersViewTree
     */
    var TreeView = Backbone.Marionette.CompositeView.extend({

        // the html template used
    	template: "#tree-template",	

         // handle the events of the server collection
       	collectionEvents: {
       		'change' : 'render',
        	"sync": "render"
       	},

        // handle the events of the view
       	events: {
            'click .display.home': 'displayHome',              
    		'click .display.server-add': 'displayAddServer'
        },

        // set the child view, here the view of the servers into the tree
        childView: Sensnet.Views.ServersViewTree,

       /**
        * This method is called when we click on the Home line into the tree view. It display the home view
        * @memberof TreeView
        * @param null
        * @return null
        */ 
        displayHome: function(){
         	Sensnet.app.router.navigate("home",{trigger:true}); 	
        },

       /**
        * This method is called when we click on the add server line into the tree view. It display a form to add a server
        * @memberof TreeView
        * @param null
        * @return null
        */ 
        displayAddServer: function(){
         	Sensnet.app.router.navigate("addServer",{trigger:true}); 	
        },
    });

    Sensnet.Views.TreeView = TreeView;


})(Backbone, Sensnet);
