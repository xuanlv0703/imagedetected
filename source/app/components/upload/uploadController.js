app.controller('uploadCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout','Upload', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout,Upload) {
    var host = ConfigService.host;

    $scope.upload = function(file){

    	 file.upload = Upload.upload({
                    url: '/api/upload',
                    data: { file: file },
                });
    	console.log($scope.picFile)
    }
}]);
