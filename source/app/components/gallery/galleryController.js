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
    		img.tags = img.tags.split(";") ;
    		return img;
    	});
    })
    $scope.filter = {};
    $scope.filter.album = [];

    $scope.showloading = false;

    $scope.detectImg ;
    $scope.disabled = true;
    $scope.tagField = {};
    $scope.tagField.disabled = true;
    $scope.tagField.list 	 =[];
    $scope.tagField.available = [];
    $scope.detectImage = function(img){
    	$scope.tagField.disabled = true;
    	$scope.showloading 		= true;
    	$scope.detectImg 		= img ;
    	$scope.tagField.list 	= $scope.detectImg.tags;
    	 var url = host + "/api/detect/";
    	 var filePath = "source/uploads/02YHkd0mrEqg3Vnp6HOn7EcW.jpg";
    	 var filePath = img.path;
    	 var imgObj = {filePath:filePath};
    	$http.post(url,imgObj).then(function(res){
    		$scope.tagField.disabled 	= false;
            $scope.showloading 			= false;
    		$scope.tagField.available 	= res.data.data;
    		$scope.tagField.list 		= res.data.data;
    	})
    }

	$scope.updateTags = function(){
		var imgid= $scope.detectImg.id;
		var tags = $scope.tagField.list.join(';')
		var imgObj = {imgid:imgid,tags:tags};
		var url = host+ '/api/images/'+imgid;
		$http.post(url,imgObj).then(function(res){
			alert('Updated!');
		})
	}

	$scope.allAlbum = true;

	$scope.check_all_album = function(){
		if($scope.allAlbum){
			$scope.show_all_images();
		}else{
			$scope.hide_all_images();
		}
	}

	$scope.show_all_images = function(){
		$listImages.map(function(img){
			img.isShow = true ;
		})
		$scope.checkAll();
	}

	$scope.hide_all_images = function(){
		$listImages.map(function(img){
			img.isShow = (img.aid == null || img.aid == "")  ;
		})
		$scope.uncheckAll();
	}

	$scope.checkAll = function() {
		$scope.filter.album = $scope.listAlbum.map(function(item) { return item.id; });
	};
	$scope.uncheckAll = function() {
		$scope.filter.album = [];
	};

}]);
