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

    $scope.listImages   = [];
    $scope.listTags     = [];
    $scope.listColors   = [];
    $http.get(host + '/api/images/'+uid).then(function(res){
    	$scope.listImages = res.data.data.map(function(img){
    		img.isShow = true ;
            img.tags = img.tags == null ?[]:(img.tags.length ? img.tags.split(";") : []);
            img.city = img.city == null ?[]:(img.city.length ? img.city.split(";") : []);
            $scope.addTags(img.tags);
            $scope.filter.tags = $scope.listTags.slice();
            $scope.addColor(img.colors);
    		return img;
    	});
        $scope.listTags = $scope.listTags.sort();
    	$scope.listColors = $scope.listColors.sort().reverse();
    })

    // filter
    $scope.filter = {};
    $scope.filter.album = [];
    $scope.filter.color = '';
    $scope.allAlbum = true;
    $scope.allTags = true;
    $scope.allColor = true;

    $scope.checkAllTags = function(){
        if($scope.allTags){
            $scope.filter.tags = $scope.listTags.slice();
        }else{
            $scope.filter.tags = [] ;
        }
        $scope.filter_tags();
    }

    $scope.filter_tags = function(tags){
        if(_.intersection($scope.filter.tags,tags).length > 0){
            return true;
        }else{
            if($scope.allTags && tags.length === 0 ){
                return true;
            }
            return false;
        }
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

    $scope.addTags = function(tags){
        tags.map(function(tag){
            if ($scope.listTags.indexOf(tag) === -1  ) {
                $scope.listTags.push(tag);
            } 
        });
    }

    $scope.addColor = function(color){
        if ($scope.listColors.indexOf(color) === -1  ) {
            $scope.listColors.push(color);
        } 
        // $scope.filter.color = $scope.listColors.slice();
    }

    // edit
    $scope.detectImg ;
    $scope.isDetecting      = false;
    $scope.tagAvailable     = [];
    $scope.cityAvailable    = [];
    $scope.gpsObj           = {}

    $scope.openImage = function(img){
        $scope.isDetecting      = false;
        $scope.detectImg        = angular.copy(img) ;
        // set value for detect form
        $scope.tagAvailable     = $scope.detectImg.tags;
        $scope.cityAvailable    = $scope.detectImg.city;
        // first detect for img
        // if(!$scope.detectImg.isDetected){
        //     $scope.detectImage();
        // }

    }
    $scope.detectImage = function(){
        $scope.isDetecting      = true;

        var url       = host + "/api/detect/";
        var imgObj    = {filePath:$scope.detectImg.path};
        $http.post(url,imgObj).then(function(res){
            console.log(res);
            // set tags
            $scope.detectImg.title  = res.data.title;

            $scope.detectImg.tags  = res.data.tags;
            $scope.tagAvailable    = res.data.tags;

            $scope.cityAvailable   = res.data.gps.cities;
            $scope.detectImg.city  = res.data.gps.cities;
            $scope.detectImg.lon  = res.data.gps.lon;
            $scope.detectImg.lat  = res.data.gps.lat;

            $scope.detectImg.colors  = res.data.colors.accentColor;

            $scope.isDetecting      = false;
        })
    }

    $scope.updateImg = function(){
        var imgid= $scope.detectImg.id;
        var url = host+ '/api/images/'+imgid;
        $http.post(url,$scope.detectImg).then(function(res){
            $scope.listImages.map(function(img){
                if(img.id === $scope.detectImg.id){
                    img.title   = $scope.detectImg.title ;
                    img.tags    = $scope.detectImg.tags ;
                    $scope.addTags(img.tags);
                    img.city    = $scope.detectImg.city ;
                    img.colors  = $scope.detectImg.colors ;
                }
            })
        })
    }


}]);
