(function(Backbone, _, Sensnet){

Sensnet.Factories.Connection = {
	websocket: function(addr){
		 this.addr = addr;
        _.extend(this, Backbone.Events);
  		 var self = this;
  
        if (typeof(WebSocket) !== 'undefined') {
          console.log("Using a standard websocket");
          self.socket = new WebSocket(this.addr);
        } else if (typeof(MozWebSocket) !== 'undefined') {
          console.log("Using MozWebSocket");
          self.socket = new MozWebSocket(this.addr);
        } else {
          alert("Your browser does not support web sockets. No stats for you!");
        }
      
        self.socket.onopen = function (e) {
          self.trigger('socket_open', e);
        };
        self.socket.onmessage = function (e) {
          self.trigger('socket_message', JSON.parse(e.data));
        };
      
        self.socket.onclose = function (e) {
          self.trigger('socket_close', e);
        };
        self.socket.onerror = function (e) {
          self.trigger('socket_error', e);
        };
        return this;
	}

};

})(Backbone, _, Sensnet);