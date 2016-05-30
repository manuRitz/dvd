angular.module('MyApp')
    .controller('MainCtrl', ['$scope', 'Category', 'Film', function($scope, Category, Film) {

        $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'];

        $scope.headingTitle = 'Startseite Film Verwaltung';

        $scope.categories = Category.query();

        $scope.filterByAlphabet = function(char) {
            $scope.shows = Category.query({ alphabet: char });
            $scope.headingTitle = char;
        };

        $scope.filmCountByCategory = function(category) {
            $scope.count = Film.query({category: category._id}).length;
        }
    }]);