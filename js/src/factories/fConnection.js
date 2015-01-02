(function(Backbone, _, Sensnet){

Sensnet.Factories.Connection = {
	websocket: function(model,addr){
		var socket;

        if (typeof(WebSocket) !== 'undefined') {
          console.log("Using a standard websocket");
          socket = new WebSocket(addr);
        } else if (typeof(MozWebSocket) !== 'undefined') {
          console.log("Using MozWebSocket");
          socket = new MozWebSocket(addr);
        } else {
          alert("Your browser does not support web sockets. No stats for you!");
        }
      
        socket.onopen = function (e) {
          model.trigger('socket_open', e);
        };
        socket.onmessage = function (e) {
          model.trigger('socket_message', JSON.parse(e.data));
        };
      
        socket.onclose = function (e) {
          model.trigger('socket_close', e);
        };
        socket.onerror = function (e) {
          model.trigger('socket_error', e);
        };
        return socket;
	}

};

})(Backbone, _, Sensnet);