angular.module('dreezrApp', []);

var locationListCtrl = function ($scope, dreezrData, geolocation) {
    $scope.message = "Checking your current location";
    $scope.getData = function (position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        $scope.message = "Searching for nearby places";
        dreezrData.locationByCoords(lat, lng)
            .success(function (data) {
                $scope.message = data.length > 0 ? "" : "No locations found";
                $scope.data = { locations: data };
            })
            .error(function (e) {
                $scope.message = "Sorry, something's gone wrong";
            });
    };
    $scope.showError = function (error) {
        $scope.$apply(function () {
            $scope.message = error.message;
        });
    };
    $scope.noGeo = function () {
        $scope.$apply(function () {
            $scope.message = "Geolocation not supported by this browser.";
        });
    };
    geolocation.getPosition($scope.getData, $scope.showError, $scope.noGeo);
};




var _isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


var formatDistance = function () {
    return function (distance) {
        var numDistance, unit;
        if (distance && _isNumeric(distance)) {
            if (distance > 1) {
                numDistance = parseFloat(distance).toFixed(1);
                unit = 'km';
            } else {
                numDistance = parseInt(distance * 1000, 10);
                unit = 'm';
            }
            return numDistance + unit;
        } else {
            return "?";
        }
    };
};


var ratingStars = function () {
    return {
        scope: {
            thisRating: '=rating'
        },
        templateUrl: '/angular/rating-stars.html'
    };
};


// var dreezrData = function ($http) {
//     var locationByCoords = function (lat, lng) {
//         return $http.get('/api/locations?lng=' + lng + '&lat=' + lat +
//             '&maxDistance=200000');
//     };
//     return {
//         locationByCoords: locationByCoords
//     };
// }

// var geolocation = function () {
//     var getPosition = function (cbSuccess, cbError, cbNoGeo) {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
//         } else {
//             cbNoGeo();
//         }
//     }
//     return {
//         getPosition: getPosition
//     };
// };


angular
    .module('dreezrApp')
    .controller('locationListCtrl', locationListCtrl)
    .filter('formatDistance', formatDistance)
    .directive('ratingStars', ratingStars)
    .service('dreezrData', dreezrData)
    .service('geolocation', geolocation);













// db.locations.save({
//     "name" : "Ika Udo",
//         "address" : "Akaa road,before township stadium, Uyo.",
//         "rating" : 3,
//         "facilities" : [
//                 "Hot food",
//                 "Food",
//                 "free wifi"
//         ],
//         "coords" : [
//                 3.3958,
//                 6.0571
//         ],
//         "openingTimes" : [
//                 {
//                         "days" : "Monday - Friday",
//                         "opening" : "7:00am",
//                         "closing" : "7:00pm",
//                         "closed" : true
//                 },
//                 {
//                         "days" : "Saturday",
//                         "opening" : "8:00am",
//                         "closing" : "5:00pm",
//                         "closed" : false
//                 },
//                 {
//                         "days" : "Sunday",
//                         "closed" : false
//                 }
//         ],
//         "reviews" : {
//                 "author" : "Ruth Josh'Ny",
//                 "rating" : 5,
//                 "timestamp" : new Date("Mar 29, 2018"),
//                 "reviewText" : "What a great place. I can't say enough good things about it."
//         }
// })