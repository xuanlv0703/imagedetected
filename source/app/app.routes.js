'use strict';

app.config(function($stateProvider, $urlRouterProvider, $transitionsProvider) {

    $transitionsProvider.onStart({
        to: function(state) {
            return state.requireAuthen;
        }
    }, function($transition$, $state, userService) {
        if (!userService.isLogin()) {
            return $state.go('home');
        }
      

    });

    $urlRouterProvider.otherwise('/');

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
            },
            requireAuthen: false
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
          .state('register', {
            url: '/register',
            views: {
                'register@': {
                    templateUrl: '/app/components/register/register.html',
                    controller: 'registerCtrl'
                }
            },
            requireAuthen: false
        })  
        .state('home.gallery', {
            url: 'gallery',
            views: {
                'content@': {
                    templateUrl: '/app/components/gallery/gallery.html',
                    controller: 'galleryCtrl'
                }
            },
            requireAuthen: true
        })
             .state('home.profile', {
            url: 'profile',
            views: {
                'content@': {
                    templateUrl: '/app/components/profile/profile.html',
                    controller: 'galleryCtrl'
                }
            },
            requireAuthen: true
        })                  
});
