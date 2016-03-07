'Use Strict';


angular.module('App').controller('homeController', function ($scope, $ionicSideMenuDelegate, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  
//Carga de AJAX  (informacion de inicio de sesion) 

  var ref = new Firebase(FURL);
  var nombreUsuario="Juan";


  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
       $state.go('login');
  }

}
);
