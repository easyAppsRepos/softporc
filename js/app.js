'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {
$stateProvider



    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })

    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller:'homeController'
    })

    .state('corrales', {
      url: '/home/granjas/corrales',
      templateUrl: 'views/home/corrales.html',
      controller:'homeController'
    })

    .state('inmunocastracion', {
      url: '/home/granjas/inmunocastracion',
      templateUrl: 'views/home/inmunocastracion.html',
      controller:'homeController'
    })

    .state('ingresoDeGranjas', {
      url: '/home/granjas/ingresoDeGranjas',
      templateUrl: 'views/home/ingresoDeGranjas.html',
      controller:'homeController'
    })


    .state('galpones', {
      url: '/home/granjas/galpones',
      templateUrl: 'views/home/galpones.html',
      controller:'homeController'
    })

     .state('inventarioInsumos', {
      url: '/home/inventarioInsumos',
      templateUrl: 'views/home/inventarioInsumos.html',
      controller:'homeController'
    })

            .state('capturaDeDatos', {
      url: '/home/capturaDeDatos',
      templateUrl: 'views/home/capturaDeDatos.html',
      controller:'homeController'
    })

        .state('granjas', {
      url: '/home/granjas',
      templateUrl: 'views/home/granjas.html',
      controller:'homeController'
    })

            .state('mortalidad', {
      url: '/home/capturaDeDatos/mortalidad',
      templateUrl: 'views/home/mortalidad.html',
      controller:'homeController'
    })

      .state('ingresoAnimal', {
      url: '/home/capturaDeDatos/ingresoAnimal',
      templateUrl: 'views/home/ingresarAnimal.html',
      controller:'homeController'
    })


                 .state('salidasPrecebo', {
      url: '/home/capturaDeDatos/salidasPrecebo',
      templateUrl: 'views/home/salidasPrecebo.html',
      controller:'homeController'
    })       

            .state('transladoAlimento', {
      url: '/home/capturaDeDatos/transladoAlimento',
      templateUrl: 'views/home/transladoAlimento.html',
      controller:'homeController'
    })
       .state('medicamentos', {
      url: '/home/capturaDeDatos/medicamentos',
      templateUrl: 'views/home/medicamentos.html',
      controller:'homeController'
    })

           .state('patologias', {
      url: '/home/capturaDeDatos/patologias',
      templateUrl: 'views/home/patologias.html',
      controller:'homeController'
    })           

              .state('fabricasDeAlimentos', {
      url: '/home/capturaDeDatos/fabricasDeAlimentos',
      templateUrl: 'views/home/fabricasDeAlimentos.html',
      controller:'homeController'
    })

                          .state('compraAlimento', {
      url: '/home/inventarioInsumos/compraAlimento',
      templateUrl: 'views/home/compraAlimento.html',
      controller:'homeController'
    })

     .state('compraMedicamentos', {
      url: '/home/inventarioInsumos/compraMedicamentos',
      templateUrl: 'views/home/compraMedicamentos.html',
      controller:'homeController'
    })  

          .state('compraInsumos', {
      url: '/home/inventarioInsumos/compraInsumos',
      templateUrl: 'views/home/compraInsumos.html',
      controller:'homeController'
    }) 

       .state('pedidoMedicamento', {
      url: '/home/inventarioInsumos/pedidoMedicamento',
      templateUrl: 'views/home/pedidoMedicamento.html',
      controller:'homeController'
    })

      .state('consumoDeFarmacos', {
      url: '/home/inventarioInsumos/consumoDeFarmacos',
      templateUrl: 'views/home/consumoDeFarmacos.html',
      controller:'homeController'
    })

    .state('consumoDeInsumos', {
      url: '/home/inventarioInsumos/consumoDeInsumos',
      templateUrl: 'views/home/consumoDeInsumos.html',
      controller:'homeController'
    })
    ;


$urlRouterProvider.otherwise("/home");
})
// Changue this for your Firebase App URL.
.constant('FURL', 'https://softporcapp.firebaseio.com/')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
