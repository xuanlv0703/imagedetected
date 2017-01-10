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
            console.log(resp)
            if ($scope.listImages != undefined) {
                angular.forEach(resp, function(item) {
                	console.log(item)
                    var resImg = {
                        aid: item.aid,
                        album: $('#singleAlbum').text(),
                        city: null,
                        created: "2017-01-09T19:15:43.000Z",
                        id: item.id,
                        isShow: true,
                        lat: null,
                        lon: null,
                        path: item.path,
                        tags: [],
                        uid: uid
                    };
                    $scope.listImages.push(resImg);
                $scope.$apply();

                })
			console.log($scope.listImages.slice(-10))
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
