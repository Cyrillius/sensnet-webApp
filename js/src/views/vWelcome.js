(function(Backbone, Sensnet){ 

    /** 
     * This class is used to define the welcome view
     * @class WelcomeView
     */
	var WelcomeView = Backbone.Marionette.LayoutView.extend({

		// the html template used
	    template: "#welcome-template",

	    // add a region where we can display others view
	    regions: {
	      innerWelcome: "#inner-welcome",
	     } 
	});

	
	Sensnet.Views.WelcomeView = WelcomeView;


})(Backbone, Sensnet);