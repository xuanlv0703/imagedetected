app.controller('uploadCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state',
    '$window', 'md5', 'loginService', '$timeout', 'Upload',
    function($scope, $rootScope, $http, ConfigService, $state, $window,
        md5, loginService, $timeout, Upload) {
        var host = ConfigService.host;
        $scope.loggedUser = angular.fromJson($window.localStorage.loggedUser);
        var uid = $scope.isLogin = $scope.loggedUser.id;
        $("#file-1").fileinput({
            uploadUrl: '/api/upload', // you must set a valid URL here else you will get an error
            allowedFileExtensions: ['jpg', 'png', 'gif'],
            overwriteInitial: false,
            uploadAsync: false,
            maxFileSize: 5000,
            maxFilesNum: 10,
            uploadExtraData: function() {
                return { id: uid, value: '100 Details', aid: $('#singleAlbum').val() } },
            //allowedFileTypes: ['image', 'video', 'flash'],
            slugCallback: function(filename) {
                return filename.replace('(', '_').replace(']', '_');
            }
        }).on('filebatchuploadsuccess', function(event, data) {
            var resp = data.response.data;
            console.log(resp);
            console.log(typeof($scope.listImages)); 
            if ( typeof($scope.listImages) != 'undefined' ) {
                console.log('asdasd')
                angular.forEach(resp, function(item) {
                    item.isShow = true ;
                    item.tags   = [];
                    item.city   = [];
                    item.colors = '';
                	console.log(item);
                    $scope.listImages.push(item);
                    $scope.$apply();
                });
            }
        });

        // $scope.upload = function(file){



        // 	 file.upload = Upload.upload({
        //                 url: '/api/upload',
        //                 data: { file: file },
        //             });
        // 	console.log($scope.picFile)
        // }
    }
]);
