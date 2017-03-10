 var serialport = require('serialport'), // include the serialport library
     portName = '/dev/ttyACM0',         
     portConfig = {
         baudRate: 9600,
         parser: serialport.parsers.readline('\n')// call myPort.on('data') when a newline is received:
     };
 
// open the serial port:
var myPort = new serialport(portName, portConfig);
 
myPort.on('open', ()=>{
	console.log('port open, baud rate:',myPort.options.baudRate);
}); // called when the serial port opens

myPort.on('data', (data)=>{
	//console.log(data);
	var arr = data.toString().split(",");
	var temperatura = arr[0].toString().split(":")[1];
	var humedad = arr[1].toString().split(":")[1];
	console.log("temperatura: ",temperatura);
	console.log("humedad: ",humedad);
});