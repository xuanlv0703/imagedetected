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
    $scope.isDetecting      = false;
    $scope.tagField         = {'disabled':false,'list':[] , 'available' : []};
    $scope.locationField    = {'disabled':false,'list':[] , 'available' : []};
    $scope.titleField       = {'disabled':false,'value':'' };
    $scope.gpsObj           = {}
    $scope.disabledSaveImg  = true;

    $scope.openImage = function(img){
        $scope.isDetecting      = false;
        $scope.detectImg         = angular.copy(img) ;
        // set value for detect form
        $scope.tagField.available= $scope.detectImg.tags;
        // first detect for img
        if(!$scope.detectImg.isDetected){
            $scope.detectImage();
        }

    }
    $scope.detectImage = function(){
        $scope.isDetecting      = true;

        var url       = host + "/api/detect/";
        var imgObj    = {filePath:$scope.detectImg.path};
        $http.post(url,imgObj).then(function(res){
            console.log(res);
            $scope.tagField.available   = res.data.data;
            $scope.tagField.list        = res.data.data;
            $scope.gpsObj = res.data.gps;

            $scope.isDetecting      = false;
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

    // $scope.filter_tags = function(){
    	// $scope.listImages.map(function(img){
    	// 	if(_.intersection($scope.filter.tags,img.tags).length > 0){
    	// 		img.isShow = true;
    	// 	}else{
    	// 		img.isShow = false;
    	// 	}
    	// });
    // }
    $scope.filter_tags = function(tags){
        if(_.intersection($scope.filter.tags,tags).length > 0){
            return true;
        }else{
            if($scope.allTags && tags.length === 0 ){
                return true;
            }
            return false;
        }
        // if($scope.filter.tags.length === 0 ){
        //     $scope.allTags = false;
        // }else if($scope.filter.tags.length === $scope.listTags.length){
        //     $scope.allTags = true;
        // }
    }

	$scope.updateTags = function(){
		var imgid= $scope.detectImg.id;
		var tags = $scope.tagField.list.join(';')
		var imgObj = {imgid:imgid,tags:tags,gps:$scope.gpsObj};
		var url = host+ '/api/images/'+imgid;
		$http.post(url,imgObj).then(function(res){
			$scope.detectImg.tags = $scope.tagField.list ;
			$scope.listImages[$scope.listImages.indexOf($scope.detectImg)].tags = $scope.detectImg.tags;
		})
	}

	$scope.allAlbum = true;
    $scope.allTags = true;

    $scope.checkAllTags = function(){
        if($scope.allTags){
            $scope.filter.tags = $scope.listTags.slice();
        }else{
            $scope.filter.tags = [] ;
        }
        $scope.filter_tags();
    }

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
