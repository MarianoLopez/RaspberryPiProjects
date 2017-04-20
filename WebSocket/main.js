var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
app.use(express.static('public'));
var gpio = require("pi-gpio");//GPIO
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
var relay = 12;  
setup();
var config = {relay:true,temperatura:null,humedad:null,flame:null};


//SOCKET
io.on('connection', function(socket) {  
  console.log('Nueva conexión desde: ',socket.request.connection._peername);
  socket.emit('config', config);
  //mensaje nuevo
  socket.on('new-message', function(data) {
  	console.log(data);
  	config.relay = data.relay;
  	writeValue(relay,!config.relay);
  	io.sockets.emit('config', config);
  });
});

//SERVER
app.get('/', function (req, res) {
  res.sendFile('views/Index.html', {root: __dirname });
});
server.listen(8080, function() {  
    console.log('Servidor corriendo en http://localhost:8080');
});

//GPIO
function setup(){
	gpio.open(relay,"output",function(error){console.log((error)?error:'open');});
}
function writeValue(pin,value){
	gpio.write(pin, value,function(error){console.log((error)?error:'Write');});	
}

//SERIAL
myPort.on('open', ()=>{
  console.log('port open, baud rate:',myPort.options.baudRate);
  setInterval(()=>{
    myPort.write(new Buffer('data\n','ascii'));
  },2000);//send data every 2secs
}); // called when the serial port opens
myPort.on('close',()=>{
  console.log('port closed');
});

myPort.on('data', (data)=>{
    //console.log('raw: ',data);
      var arr = data.toString().split(",");
      var temperatura = arr[0].toString().split(":")[1];
      var humedad = arr[1].toString().split(":")[1];
      var flame = arr[2].toString().split(":")[1];
      config.temperatura = temperatura;
      config.humedad = humedad;
      config.flame = flame;
      io.sockets.emit('config', config);
});


//on close app
process.stdin.resume();
function exitHandler(options, err) {
    gpio.close(relay);
    console.log('close');
    if(myPort.isOpen()){myPort.close();}
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}
process.on('exit', exitHandler.bind(null,{cleanup:true,exit:true}));//do something when app is closing
process.on('SIGINT', exitHandler.bind(null, {exit:true}));//catches ctrl+c event
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));//catches uncaught exceptions
