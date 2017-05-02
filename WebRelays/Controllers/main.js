//aquí tenemos el objeto app que hemos traído de app.js
module.exports = function(app,io,Gpio){
	var data = {relay:false,relay2:false};
	var relay = new Gpio(12,"output");
	var relay2 = new Gpio(16,"output");
	
	//SOCKET
	io.on('connection',function(socket){
		console.log('Nueva conexión desde: ',socket.request.connection._peername);
		socket.emit('data',data);
		//listener
		socket.on('new-message',function(_data){
			console.log("data: ",_data);
			data.relay = _data.relay;
			data.relay2 = _data.relay2;
			relay.write(data.relay);
			relay2.write(data.relay2);
			io.sockets.emit('data',data);//broadcast
		});
	});

	//SERVER
	app.get('/', function (req, res) {
	  res.sendFile('Index2.html', {root:'./public/views/' });
	});
	

	//on close app
	process.stdin.resume();
	function exitHandler(options, err) {
	    relay.close();
	    relay2.close();
	    console.log('close');
	    if (err) console.log(err.stack);
	    if (options.exit) process.exit();
	}
	process.on('exit', exitHandler.bind(null,{cleanup:true,exit:true}));//do something when app is closing
	process.on('SIGINT', exitHandler.bind(null, {exit:true}));//catches ctrl+c event
	process.on('uncaughtException', exitHandler.bind(null, {exit:true}));//catches uncaught exceptions
}

