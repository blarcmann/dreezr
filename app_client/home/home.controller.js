(function () {
    angular
        .module('dreezrApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', 'dreezrData', 'geolocation'];
    function homeCtrl($scope, dreezrData, geolocation) {
        var vm = this;
        vm.pageHeader = {
            title: 'dreezr',
            starpline: 'Find places to chao, work with free wifi near you!'
        };
        vm.sidebar = {
            content: 'Looking for somewhere to eat, grab a coffee, sit and get a bit of work done...bla bla bla bla bla bla bla bla bla bla bla *a very big THANK YOU to Ruth Josh\'Ny for making my JS time in Akwa Ibom state worthwhile (my grammatically inclined english gehfren) >3 >3 >3* bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla...'
        };
        vm.message = "Checking your location...";

        vm.getData = function (position) {
            var lat = position.coords.latitude,
                lng = position.coords.longitude;
            vm.message = "Searching for nearby places";
            dreezrData.locationByCoords(lat, lng)
                .success(function (data) {
                    vm.message = data.length > 0 ? "" : "No locations found nearby";
                    vm.data = { locations: data };
                    console.log(vm.data);
                })
                .error(function (e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
        };
        vm.showError = function (error) {
            $scope.$apply(function () {
                vm.message = error.message;
            });
        };
        vm.noGeo = function () {
            $scope.$apply(function () {
                vm.message = "Geolocation is not supported by this browser.";
            });
        };
        geolocation.getPosition(vm.getData, vm.showError, vm.noGeo);
    }
})();