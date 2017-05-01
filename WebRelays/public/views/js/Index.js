 var data = {relay:false,relay2:false};
 var socket = io.connect('http://raspberrypi:8080', { 'forceNew': true });

 $(function() {
    $('.parallax').parallax();
    console.log('init socket');
	socket.on('data', function(_data) {  
	  console.log(_data);
	  data = _data;
	  $("#checkbox").prop('checked', data.relay);
	  $("#checkbox2").prop('checked', data.relay2);
	});
  });

function checkSwitch(){
	data.relay = $('#checkbox').is(':checked');
	data.relay2 = $('#checkbox2').is(':checked');
	socket.emit('new-message', data);
}