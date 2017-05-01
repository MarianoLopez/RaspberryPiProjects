var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static('public'));
//llamamos  gpio.js para utilizar toda su funcionalidad
var Gpio = require('./Models/gpio');
//enviar a main (app,io y gpio)
require('./Controllers/main')(app,io,Gpio);

server.listen(8080, function() {  
    console.log('Servidor corriendo en http://localhost:8080');
});