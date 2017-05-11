//aquí tenemos el objeto app que hemos traído de app.js
module.exports = function(app,myPort){
	//SERVER
	app.get('/', function (req, res) {
	  console.log(req.query.accion);
	  var json = {"mensaje":"Enviado a Arduino"};
	  if ( typeof(req.query.accion) !== "undefined" && req.query.accion !== null ) {
	  	myPort.write(new Buffer(req.query.accion));
	  }
	  res.json(json);
	});
	


}