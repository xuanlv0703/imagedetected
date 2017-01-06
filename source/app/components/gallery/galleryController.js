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
        $scope.listImages = res.data.data;
    })

    $scope.showloading = false;

    $scope.detectImg ;
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
              $scope.disabled = undefined;
              $scope.singleDemo = {};
              $scope.singleDemo.color = '';
              $scope.multipleDemo = {};
              $scope.multipleDemo.colors = $scope.detectImg.tags;
              $scope.showloading = false;
    	})
        $scope.multipleDemo.colors =[];
    }

    $scope.multipleDemo = {};
   $scope.updateTags = function(){
    var imgid= $scope.detectImg.id;
    var tags = $scope.detectImg.tags.join(';')
    var imgObj = {imgid:imgid,tags:tags};
    var url = host+ '/api/images/'+imgid;
    $http.post(url,imgObj).then(function(res){
        alert('Updated!');
    })
   }

     $scope.roles = [
    {id: 1, text: 'guest'},
    {id: 2, text: 'user'},
    {id: 3, text: 'customer'},
    {id: 4, text: 'admin'}
  ];
  $scope.user = {
    roles: [2, 4]
  };
  $scope.checkAll = function() {
    $scope.user.roles = $scope.roles.map(function(item) { return item.id; });
  };
  $scope.uncheckAll = function() {
    $scope.user.roles = [];
  };
  $scope.checkFirst = function() {
    $scope.user.roles.splice(0, $scope.user.roles.length); 
    $scope.user.roles.push(1);
  };
}]);
