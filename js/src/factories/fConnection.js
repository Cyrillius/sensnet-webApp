(function(Backbone, _, Sensnet){


  Sensnet.Factories.Connection = {

     /** 
     * This function is used to initialize a websocket connection
     * @public
     * @param model the model binded to this socket
     * @param addr the address of the websocket server (Ws://127.0.0.1:8080)
     * @return the socket
     */
  	websocket: function(model,addr){

      // the socket object
  		var socket;

      // check if the Websocket class exist
      if (typeof(WebSocket) !== 'undefined') {
        console.log("Using a standard websocket");
        //initialize the object
        socket = new WebSocket(addr);

      // if not check if the  MozWebSocket class exist
      } else if (typeof(MozWebSocket) !== 'undefined') {
        console.log("Using MozWebSocket");
        //initialize the object
        socket = new MozWebSocket(addr);

      // if not inform the user that his browser does not support websockets       
      } else {
        alert("Your browser does not support websocket!");
      }

      //dispath the events of the sockets
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

      // return the object
      return socket;
  	}

  };

})(Backbone, _, Sensnet);