app.controller('galleryCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout) {
    var host = ConfigService.host;

    $scope.loggedUser = angular.fromJson($window.localStorage.loggedUser);
    var uid = $scope.isLogin = $scope.loggedUser.id;

    $scope.listAlbum = [];
    $http.get(host + '/api/album/'+uid).then(function(res){
        $scope.listAlbum = res.data.data;
    	$scope.filter.album = $scope.listAlbum.map(function(a){return a.id});
    })

    $scope.listImages = [];
    $scope.listTags = [];
    $http.get(host + '/api/images/'+uid).then(function(res){
    	$scope.listImages = res.data.data.map(function(img){
    		img.isShow = true ;
    		img.tags = img.tags.length ? img.tags.split(";") : [];
    		$scope.addTags(img.tags);
    		return img;
    	});

    	$scope.listTags = $scope.listTags.sort();
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

    $scope.addTags = function(tags){
    	tags.map(function(tag){
	    	if ($scope.listTags.indexOf(tag) === -1  ) {
		        $scope.listTags.push(tag);
		    } 
    	});
    	$scope.filter.tags = $scope.listTags.slice();
    }

    $scope.filter_tags = function(){
    	$scope.listImages.map(function(img){
    		if(_.intersection($scope.filter.tags,img.tags).length > 0){
    			img.isShow = true;
    		}else{
    			img.isShow = false;
    		}
    	});
    }

	$scope.updateTags = function(){
		var imgid= $scope.detectImg.id;
		var tags = $scope.tagField.list.join(';')
		var imgObj = {imgid:imgid,tags:tags};
		var url = host+ '/api/images/'+imgid;
		$http.post(url,imgObj).then(function(res){
			$scope.detectImg.tags = tags ;
			$scope.listImages[$scope.listImages.indexOf($scope.detectImg)].tags = $scope.detectImg.tags;
		})
	}

	$scope.allAlbum = true;

	$scope.checkAll = function() {
		$scope.filter.album = $scope.listAlbum.map(function(item) { return item.id; });
	};
	$scope.unCheckAB = function(){
		$scope.allAlbum = false;
	}
	$scope.uncheckAll = function() {
		$scope.filter.album = [];
	};

}]);
