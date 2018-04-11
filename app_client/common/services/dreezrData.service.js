(function () {

    angular
      .module('dreezrApp')
      .service('dreezrData', dreezrData);
  
    dreezrData.$inject = ['$http', 'authentication'];
    function dreezrData ($http, authentication) {
      var locationByCoords = function (lat, lng) {
        return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
      };
  
      var locationById = function (locationid) {
        return $http.get('/api/locations/' + locationid);
      };
  
      var addReviewById = function (locationid, data) {
        return $http.post('/api/locations/' + locationid + '/reviews', data, {
          headers: {
            Authorization: 'Bearer '+ authentication.getToken()
          }
        });
      };
  
      return {
        locationByCoords : locationByCoords,
        locationById : locationById,
        addReviewById : addReviewById
      };
    }
  
  }) ();



// (function () {
//     angular
//         .module('dreezrApp')
//         .service('dreezrData', dreezrData);

//     dreezrData.$inject = ['$http', 'authentication'];
//     function dreezrData($http, authentication) {
//         var locationByCoords = function (lat, lng) {
//             return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +
//                 '&maxDistance=200000000000');
//         };
//         var locationById = function (locationid) {
//             return $http.get('/api/locations/' + locationid);
//         };

//         var addReviewById = function (locationid, data) {
//             return $http.post('/api/locations/' + locationid + '/reviews', data, {
//                 headers: {
//                     Authorization: 'Bearer ' + authentication.getToken()
//                 }
//             });
//         };


//         return {
//             locationByCoords: locationByCoords,
//             locationById: locationById,
//             addReviewById: addReviewById
//         };
//     }
// })();