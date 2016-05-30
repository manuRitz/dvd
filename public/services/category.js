angular.module('MyApp')
    .factory('Category', ['$resource', function($resource) {
        return $resource('/api/category');
    }]);