(function() {
angular
    .module('dreezrApp')
    .service('dreezrData', dreezrData);

dreezrData.$inject = ['$http'];
function dreezrData ($http) {
    var locationByCoords = function (lat, lng) {
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +
            '&maxDistance=200000');
    };
    return {
        locationByCoords: locationByCoords
    };
}
})();