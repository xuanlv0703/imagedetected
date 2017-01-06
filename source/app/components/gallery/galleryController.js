app.controller('galleryCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout) {
    var host = ConfigService.host;

    $scope.loggedUser = angular.fromJson($window.localStorage.loggedUser);
    var uid = $scope.isLogin = $scope.loggedUser.id;

    $scope.listAlbum = [];
    $http.get(host + '/api/album/'+uid).then(function(res){
        console.log(res.data.data)
        $scope.listAlbum = res.data.data;
    })

    $scope.listImages = [];
    $http.get(host + '/api/images/'+uid).then(function(res){
    	$scope.listImages = res.data.data.map(function(img){
    		img.isShow = true ;
    		return img;
    	});
    })

    $scope.showloading = false;

    $scope.detectImg ;
    $scope.disabled = true;
    $scope.multipleDemo = {};
    $scope.multipleDemo.colors =[];
    $scope.detectImage = function(img){
    	$scope.showloading = true;
    	$scope.detectImg = img ;
    	 var url = host + "/api/detect/";
    	 var filePath = "source/uploads/02YHkd0mrEqg3Vnp6HOn7EcW.jpg";
    	 var filePath = img.path;
    	 var imgObj = {filePath:filePath};
    	$http.post(url,imgObj).then(function(res){
    		$scope.detectImg.tags = res.data.data;
    		console.log($scope.detectImg.tags);
               $scope.availableColors = [];
            	$scope.showloading = false;
            	$scope.disabled = false;
              $scope.singleDemo = {};
              $scope.singleDemo.color = '';
              $scope.multipleDemo.colors = $scope.detectImg.tags;
    	})
    }

   
}]);
