// The recursive tree view
var SensorsViewTree = Backbone.Marionette.ItemView.extend({
    template: "#node-template",
    tagName: "ul",
    className:"tree-sensor"
});


var DevicesViewTree =  Backbone.Marionette.CompositeView.extend({
    template: "#node-template",
    tagName: "ul",
    className:"tree-device",
	childView: SensorsViewTree,
    initialize: function() {
        this.collection = this.model.sensors;
    },

    appendHtml: function(collectionView, itemView) {
        collectionView.$("li:first").append(itemView.el);
    }
});

var ServersViewTree =  Backbone.Marionette.CompositeView.extend({
    template: "#node-template",	
    tagName: "ul",
    className:"tree-server",
    childView: DevicesViewTree,
    
    initialize: function() {
       this.collection = this.model.devices;
    },

    appendHtml: function(collectionView, itemView) {
        collectionView.$("li:first").append(itemView.el);
    }
});




var TreeView = Backbone.Marionette.CollectionView.extend({
    childView: ServersViewTree
});


// ----------------------------------------------------------------
// Below this line is normal stuff... models, templates, data, etc.
// ----------------------------------------------------------------
data = [
    {
    name: "Server 1",
    devices: [
        {
        name: "Device 1",
        sensors: [
        	{name: "Sensor 1"}
        ]}
    ]},
{
    name: "Server 2",
    devices: [
        {
        name: "Device 2",
        sensors: [
            {name: "Sensor 2"},
        	{name: "Sensor 3"},
        	{name: "Sensor 4"}
        ]}
    ]}

];

var Sensor = Backbone.Model.extend({

});


var Device = Backbone.Model.extend({
    initialize: function() {
        var sensors = this.get("sensors");
        if (sensors){
            this.sensors = new SensorCollection(sensors);
        }
    }
});


var Server = Backbone.Model.extend({
    initialize: function() {
        var devices = this.get("devices");
        if (devices){
            this.devices = new DeviceCollection(devices);
        }
    }
});



var SensorCollection = Backbone.Collection.extend({
    model: Sensor
});

var DeviceCollection = Backbone.Collection.extend({
    model: Device
});

var ServerCollection = Backbone.Collection.extend({
    model: Server
});


var servers = new ServerCollection(data);
var tree = new TreeView ({
    collection: servers
});

tree.render();
$("#tree").html(tree.el);