app.controller('uploadCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout) {
    var host = ConfigService.host;
    
	$("#file-1").fileinput({
		uploadUrl: '#', // you must set a valid URL here else you will get an error
		allowedFileExtensions : ['jpg', 'png','gif'],
		overwriteInitial: false,
		maxFileSize: 1000,
		maxFilesNum: 10,
		//allowedFileTypes: ['image', 'video', 'flash'],
		slugCallback: function(filename) {
		    return filename.replace('(', '_').replace(']', '_');
		}
	});

}]);
