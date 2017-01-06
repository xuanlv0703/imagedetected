app.controller('galleryCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout) {
    var host = ConfigService.host;
    $scope.loggedUser = angular.fromJson($window.localStorage.loggedUser);
    var uid = $scope.isLogin = $scope.loggedUser.id;
    $scope.listImages = [];
    $http.get(host + '/api/images/'+uid).then(function(res){
        console.log(res.data.data)
        $scope.listImages = res.data.data;
    })

    $scope.detectImage = function(){
    	 var url = host + "/api/detect/";
    	 var filePath = "source/uploads/02YHkd0mrEqg3Vnp6HOn7EcW.jpg";
    	 var imgObj = {filePath:filePath};
    	$http.post(url,imgObj).then(function(res){
    		console.log(res);
    	})
    }

      $scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];
      $scope.disabled = undefined;
      $scope.singleDemo = {};
      $scope.singleDemo.color = '';
      $scope.multipleDemo = {};
      $scope.multipleDemo.colors = ['Blue','Red'];
}]);
