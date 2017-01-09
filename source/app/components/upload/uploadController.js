app.controller('uploadCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout','Upload', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout,Upload) {
    var host = ConfigService.host;
    $scope.loggedUser = angular.fromJson($window.localStorage.loggedUser);
    var uid = $scope.isLogin = $scope.loggedUser.id;
	$("#file-1").fileinput({
		uploadUrl: '/api/upload', // you must set a valid URL here else you will get an error
		allowedFileExtensions : ['jpg', 'png','gif'],
		overwriteInitial: false,
		maxFileSize: 5000,
		maxFilesNum: 10,
		uploadExtraData: {id: uid, value: '100 Details'},
		//allowedFileTypes: ['image', 'video', 'flash'],
		slugCallback: function(filename) {
		    return filename.replace('(', '_').replace(']', '_');
		}
	});

    // $scope.upload = function(file){



    // 	 file.upload = Upload.upload({
    //                 url: '/api/upload',
    //                 data: { file: file },
    //             });
    // 	console.log($scope.picFile)
    // }
}]);
