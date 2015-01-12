describe("Server", function() {
  
  // prepare the test
  beforeEach(function() {

    //create a custom JSON
    var json = {
      "name": "salle à manger",
      "ip": "192.168.1.3",
      "port": "1234",
      "status": "connected"
    };

    var devicesJSON = [
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
    ];
      

    // initialize a device with this JSON
    this.server = new Sensnet.Models.Server(json);
    this.server2 = new Sensnet.Models.Server();

    // add some devices
    this.server.set("devices",new Sensnet.Collections.DeviceCollection(devicesJSON));

    // get the JSON produced by the device
    this.jsonServer = this.server.toJSON();

    //create an url
    this.url = "server/"+this.server.get("serverId");    

    // set the url
    this.server.setUrl(this.url);

    // get the devices
    this.devices =  this.server.get("devices").models;

    //get info sensor 0
    this.device0 = this.devices[0];
    this.id0 = this.device0.get("deviceId");

    //get info sensor 1
    this.device1 = this.devices[1];
    this.id1 = this.device1.get("deviceId");


  });
  
  it("should expose the attribute name", function() {
    expect(this.server.get("name"))
      .toEqual("salle à manger");
  }); 
  it("should expose a default attribute name", function() {
    expect(this.server2.get("name"))
      .toEqual("Server "+this.server2.get("serverId"));
  }); 
  it("should expose the attribute ip", function() {
    expect(this.server.get("ip"))
      .toEqual("192.168.1.3");
  });  
  it("should expose the attribute port", function() {
    expect(this.server.get("port"))
      .toEqual("1234");
  }); 
  it("should expose the attribute status", function() {
    expect(this.server.get("status"))
      .toEqual("connected");
  });     
  it("should generate a correct JSON of the Object", function() {
    expect(this.jsonServer.name)
      .toEqual(this.server.get("name"));
    expect(this.jsonServer.ip)
      .toEqual(this.server.get("ip"));
    expect(this.jsonServer.port)
      .toEqual(this.server.get("port"));
    expect(this.jsonServer.status)
      .toEqual(this.server.get("status"));
  });  

  it("should have the right url", function() {
    expect(this.device0.get("url"))
      .toEqual(this.url+"/device/"+this.id0);
    expect(this.device1.get("url"))
      .toEqual(this.url+"/device/"+this.id1);
  });  

  describe("Websocket Handler", function() {


    beforeEach(function() {
      this.server = new Sensnet.Models.Server();
      this.spy = spyOn(Sensnet.app, 'trigger');
      this.server.addr = "ws://"+this.server.get("ip")+":"+this.server.get("port");


      this.onInitMsg = {
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

      this.onDeviceChangeMsg = {
        "event":"onDeviceChange",
        "device": 
               {
              "mac": "55: 44: 33: 22: 10",
              "sensors": [
                  {
                      "type": "temperature",
                      "value": "89",
                      "port": 0
                  },
                  {
                      "type": "motion",
                      "value": "1",
                      "port": 1
                  }
              ]
          }  
      };

      this.onSensorChangeMsg =  {
        "event":"onSensorChange",
        "mac": "55: 44: 33: 22: 10", 
        "sensor": {
            "type": "temperature",
            "value": "64",
            "port": 0
            }
        };



    });

    it("should generate an event when the socket is open", function() {
      var e;
      this.server.socketOpen(e);
      expect(this.spy).toHaveBeenCalledWith('onSuccess', "The connection with "+this.server.addr+" is now open")
    });  

    it("should generate an event when the socket is closed", function() {
      var e;
      this.server.socketClose(e);
      expect(this.spy).toHaveBeenCalledWith('onWarning', "The connection with "+this.server.addr+" is close")
    });  

    it("should generate an event when there is an error on the socket", function() {
      var e;
      this.server.socketError(e);
      expect(this.spy).toHaveBeenCalledWith('onError', "An Error has just happen with "+this.server.addr+" !")
    });  

    it("should handle the event onInit and update the devices", function() {
      this.server.socketMessage(this.onInitMsg);
      expect(this.server.get("devices").models[0].get("mac"))
        .toEqual(this.onInitMsg.devices[0].mac);
      expect(this.server.get("devices").models[1].get("mac"))
        .toEqual(this.onInitMsg.devices[1].mac);
      expect(this.server.get("devices").models[2].get("mac"))
        .toEqual(this.onInitMsg.devices[2].mac);
      expect(this.server.get("devices").models[3].get("mac"))
        .toEqual(this.onInitMsg.devices[3].mac);
      
    }); 

    it("should handle the event onDeviceChange and update the sensors", function() {      
      this.server.socketMessage(this.onInitMsg);
      this.server.socketMessage(this.onDeviceChangeMsg);
      var devices = this.server.get("devices").models;
      expect(devices[0].get("sensors").models[0].get("value"))
        .toEqual(this.onDeviceChangeMsg.device.sensors[0].value);
      expect(devices[0].get("sensors").models[1].get("value"))
        .toEqual(this.onDeviceChangeMsg.device.sensors[1].value); 
    }); 
    
    it("should handle the event onSensorChange and update the sensor", function() {      
      this.server.socketMessage(this.onInitMsg);
      this.server.socketMessage(this.onSensorChangeMsg);
      var devices = this.server.get("devices").models;
      expect(devices[0].get("sensors").models[0].get("value"))
        .toEqual(this.onSensorChangeMsg.sensor.value);
    });     

  }); 


   
});