'use strict'
var request = require('request');
var mongoose = require('mongoose');


module.exports = {
	sum: 0,
	dataSet: [],
	//calculates the moving average that will be pushed in to the oldest
	//member of the dataSet array and then pushed in to the database.
	calculationFunction: function(element, index, array){
		this.sum+= element.price;
		console.log(this.sum);
	},
	//calculates the standard deviation which will be used for the bollinger bands.
	standardDeviationFunction: function(){
		
	},
	//API call and callback pair, api call returns the current price of a bitcoin in various currencies
	//we grab the usd value for further use once these functions are fleshed out.
	//TODO: bring in repeated results from API call and create upper and lower bolinger bands
	// for the data and store it along with the initial values in a database for use later.
	rateGrabber: function(){
		console.log(this.dataSet);
		request('https://blockchain.info/ticker', this.rateCallback.bind(this));
	},//end testFunction
	
	rateCallback: function(err, response, body){
		if(!err && response.statusCode == 200){
			var btcData = JSON.parse(body);
			console.log(btcData.USD);
			this.dataSet.push(
			{price: btcData.USD.last,
			 date: new Date(),
			 upperBand: 0,
			 lowerBand: 0,
			 movingAverage: 0
			});
			if(this.dataSet.length>4){
				this.dataSet.forEach(this.calculationFunction.bind(this));
				this.dataSet[0].movingAverage= Number(Math.round(this.sum/5+'e2')+'e-2');
				console.log(this.dataSet[0]);
				this.sum = 0;
				this.dataSet.shift();
			};
			console.log(this.dataSet);
		}else{
			console.log("request error");
		};
	}//end rateCallback
	
		
	
};