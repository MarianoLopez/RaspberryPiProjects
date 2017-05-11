var express = require('express');
var app = express();
var server = require('http').Server(app);
var serialport = require('serialport'), // serial
     portName = '/dev/ttyACM0',         
     portConfig = {
         baudRate: 9600,
         dataBits: 8,
         parity: 'none',
         stopBits: 1,
         flowControl: false,
         parser: serialport.parsers.readline('\n')// call myPort.on('data') when a newline is received:
     };
var myPort = new serialport(portName, portConfig);
//app.use(express.static('public'));
//enviar a main (app,io y gpio)
require('./Controllers/main')(app,myPort);
server.listen(8080, function() {  
    console.log('Servidor corriendo en http://localhost:8080');
});


//SERIAL
myPort.on('open', ()=>{
  console.log('port open, baud rate:',myPort.options.baudRate);
}); // called when the serial port opens
myPort.on('close',()=>{
  console.log('port closed');
});
