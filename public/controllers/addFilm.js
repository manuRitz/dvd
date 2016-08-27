angular.module('MyApp')
    .controller('AddFilmCtrl', ['$scope', '$alert', 'Category', 'Film', 'FilmSearch', function($scope, $alert, Category, Film, FilmSearch) {
        $scope.categories = Category.query();
        console.log('MRX', $scope.categories);

        $scope.searchFilm = function(title) {
            var searchResult = FilmSearch.get({title: title});
            searchResult.$promise.then(function (result) {
                console.log(result);
                return result;
            });
        };

        $scope.addFilm = function() {
            Film.save( {title: $scope.title, category: $scope.category.category, number: $scope.number} ,
                function() {
                    $scope.showName = '';
                    $scope.addForm.$setPristine();
                    $alert({
                        content: 'Film has been added.',
                        placement: 'top-right',
                        type: 'success',
                        duration: 3
                    });
                },
                function(response) {
                    $scope.showName = '';
                    $scope.addForm.$setPristine();

                    var message = '';
                    if (typeof response.data.validation !== 'string') {
                        for (var key in response.data.validation) {
                            if (response.data.validation.hasOwnProperty(key)) {
                                message += key + ': ' + response.data.validation[key];
                            }
                        }
                    } else {
                        message += response.data.validation
                    }

                    $alert({
                        content: message,
                        placement: 'top-right',
                        type: 'danger',
                        duration: 3
                    });
                });
        };


    }]);