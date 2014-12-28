describe("Device", function() {
  
  beforeEach(function() {

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


    this.device = new Sensnet.Models.Device(json);
    this.jsonDevice = this.device.toJSON();
  });
  
  it("should expose the attribute mac", function() {
    expect(this.device.get("mac"))
      .toEqual("55: 44: 33: 22: 10");
  });   
  it("should generate a correct JSON of the Object", function() {
    expect(this.jsonDevice.name)
      .toEqual(this.device.get("name"));
    expect(this.jsonDevice.mac)
      .toEqual(this.device.get("mac"));
    expect(this.jsonDevice.sensors)
      .toEqual(this.device.get("sensors"));
  }); 
    
});