"use strict";
app.controller('serviceListing', ['$scope', '$http', '$timeout', 'ConfigService', '$window', '$state', 'Notification',
    function($scope, $http, $timeout, ConfigService, $window, $state, Notification) {
        var host = ConfigService.host;
        var loggedUser = angular.fromJson($window.localStorage.loggedUser);
        var userId = loggedUser.id;
        


         
    }
]);
