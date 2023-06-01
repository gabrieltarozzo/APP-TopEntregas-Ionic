// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controllers', 'ui.utils.masks', 'ngImageAppear', 'ngCordova'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {

    //setTimeout(function() {
      //ocultei para ver se resolve no apple o app nao passar da splashscreen
      //$cordovaSplashscreen.hide();
      navigator.splashscreen.hide();
//}, 100);

    if (typeof FCMPlugin != 'undefined') {

      setTimeout(getTheToken, 1000);

      function getTheToken() {
      FCMPlugin.getToken(
          function (token) {
            if (token == null) { 

              setTimeout(getTheToken, 1000);
            }else {

            sessionStorage.setItem('token', token);
            }
          },
          function (err) {

          }
      );
        }
  
      FCMPlugin.onNotification(
          function(data){
              if(data.wasTapped){

              }else{

              }
          },
          function(msg){

          },
          function(err){

          }
      );
        }

    window.addEventListener('keyboardDidShow', (event) => {
      // Describe your logic which will be run each time when keyboard is about to be shown.
    //  cordova.plugins.Keyboard.disableScroll(false);
      document.querySelector('div.tabs').style.display = 'none';
      angular.element(document.querySelector('ion-content.has-tabs')).css('bottom', 0);
  });

  window.addEventListener('keyboardDidHide', () => {
   // cordova.plugins.Keyboard.disableScroll(true);
    var tabs = document.querySelectorAll('div.tabs');
    angular.element(tabs[0]).css('display', '');
});

    if (Keyboard.isVisible) {
      // do something
    //  cordova.plugins.Keyboard.disableScroll(false);
      document.querySelector('div.tabs').style.display = 'none';
      angular.element(document.querySelector('ion-content.has-tabs')).css('bottom', 0);
  }else{
   // cordova.plugins.Keyboard.disableScroll(true);
          var tabs = document.querySelectorAll('div.tabs');
      angular.element(tabs[0]).css('display', '');
  }

     // window.addEventListener('native.keyboardhide', function () {
     // var tabs = document.querySelectorAll('div.tabs');
     // angular.element(tabs[0]).css('display', ''); 

     // });
    //se a acessory bar nao aparecer, trocar pelo comentario abaixo\/
    if(window.cordova && Keyboard) {
    //  if(window.cordova && window.Keyboard) {
      Keyboard.hideFormAccessoryBar(false);
      //cordova.plugins.Keyboard.disableScroll( true );
      //var select = $element.find('select');
     // select.bind('blur', function() {
     //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  
     // });
    //}
     //cordova.plugins.Keyboard.disableScroll(false);
      
      if(window.StatusBar) {
      StatusBar.styleDefault();
      }
      
  }});
})

//tentativa de esconder menu com o codigo abaixo

.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
  //corrige tela branca no ios
  //se eu quiser esse recurso preciso habilitar o cache
  //se o cache estiver desabilitado aparecera essa tela em branco
  //se estiver preocupado com os dados nao estarem atualizados
  //pode usar o view lifecycle events to make sure data is up to date
  $ionicConfigProvider.views.swipeBackEnabled(false);
//tentativa desaativar cache
    // Diable IE Cache for $http.get requests
    '$httpProvider', function ($httpProvider) {
        // Initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // Enables Request.IsAjaxRequest() in ASP.NET MVC
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }
//se nao funcionar tentar esse >
   //initialize get if not there
  // if (!$httpProvider.defaults.headers.get) {
  //  $httpProvider.defaults.headers.get = {};
//}

//disable IE ajax request caching
//$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
// extra
//$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
//$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
//fim tentativa

  $ionicConfigProvider.tabs.position('bottom'); //isso garante que a tab fica embaixo em todos os OS

  $stateProvider

  .state('tab',{
    url:'/tab',
    abstract:true,
    cache:false,
    templateUrl:function(){
      
      if(localStorage.getItem('loggedin_status')){
        return 'templates/tabs-main.html';
      }else{
        return 'templates/tabs.html';
      }

    }
  })

  .state('tab.index',{
    url:'/index',
    views:{
      'tab-index':{
          templateUrl:'templates/index.html'
      }
    }
  })

  .state('tab.lista',{
    url:'/lista',
    views:{
      'tab-lista':{
          templateUrl:'templates/lista.html',
          controller:'AppCtrl'
      }
    }
  })

  .state('tab.admin-edit',{
    url:'/admin-edit',
    views:{
      'tab-admin-edit':{
          templateUrl:'templates/admin-edit.html',
          //controller:'AppCtrl'
      }
    }
  })

  .state('tab.produtos',{
    url:"/produtos",
    views:{
      'tab-produtos':{
          templateUrl:"templates/produtos.html"
      }
    }
  })

  .state('tab.login',{
    url:'/login',
    views:{
      'tab-login':{
          templateUrl:'templates/login.html',
          controller:'AppCtrl'
      }
    }
  })

  .state('tab.main',{
    url:'/main',
    views:{
      'tab-main':{
          templateUrl:'templates/main.html'
      }
    }
  })

  .state('tab.carrinho',{
    url:'/carrinho',
    views:{
      'tab-carrinho':{
          templateUrl:'templates/carrinho.html'
      }
    }
  })
  
  .state('tab.status',{
    url:'/status',
    views:{
      'tab-status':{
          templateUrl:'templates/status.html'
      }
    }
  })


  .state('tab.cadastrar',{
    url:'/cadastrar',
    views:{
      'tab-cadastrar':{
          templateUrl:'templates/cadastrar.html'
      }
    }
  })

  //$stateProvider.state('visualizar-oferta', {
 //   cache: false,
//    url: '/visualizar-oferta/:id',
 //   templateUrl: 'templates/ofertas/visualizar-oferta.html',
//    controller: 'VisualizarOfertaCtrl'
//});

$stateProvider.state('main', {
  cache: false,
  url: '/main',
  templateUrl: 'templates/main.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('endereco', {
  cache: false,
  url: '/endereco',
  templateUrl: 'templates/endereco.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('carrinho', {
  cache: false,
  url: '/carrinho',
  templateUrl: 'templates/carrinho.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('sobre-nos', {
  cache: false,
  url: '/sobre-nos',
  templateUrl: 'templates/sobre-nos.html',
 // controller: 'VisualizarOfertaCtrl'
});


$stateProvider.state('admin-create', {
  cache: false,
  url: '/admin-create',
  templateUrl: 'templates/admin-create.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('cadastrar', {
  cache: false,
  url: '/cadastrar',
  templateUrl: 'templates/cadastrar.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('login', {
  cache: false,
  url: '/login',
  templateUrl: 'templates/login.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('produtos', {
  cache: false,
  url: '/produtos',
  templateUrl: 'templates/produtos.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('descricao-novidade', {
    cache: false,
    url: '/descricao-novidade/:id',
    templateUrl: 'templates/descricao-novidade.html',

   // controller: 'AlterarSenhaCtrl'
});

$stateProvider.state('descricao-produto', {
  cache: false,
  url: '/descricao-produto',
  templateUrl: 'templates/descricao-produto.html',
 // controller: 'AlterarSenhaCtrl'
});

$stateProvider.state('forma-pagamento', {
  cache: false,
  url: '/forma-pagamento',
  templateUrl: 'templates/forma-pagamento.html',
 // controller: 'AlterarSenhaCtrl'
});

$stateProvider.state('alterar-endereco', {
  cache: false,
  url: '/alterar-endereco',
  templateUrl: 'templates/alterar-endereco.html',
 // controller: 'secondController'
});

$stateProvider.state('alterar-senha', {
  cache: false,
  url: '/alterar-senha',
  templateUrl: 'templates/alterar-senha.html',
 // controller: 'AlterarSenhaCtrl'
});

$stateProvider.state('admin-edit', {
  cache: false,
  url: '/admin-edit',
  templateUrl: 'templates/admin-edit.html',
 // controller: 'firstController'
});

$stateProvider.state('cupons', {
  cache: false,
  url: '/cupons',
  templateUrl: 'templates/cupons.html',
 // controller: 'firstController'
});

$stateProvider.state('retirada-balcao', {
  cache: false,
  url: '/retirada-balcao',
  templateUrl: 'templates/retirada-balcao.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('alterar-nome', {
  cache: false,
  url: '/alterar-nome',
  templateUrl: 'templates/alterar-perfil/alterar-nome.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('adicional', {
  cache: false,
  url: '/adicional',
  templateUrl: 'templates/adicional.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('menu', {
  cache: false,
  url: '/menu',
  templateUrl: 'templates/menu.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('meio-a-meio', {
  cache: false,
  url: '/meio-a-meio',
  templateUrl: 'templates/meio-a-meio.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('descricao-produto2', {
  cache: false,
  url: '/descricao-produto2',
  templateUrl: 'templates/descricao-produto2.html',
 // controller: 'VisualizarOfertaCtrl'
});

$stateProvider.state('alterar-telefone', {
  cache: false,
  url: '/alterar-telefone',
  templateUrl: 'templates/alterar-perfil/alterar-telefone.html',
 // controller: 'VisualizarOfertaCtrl'
});

  $urlRouterProvider.otherwise('/tab/lista');

})

.factory("historyFactory", ['$ionicHistory', function($ionicHistory){
  var show = function() {
    var text = "";

    var vh = $ionicHistory.viewHistory();
    if(vh !== null) {
      text += "VIEWS=" + JSON.stringify(vh.views);
      text += "BACK=" + JSON.stringify(vh.backView);
    }

    return text;
  }

  return {
    show : show,
  }
}])
.controller("firstController", [
  '$scope',
  '$location', 
  function($scope, $location){
  $scope.next = function() {
    $location.path("/second");
  };
}])

.controller("secondController", [
  '$scope',
  '$location', 
  '$ionicHistory',
  'historyFactory', 
  function($scope, $location, $ionicHistory, historyFactory){
    $scope.next = function() {
      $location.path("/third");
    };

    $scope.prev = function() {
      $ionicHistory.goBack();
    };

    var init = function() {
      $scope.data = historyFactory.show();
    };

    init();
}])