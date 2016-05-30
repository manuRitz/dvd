angular.module('MyApp')
    .controller('AddCategoryCtrl', ['$scope', '$alert', 'Category', function($scope, $alert, Category) {
        $scope.addCategory = function() {
            Category.save( {category: $scope.category, shortcut: $scope.shortcut} ,
                function() {
                    $scope.showName = '';
                    $scope.addForm.$setPristine();
                    $alert({
                        content: 'Category has been added.',
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