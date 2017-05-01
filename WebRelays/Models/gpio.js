'use strict';//With strict mode, you can not, for example, use undeclared variables.Duplicating a parameter name is not allowed
var GPIO = require('pi-gpio');
module.exports = 
class Gpio{
	constructor(pin,mode){
		this.pin = pin;
		this.mode = mode;
	  	GPIO.open(this.pin,this.mode,function(error){
			console.log((error)?error:'Open GPIO: '+pin);
		});
	}
	// class methods
	write(value){
		var that = this;//lexically-scoped variable
		GPIO.write(this.pin, value,function(error){
			console.log((error)?error:'GPIO: '+that.pin+' write: '+value);
		});
	}
	close(){
		var that = this;//lexically-scoped variable
		GPIO.close(this.pin,function(error){
			console.log((error)?error:'Close GPIO: '+that.pin);
		});
	}
}