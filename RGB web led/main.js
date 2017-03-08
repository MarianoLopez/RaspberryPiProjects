var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use(express.static('views/public'));
//need run as root
var Gpio = require('pigpio').Gpio;
red = new Gpio(17, {mode: Gpio.OUTPUT});
green = new Gpio(27, {mode: Gpio.OUTPUT});
blue = new Gpio(22, {mode: Gpio.OUTPUT});



app.get('/hello', function (req, res) {
  res.send('Hola Mundo desde Raspberry');
});

app.get('/', function (req, res) {
	res.sendFile('views/Index.html', {root: __dirname });
});



app.get('/led',function(req,res){
	console.log('red: '+req.query.red+', green: '+req.query.green+', blue: '+req.query.blue);
	if(!isNaN(parseInt(req.query.red)) && !isNaN(parseInt(req.query.green)) && !isNaN(parseInt(req.query.blue))){
        red.pwmWrite(req.query.red);
        green.pwmWrite(req.query.green);
        blue.pwmWrite(req.query.blue);
        console.log('ok');
        res.send('ok');
    } else {
    	console.log('error');
        res.status(400).send('error');
    }
});
app.listen(8080, function () {console.log('Example app listening on port 8080!');});