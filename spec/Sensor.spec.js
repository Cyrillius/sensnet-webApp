describe("Sensor", function() {
  
  // prepare the test
  beforeEach(function() {

    //create a custom JSON
    var json = {
      "type": "temperature",
      "value": 89,
      "port": 2
    };


    // initialize a device with this JSON
    this.sensor = new Sensnet.Models.Sensor(json);

    // get the JSON produced by the device
    this.jsonSensor = this.sensor.toJSON();

  });
  
  it("should expose the attribute type", function() {
    expect(this.sensor.get("type"))
      .toEqual("temperature");
  });  
  it("should expose the attribute value", function() {
    expect(this.sensor.get("value"))
      .toEqual(89);
  });  
  it("should expose the attribute port", function() {
    expect(this.sensor.get("port"))
      .toEqual(2);
  });   
  it("should generate a correct JSON of the Object", function() {
    expect(this.jsonSensor.type)
      .toEqual(this.sensor.get("type"));
    expect(this.jsonSensor.value)
      .toEqual(this.sensor.get("value"));
    expect(this.jsonSensor.port)
      .toEqual(this.sensor.get("port"));
  }); 
    
});