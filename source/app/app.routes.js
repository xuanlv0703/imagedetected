'use strict';

app.config(function($stateProvider, $urlRouterProvider, $transitionsProvider) {

    $transitionsProvider.onStart({
        to: function(state) {
            return state.requireAuthen === undefined ? true : false;
        }
    }, function($transition$, $state, userService) {
        if (!userService.isLogin()) {
            return $state.go('login');
        }

    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider        
        .state('home', {
            url: '/',
            views: {
                'header@': {
                    templateUrl: '/app/shared/header.html',
                    controller: 'headerCtrl'
                },
                'content@': {
                    templateUrl: '/app/shared/content.html',
                },
                'footer@': {
                    templateUrl: '/app/shared/footer.html',
                }
            }
        })
        .state('home.services', {
            url: 'services',
            views: {
                'content@': {
                    templateUrl: '/app/components/services/listing.html',
                    controller: 'serviceListing'
                }
            }
        })       
        
        .state('login', {
            url: '/login',
            views: {
                'login@': {
                    templateUrl: '/app/components/login/login.html',
                    controller: 'loginCtrl'
                }
            },
            requireAuthen: false
        })        
        .state('home.profile', {
            url: 'profile/:staffId',
            views: {
                'content@': {
                    templateUrl: '/app/components/profile/profile.html',
                    controller: 'profileCtrl'
                }
            }
        })        
});
