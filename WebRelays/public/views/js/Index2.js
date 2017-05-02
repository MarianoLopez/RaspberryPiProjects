var app = angular.module('sampleApp', []);

app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect('http://raspberrypi:8080', { 'forceNew': true });
  return {
    on: function(eventName, callback){
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data) {
        socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          	if (callback) {
            	callback.apply(socket, args);
          	}
        });
      })
    }
  };
}]);

app.controller('IndexController', function($scope, socket) {
  $scope.data = {relay:false,relay2:false}

  $scope.send = function() {socket.emit('new-message', $scope.data);};
  	
  socket.on('data', function(data) {
    	console.log('recive',data);
    	$scope.data = data;
    });
});
