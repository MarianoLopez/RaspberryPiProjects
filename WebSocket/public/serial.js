var serialport = require('serialport');
var myPort = new SerialPort('/dev/ttyACM0', {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\n")
 });
 
myPort.on('open', function(){
	console.log('port open. Data rate: ' + myPort.options.baudRate);
});
myPort.on('data', sendSerialData);

 
function sendSerialData(data) {
   console.log(data);
}

myPort.write("1");