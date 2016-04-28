'use strict'
var request = require('request');
var mongoose = require('mongoose');


module.exports = {

	dataSet: [],
	//API call and callback pair, api call returns the current price of a bitcoin in various currencies
	//we grab the usd value for further use once these functions are fleshed out.
	//TODO: bring in repeated results from API call and create upper and lower bolinger bands
	// for the data and store it along with the initial values in a database for use later.
	rateGrabber: function(){
		console.log("TESTING MODULE USE HERE");
		console.log(this.dataSet);
		request('https://blockchain.info/ticker', this.rateCallback.bind(this));
	},//end testFunction
	rateCallback: function(err, response, body){
		if(!err && response.statusCode == 200){
			var btcData = JSON.parse(body);
			console.log(btcData.USD);
			this.dataSet.push(btcData.USD.last);
			if(this.dataSet.length>20){
				this.dataSet.shift();
			};
			console.log(this.dataSet);
		}else{
			console.log("request error");
		};
	}//end rateCallback
		
	
};