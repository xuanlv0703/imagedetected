app.controller('profileCtrl', ['$scope', '$rootScope', '$http', 'ConfigService', '$state', 
    '$window', 'md5', 'loginService','$timeout', function($scope, $rootScope, $http, ConfigService, $state, $window,
     md5, loginService,$timeout) {
    var host = ConfigService.host;
    $scope.loggedUser = angular.fromJson($window.localStorage.loggedUser);
    $scope.username = $scope.loggedUser.username;
    $scope.email = $scope.loggedUser.email;
    $scope.firstname = $scope.loggedUser.firstname;
    $scope.lastname = $scope.loggedUser.lastname;
}]);
