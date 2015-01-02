var WebSocketServer = require("websocketserver");
var server = new WebSocketServer("none", 8081);
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

var connectionList = [];
//used to know wich device to update
var deviceTurn = 0;
var sensorTurn = 0;

var timer ;

// test value send  when there is an initialisation
var initDevicesMsg = {
	"event":"onInit",
    "devices": [
        {
            "mac": "55: 44: 33: 22: 10",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20",
                    "port": 0
                },
                {
                    "type": "motion",
                    "value": "0",
                    "port": 1
                }
            ]
        },
        {
            "mac": "55: 44: 33: 22: 11",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20",
                    "port": 0
                },
                {
                    "type": "motion",
                    "value": "0",
                    "port": 1
                }
            ]
        },
        {
            "mac": "55: 44: 33: 22: 12",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20",
                    "port": 0,
                },
                {
                    "type": "motion",
                    "value": "0",
                    "port": 1
                }
            ]
        },
        {
            "mac": "55: 44: 33: 22: 13",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20",
                    "port": 0
                },
                {
                    "type": "motion",
                    "value": "0",
                    "port": 1
                }
            ]
        }
    ]
};

// test value send  when there is an update
var updateDeviceMsg = function (id){
	var msg = {
	"event":"onDeviceChange",
    "device": 
 	     {
            "mac": "55: 44: 33: 22: 1"+id,
            "sensors": [
                {
                    "type": "temperature",
                    "value": Math.random()*30,
                    "port": 0
                },
                {
                    "type": "motion",
                    "value": Math.round(Math.random()),
                    "port": 1
                }
            ]
        }
    };
    return msg;
};

// test value send  when there is an update
var updateSensorMsg = function (id,port){

	if (port ==0){
		var msg = {
			"event":"onSensorChange",
	 		"mac": "55: 44: 33: 22: 1"+id, 
		    "sensor": {
		        "type": "temperature",
		        "value": Math.random()*30,
                "port": 0
		    }
	    };
	}
	if (port ==1){
		var msg = {
			"event":"onSensorChange",
		    "mac": "55: 44: 33: 22: 1"+id,   
		    "sensor": {
		        "type": "motion",
		        "value": Math.round(Math.random()),
                "port": 1
		    }
   	    };
	}
	return msg;
};

var updateSensor = function() {

	
	console.log("Send an onSensorChange event");
	server.sendMessage("all", JSON.stringify(updateSensorMsg(deviceTurn,sensorTurn)));


	if (deviceTurn==3 && sensorTurn==1){
		deviceTurn = 0;
		sensorTurn = 0 ;
		clearTimeout(timer);
		timer = setInterval(updateDevice, 1000);
	}

	if (sensorTurn==1){
		deviceTurn++;
		sensorTurn = 0;
	}

	sensorTurn++;
};


var updateDevice = function() {

	
	console.log("Send an onDeviceChange event");
	server.sendMessage("all", JSON.stringify(updateDeviceMsg(deviceTurn)));


	if (deviceTurn==3){
		deviceTurn = 0;
		clearTimeout(timer);
		timer = setInterval(updateSensor, 1000);
	}
	deviceTurn++;
};



server.on("connection", function(id) {
    

    //send to init devices
    server.sendMessage("all", JSON.stringify(initDevicesMsg));

    	
	connectionList.push(id);

	
});

server.on("message", function(data, id) {
    var mes = server.unmaskMessage(data);
    var str = server.convertToString(mes.message);
    console.log(str);
});

server.on("closedconnection", function(id) {
    console.log("Connection " + id + " has left the server");
});

process.stdin.on('data', function (text) {
    console.log('received data:', util.inspect(text));
    if (text === 'start\r\n' ||text === 'start\n') {
      timer = setInterval(updateDevice, 1000);
    }
    if (text === 'stop\r\n' ||text === 'stop\n') {
      clearTimeout(timer);
    }
    if (text === 'send onDeviceChange\r\n' || text === 'send onDeviceChange\n') {
      server.sendMessage("all", JSON.stringify(updateDeviceMsg(0)));
    }
    if (text === 'send onSensorChange\r\n' || text === 'send onSensorChange\n') {
      server.sendMessage("all", JSON.stringify(updateSensorMsg(0,0)));
    }

});