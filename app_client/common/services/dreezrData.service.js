(function () {
    angular
        .module('dreezrApp')
        .service('dreezrData', dreezrData);

    dreezrData.$inject = ['$http'];
    function dreezrData($http) {
        var locationByCoords = function (lat, lng) {
            return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +
                '&maxDistance=200000');
        };
        var locationById = function (locationid) {
            return $http.get('/api/locations/' + locationid);
        };
        
        var addReviewById = function (locationid, data) {
            return $http.post('/api/locations/' + locationid + '/reviews', data);
            };


        return {
            locationByCoords: locationByCoords,
            locationById: locationById,
            addReviewById : addReviewById
        };
    }
})();