/**
 *@file This file implement  the Application Class of the project 
 *@author Cyril Praz
 *@version V0.2
 */


/**     
* @namespace Sensnet
*/

/* create a Namespace for our project*/
var Sensnet = {
	/**     
	* @namespace Sensnet.Views
	*/
	Views : {},
	/**     
	* @namespace Sensnet.Collections
	*/
	Collections : {},
	/**     
	* @namespace Sensnet.Models
	*/
	Models : {},
	/**     
	* @namespace Sensnet.Factories
	*/
	Factories : {}
};
/* create a new instance of the Marionette app */
Sensnet.app = new Backbone.Marionette.Application();

/* add the initial region which will contain the app */
Sensnet.app.addRegions({
        header: '#sensnetHeader',
        tree: '#sensnetTree',
        body: '#sensnetBody',
        template: '#sensnetTemplate'
    });
    

Sensnet.app.addInitializer(function(){
	
	var $w = $(window);
    var $d = $(document);
    var servers = new Sensnet.Collections.ServerCollection;
    Sensnet.app.servers=servers;
    
});

/* Handle some Events */

Sensnet.app.on("start", function(){
	
 	console.log("Sensnet App has started!");
	 if (Backbone.history){                             //when the application has started create a Router object
	    Sensnet.app.router = new Sensnet.Router();
	    Backbone.history.start({});
	} 
});
Sensnet.app.on("onSuccess", function(msg){
	
	 $.jGrowl(msg, {                                   //display a notification when the event onSucess is triggered
		theme: 'alert-success',
		life: 4000 ,
		animateOpen: {
			height: "show"
		}
	});
});
Sensnet.app.on("onWarning", function(msg){            //display a notification when the event onWarning is triggered
	
	 $.jGrowl(msg, {
		theme: 'alert-warning',
		life: 3000,
		animateOpen: {
			height: "show"
		},
		animateClose: {
			height: "hide"
		}
	});
});
Sensnet.app.on("onError", function(msg){              //display a notification when the event onError is triggered
	
	 $.jGrowl(msg, {
		theme: 'alert-danger',
		life: 6000
	});
});

/* initialize the javscript application when the page is loaded */
$(function(){
	$( '#content').load( "template/template.html",function(){Sensnet.app.start();} );
});