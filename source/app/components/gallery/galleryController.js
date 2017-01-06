app.controller('galleryCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout) {
    var host = ConfigService.host;
    $scope.loggedUser = angular.fromJson($window.localStorage.loggedUser);
    var uid = $scope.isLogin = $scope.loggedUser.id;
    $scope.listImages = [];
    $scope.detectImg ;
    $http.get(host + '/api/images/'+uid).then(function(res){
        console.log(res.data.data)
        $scope.listImages = res.data.data;
    })

    $scope.detectImage = function(img){
    	$scope.detectImg = img ;
    	 var url = host + "/api/detect/";
    	 var filePath = "source/uploads/02YHkd0mrEqg3Vnp6HOn7EcW.jpg";
    	 var filePath = img.path;
    	 var imgObj = {filePath:filePath};
    	$http.post(url,imgObj).then(function(res){
    		$scope.detectImg.tags = res.data.data;
    		console.log($scope.detectImg.tags);
    	})
    }
}]);
