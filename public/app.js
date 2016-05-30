angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainCtrl'
            })
            .when('/search', {
                templateUrl: 'views/search.html',
                controller: 'SearchCtrl'
            })
            .when('/addfilm', {
                templateUrl: 'views/addfilm.html',
                controller: 'AddFilmCtrl'
            })
            .when('/deletefilm', {
                templateUrl: 'views/deletefilm.html',
                controller: 'DeleteFilmCtrl'
            })
            .when('/addcategory', {
                templateUrl: 'views/addcategory.html',
                controller: 'AddCategoryCtrl'
            })
            .when('/deletecategory', {
                templateUrl: 'views/deletecategory.html',
                controller: 'DeleteCategoryCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'LogoutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

    }]);