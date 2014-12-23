(function(Backbone, Sensnet){ 

var WelcomeView = Backbone.Marionette.LayoutView.extend({
    template: "#welcome-template",
    regions: {
      innerWelcome: "#inner-welcome",
     } 
});
Sensnet.Views.WelcomeView = WelcomeView;


})(Backbone, Sensnet);