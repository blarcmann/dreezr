// (function () {
//     angular
//         .module('dreezrApp')
//         .service('authentication', authentication);
//     authentication.$inject = ['$window'];
//     function authentication($window) {
//         var saveToken = function (token) {
//             $window.localStorage['dreezr-token'] = token;
//         };
//         var getToken = function () {
//             return $window.localStorage['dreezr-token'];
//         };
//         return {
//             saveToken: saveToken,
//             getToken: getToken
//         };
//     }
// })();

// register = function (user) {
//     return $http.post('/api/register', user).success(function (data) {
//         saveToken(data.token);
//     });
// };

// login = function (user) {
//     return $http.post('/api/login', user).success(function (data) {
//         saveToken(data.token);
//     });
// };

// logout = function (user) {
//     $window.localStorage.removeItem('dreezr-token');
// };


// var isLoggedIn = function () {
//     var token = getToken();
//     if (token) {
//         var payload = JSON.parse($window.atob(token.split('.')[1]));
//         return payload.exp > Date.now() / 1000;
//     } else {
//         return false;
//     }
// };

// var currentUser = function () {
//     if (isLoggedIn()) {
//         var token = getToken();
//         var payload = JSON.parse($window.atob(token.split('.')[1]));
//         return {
//             email: payload.email,
//             name: payload.name
//         };
//     }
// };

(function () {

    angular
      .module('dreezrApp')
      .service('authentication', authentication);
  
    authentication.$inject = ['$window', '$http'];
    function authentication ($window, $http) {
  
      var saveToken = function (token) {
        $window.localStorage['dreezr-token'] = token;
      };
  
      var getToken = function () {
        return $window.localStorage['dreezr-token'];
      };
  
      var isLoggedIn = function() {
        var token = getToken();
  
        if(token){
          var payload = JSON.parse($window.atob(token.split('.')[1]));
  
          return payload.exp > Date.now() / 1000;
        } else {
          return false;
        }
      };
  
      var currentUser = function() {
        if(isLoggedIn()) {
          var token = getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return {
            email : payload.email,
            name : payload.name
          };
        }
      };
  
      register = function(user) {
        return $http.post('/api/register', user).success(function(data){
          saveToken(data.token);
        });
      };
  
      login = function(user) {
        return $http.post('/api/login', user).success(function(data) {
          saveToken(data.token);
        });
      };
  
      logout = function() {
        $window.localStorage.removeItem('dreezr-token');
      };
  
      return {
        currentUser : currentUser,
        saveToken : saveToken,
        getToken : getToken,
        isLoggedIn : isLoggedIn,
        register : register,
        login : login,
        logout : logout
      };
    }
  
  }) ();
  