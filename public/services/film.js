angular.module('MyApp')
    .factory('Film', ['$resource', function($resource) {
        return $resource('/api/film');
    }]);