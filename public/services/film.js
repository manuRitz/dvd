angular.module('MyApp')
    .factory('Film', ['$resource', function($resource) {
        return $resource('/api/film');
    }])
    .factory('FilmSearch', ['$resource', function($resource) {
        return $resource('/api/film/search/:title');
    }]);