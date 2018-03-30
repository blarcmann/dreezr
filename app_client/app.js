(function() {
angular.module('dreezrApp', ['ngRoute']);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
}

angular
    .module('dreezrApp')
    .config(['$routeProvider', config]);
})();