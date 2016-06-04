var Client = require('node-rest-client').Client;
var config = require('./config.js');

var client = new Client();



client.get("http://66.63.112.139/bustime/api/v3/getpredictions?key=" + config.key + "&rtpidatafeed=Metro&rt=1&stpid=" + config.stop_id + "&format=json",

  function (data, response) {

  	// parsed response body as js object
  	//console.log(data['bustime-response']);

    var response = data['bustime-response'];

    if(response && response['prd'] && response['prd'].length){

      var predictions = response['prd'];

      var prd = predictions[0];

      if(prd){

        var route = prd.rt;

        var predicted_time = prd.prdtm;


      }


      console.log(prd);
    }

	// raw response
	//console.log(response);
});
