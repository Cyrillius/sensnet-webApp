describe("Device", function() {
  
  // prepare the test
  beforeEach(function() {

    //create a custom JSON
    var json = {
      "mac": "55: 44: 33: 22: 10",
      "sensors": [
        {
          "type": "temperature",
          "value": "20",
          "port": 0
        },
        {
          "type": "motion",
          "value": "1",
          "port": 1
        }
      ]
    };

    // initialize a device with this JSON
    this.device = new Sensnet.Models.Device(json);

    // initialize a default device
    this.device2 = new Sensnet.Models.Device(json);

    // get the JSON produced by the device
    this.jsonDevice = this.device.toJSON();

    //create an url
    this.url = "server/c25/device/"+this.device.get("deviceId");

    // set the url
    this.device.setUrl(this.url);

    // get the sensors
    this.sensors =  this.device.get("sensors").models;

    //get info sensor 0
    this.sensor0 = this.sensors[0];
    this.id0 = this.sensor0.get("sensorId");

    //get info sensor 1
    this.sensor1 = this.sensors[1];
    this.id1 = this.sensor1.get("sensorId");

  });
  
  it("should expose the attribute mac", function() {
    expect(this.device.get("mac"))
      .toEqual("55: 44: 33: 22: 10");

  });   

  it("should have a sensor sollection", function() {
    expect( this.device.get("sensors") instanceof Sensnet.Collections.SensorCollection)
      .toBe(true);
    expect( this.device2.get("sensors") instanceof Sensnet.Collections.SensorCollection)
      .toBe(true);

  }); 

  it("should generate a correct JSON of the Object", function() {
    expect(this.jsonDevice.mac)
      .toEqual(this.device.get("mac"));
    expect(this.jsonDevice.sensors)
      .toEqual(this.device.get("sensors"));
  }); 
  it("should have the right url", function() {
    expect(this.sensor0.get("url"))
      .toEqual(this.url+"/sensor/"+this.id0);
    expect(this.sensor1.get("url"))
      .toEqual(this.url+"/sensor/"+this.id1);
  });  

    
});