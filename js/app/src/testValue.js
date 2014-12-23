(function(Backbone, Sensnet){
	
Sensnet.Test = {};	
var onInitMsg = {
	"event":"onInit",
    "devices": [
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        },
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        },
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        },
        {
            "mac": "FF: FF: FF: FF: FF",
            "sensors": [
                {
                    "type": "temperature",
                    "value": "20"
                },
                {
                    "type": "motion",
                    "value": "0"
                }
            ]
        }
    ]
};


Sensnet.Test.onInitMsg=onInitMsg;


})(Backbone, Sensnet);