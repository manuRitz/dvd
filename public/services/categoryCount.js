angular.module('MyApp')
    .factory('CategoryCount', ['$resource', function($resource) {
        return $resource('/api/category/count/:id');
    }]);