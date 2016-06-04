var config = require('./config.js');
var Client = require('node-rest-client').Client;
var moment = require('moment');
var say = require('say');

var client = new Client();

//say.speak('Hello!');

client.get("http://66.63.112.139/bustime/api/v3/getpredictions?key=" + config.key + "&rtpidatafeed=Metro&rt=1&stpid=" + config.stop_id + "&format=json",

  function (data, response) {



  	// parsed response body as js object
  	//console.log(data['bustime-response']);

    var response = data['bustime-response'];

    console.log(response);

    if(response && response['prd'] && response['prd'].length){

      var predictions = response['prd'];

      var prd = predictions[0];

      if(prd){

        var route = prd.rt;

        var predictedTime = prd.prdtm;

        var momentDate = moment(predictedTime, 'YYYYMMDD HH:mm');

        //var momentDate = moment(predictedTime).format('x');

        var predictedDate = momentDate.toDate();

        var predicted_ms = predictedDate.getTime();

        var now = Date.now();

        var diff = predicted_ms - now;

        var duration = moment.duration(diff);

        var humanized = duration.humanize();

        console.log('arrival time', humanized);

        say.speak('The number ' + route + 'bus will arrive in ' + humanized);

      }


      //console.log(prd);
    }

	// raw response
	//console.log(response);
});
