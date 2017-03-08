var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server);
app.use(express.static('public'));
var gpio = require("pi-gpio");

var relay = 12;  
setup();
var config = {relay:true};


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


server.listen(8080, function() {  
    console.log('Servidor corriendo en http://localhost:8080');
});


function setup(){
	gpio.open(relay,"output",function(error){console.log((error)?error:'open');});
}
function writeValue(pin,value){
	gpio.write(pin, value,function(error){console.log((error)?error:'Write');});	
}

//on close app
process.stdin.resume();
function exitHandler(options, err) {
    gpio.close(relay);
    console.log('close');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}
process.on('exit', exitHandler.bind(null,{cleanup:true,exit:true}));//do something when app is closing
process.on('SIGINT', exitHandler.bind(null, {exit:true}));//catches ctrl+c event
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));//catches uncaught exceptions