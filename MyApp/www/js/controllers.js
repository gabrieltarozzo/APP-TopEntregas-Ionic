
   var Myapp = angular.module('starter.controllers',[])

   //Variaveis Globais // Detalhes sobre a empresa.
   Myapp.factory('Empresa', function() {
     return {
   //Configuração rápida
   //Tela Style: Coisas importantes que voce irá mudar.
   //Pesquisar por:
   //FUNDOAPP
   //.tab-nav.tabs
   //ion-nav-bar.roxo ion-header-bar
   //icon4.png
   //Adicinar Icon, SplashScreen, e imagem de fundo no APP.
   //e o icone das notificações
   //Empresas já Cadastradas:
    // numero 1 - Top Entregas
    // numero 2 - Turbo dog
    // numero 3 - Ale Lanches
    numero : '1',
    nome : 'Top Entregas',
    localizacao : 'R. Santa Maria, 464 - Vila Aurora, São José do Rio Preto - SP',
    //Descrição Novidade
    nomeUP : 'Top', // Caso nao tenha 2 nomes colocar apenas no nomeUP
    nomeDown : 'Entregas',
    //Endereço picado //tela retirada.
    RuaEndereco : 'Top Entregas',
    BairroEndereco: '- APP -',
    CidadeEndereco: 'São José do Rio Preto - SP',
    PaisEndereco: 'Brasil',
    Tipo: '',
    //Ativar Retirada no balcão ?
    AtivarRetirada : 1 //1 ativa e 0 desativa.
     };
   })

.controller('voltarButtons', function($scope, $state, Empresa){
 sessionStorage.getItem('menuPerfil');
 var last = sessionStorage.getItem('menuPerfil');

 $scope.MeuProprioVoltar = function(){
 if (last == 1) {
 $state.go('admin-edit',[],{location:"replace",reload:true});
}
   if (last == 2) {
     $state.go('tab.carrinho',[],{location:"replace",reload:true});
   //  $scope.openModalCarrinho();
   }

   if (last == 3) {
     $state.go('tab.lista',[],{location:"replace",reload:true});
   }
 }

 $scope.MeuProprioVoltarRetirada = function(){
   sessionStorage.getItem('irParaRetirada');
   var retirada = sessionStorage.getItem('irParaRetirada');

   if (retirada == 1) {
     $state.go('tab.carrinho',[],{location:"replace",reload:true});
   }
   if (retirada == 2) {
     $state.go('tab.lista',[],{location:"replace",reload:true});
 }
}

$scope.MeuProprioVoltarCarrinho = function() {
 sessionStorage.getItem("aoCarrinho");
 var carrinhoback = sessionStorage.getItem('aoCarrinho');
 if (carrinhoback == 1) {
   $state.go('descricao-produto',[],{location:"replace",reload:true});
 }
 if (carrinhoback == 2) {

   $state.go('produtos',[],{location:"replace",reload:true});
 }
 if (carrinhoback == 3) {

   $state.go('tab.lista',[],{location:"replace",reload:true});
 }
}
$("#preloader").fadeOut();
})
.controller('Complementos', function($scope,$timeout,$ionicPopup,$http,$state, $ionicPlatform, Empresa){
  var urlApiGP = 'https://topentregas.com.br/ionic/complementos/';
  var idEmpresa = Empresa.numero;
  var idProduto = sessionStorage.getItem('loggedin_id_produto');

  $scope.loggedin_temcomple = sessionStorage.getItem('loggedin_temcomple');

  str= urlApiGP + "show_complementos.php?idEmpresa=" + idEmpresa + "&idProduto=" + idProduto;

  $http.get(str)
  .success(function(response){

     $scope.showComplementos=response.records;

  })

  str = urlApiGP + "show_only_cat_comple.php?idEmpresa=" + idEmpresa + "&idProduto=" + idProduto;

  $http.get(str)
  .success(function(response){
    $scope.showOnlyComplementos=response.records;

  //  var numbercomple = $scope.showOnlyComplementos.numbercomple;


  })


  //var items;
 //var items = sessionStorage.getItem('comple');
  //$scope.items = sessionStorage.getItem('comple');


 // $scope.items = '[133]';


  //items = $('input[id="133"]:checked');
  //$('input').prop('checked', true);
 // $(items).prop('checked', true);



//botão que adiciona os complementos no banco
$scope.saveB = function(){

  //só descomentar
  var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
  var idUserP = localStorage.getItem("loggedin_id");
  var idAD = sessionStorage.getItem("comple");
  var urlApi7 = 'https://topentregas.com.br/ionic/complementos/'; //online
//console.log("" + $scope.lst);
//inicio tentativa

if ($scope.comple == '') {

//$scope.limpar();
//$state.go('descricao-produto',[],{location:"replace",reload:true});
//return;

}


str= urlApi7 + "add_complementos.php?idAD=" + idAD + "&idProdutoP=" + idProdutoP + "&idUser=" + idUserP;

$http.get(str)
.success(function(response){

  if(response==true){
    $ionicPopup.alert({cssClass: 'custom-class',
    title:'certo!',
    template:'certo.'
  });
  // $scope.closeModalAdicional();

   // $( "#here" ).load(window.location.href + " #here" );
 //  window.top.location = window.top.location

  //  $state.go('descricao-produto',[],{location:"replace",reload:true});

  }else{
    $ionicPopup.alert({cssClass: 'custom-class',
      title:'Erro!',
      template:'Algo deu errado.'
    });
   // $state.go('tab.main',[],{location:"replace",reload:true});
  }
})
}
//fim
  $scope.change = function(check,value,numbercomple, xcomple, qtdMax){
  // apenas comente a linha abaixo para funcionar
 // $scope.comple.length = 0; // nao via da pra usar $scope.comple para fazer isso pois o vetor sempre irá crescer independente de qual grupo....
 // tenho que arrumar um jeito de separar os vetores para que sempre que muda de grupo o vetor reinicie [], mas nao perca o que foi feito do vetor anterior
   //var contador = 0;
   //contador = contador + 1;
   //var numberOfChecked = $('input:checkbox:checked').length;
   //var groupcheck = $('input[name="comple['+ numbercomple +']"]:checked').length;
}
})

.controller('Adicionais', function($scope,$timeout,$ionicPopup,$http,$state, $ionicPlatform, Empresa){

 var urlApiGP = 'https://topentregas.com.br/ionic/adicionais/';
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
 var urlApiGPB = 'https://topentregas.com.br/ionic/complementos/';
 var idEmpresa = Empresa.numero;
 var categoria = sessionStorage.getItem('loggedin_id_cat');

          str= urlApiGP + "show_adicional.php?idEmpresa=" + idEmpresa + "&categoria=" + categoria;

          $http.get(str)
          .success(function(response){

             $scope.showAdicionais=response.records;

          })

 if (sessionStorage.getItem("lst") == '') {
  $scope.finn = "nenhum";
  }else{
    $scope.finn = sessionStorage.getItem("lst");  }
    $scope.limpar = function(){
     var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
     var idUserP = localStorage.getItem("loggedin_id");
 //var idAD = sessionStorage.getItem("lst");
     var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
 //console.log("" + $scope.lst); //inicio tentativa
   str= urlApi7 + "delete_all_add.php?idProduto=" + idProdutoP + "&idUser=" + idUserP;
   $http.get(str)
  .success(function(response){
     if(response==true){
      //$state.go('descricao-produto',[],{location:"replace",reload:true});
     }else{
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Erro!',
         template:'Algo deu errado, adicionais não foram limpados.'
       });
      // $state.go('tab.main',[],{location:"replace",reload:true});
     }
   })
 var lst = '';

  sessionStorage.setItem('lst' , lst);
  sessionStorage.removeItem('valorAd');
  sessionStorage.removeItem('nomeAd');

  $timeout(function() {
   $ionicPlatform.ready(function () {
     $state.go('descricao-produto',[],{location:"replace",reload:true});
   });
 });

 }

 $scope.save = function(){

   //só descomentar
   var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
   var idUserP = localStorage.getItem("loggedin_id");
   var idAD = sessionStorage.getItem("lst");
   var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
//console.log("" + $scope.lst);
//inicio tentativa

if ($scope.lst == '') {

$scope.limpar();
$state.go('descricao-produto',[],{location:"replace",reload:true});
 return;

}


 str= urlApi7 + "add_adicionais.php?idAD=" + idAD + "&idProdutoP=" + idProdutoP + "&idUser=" + idUserP;

 $http.get(str)
.success(function(response){

   if(response==true){

    $scope.closeModalAdicional();

    // $( "#here" ).load(window.location.href + " #here" );
  //  window.top.location = window.top.location

     $state.go('descricao-produto',[],{location:"replace",reload:true});

   }else{

     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Erro!',
       template:'Algo deu errado.'
     });
    // $state.go('tab.main',[],{location:"replace",reload:true});

   }
 })

 }

$scope.desativar = function(){
 angular.element(document.getElementsByClassName("chk")).attr('disabled', true);
}


})
.controller('ModalAdicional', function($scope, $ionicModal, $ionicPopup, $state, Empresa){
     //comeco modal adicionais
   $ionicModal.fromTemplateUrl('my-modalAdicional.html', {
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
  }).then(function(modal) {
     $scope.modalAdicional = modal;
  });

 // $scope.openModalAdicional = function() {
   //$state.go('adicional',[],{location:"replace",reload:false});
  //}

   $scope.openModalAdicional = function() {

    var verificar =  sessionStorage.getItem('lst');
    if ( verificar != ''){
     var confirmPopup = $ionicPopup.confirm({
       cssClass: 'custom-class',
       title: 'Pergunta:',
       template: 'Caso altere ou adicione algum adicional, os atuais serão substituidos, continuar ?'
     });
     confirmPopup.then(function(res) {
       if(res) {

         $scope.modalAdicional.show();
         return;
       }
       else {
  return;
       } })
    }else {
     $scope.modalAdicional.show();
    }

  };
  $scope.closeModalAdicional = function() {
   $scope.modalAdicional.hide();
 };
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
     $scope.modalAdicional.remove();
  });

  // Execute action on hide modal
  $scope.$on('modalAdicional.hidden', function() {
     // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modalAdicional.removed', function() {
     // Execute action
  });
 //fim modal adicional

})

.controller('ModalDesc', function($scope, $ionicModal, $ionicPopup, $state, Empresa){
 //comeco modal adicionais
$ionicModal.fromTemplateUrl('my-ModalDesc.html', {
 scope: $scope,
 backdropClickToClose: false,
 animation: 'slide-in-up'
}).then(function(modal) {
 $scope.ModalDesc = modal;
});

// $scope.openModalAdicional = function() {
//$state.go('adicional',[],{location:"replace",reload:false});
//}

$scope.openModalDesc = function() {

var verificar =  sessionStorage.getItem('lst');
if ( verificar != ''){
 var confirmPopup = $ionicPopup.confirm({
   cssClass: 'custom-class',
   title: 'Pergunta:',
   template: 'Caso altere ou adicione algum adicional, os atuais serão substituidos, continuar ?'
 });
 confirmPopup.then(function(res) {
   if(res) {

     $scope.ModalDesc.show();
     return;
   }
   else {
return;
   } })
}else {
 $scope.ModalDesc.show();
}

};
$scope.closeModalDesc = function() {
$scope.ModalDesc.hide();
};
//Cleanup the modal when we're done with it!
$scope.$on('$destroy', function() {
 $scope.ModalDesc.remove();
});

// Execute action on hide modal
$scope.$on('ModalDesc.hidden', function() {
 // Execute action
});

// Execute action on remove modal
$scope.$on('ModalDesc.removed', function() {
 // Execute action
});
//fim modal adicional
$("#preloader").fadeOut();
})

.controller('MyController', function($scope, $ionicModal, Empresa) {

   //começo modal pedido
   $ionicModal.fromTemplateUrl('my-modalPedido.html', {
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
  }).then(function(modal) {
     $scope.modalPedido = modal;
  });

   $scope.openModalPedido = function() {
     $scope.modalPedido.show();
  };
  $scope.closeModalPedido = function() {
   $scope.modalPedido.hide();
 };
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
     $scope.modalPedido.remove();
  });

  // Execute action on hide modal
  $scope.$on('modalPedido.hidden', function() {
     // Execute action
  });

  // Execute action on remove modal
  $scope.$on('modalPedido.removed', function() {
     // Execute action
  });
 //fim modal pedido

 //começo modal endereço
 $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
 }).then(function(modal) {
    $scope.modal = modal;
 });

 $scope.openModal = function() {
    $scope.modal.show();
 };


 $scope.closeModal = function() {
    $scope.modal.hide();
 };

 //Cleanup the modal when we're done with it!
 $scope.$on('$destroy', function() {
    $scope.modal.remove();
 });

 // Execute action on hide modal
 $scope.$on('modal.hidden', function() {
    // Execute action
 });

 // Execute action on remove modal
 $scope.$on('modal.removed', function() {
    // Execute action
 });
//fim modal endereço
$("#preloader").fadeOut();
})

.controller('AppController',function($ionicSideMenuDelegate, $scope, Empresa) {
 $scope.toggleLeft = function() {
   $ionicSideMenuDelegate.toggleLeft();
   $ionicSideMenuDelegate.canDragContent([canDrag]);
   $ionicsidemenudelegate.isOpen();
 };
})

.controller('ExampleController', ['$scope', function($scope, Empresa) {
 $scope.amount = "";
}])

.controller('PerfilCtrl',function($scope,$state, Empresa){

$chave = '';

 $scope.goAltEnd = function (){
   sessionStorage.setItem("menuPerfil", 1);
   $state.go('alterar-endereco',[], {location:"replace",reload:true});
 }

 $scope.goPerfil = function () {

   $state.go('admin-edit',[],{location:"replace",reload:true});

 }

 $scope.goSobreNos = function () {

   $state.go('sobre-nos',[],{location:"replace",reload:true});

 }

 $scope.goSobreNos = function () {

  $state.go('cupons',[],{location:"replace",reload:true});

}

 $scope.goRetirada = function () {

   $state.go('retirada-balcao',[],{location:"replace",reload:true});

 }
 $scope.goAlterarNome = function () {

   $state.go('alterar-nome',[],{location:"replace",reload:true});

 }
 $scope.goAlterarTelefone = function () {

   $state.go('alterar-telefone',[],{location:"replace",reload:true});

 }

 $scope.goAlterarSenha = function () {

   $state.go('alterar-senha',[],{location:"replace",reload:true});

 }

 $scope.goBack = function () {
   $state.go('admin-edit',[],{location:"replace", reload:true});
 }
 // essas linhas aqui recuperam os dados que estão guardados na sessionStorage...
       $scope.loggedin_status = localStorage.getItem('loggedin_status');
       $scope.loggedin_status_local = localStorage.getItem('loggedin_status');
       $scope.loggedin_id = localStorage.getItem('loggedin_id');
       $scope.loggedin_senha = sessionStorage.getItem('loggedin_senha');

})

.controller('DashCtrl', function($scope, $http, $ionicPopup, $state, $ionicHistory, Empresa) {
 var urlApi1 = 'https://topentregas.com.br/ionic/showNovidades.php'; //online
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
   $chave = '';
// impede o double click


$scope.consultarEndereco = function (cep){
  // $ionicHistory.removeBackView();
   //$ionicHistory.removeBackView();

   $ionicHistory.nextViewOptions({
     historyRoot: true
 });

   $scope.goBackHandler = function () {
     $ionicHistory.goBack(-1);
   }

     $("#preloader").fadeIn();


      var urlApi = 'https://viacep.com.br/ws/' + cep + '/json/';


      $http.get(urlApi)
      .success(function (data){

          $scope.endereco = data;
          if ($scope.endereco.localidade == '' || $scope.endereco.localidade == null || $scope.endereco.localidade == undefined){
           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template:'Cep digitado incorretamente, endereço não foi encontrado!'
           });
           $state.reload();
          }
          if ($scope.endereco.bairro == '' || $scope.endereco.bairro == null || $scope.endereco.bairro == undefined){
           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template:'Infelizmente não atendemos neste endereço!'
           });
           $state.reload();
           $("#preloader").fadeOut();
           return;
          }
          if ($scope.endereco.logradouro == '' || $scope.endereco.logradouro == null || $scope.endereco.logradouro == undefined){
           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template:'Infelizmente não atendemos neste endereço!'
           });
           //$state.go('alterar-endereco',[],{location:"replace",reload:true});
           $state.reload();
           $("#preloader").fadeOut();
           return;
          }
          $("#preloader").fadeOut();
      })
      .error(function (data, status, headers, config) {
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Cep digitado incorretamente ou serviço indisponível. Corrija ou tente novamente mais tarde.'
       });

       $("#preloader").fadeOut();

      });
 }


 //edita o endereço apos cadastro
 $scope.editEndereco=function(){

   $scope.buttonDisabled = true;

   $scope.loggedin_id = localStorage.getItem('loggedin_id');

   var uf = $scope.endereco.uf;
   var cidade = $scope.endereco.localidade;
   var bairro = $scope.endereco.bairro;
   var rua = $scope.endereco.logradouro;
  // var numero = $scope.adminData.numero;
   var cep = $scope.cepDigitado;
   var complemento = $scope.complemento;
   var numero = $scope.numero;
   var idUser = $scope.loggedin_id;

   //var url="http://localhost/MyApp/ionic/";

   if( cep && numero && cidade && bairro && uf && rua ){
     str= urlApi2 + "endereco-edit.php?uf=" + uf + "&chave=" + $chave + "&cidade=" + cidade + "&bairro=" + bairro + "&rua=" + rua + "&cep=" + cep + "&complemento=" + complemento + "&numero=" + numero + "&idUser=" + idUser;

     $http.get(str)
     .success(function(response){

       if(response==true){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Sucesso!',
           template:'Endereço editado com sucesso'
         });
       //  $state.go('tab.carrinho',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Erro!',
           template:'Algo deu errado, tente mais tarde!'
         });
         $state.go('tab.main',[],{location:"replace",reload:true});

       }

     }).error(function(){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Algo deu errado!',
         template:'Não é possível fazer o contato do servidor.'
       });

     })

   //------------------------------------

   $scope.loggedin_id = localStorage.getItem('loggedin_id');
//idUser = $scope.loggedin_in;
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
 var idUser = $scope.loggedin_id;
str= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;

//pegando aqui o endereço do individuo

//fim endereco individuo

sessionStorage.setItem('cityc',$scope.endereco.localidade);
sessionStorage.setItem('ruac',$scope.endereco.logradouro);
sessionStorage.setItem('bairroc',$scope.endereco.bairro);
sessionStorage.setItem('numeroc',$scope.numero);
sessionStorage.setItem('ufc',$scope.endereco.uf);

var ruaC = sessionStorage.getItem('ruac');
var numeroC = sessionStorage.getItem('numeroc');
var bairroC = sessionStorage.getItem('bairroc');
var cidadeC = sessionStorage.getItem('cityc');
var ufC =  sessionStorage.getItem('ufc');
var paisC = 'Brasil';


var origin = Empresa.localizacao;
//var origin = ruaA + ', ' + numeroA +' - '+cidadeA+' - '+ufA+', '+paisA+''; //endereço da empresa
var destination = ruaC + ', ' + numeroC +' - '+bairroC+ '-' +cidadeC+' - '+ufC+', '+paisC+''; //endereço do cliente
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//var destination = 'R. Prudente de Moraes, 1467 - São José do Rio Preto - SP, Brasil'; //endereço do cliente
//VenuesAppServices.factory('VenueDistance', ['$resource',function($resource){
//return $resource('http://google.com/maps/api/distancematrix/json?origins='+ origin +'&destinations='+ destination, {}, { Distance: {method:'GET'}});}]);
//Key = AIzaSyBJEzfpDsJTA2hG3gyo7eUx6lQCGoW8c4w;
var googleMapsApiKey='AIzaSyCGU0PK5ks0K4jqqAZ6l2A6FKWUknklPkM';
//var urlAPIG = ('http://google.com/maps/api/distancematrix/json?origins='+ origin +'&destinations='+ destination +'&key=' + googleMapsApiKey);
//     strEnd= urlAPIG;
//       $http.get(strEnd)
//       .success(function(response){
//        $scope.showEndG=response.records;
//        console.log(showEndG);
//     })

      // var urlApiGP = 'https://topentregas.com.br/ionic/info.php?origins='+ origin +'&destinations='+ destination +'&key=' + googleMapsApiKey;
      $scope.loggedin_id = localStorage.getItem('loggedin_id');

      var urlApiGP = 'https://topentregas.com.br/ionic/' + Empresa.Tipo;

      str= urlApiGP + "info.php?idUser=" + $scope.loggedin_id + "&origin=" + origin + "&destination=" + destination + "&chave=" + $chave;

      $http.get(str)
      .success(function(response){

       if ( $scope.idtel == 1 ){
         return;
     }
        if(response==true){

         sessionStorage.getItem('menuPerfil');
 var last = sessionStorage.getItem('menuPerfil');

 if (last == 1) {
 $state.go('admin-edit',[],{location:"replace",reload:true});
}
   if (last == 2) {
     $state.go('tab.carrinho',[],{location:"replace",reload:true});
   }

   if (last == 3) {
     $state.go('tab.lista',[],{location:"replace",reload:true});
   }
       //  $state.go('tab.lista',[],{location:"replace",reload:true});

        }else{

          $ionicPopup.alert({cssClass: 'custom-class',
            title:'Informação',
            template: 'Endereço errado ou fora da area!'
           // template:'Não é possível gravar dados.'
          });
          $state.go('tab.main',[],{location:"replace",reload:true});

        }

      }).error(function(){

        $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template:'Endereço errado ou fora da area, Frete não calculado!'
        });
        $scope.buttonDisabled = false;

      })
     }else{

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Incompleto!',
         template:'Por favor, preencha todas as informações corretamente.'
       });
       $scope.buttonDisabled = false;


     }


         //  var urlApiGP = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&key=AIzaSyCGU0PK5ks0K4jqqAZ6l2A6FKWUknklPkM'
       //    console.log(urlApiGP);
       //    JSON.stringify(urlApiGP);
 };

// realiza cadastro do endereço
$scope.agoraNao=function(){
 $scope.buttonDisabled = true;
 $state.go('tab.lista',[],{location:"replace",reload:true});
}
 $scope.doCadastroEndereco=function(){
   $scope.buttonDisabled = true;
   //sessionStorage.setItem('loggedin_rua',rua);
   $scope.loggedin_id = localStorage.getItem('loggedin_id');

   var uf = $scope.endereco.uf;
   var cidade = $scope.endereco.localidade;
   //var cidade = $scope.localidade;
   var bairro = $scope.endereco.bairro;
   //var bairro = $scope.bairro;
 var rua = $scope.endereco.logradouro;
  // var rua = $scope.logradouro;
  // var numero = $scope.adminData.numero;
   var cep = $scope.cepDigitado;
   var complemento = $scope.complemento;
   var numero = $scope.numero;
   var id_usuarios = $scope.loggedin_id;
   var telefone = $scope.phoneNumber;


//INSERT DE DADOS
   if( cep && numero && telefone && cidade && bairro && uf && rua){
     //var url="http://localhost/MyApp/ionic/";
     str= urlApi2 + "CadastrarEndereco.php?cidade=" + cidade + "&uf=" + uf + "&telefone=" + telefone + "&complemento=" + complemento + "&numero=" + numero + "&bairro=" + bairro + "&rua=" + rua + "&cep=" + cep + "&id_usuarios=" + id_usuarios;

     $http.get(str)
     .success(function(response){

       if(response==5){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Necessário adicionar o DDD ao seu celular! (11 numeros).'
         });
          $scope.idtel = 1;
         $scope.buttonDisabled = false;
         return;


       }
       else{ $scope.idtel = 0;    }

       if(response==true){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Endereco Cadastrado Com Sucesso!'
         });
         $state.go('tab.lista',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não foi possivel cadastrar o endereço!'
         });
         $scope.buttonDisabled = false;

       }

     }).error(function(){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });
       $scope.buttonDisabled = false;
     })


   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   //idUser = $scope.loggedin_in;
   // ------------------------------------------------------------------------------------------------------------------------------------------------------------------

   // ------------------------------------------------------------------------------------------------------------------------------------------------------------------
     var idUser = $scope.loggedin_id;
   str= urlApi2 + "endereco-verifica.php?idUser=" + idUser;

   sessionStorage.setItem('cityc',$scope.endereco.localidade);
   sessionStorage.setItem('ruac',$scope.endereco.logradouro);
   sessionStorage.setItem('bairroc',$scope.endereco.bairro);
   sessionStorage.setItem('numeroc',$scope.numero);
   sessionStorage.setItem('ufc',$scope.endereco.uf);


   var ruaC = sessionStorage.getItem('ruac');
   var numeroC = sessionStorage.getItem('numeroc');
   var bairroC = sessionStorage.getItem('bairroc');
   var cidadeC = sessionStorage.getItem('cityc');
   var ufC =  sessionStorage.getItem('ufc');
   var paisC = 'Brasil';


   var origin = Empresa.localizacao;

   var destination = ruaC + ', ' + numeroC +' - '+bairroC+ ' - '+cidadeC+' - '+ufC+', '+paisC+''; //endereço do cliente

   var googleMapsApiKey='AIzaSyCGU0PK5ks0K4jqqAZ6l2A6FKWUknklPkM';

          $scope.loggedin_id = localStorage.getItem('loggedin_id');

          var urlApiGP = 'https://topentregas.com.br/ionic/' + Empresa.Tipo;

          str= urlApiGP + "info.php?idUser=" + $scope.loggedin_id + "&origin=" + origin + "&destination=" + destination + "&chave=" + $chave;

          $http.get(str)
          .success(function(response){

           if ( $scope.idtel == 1 ){
               return;
           }

            if(response==true){

             $state.go('tab.lista',[],{location:"replace",reload:true});

            }
         else{

              $ionicPopup.alert({cssClass: 'custom-class',
                title:'Informação',
                template: 'Endereço errado ou fora da area, Frete não calculado!'

              });
              $state.go('tab.main',[],{location:"replace",reload:true});

            }

          }).error(function(){

            $ionicPopup.alert({cssClass: 'custom-class',
              title:'Informação',
              template:'Endereço errado ou fora da area, Frete não calculado!'
            });
            $scope.buttonDisabled = false;

          })
         }else{

           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template:'Preencha todas as informações corretamente.'
           });
           $scope.buttonDisabled = false;

         }

 };
 $("#preloader").fadeOut();
})

.controller('AppCtrl',function($scope,$ionicPopup,$http,$state,$ionicHistory, $timeout, $ionicPlatform, Empresa){
 //var url="http://localhost/MyApp/ionic/";

 $scope.Construcao = function(){
   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template: 'Olá! Este recurso está em construção.'
    // template:'Não é possível gravar dados.'
   });
 }

 $scope.email = localStorage.getItem('nomeLogin');
 $scope.senha = localStorage.getItem('senhaLogin');

$chave = '';
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
   //Form do Login


   $scope.doLogin=function(){
     $scope.buttonDisabled = true;

     $("#preloader").fadeIn();

       $timeout(function() {
       //console.log("" + $scope.empresa);
       var empresa =  Empresa.numero;
       var senha=$scope.senha;
       //var nome=$scope.loginData.nome;
       var email=$scope.email;

   // if( $scope.empresa  != '2' ){
   //  $ionicPopup.alert({cssClass: 'custom-class',
   //  title:'Informação',
   //  template:'Usuario ou Senha não existe!'
   //});
   //   return;
   // }

     if(email && senha){

         str=urlApi2+"login.php?email="+email+"&senha="+senha+"&empresa="+empresa  ;
         $http.get(str)
           .success(function(response){

             if(response==5){
               $ionicPopup.alert({cssClass: 'custom-class',
                 title:'Informação',
                 template:'Usuario não cadastrado!'
               });
               $scope.buttonDisabled = false;
               return;
             }


             if(response==52){
               $ionicPopup.alert({cssClass: 'custom-class',
                 title:'Informação',
                 template:'Senha não existe!'
               });
               $scope.buttonDisabled = false;
               return;
             }

             if(response==2){
               $ionicPopup.alert({cssClass: 'custom-class',
                 title:'Informação',
                 template:'Email ou senha incorretos!'
               });
               $scope.buttonDisabled = false;
               return;
             }

             else{

             //essa pequena linha aqui embaixo é responsavel por me trazer os dados da api php
             //lembrar de atribuir um nome para ela, poor exemplo esta sendo usado "usuarios", mas poderia ser "admin"
             localStorage.setItem('nomeLogin', email);
             localStorage.setItem('senhaLogin', senha);

               $scope.users=response.records;
               sessionStorage.setItem('loggedin_status',true);
               sessionStorage.setItem('loggedin_id',$scope.users.id);
               sessionStorage.setItem('loggedin_email',$scope.users.email);
               sessionStorage.setItem('loggedin_senha',$scope.users.senha);
               sessionStorage.setItem('loggedin_status',$scope.users.nome);
               sessionStorage.setItem('loggedin_id_cat','');
               $scope.session = 3;
               sessionStorage.setItem('usuarioNiveisAcessoId',$scope.session);

               //local
               localStorage.setItem('loggedin_id',$scope.users.id);
               localStorage.setItem('loggedin_email',$scope.users.email);
               localStorage.setItem('loggedin_senha',$scope.users.senha);// posso pegar tanto pelo admin.senha(por que eu trago os dados por meio do $scope.admin=response.records)
               localStorage.setItem('loggedin_status',$scope.users.nome);// quanto pelo loginData.x por exemplo, que é como trago os dados da tela html respectiva do ionic
               localStorage.setItem('usuarioNiveisAcessoId',$scope.session);

               $ionicHistory.nextViewOptions({
                 disableAnimate:true,
                 disableBack:true
               })

               var idUser = localStorage.getItem('loggedin_id');
               str=urlApi2+"verificaEnd.php?idUser="+idUser;
               $http.get(str)
                 .success(function(response){
                     if(response==3){

                       $state.go('endereco',{},{location:"replace",reload:true});

                     }
                 })

               $ionicPopup.alert({cssClass: 'custom-class',
                 template:'Seja bem vindo!'
               })

               $state.go('tab.lista',{},{location:"replace",reload:true});}
           })
           .error(function(){
             $ionicPopup.alert({cssClass: 'custom-class',
               template:'Não foi possível fazer login. Por favor, verifique.'
             })
             $scope.buttonDisabled = false;
           });

     }else{
       $ionicPopup.alert({cssClass: 'custom-class',

         template:'Por favor, preencha todas as informações.'
       })
       $scope.buttonDisabled = false;

     }

   }, 1000);

// nova tentativa de realizar cadastro endereço ao logar
//TESTAR

$("#preloader").fadeOut();
   }

   $scope.VaiParaCadastro=function(){

     $state.go('tab.cadastrar',{},{location:"replace",reload:true});

   }
   //Fim form do login


   // Função de dar LogOut
   $scope.showSair = function() {
     var confirmPopup = $ionicPopup.confirm({
       cssClass: 'custom-class',
       title: 'Pergunta:',
       template: 'Tem certeza que deseja sair?'
     });

     confirmPopup.then(function(res) {
       if(res) {
         $scope.doLogout();
       } else {

       }
     });
   };

   $scope.doLogout=function(){

     sessionStorage.removeItem('loggedin_status');
     localStorage.removeItem('loggedin_status');
     localStorage.removeItem('loggedin_senha');
     localStorage.removeItem('loggedin_id');
     localStorage.removeItem('loggedin_email');
     sessionStorage.removeItem('Frete');
     sessionStorage.removeItem('cityc');
     sessionStorage.removeItem('bairroc');
     sessionStorage.removeItem('Verifica');
     sessionStorage.removeItem('usuarioNiveisAcessoId');
     sessionStorage.removeItem('numeroc');
     sessionStorage.removeItem('ruac');
     sessionStorage.removeItem('ufc');
     sessionStorage.removeItem('loggedin_id');
     sessionStorage.removeItem('loggedin_status');
     sessionStorage.removeItem('loggedin_email');
     sessionStorage.removeItem('loggedin_senha');
     sessionStorage.removeItem('loggedin_id_cat');
     sessionStorage.removeItem('loggedin_id_novidade');
     sessionStorage.removeItem('loggedin_nome_novidade');
     sessionStorage.removeItem('loggedin_desc_novidade');
     sessionStorage.removeItem('loggedin_imagens_novidade');
     sessionStorage.removeItem('loggedin_id_produto');
     sessionStorage.removeItem('loggedin_nome_produto');
     sessionStorage.removeItem('loggedin_desc_produto');
     sessionStorage.removeItem('loggedin_valor_produto');
     sessionStorage.removeItem('loggedin_promo_valor_produto');
     sessionStorage.removeItem('loggedin_imagens_produto');

     $ionicHistory.nextViewOptions({
       disableAnimate:true,
       disableBack:true
     })

     $ionicPopup.alert({cssClass: 'custom-class',

       template:'Até mais!'
     })

     $state.go('tab.login',{},{location:"replace",reload:true});

   };
   $("#preloader").fadeOut();
})

.controller('AdminCtrl',function($scope, $http, $state,$ionicPopup, $ionicHistory, Empresa){
 //var url="http://localhost/MyApp/ionic/";
$chave = '';
 var urlApi1 = 'https://topentregas.com.br/ionic/showNovidades.php'; //online
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online

   $("#preloader").fadeIn();

   $ionicHistory.nextViewOptions({
     historyRoot: true
 });

   $scope.goBackHandler = function () {
     $ionicHistory.goBack(-1);
   }

 $scope.loggedin_id = localStorage.getItem('loggedin_id');

 var id_usuarios = $scope.loggedin_id;
 str= urlApi2 + "endereco-show.php?id_usuarios=" + id_usuarios + "&chave=" + $chave;

 $http.get(str).success(function(response){

   $scope.showEndereco=response.records;
   $("#preloader").fadeOut();
 })

  $scope.adminData={};
  $scope.loggedin_id = localStorage.getItem('loggedin_id');
   $scope.adminData.id = $scope.loggedin_id;

   $scope.hideon =function() {
     return function(scope, element, attrs) {
         scope.$watch(attrs.hideon, function(value, oldValue) {
             if(value) {
                 element.hide();
             } else {
                 element.hide();
             }
         }, true);
     }
 };

 $scope.createAdmin=function(){

   $scope.buttonDisabled = true;

     email = '';
     senha = 0;

   var nome = $scope.adminData.nome;
  // var usuario = $scope.adminData.usuario;
   var email = $scope.adminData.email;
   var senha = $scope.adminData.senha;
   var empresa = Empresa.numero;
   var senhaConfirm = $scope.adminData.confirmSenha;

//INSERT DE DADOS // preciso fazer o verificaUser para nao ter email duplicados mais tarde
//str= url + "verificaUser.php?email=" + email;
sessionStorage.setItem('loggedin_email',email);
sessionStorage.setItem('loggedin_senha',senha);

   if( nome && senha && email){
     if( senha == senhaConfirm){           //+ "&usuario=" + usuario
     str= urlApi2 + "admin-insert.php?nome=" + nome + "&senha=" + senha + "&email=" + email + "&empresa=" + empresa;

     $http.get(str)
     .success(function(response){

       if(response==true){

         $ionicPopup.alert({cssClass: 'custom-class',

           template:'Cadastrado com sucesso, por favor realize seu login.'
         });
         localStorage.setItem('nomeLogin', email);
         localStorage.setItem('senhaLogin', senha);
         $state.go('tab.login',[],{location:"replace",reload:true});

       }
       if(response==3){

         $ionicPopup.alert({cssClass: 'custom-class',

           template:'Email ja existente.'
         });
         $scope.buttonDisabled = false;
         $scope.adminData.usuario = '';

       }
       if(response==2){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Email já existente.'
         });
         $scope.buttonDisabled = false;
         $scope.adminData.email = '';

       }
       if(response==32){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Email ja existente..'
         });
         $scope.buttonDisabled = false;
         $scope.adminData.usuario = '';
         $scope.adminData.email = '';

       }
       if(response==false){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Servidor Offline, por favor tente mais tarde.'
         });
         $scope.buttonDisabled = false;
         $state.go('tab.cadastrar',[],{location:"replace",reload:true});

       }


     }).error(function(){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Servidor Offline, por favor tente mais tarde.'
       });
       $scope.buttonDisabled = false;

     })
   }else {
     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template:'Senhas incorretas.'
     });
     $scope.buttonDisabled = false;
   }
   }else{

     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template:'Por favor, preencha todas as informações corretamente.'
     });
     $scope.buttonDisabled = false;

   }
 };

 //$http.get(urlApi2+"admin-show.php").success(function(response){
 //  $scope.showAdmins=response.records;
// });
//editei aqui

 //$http.get(url+"admin-showedit.php?id="+$stateParams.users) // talvez esse stateParams.adminID me traga o id
 //.success(function(response){
 //  $scope.users=response.records;
 //})
//EDIT DE TELEFONE
$scope.editAdminCelular=function(){
 var id = $scope.adminData.id;
 var telefone = $scope.adminData.telefone;
 $scope.buttonDisabled = true;

 if( id && telefone){
   str= urlApi2 + "admin-edit-celular.php?telefone=" + telefone + "&id=" + id;

   $http.get(str)
   .success(function(response){
     if(response==5){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Necessário adicionar o DDD ao seu celular! (11 numeros).'
       });
        $scope.idtel = 1;
       $scope.buttonDisabled = false;
       return;

     }else{ $scope.idtel = 0;  }

     if(response==true){
       $scope.buttonDisabled = false;
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Sucesso!',
         template:'Nº de celular editado com sucesso'
       });
       $state.go('admin-edit',[],{location:"replace",reload:true});

     }else{
       $scope.buttonDisabled = false;
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Erro!',
         template:'Algo deu errado, tente mais tarde!'
       });
       $state.go('admin-edit',[],{location:"replace",reload:true});

     }

   }).error(function(){
     $scope.buttonDisabled = false;
     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Algo deu errado!',
       template:'Não é possível fazer o contato do servidor.'
     });

   })

 }else{
   $scope.buttonDisabled = false;
   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Incompleto!',
     template:'Por favor, preencha todas as informações.'
   });

 }

};
// EDIT DE DADOS
 $scope.editAdmin=function(){
   var id = $scope.adminData.id;
   var nome = $scope.adminData.nome;
   $scope.buttonDisabled = true;

   if( id && nome){
     str= urlApi2 + "admin-edit.php?nome=" + nome + "&id=" + id;

     $http.get(str)
     .success(function(response){

       if(response==true){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Sucesso!',
           template:'Editado com sucesso'
         });
         localStorage.setItem('loggedin_status',nome);
         $state.go('admin-edit',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Erro!',
           template:'Algo deu errado, tente mais tarde!'
         });
         $state.go('admin-edit',[],{location:"replace",reload:true});

       }

     }).error(function(){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Algo deu errado!',
         template:'Não é possível fazer o contato do servidor.'
       });

     })

   }else{

     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Incompleto!',
       template:'Por favor, preencha todas as informações.'
     });

   }
   $scope.buttonDisabled = false;
 };

 // EDIT DE desenha
 $scope.editAdminSenha=function(){
   $scope.buttonDisabled = true;
   var id = $scope.adminData.id;
   var senha = $scope.adminData.senha;
   var senhaconf = $scope.adminData.novasenha;

   if( id && senha){
     if( senhaconf == senha){

     str= urlApi2 + "alterar-senha.php?senha=" + "&senha=" + senha + "&id=" + id;

     $http.get(str)
     .success(function(response){

       if(response==true){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Sucesso!',
           template:'Editado com sucesso'
         });
         sessionStorage.setItem('loggedin_senha',senha);
         $state.go('tab.main',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Erro!',
           template:'Algo deu errado, tente mais tarde!'
         });
         $state.go('alterar-senha',[],{location:"replace",reload:true});

       }

     }).error(function(){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Algo deu errado!',
         template:'Não é possível fazer o contato do servidor.'
       });

     })
   }else {      $ionicPopup.alert({cssClass: 'custom-class',
     title:'Incompleto!',
     template:'Senhas diferentes.'
   });}
   }else{

     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Incompleto!',
       template:'Por favor, preencha todas as informações corretamente.'
     });

   }

 };
 $scope.buttonDisabled = false;
 $("#preloader").fadeOut();
})

.controller('menuCar', function($scope, $http, Empresa){
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
 $scope.loggedin_id = localStorage.getItem('loggedin_id');
 var idUser = $scope.loggedin_id;

   str2= urlApi2 + "show-cart.php?idUser=" + idUser;
 $http.get(str2).success(function(response){
   $scope.showCart=response.records;
   if($scope.showCart==false){
     $scope.$evalAsync(function() {
   $scope.getClass = 'icon ion-ios-cart-outline';
 });
 }
 else{
   $scope.$evalAsync(function() {
     $scope.getClass = 'icon ion-ios-cart';
     $scope.getClass23 = 'animation';
   });

  // $scope.getClass = function(){
 //    $scope.t = 'icon ion-ios-cart';
  //   return $scope.t;
 //}
// $scope.getClass23 = function(){
 //  $scope.t = 'animation';
  // return $scope.t;
//}
}});
})
.controller('CuponsCtrl',function($scope, $http, $state,$ionicPopup, Empresa, $ionicModal){
  $("#preloader").fadeIn();
  $chave = '';
  var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
  $scope.nomeEmpresaFacil = Empresa.nome;
$scope.AtivarRetirada = Empresa.AtivarRetirada;
idEmpresa = Empresa.numero;
$scope.meuDesconto = 0;
str= urlApi2 + "CUPOM/showCupom.php?idEmpresa=" + idEmpresa + "&chave=" + $chave;
$http.get(str).success(function(response){

      $scope.ShowCupom=response.records;
      var total = 0;

      $scope.data = $scope.ShowCupom[0];

      console.log("eita:" + $scope.data);

      $scope.CupomValor = function(){
        for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {
          total = ($scope.ShowCupom[i].valor);
        }
        return total;
        }

      $scope.nomeCupom = function(){
        for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {
          total = ($scope.ShowCupom[i].nomeCupom);
        }
        return total;
        }

      $scope.qtdCupom = function(){
        for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {
          total = ($scope.ShowCupom[i].qtdCupom);
        }
        return total;
        }

      $("#preloader").fadeOut();

      console.log("deu certo: " + $scope.nomeCupom());
      console.log("deu certo: " + $scope.CupomValor());

      }).error(function(response) {
        $("#preloader").fadeOut(); console.log("deu erro");
      })

})

.controller('CategoriaCtrl',function($scope, $http, $state,$ionicPopup, Empresa, $ionicModal){
$chave = '';
  // var url="http://localhost/MyApp/ionic/";

  $ionicModal.fromTemplateUrl('my-modalHorario.html', {
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
 }).then(function(modal) {
    $scope.modalHorario = modal;
 });

 $scope.openmodalHorario = function() {

   $scope.modalHorario.show();
};

 $scope.closemodalHorario = function() {
  $scope.modalHorario.hide();
};
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modalHorario.remove();
 });

 // Execute action on hide modal
 $scope.$on('modalHorario.hidden', function() {
    // Execute action
 });

 // Execute action on remove modal
 $scope.$on('modalHorario.removed', function() {
    // Execute action
 });
//fim modal adicional

  var urlApi1 = 'https://topentregas.com.br/ionic/showNovidades.php'; //online
  var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
//inicia aqui
$scope.adquirir = function(){

       $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template: '<b> Olá! Horários ainda serão configurados.  </b>'
         // template:'Não é possível gravar dados.'
        });

};

  if ( localStorage.getItem('loggedin_id') == '' || localStorage.getItem('loggedin_id') == null || localStorage.getItem('loggedin_id') == undefined ) { }
  else {
   var token = sessionStorage.getItem('token');
   var meuID = localStorage.getItem('loggedin_id');
  if (token == 'null' || token == null) { }
  else {
   str2= urlApi2 + "token.php?meuID=" + meuID + "&token=" + token;

   $http.get(str2).success(function(response){
    // $ionicPopup.alert({cssClass: 'custom-class',
   //  title:'Informação',
   //  template:'Token Registrado.' + token + meuID
  // });
 }).error(function(){

 //  $ionicPopup.alert({cssClass: 'custom-class',
 //    title:'Informação',
 //    template:'Token não registrado.'
  // });

 });
}
  }
  //termina aqui
   $("#preloader").fadeIn();
   sessionStorage.setItem("aoCarrinho", 3);
   sessionStorage.removeItem('Custom');
   sessionStorage.removeItem('moneyCustom');
  $scope.loggedin_id = localStorage.getItem('loggedin_id');

var idUser = localStorage.getItem('loggedin_id');

str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;

$http.get(str2).success(function(response){

 $scope.showCart=response.records;

   if ($scope.showCart.length == 0) {
       var ti = '1'; sessionStorage.setItem('re',1);
       }else { sessionStorage.setItem('re',0); }

      });
 $scope.ter = sessionStorage.getItem('ter');

 var idEmpresa = Empresa.numero;
 //aqui eu faço o icone mudar (carrinho)
         str= urlApi2 + "verificaHora.php?idEmpresa=" + idEmpresa;

       $http.get(str)
       .success(function(response){
          $("#preloader").fadeOut();
         if(response==true){
        sessionStorage.setItem('Verifica',1);
         }
         else{
          sessionStorage.setItem('Verifica',0); // alterar aqui para 0, para voltar ao normal em questão de horário.
         }
       });
       sessionStorage.getItem('Verifica');

       $scope.mostraHor = function() {
           Atual = sessionStorage.getItem('Verifica');
           if(Atual == '0'){
            // return "<b class='red'>Fechado!</b> <b class='redXado'></b>";
            return "Fechado!"
           }
            if(Atual == '1'){
            // return "<b class='green'>Aberto!</b>"; // alterar aqui com o horário novamente(igual no fexados)  <b class='greenBerto'>12:00 - 18:00</b>
            return "Aberto!"
           }
       }

 $scope.Ircarrinho = function(){

   $state.go('tab.carrinho',{},{location:"replace",reload:false});
 };
 $scope.loggedin_id = localStorage.getItem('loggedin_id');
 var idUser = $scope.loggedin_id;

   str2= urlApi2 + "show-cart.php?idUser=" + idUser;
 $http.get(str2).success(function(response){
   $scope.showCart=response.records;
   if($scope.showCart==false){
 $scope.getClass = function(){
     $scope.t = 'icon ion-ios-cart-outline';
     return $scope.t;
 }}
 else{
   $scope.getClass = function(){
     $scope.t = 'icon ion-ios-cart';
     return $scope.t;
 }
 $scope.getClass23 = function(){
   $scope.t = 'animation';
   return $scope.t;
}
}});
// fim mudar icone

 $scope.CategoriaData={};
 var idEmpresa= Empresa.numero;
 $http.get(urlApi2+"news-show.php?idEmpresa=" + idEmpresa).success(function(response){
   $scope.showCategorias=response.records;

   $scope.predicate = 'codigo';
//fez funcionar milagrosamente, amém.
   angular.forEach($scope.showCategorias, function (categoria) {
     categoria.codigo = parseFloat(categoria.codigo);
    });

 });

 $scope.pegarID=function(id, semOBS){
   sessionStorage.setItem('loggedin_id_cat',id);

   sessionStorage.setItem('semOBS', semOBS);
   $state.go('produtos',{},{location:"replace",reload:true});
   }

//FUNÇÃO DE ACHAR PRODUTO / CATEGORIA

   //essa pequena linha aqui embaixo é responsavel por me trazer os dados da api php
   //lembrar de atribuir um nome para ela, poor exemplo esta sendo usado "usuarios", mas poderia ser "admin"

//FUNÇÃO DELETAR CATEGORIA

 $scope.delCategoria=function(id){

   if(id){
     str= urlApi2 + "categoria-del.php?id=" + id;
     $http.get(str)
     .success(function(response){

       if(response==true){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Categoria excluida.'
         });
         $state.go('tab.lista',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não é possível excluir dados.'
         });
         // era admin-admin
         $state.go('tab.lista-lista',[],{location:"replace",reload:true});

       }

     }).error(function(){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });

     })

   }else{

     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template:'Não pode excluir.'
     });
   }
 };
 $("#preloader").fadeOut();
})

.controller('NovidadeCtrl',function($scope, $http, $state, Empresa){

   $("#preloader").fadeIn();
$scope.nomeEmpresaFacilUp = Empresa.nomeUP;
$scope.nomeEmpresaFacildown = Empresa.nomeDown;

 //var url="http://localhost/MyApp/ionic/"; //local
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
    $chave = '';

 //var url="https://topentregas.com.br/ionic/"
 $scope.CategoriaData={};
//CHAMADA HTTP MOSTRAR NOVIDADES
var idEmpresa= Empresa.numero;                                                        //
 $http.get(urlApi2 + "showNovidades.php?chave=" + $chave +"&idEmpresa="+ idEmpresa).success(function(response){
   $scope.showNovidades=response.records;
   $("#preloader").fadeOut();
 })

 //CHMADA HTTP

 //MOSTRAR DESCRICAO BY ID
 $scope.showDesc=function(id){

    // str= urlApi2 + "showNovidades.php?idEmpresa=" + idEmpresa + "&chave=" + $chave;
    // $http.get(str)
    // .success(function(response){

    //   if(response==true){

         $state.go('descricao-novidade',[],{location:"replace",reload:true});

     //  }else{

       //  $ionicPopup.alert({cssClass: 'custom-class',
       //    title:'Informação',
       //    template:'Algo deu errado.'
       //  });
         // era admin-admin
        // $state.go('descricao-novidade',[],{location:"replace",reload:true});
}
// estava mexendo aqui pra colocar as informações (id,descricao,nome etc) salvas em storage e tentar chamalas na proxima pagina ^~
$scope.pegarID=function(nome, id, descricao, imagens){
 sessionStorage.setItem('loggedin_nome_novidade',nome);
 sessionStorage.setItem('loggedin_id_novidade',id);
 sessionStorage.setItem('loggedin_desc_novidade',descricao);
 sessionStorage.setItem('loggedin_imagens_novidade',imagens);
 $state.go('descricao-novidade',{},{location:"replace",reload:true});
 }
 $scope.loggedin_nome_novidade = sessionStorage.getItem('loggedin_nome_novidade');
 $scope.loggedin_id_novidade = sessionStorage.getItem('loggedin_id_novidade');
 $scope.loggedin_desc_novidade = sessionStorage.getItem('loggedin_desc_novidade');
 $scope.loggedin_imagens_novidade = sessionStorage.getItem('loggedin_imagens_novidade');
 $("#preloader").fadeOut();
})

.controller('StatusCtrl',function($ionicPlatform, $scope, $http, $state, $ionicPopup, Empresa){
 //var url="http://localhost/MyApp/ionic/";

 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
$chave = '';

chave = '';
$scope.RuaEnderecoM = Empresa.RuaEndereco;
$scope.BairroEnderecoM = Empresa.BairroEndereco;
$scope.CidadeEnderecoM = Empresa.CidadeEndereco;
$scope.PaisEnderecoM = Empresa.PaisEndereco;
$ionicPlatform.ready(function () {
 $("#preloader").fadeIn();
 $("#preloader").fadeOut();
});

 //  var idUser = localStorage.getItem('loggedin_id');
 // str10= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;
 // $http.get(str10).success(function(response){
  //  $scope.showEnd=response.records;
 // })

 idEmpresa = Empresa.numero;

 str66= urlApi2 + "enterprise.php?idEmpresa=" + idEmpresa  + "&chave=" + chave;

 $http.get(str66).success(function(response){

   $scope.showEnterprise=response.records;

 })

   $scope.Construcao = function(){
     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template: 'Olá! Este recurso está em construçao.'
      // template:'Não é possível gravar dados.'
     });
   }

 $scope.formatDate = function(date){
  // var dateOut = new Date(date);
//var dateOut = new Date(date).toISOString();
//var d = new Date(date.replace(' ', 'T'));
 //  return d;
   var d = new Date(date.replace(' ', 'T'));
   return d;
 //  var arr = date.split(/[-:]/);
//   d = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
//   var actiondate = new Date(d);
//   return actiondate;
 // var dateOut = new Date(date).toISOString();
  //return dateOut;
};
 $scope.loggedin_id = localStorage.getItem('loggedin_id');
 $scope.loggedin_status = localStorage.getItem('loggedin_status');
var idUser = $scope.loggedin_id;
 str= urlApi2 + "show-status.php?idUser=" + idUser + "&chave=" + $chave;
$http.get(str).success(function(response){
 $scope.showStatus=response.records;
 $("#preloader").fadeOut();
})
 $scope.att = function(){
   if($scope.showStatus != ""){
   $state.go('tab.status',[],{location:"replace",reload:true});
   }
   else {
         $ionicPopup.alert({cssClass: 'custom-class',
            title:'Informação',
            template: 'Olá! ainda não tem nenhum pedido para atualizar.'
           // template:'Não é possível gravar dados.'
          });
   }
 };
 $("#preloader").fadeOut();
})
.controller('SobreNosCtrl', function($scope, $ionicHistory, Empresa){
 $scope.goBackHandler = function () {
   $ionicHistory.goBack(-1);
 }
})

.controller('salvaCustom', function($scope, Empresa){
 $scope.money = '';
 $scope.Custom = '';

 $scope.salvaCustom = function () {
   sessionStorage.setItem('moneyCustom', '');
 sessionStorage.setItem('Custom', $scope.Custom);
 sessionStorage.getItem('Custom');
 $scope.money = '';
 $scope.SalvaCustom =  sessionStorage.getItem('Custom');
 }
 $scope.salvaCustomValor = function () {
 sessionStorage.setItem('moneyCustom', $scope.money);
 sessionStorage.getItem('moneyCustom');
 $scope.moneyCustom = 0;
 $scope.moneyCustom =  sessionStorage.getItem('moneyCustom');
 }
})

.controller('validador', function($scope, Empresa){
$scope.Custom = '';
$scope.money =  '';
})

.controller('paypal', function($scope, $http, $state, $ionicPopup, $ionicModal, $q, Empresa) {

  $chave = '';
  var urlApi1 = 'https://topentregas.com.br/ionic/showNovidades.php?chave=' + $chave; //online
  var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
 $scope.nomeEmpresaFacil = Empresa.nome;
 $scope.AtivarRetirada = Empresa.AtivarRetirada;
 idEmpresa = Empresa.numero;
 $scope.meuDesconto = 0;


})
.controller('CarrinhoCtrl', function($scope, $http, $state, $ionicPopup, $ionicModal, $q, Empresa, $timeout){

 $chave = '';
 var urlApi1 = 'https://topentregas.com.br/ionic/showNovidades.php?chave=' + $chave; //online
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
$scope.nomeEmpresaFacil = Empresa.nome;
$scope.AtivarRetirada = Empresa.AtivarRetirada;
idEmpresa = Empresa.numero;
$scope.meuDesconto = 0;

$scope.myButtonClose = function() {
       $scope.closeModalPagamento();
       $scope.closeModalCarrinho();
}

$scope.renderButton = function() {



paypal.Button.render({

  // Configure environment
  env: 'sandbox',
  client: {
    sandbox: 'ATCq5LhuaqMd0tv7yxwi9nculmrAu39IyocOI6Ripiv9JpKdTw65AJ6R6bH-SOp9cQw2pE_YdyjkKpmi',
    production: 'AYkA7-4D7Y4uuy3ViHy_ni71HtGtf9OFtsLLm2tvKiOCBQze2gDEuoWTQy32NjgWYttzPkyDoytW8Yja'
  },
  // Customize button (optional)
  locale: 'pt_BR',
  style: {
    size: 'responsive',
    color: 'gold',
    shape: 'pill',
    tagline: 'false',
  },

  // Enable Pay Now checkout flow (optional)
  commit: true,

  // Set up a payment
  payment: function(data, actions) {
    console.log("Total:" + $scope.getTotal());

    console.log("Desconto:" + $scope.meuDesconto);

    ValorFinal = 0;

    ValorFinal = $scope.getTotal() - $scope.meuDesconto;

    console.log("final:" + ValorFinal);

    return actions.payment.create({

      transactions: [{

        amount: {

       //   total: '' + $scope.getTotal() - $scope.meuDesconto,
           total: ValorFinal,
          currency: 'BRL',
        }

      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }

    });

  },

  onClick: function(){
    $scope.ModalPagamento.hide()
    $scope.ModalCarrinho.hide()
  },

   onCancel: function() {
    $scope.ModalPagamento.show()
    $scope.ModalCarrinho.show()
   },

  // Execute the payment
  onAuthorize: function(data, actions) {
    return actions.payment.execute().then(function() {
      // Show a confirmation message to the buyer

     // $scope.closeModalPagamento();
     // $scope.closeModalCarrinho();

  var cidadeCliente = $scope.getCidade();
  var bairroCliente = $scope.getBairro();
  var cepCliente = $scope.getCep();
  var ruaCliente = $scope.getRua();
  var numeroCasaCliente = $scope.getNumero();
  var telefoneCliente = $scope.getTelefoneCliente();
  var complemento = $scope.getComplementoCliente();

//alert(parsedJson.rua);
//var parsedJson=JSON.parse(data);
//alert(parsedJson.project_id);

var valor = $scope.getTotal();
var nomeProduto = $scope.getNomeProduto();
var descricao = $scope.showCart.descricao;
var nomeAd = $scope.getnomeAd();
var valorAd = $scope.getvalorAd();
var nomeCd = sessionStorage.getItem('nomeCd');
var valorCd = sessionStorage.getItem('valorCd');
$scope.loggedin_status = localStorage.getItem('loggedin_status');
var nomeCliente = $scope.loggedin_status;
var observacao = $scope.showStatus.observacao;
var troco = 0;
var troco = sessionStorage.getItem('moneyCustom');
//var formaPagamento = $scope.Custom;
var formaPagamento = sessionStorage.getItem('Custom');
var frete = $scope.getFrete();
var idEmpresa= Empresa.numero;
var status = "Aguardando";

     //continuar daqui
      // $cidadeCliente = $_GET["cidadeCliente"]; pegar de outra tabela
       //$bairroCliente = $_GET["bairroCliente"];pegar de outra tabela
       //$ruaCliente = $_GET["ruaCliente"];pegar de outra tabela
      // $numeroCasaCliente = $_GET["numeroCasaCliente"];pegar de outra tabela
      // $telefoneCliente = $_GET["telefoneCliente"];pegar de outra tabela

  str= urlApi2 + "status_insert_cep.php?valor=" + valor + "&frete=" + frete + "&cepCliente=" + cepCliente + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&id_entrega=" + 0 + "&telefoneCliente=" + telefoneCliente + "&complemento=" + complemento + "&idEmpresa=" + idEmpresa + "&formaPagamento=" + formaPagamento + "&troco=" + troco + "&descricao=" + descricao + "&numeroCasaCliente=" + numeroCasaCliente + "&ruaCliente=" + ruaCliente + "&bairroCliente=" + bairroCliente + "&cidadeCliente=" + cidadeCliente + "&idUser=" + idUser + "&nomeProduto=" + nomeProduto + "&status=" + status + "&nomeCliente=" + nomeCliente + "&observacao=" + observacao + "&chave=" + $chave;

       $http.get(str)
       .success(function(response){

         if(response==true){

           var appe  = localStorage.getItem('loggedin_status');
           var frete = sessionStorage.getItem('Frete');

               for (var i = 0; i < $scope.showCart.length; i++) {
                 var ids='';
                 var idUser=0;
                 var ids= $scope.showCart[i].nomeProduto;
                 var nomeCliente= appe;
                 var idUser= $scope.showCart[i].idUser;

                  var nomeAd = $scope.showCart[i].nomeAd;
                  var valorAd = $scope.showCart[i].valorAd;
                  var nomeCd = $scope.showCart[i].nomeCd;
                  var valorCd = $scope.showCart[i].valorCd;

                 var idProduto= $scope.showCart[i].idProduto;
                 var valor= $scope.showCart[i].valor;
                 var promo_valor= $scope.showCart[i].promo_valor;
                 var quantidade= $scope.showCart[i].quantidade;
                 var categoria= $scope.showCart[i].categoria_id;
                 var entrega = 0;
                 var empresa = Empresa.numero;
                 var freteT= frete;

                 str= urlApi2 + "insert_fiscal_com_complementos.php?nomeProduto=" + ids  + "&empresa=" + empresa + "&entrega=" + entrega + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&frete=" + freteT + "&idProduto=" + idProduto + "&nomeCliente=" + nomeCliente + "&idUser=" + idUser + "&valor=" + valor + "&promo_valor=" + promo_valor + "&idProduto=" + idProduto + "&idProduto=" + idProduto + "&quantidade=" + quantidade;

                 $http.get(str)
                 .success(function(){
                    $ionicPopup.alert({cssClass: 'custom-class',
                    title:'Informação',
                    template: 'Muito obrigado pela sua compra!'
                    });
                 }).error(function(){
                 })

      $scope.delCarrinhoAcc();

      $state.go('tab.status',[],{location:"replace",reload:true});
               }
              }})

     $state.go('tab.status',[],{location:"replace",reload:true});
     // window.alert('Thank you for your purchase!');
    });
  }



}, '#paypal-button-container');

}

str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;

$http.get(str2).success(function(response){

 $scope.showCart=response.records;

 $scope.getTotalval5 = function()
 {
   var novoValor = 0;
   var total = 0;

   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
        var novoValor = 0;
        var valorAd = + $scope.showCart[i].valorAd;
        var valorCd = + $scope.showCart[i].valorCd;
        novoValor += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor );
        novoValor = novoValor + valorAd + valorCd;
        total += parseFloat(novoValor * $scope.showCart[i].quantidade );
 }

 return total;

 }

str= urlApi2 + "CUPOM/showCupom.php?idEmpresa=" + idEmpresa + "&chave=" + $chave;
$http.get(str).success(function(response){

    $scope.ShowCupom=response.records;

    var total = 0;
    var meuvetor1 = [];

  //  $scope.CupomValor = function(){for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {total = ($scope.ShowCupom[i].valor);  } return total; }
  //  $scope.nomeCupom = function(){for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {total = ($scope.ShowCupom[i].nomeCupom); } return total; }
  //  $scope.qtdCupom = function(){ for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {total = ($scope.ShowCupom[i].qtdCupom);} return total; }
   // $scope.pedidoMinimo = function(){for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {total = ($scope.ShowCupom[i].pedidoMinimo); } return total; }
  //  console.log("Valor do Cupom: " + $scope.ShowCupom[0].valor);
  //  console.log("Pedido minimo do cupom: " + $scope.ShowCupom[0].pedidoMinimo);
  //  console.log("Quantidade de Cupons: " +  $scope.ShowCupom[0].qtdCupom);
  //  console.log("Nome do cupom: " +  $scope.ShowCupom[0].nomeCupom);

$scope.cupom = function(txtCupom) {
//providencia de erros futuros
//fim providencia de erros futuros
loop:
for (var i = $scope.ShowCupom.length - 1; i >= 0; i--) {
 console.log("ler:" + $scope.ShowCupom[i].nomeCupom);
  if (txtCupom == $scope.ShowCupom[i].nomeCupom) {
    var myVariable = i;
    console.log("myVariable: " + myVariable);
    break loop;
  } else {
    myVariable = undefined;
  }
}
if( myVariable == undefined) {
  $ionicPopup.alert({cssClass: 'custom-class',
  title:'Informação',
  template: 'Cupom inválido !'
  });
  return;
}
console.log("myVariable: " + myVariable);
  if (txtCupom == $scope.ShowCupom[myVariable].nomeCupom) {
    if( $scope.ShowCupom[myVariable].qtdCupom == 0) {
  $ionicPopup.alert({cssClass: 'custom-class',
  title:'Informação',
  template: 'Este cupom já acabou :( !'
  });

    }else {
        if ( $scope.meuDesconto == 0) {
          if ( $scope.getTotalval5() >= $scope.ShowCupom[myVariable].pedidoMinimo ) {
          $scope.meuDesconto = $scope.meuDesconto + $scope.ShowCupom[myVariable].valor;
          $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template: 'Desconto aplicado com sucesso !'
          });
          sessionStorage.setItem("meuDesconto", $scope.ShowCupom[myVariable].valor);
         // window.location.reload(true);
        }
        else {
          $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template: 'Para utilizar este cupom, o valor do seu pedido deve ser maior ou igual a: R$'+ $scope.ShowCupom[myVariable].pedidoMinimo + ' (Frete não contabiliza.)'
          });
        }
      }
      else{
        if ( $scope.getTotalval5() >= $scope.ShowCupom[myVariable].pedidoMinimo ) {
          $scope.meuDesconto = 0;
          $scope.meuDesconto = $scope.meuDesconto + $scope.ShowCupom[myVariable].valor;
          $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template: 'Desconto aplicado com sucesso !'
          });
          sessionStorage.setItem("meuDesconto", $scope.ShowCupom[myVariable].valor);
        }
        else {
          $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template: 'Para utilizar este cupom, o valor do seu pedido deve ser maior ou igual a: R$'+ $scope.ShowCupom[myVariable].pedidoMinimo + ' (Frete não contabiliza.)'
          });
        }
}}}else{
    $ionicPopup.alert({cssClass: 'custom-class',
    title:'Informação',
    template: 'Código incorreto ou inexistente !'
  }); }
 }
})
}).error(function(response) { console.log("deu erro"); })
   $("#preloader").fadeIn();
   sessionStorage.setItem('menuPerfil', 2);
     var idEmpresa = Empresa.numero;
    //teste horario open
         str= urlApi2 + "verificaHora.php?idEmpresa=" + idEmpresa;
       $http.get(str)
       .success(function(response){$("#preloader").fadeOut();
         if(response==true){sessionStorage.setItem('Verifica',1);}
         else {sessionStorage.setItem('Verifica',0);}})
       sessionStorage.getItem('Verifica');
   // fim do meu teste
   //var origin = 'R. Prudente de Moraes, 1465 - Parque Industrial, São José do Rio Preto - SP, 15025-045, Brasil';
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   //idUser = $scope.loggedin_in;
     var idUser = $scope.loggedin_id;
   str= urlApi2 + "admin-show.php?idUser=" + idUser + "&chave=" + $chave;
   //pegando aqui o endereço do individuo
    $http.get(str).success(function(response){
      $scope.showUsers=response.records;
     })
   // inicio pegar valor frete
$scope.loggedin_id = localStorage.getItem('loggedin_id');
//idUser = $scope.loggedin_in;
// ---------------------------
var idUser = $scope.loggedin_id;
str10= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;
  $http.get(str10).success(function(response){
    $scope.showEnd=response.records;
//pegando aqui o endereço do individuo
     $scope.getCidade = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].cidade); }
   return total;
     }
     $scope.showEnd.cidade = $scope.getCidade();
   if($scope.showEnd.cidade == '' || $scope.showEnd.cidade == null || $scope.showEnd.cidade == undefined ){
      var confirmPopup = $ionicPopup.confirm({
        cssClass: 'custom-class',
        title: 'Pergunta:',
        template: 'Necessário que cadastre seu endereço para visualizar o carrinho, deseja cadastrar agora?'
      });
     confirmPopup.then(function(res) {
       if(res) {
         sessionStorage.setItem('menuPerfil', 3);
         $state.go('endereco',[],{location:"replace",reload:true});
         return;
       }
       else {
         $state.go('tab.lista',[],{location:"replace",reload:true});
  return;
       } })
return;
   };
    $scope.getRua = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].rua); }
   return total;
    }

   $scope.getBairro = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].bairro); }
   return total;
    }

    $scope.getCep = function(){
      var total = "";
      for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
        total = ($scope.showEnd[i].CEP); }
    return total;
     }

    $scope.getNumero = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
     total = ($scope.showEnd[i].numero); }
     return total;
    }

   $scope.getUF = function(){
   var total = "";
   for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
   total = ($scope.showEnd[i].uf); }
   return total;  }

   $scope.getComplementoCliente = function() {
   for (var i = $scope.showEnd.length - 1; i >= 0; i--) { total = ($scope.showEnd[i].complemento); }
   return total; }

   $scope.getTelefoneCliente = function()
   {
    for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
    total = ($scope.showEnd[i].telefoneCliente);
   }
   return total;
   }

   $scope.getCidade = function(){
    var total = "";
    for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
    total = ($scope.showEnd[i].cidade); }
    return total;
    }

   $scope.getFrete = function(){
   var total = 0;
   for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
   total = ($scope.showEnd[i].frete); }
   return total;
   }

  sessionStorage.setItem('Frete', $scope.getFrete());

//fim endereco individuo

sessionStorage.setItem('cityc',$scope.getCidade());
sessionStorage.setItem('ruac',$scope.getRua());
sessionStorage.setItem('bairroc',$scope.getBairro());
sessionStorage.setItem('numeroc',$scope.getNumero());
sessionStorage.setItem('ufc',$scope.getUF());
var ruaC = sessionStorage.getItem('ruac');
var numeroC = sessionStorage.getItem('numeroc');
var bairroC = sessionStorage.getItem('bairroc');
var cidadeC = sessionStorage.getItem('cityc');
var ufC =  sessionStorage.getItem('ufc');
var paisC = 'Brasil';

var origin = Empresa.localizacao; //endereço da empresa
//var origin = ruaA + ', ' + numeroA +' - '+cidadeA+' - '+ufA+', '+paisA+''; //endereço da empresa
var destination = ruaC + ', ' + numeroC +' - '+bairroC+ '-' +cidadeC+' - '+ufC+', '+paisC+''; //endereço do cliente
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//var destination = 'R. Prudente de Moraes, 1467 - São José do Rio Preto - SP, Brasil'; //endereço do cliente
//VenuesAppServices.factory('VenueDistance', ['$resource',function($resource){
//return $resource('http://google.com/maps/api/distancematrix/json?origins='+ origin +'&destinations='+ destination, {}, { Distance: {method:'GET'}});}]);
//Key = AIzaSyBJEzfpDsJTA2hG3gyo7eUx6lQCGoW8c4w;
var googleMapsApiKey='AIzaSyCGU0PK5ks0K4jqqAZ6l2A6FKWUknklPkM';
//var urlAPIG = ('http://google.com/maps/api/distancematrix/json?origins='+ origin +'&destinations='+ destination +'&key=' + googleMapsApiKey);
//     strEnd= urlAPIG;
//       $http.get(strEnd)
//       .success(function(response){
//        $scope.showEndG=response.records;
//        console.log(showEndG);
//     })
      // var urlApiGP = 'https://topentregas.com.br/ionic/info.php?origins='+ origin +'&destinations='+ destination +'&key=' + googleMapsApiKey;
      $scope.loggedin_id = localStorage.getItem('loggedin_id');

      var urlApiGP = 'https://topentregas.com.br/ionic/' + Empresa.Tipo;

      str= urlApiGP + "economiaKey.php?idUser=" + $scope.loggedin_id + "&origin=" + origin + "&destination=" + destination + "&chave=" + $chave;

      $http.get(str)
      .success(function(response){

        if(response==true){
         return;
        }else{

          $ionicPopup.alert({cssClass: 'custom-class',
            title:'Informação',
            template: 'Endereço errado ou fora da area!'
           // template:'Não é possível gravar dados.'
          });
          $state.go('tab.main',[],{location:"replace",reload:true});

        }

      }).error(function(){
        $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template:'Endereço errado ou fora da area, Frete não calculado!'
        });
      })
})
     // ------ fim pegar valor frete
//CHAMADA HTTP MOSTRAR ITENS NO CARRINHO
//var url="http://localhost/MyApp/ionic/";
      //---------       //---------       //---------       //---------       //---------       //---------       //---------       //---------
       var idUser = localStorage.getItem('loggedin_id');
      str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;
      $http.get(str2).success(function(response){
        $scope.showCart=response.records;
          if ($scope.showCart.length == 0) {
            var ti = '1';
           sessionStorage.setItem('re',1);
           $state.go('tab.lista',[],{location:"replace",reload:true});
           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template: 'Adicione algum item para visualizar o carrinho.'
           });
        }else{
         sessionStorage.setItem('re',0);
        }
        });
        $scope.ter = sessionStorage.getItem('ter');

      //---------       //---------       //---------       //---------       //---------       //---------       //---------       //---------       //---------

      str10= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;
      //pegando aqui o endereço do individuo
       $http.get(str10).success(function(response){
         $scope.showEnd=response.records;

         $scope.getCidade = function(){
          var total = "";
          for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
            total = ($scope.showEnd[i].cidade); }
        return total;
         }

         $scope.getFrete = function(){
        var total = 0;
        for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
          total = ($scope.showEnd[i].frete); }
      return total;
       }

      })

 $scope.irParaRetirada = function (){
   sessionStorage.removeItem('moneyCustom');
   sessionStorage.removeItem('Custom');
   sessionStorage.setItem('irParaRetirada', 1);
   $state.go('retirada-balcao',[],{location:"replace",reload:true});
 }
//$scope.loggedin_id = localStorage.getItem('loggedin_id');
//var idUser = $scope.loggedin_id;
// str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;
 str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;

$http.get(str2).success(function(response){

 $scope.showCart=response.records;
// tentativa falha de esconder carrinho
 //if ($scope.showCart == 0){

//   sessionStorage.setItem('Carrinho',0);

// }else{
  // sessionStorage.setItem('Carrinho',1);
 //}
 //$scope.carrinho = sessionStorage.getItem('Carrinho');
   var ids = '';

   $scope.NotaFiscall = function(){
     for (var i = 0; i < $scope.showCart.length; i++) {
       var ids= JSON.stringify($scope.showCart[i].nomeProduto) ;

     }

       str= urlApi2 + "insert_teste.php?nomeProduto=" + ids;

       $http.get(str)
       .success(function(){

           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template:'Pedido enviado com sucesso.'
           });
           $state.go('tab.carrinho',[],{location:"replace",reload:true});

       }).error(function(){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não é possível fazer o contato do servidor.'
         });

       })

   }

     var appe  = localStorage.getItem('loggedin_status');
     var frete = sessionStorage.getItem('Frete');
   $scope.NotaFiscal = function(){

         for (var i = 0; i < $scope.showCart.length; i++) {
           var ids='';
           var idUser=0;
           var ids= $scope.showCart[i].nomeProduto;
           var nomeCliente= appe;

        var nomeAd = $scope.showCart[i].nomeAd;
        var valorAd = $scope.showCart[i].valorAd;
        var nomeCd = sessionStorage.getItem('nomeCd');
        var valorCd = sessionStorage.getItem('valorCd');

           var idUser= $scope.showCart[i].idUser;
           var idProduto= $scope.showCart[i].idProduto;
           var valor= $scope.showCart[i].valor;
           var promo_valor= $scope.showCart[i].promo_valor;
           var quantidade= $scope.showCart[i].quantidade;
           var categoria= $scope.showCart[i].categoria_id;
           var freteT= frete;

           str= urlApi2 + "insert_fiscal_com_complementos.php?nomeProduto=" + ids + "&frete=" + freteT + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&idProduto=" + idProduto + "&nomeCliente=" + nomeCliente + "&idUser=" + idUser + "&valor=" + valor + "&promo_valor=" + promo_valor + "&quantidade=" + quantidade;

           $http.get(str)
           .success(function(){
           }).error(function(){
           })
         }
       }

       $scope.getTotalCAdicional = function()
       {
         var novoValor = 0;
         var total = 0;
         var valorAd = 0;
         var valorCd = 0;

         for (var i = $scope.showCart.length - 1; i >= 0; i--) {
           var novoValor = 0;
           var valorAd = + $scope.showCart[i].valorAd;
           var valorCd = + $scope.showCart[i].valorCd;
           novoValor += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor);
           novoValor = novoValor + valorAd + valorCd;

           total += parseFloat(novoValor * $scope.showCart[i].quantidade );
       }
       return total;
       }

 $scope.getTotalval = function()
 {
   var novoValor = 0;
   var total = 0;
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
   var novoValor = 0;
   var valorAd = + $scope.showCart[i].valorAd;
   var valorCd = + $scope.showCart[i].valorCd;
   novoValor += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor );
   novoValor = novoValor + valorAd + valorCd;
   total += parseFloat(novoValor * $scope.showCart[i].quantidade );
}
   return total;
 }


 $scope.getTotal = function()
 {
   var frete = sessionStorage.getItem('Frete');
   var frete1 =  parseFloat(frete);
   var total = 0;
   var novoValor = 0;
   var total1 = 0;
   var valorAd = 0;
   var valorCd = 0;

   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     var novoValor = 0;
     var valorAd = + $scope.showCart[i].valorAd;
     var valorCd = + $scope.showCart[i].valorCd;
     novoValor += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor);
     novoValor = novoValor + valorAd + valorCd;
     total += parseFloat(novoValor * $scope.showCart[i].quantidade );
 }

 total1 += parseFloat(total+ frete1 )
 return total1;
 }

    $scope.getClasse = function(){
    $scope.t = 'te';
    return $scope.t;
    }

  if($scope.getTotal() == 0){
 $scope.getClasse = function(){
     $scope.t = 'te';
     return $scope.t;
 }}

 else{
   $scope.getClasse = function(){
     $scope.t = 'ten';
     return $scope.t;
 } }

 $scope.getNomeProduto = function()
 {
   var nomeProduto = "";

   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     var valorProduto = 0;
     var valorTotalPedidoN = 0;
     var adicionalValor = 0;
     var valorCd = 0;
     n = i + 1;

     adicionalNome =  ($scope.showCart[i].nomeAd);
     adicionalValor +=  parseFloat($scope.showCart[i].valorAd);
     observacao =  ($scope.showCart[i].observacao);
     quantidade =  ($scope.showCart[i].quantidade);
     nomeCd = ($scope.showCart[i].nomeCd);
     valorCd += parseFloat($scope.showCart[i].valorCd);
     valorProduto += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor);
     valorTotalPedidoN += parseFloat((valorProduto + adicionalValor + valorCd)  * $scope.showCart[i].quantidade);
     if (observacao == ''){
      observacao = "Sem observação.";
     }
     if (adicionalNome == '' || adicionalNome == null){
       adicionalNome = "Sem adicional.";
      }
      if (nomeCd == '' || nomeCd == null){
        nomeCd = "Sem complemento.";
       }
     if (quantidade == 1){
       nomeProduto = "Pedido "+ n + "<br>" + "Produto: [" + quantidade + "] "  +($scope.showCart[i].nomeProduto) + "<br>" + "Valor: R$" + valorProduto.toFixed(2) + "<br> Adicional: " + adicionalNome + " <br> " + "Valor: R$" + adicionalValor.toFixed(2) + " <br> " + "Complemento[s]: " + nomeCd + " <br> " + "Valor: R$" + valorCd.toFixed(2) + " <br> " + " Observacao: " + observacao + "<br> Valor total do pedido "+n+": R$" + valorTotalPedidoN.toFixed(2) + " <br> <br>" + nomeProduto ; // depois do "-" to pensando em por a quantidade que o usuario escolheu.
     }else{
       nomeProduto = "Pedido "+ n + "<br>" + "Produto: [" + quantidade + "] "  +($scope.showCart[i].nomeProduto) + "<br>" + "Valor: R$" + valorProduto.toFixed(2) + "<br> Adicional: " + adicionalNome + " <br> " + "Valor: R$" + adicionalValor.toFixed(2) + " <br> " + "Complemento[s]: " + nomeCd + " <br> " + "Valor: R$" + valorCd.toFixed(2) + " <br> " + " Observacao: " + observacao + "<br> Valor total do pedido "+n+": R$" + valorTotalPedidoN.toFixed(2) + " <br> <br>" + nomeProduto ; // depois do "-" to pensando em por a quantidade que o usuario escolheu.
     }
 }
 return nomeProduto;
 }

 $scope.getIdProduto = function()
 {
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].idProduto);
 }
 return total;
 }
 $scope.getObservacao = function()
 {
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].observacao);
 }
 return total;
 }
   $scope.getnomeAd = function()
 {
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].nomeAd);
 }
 return total;
 }
   $scope.getvalorAd = function()
 {   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].valorAd);  }
     return total;
 }

})
// modal
//começo modal pedido

var init = function() {
 if($scope.modal) {
   return $q.when();
 }
 else {
   return $ionicModal.fromTemplateUrl('my-ModalCarrinho.html', {
       scope: $scope,
       animation: 'slide-in-up',
       backdropClickToClose: false,
     })
   .then(function(modal) {
     $scope.ModalCarrinho = modal;
   })
 }
};

$scope.openModalCarrinho = function() {
 init().then(function() {
   $scope.ModalCarrinho.show();
     });
};

$scope.closeModalCarrinho = function() {
 $scope.ModalCarrinho.remove()
 .then(function() {
   $scope.ModalCarrinho = null;
 });

};

// Execute action on hide modal
$scope.$on('ModalCarrinho.hidden', function() {
 // Execute action
});

// Execute action on remove modal
$scope.$on('ModalCarrinho.removed', function() {
 // Execute action
});
//fim modal pedido
//fim modal
// modal

var initn = function() {
 if($scope.modal) {
   return $q.when();
 }
 else {
   return $ionicModal.fromTemplateUrl('my-ModalPagamento.html', {
       scope: $scope,
       animation: 'slide-in-up',
       backdropClickToClose: false,
     })
   .then(function(modal) {
     $scope.ModalPagamento = modal;
   })}
};
$scope.closeeAltera = function() {
 sessionStorage.setItem("menuPerfil", 2);
 $scope.closeModalCarrinho();
 $state.go('alterar-endereco',[], {location:"replace",reload:true});
}
$scope.openModalPagamento = function() {
 initn().then(function() {
   $scope.ModalPagamento.show();
     });
};
$scope.closeModalPagamento = function() {
 sessionStorage.setItem('Custom', '');
 sessionStorage.setItem('moneyCustom', '');
 $scope.ModalPagamento.remove()
 .then(function() {
   $scope.ModalPagamento = null;
 });
};
//Cleanup the modal when we're done with it!
// Execute action on hide modal
$scope.$on('ModalPagamento.hidden', function() {
 // Execute action
});
// Execute action on remove modal
$scope.$on('ModalPagamento.removed', function() {
 // Execute action
});
//fim modal pedido
//fim modal
$scope.process = function () {
 sessionStorage.setItem('Frete', $scope.getFrete());
 $urlFrete = sessionStorage.getItem('Frete');
 var idEmpresa = Empresa.numero;
 str11= urlApi2 + "getvalorMinimo.php?idEmpresa=" + idEmpresa + "&chave=" + $chave;
 //pegando aqui o endereço do individuo
  $http.get(str11).success(function(response){
    $scope.showF=response.records;

 $scope.getvalorMin = function(){
  var totalM = 0;
  for (var i = $scope.showF.length - 1; i >= 0; i--) {
    totalM = ($scope.showF[i].valorMin); }
return totalM;
 }
})

 if($urlFrete == '' || $urlFrete == null || $urlFrete == undefined){

   if(sessionStorage.getItem('re') == 1) { $state.go('tab.carrinho',[],{location:"replace",reload:true}); } else {

     var confirmPopup = $ionicPopup.confirm({
       cssClass: 'custom-class',
       title: 'Pergunta:',
       template: 'Infelizmente não entregamos neste endereço! deseja retirar no balcão ? (Cancelar para alterar o endereço)'
     });

     confirmPopup.then(function(res) {
       if(res) {
         $scope.closeModalCarrinho();
         sessionStorage.setItem('irParaRetirada', 1);
   $state.go('retirada-balcao',[],{location:"replace",reload:true});
       }
       else {
         var confirmPopup = $ionicPopup.confirm({
           cssClass: 'custom-class',
           title: 'Pergunta:',
           template: 'Deseja alterar seu endereço cadastrado para entrega ?'
         });
         confirmPopup.then(function(res) {
           if(res) {
             $scope.closeModalCarrinho();
             sessionStorage.setItem('menuPerfil', 2);
             $state.go('alterar-endereco',[],{location:"replace",reload:true});
           }
           else {
             $scope.closeModalCarrinho();
           } })
        // $state.go('tab.lista',[],{location:"replace",reload:true});
       }
     })
  }
 }else {
   $scope.openModalPagamento();
   $timeout(function() { $scope.renderButton(); }, 1000);

 }
}

//fim modal
str= urlApi2 + "show-status.php?idUser=" + idUser + "&chave=" + $chave;

$http.get(str).success(function(response){

 $scope.showStatus=response.records;
})
//aqi - manda requisição para gerencial
$scope.showConfirm = function() {
 $scope.buttonDisabled = true;
 var confirmPopup = $ionicPopup.confirm({
   cssClass: 'custom-class',
   title: 'Pergunta:',
   template: 'Tem certeza que deseja concluir o pedido?'
 });

 confirmPopup.then(function(res) {
   if(res) {
     $scope.buttonDisabled = false;
     $scope.irindoCarrinho();
   } else {
     $scope.buttonDisabled = false;
   }
 });
};

$scope.irindoCarrinho=function(){
//confirm popup// verificar apos umbler desbugar

//var troco = $scope.money;
var troco = 0;
var troco = sessionStorage.getItem('moneyCustom');
//var formaPagamento = $scope.Custom;
var formaPagamento = sessionStorage.getItem('Custom');

if ($scope.getTotalval() < $scope.getvalorMin()){
 $ionicPopup.alert({cssClass: 'custom-class',
 title:'Informação',
 template: 'Valor minimo para pedido: R$'+ $scope.getvalorMin()
});
return;
}
//axo q da pra arrumar se jogar isso na CTRL onde reside o troco.. la na CtrlModal la encima... joga essa parte la
if(formaPagamento == '' || formaPagamento == null || formaPagamento == undefined ){
 $ionicPopup.alert({cssClass: 'custom-class',
   title:'Informação',
   template: 'Por favor, selecione uma forma de pagamento.'
 });
}else {

if(formaPagamento == 'Dinheiro'){

 if(!(troco === '' || troco === '0' || troco === '0,0' || troco === '0,00' || troco === undefined || troco === null)){

   if(troco <= $scope.getTotal()) {

 $ionicPopup.alert({cssClass: 'custom-class',
   title:'Informação',
   template: 'O valor do troco deve ser maior que a despesa.'
 });
 return;
}
}else {}
}

var imp = 0;
imp = sessionStorage.getItem('Verifica');
if  ( imp == '0'){
     $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Infelizmente estamos fechados agora!'
   });
}else {
// impede o double click

$scope.buttonDisabled = true;
str= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;
//pegando aqui o endereço do individuo
$http.get(str).success(function(response){
  $scope.showEnd=response.records;
  if($scope.showEnd == false){

   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Necessário cadastro de endereço!'
   });

   $state.go('endereco',[],{location:"replace",reload:true}); }
 })

 if($scope.getTotal() == '0'){

   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Necessário algum pedido no carrinho!'
   });
   $state.go('tab.carrinho',[],{location:"replace",reload:true}); }

   if( $scope.getTotal() != '0') {

  var cidadeCliente = $scope.getCidade();
  var bairroCliente = $scope.getBairro();
  var cepCliente = $scope.getCep();
  var ruaCliente = $scope.getRua();
  var numeroCasaCliente = $scope.getNumero();
  var telefoneCliente = $scope.getTelefoneCliente();
  var complemento = $scope.getComplementoCliente();

//alert(parsedJson.rua);
//var parsedJson=JSON.parse(data);
//alert(parsedJson.project_id);

var valor = $scope.getTotal();
var nomeProduto = $scope.getNomeProduto();
var descricao = $scope.showCart.descricao;
var nomeAd = $scope.getnomeAd();
var valorAd = $scope.getvalorAd();
var nomeCd = sessionStorage.getItem('nomeCd');
var valorCd = sessionStorage.getItem('valorCd');
$scope.loggedin_status = localStorage.getItem('loggedin_status');
var nomeCliente = $scope.loggedin_status;
var observacao = $scope.showStatus.observacao;
var troco = 0;
var troco = sessionStorage.getItem('moneyCustom');
//var formaPagamento = $scope.Custom;
var formaPagamento = sessionStorage.getItem('Custom');
var frete = $scope.getFrete();
var idEmpresa= Empresa.numero;
var status = "Aguardando";

     //continuar daqui
      // $cidadeCliente = $_GET["cidadeCliente"]; pegar de outra tabela
       //$bairroCliente = $_GET["bairroCliente"];pegar de outra tabela
       //$ruaCliente = $_GET["ruaCliente"];pegar de outra tabela
      // $numeroCasaCliente = $_GET["numeroCasaCliente"];pegar de outra tabela
      // $telefoneCliente = $_GET["telefoneCliente"];pegar de outra tabela

  str= urlApi2 + "status_insert_cep.php?valor=" + valor + "&frete=" + frete + "&cepCliente=" + cepCliente + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&id_entrega=" + 0 + "&telefoneCliente=" + telefoneCliente + "&complemento=" + complemento + "&idEmpresa=" + idEmpresa + "&formaPagamento=" + formaPagamento + "&troco=" + troco + "&descricao=" + descricao + "&numeroCasaCliente=" + numeroCasaCliente + "&ruaCliente=" + ruaCliente + "&bairroCliente=" + bairroCliente + "&cidadeCliente=" + cidadeCliente + "&idUser=" + idUser + "&nomeProduto=" + nomeProduto + "&status=" + status + "&nomeCliente=" + nomeCliente + "&observacao=" + observacao + "&chave=" + $chave;

       $http.get(str)
       .success(function(response){

         if(response==true){

           var appe  = localStorage.getItem('loggedin_status');
           var frete = sessionStorage.getItem('Frete');

               for (var i = 0; i < $scope.showCart.length; i++) {
                 var ids='';
                 var idUser=0;
                 var ids= $scope.showCart[i].nomeProduto;
                 var nomeCliente= appe;
                 var idUser= $scope.showCart[i].idUser;

                var nomeAd = $scope.showCart[i].nomeAd;
                var valorAd = $scope.showCart[i].valorAd;
                var nomeCd = $scope.showCart[i].nomeCd;
                var valorCd = $scope.showCart[i].valorCd;

                 var idProduto= $scope.showCart[i].idProduto;
                 var valor= $scope.showCart[i].valor;
                 var promo_valor= $scope.showCart[i].promo_valor;
                 var quantidade= $scope.showCart[i].quantidade;
                  var categoria= $scope.showCart[i].categoria_id;
                  var entrega = 0;
                  var empresa = Empresa.numero;
                 var freteT= frete;

                 str= urlApi2 + "insert_fiscal_com_complementos.php?nomeProduto=" + ids  + "&empresa=" + empresa + "&entrega=" + entrega + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&frete=" + freteT + "&idProduto=" + idProduto + "&nomeCliente=" + nomeCliente + "&idUser=" + idUser + "&valor=" + valor + "&promo_valor=" + promo_valor + "&idProduto=" + idProduto + "&idProduto=" + idProduto + "&quantidade=" + quantidade;

                 $http.get(str)
                 .success(function(){
                 }).error(function(){
                 })
               }
              // $scope.closeModalCarrinho();
              //  $scope.closeModalPagamento();
       //    $ionicPopup.alert({cssClass: 'custom-class',
        //  title:'Informação',
        //   template:'Pedido enviado com sucesso.'
        // });
        // break;
       //  $state.go('tab.status',[],{location:"replace",reload:true});
         }else{

           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template:'Não é possível gravar dados.'
           });

           $state.go('tab.carrinho',[],{location:"replace",reload:true});

         }

       }).error(function(){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não é possível fazer o contato do servidor.'
         });

       })

      $scope.delCarrinhoAcc();

 }
}}
;}

//LIMPAR CARRINHO
$scope.loggedin_id = localStorage.getItem('loggedin_id');
idUser = $scope.loggedin_id;

$scope.showConfirmdelCarrinho = function() {
 var confirmPopup = $ionicPopup.confirm({
   cssClass: 'custom-class',
   title: 'Pergunta:',
   template: 'Tem certeza que deseja limpar o carrinho?'
 });

 confirmPopup.then(function(res) {
   if(res) {
     $scope.delCarrinho();
   } else {

   }
 });
};

 $scope.delCarrinho=function(){
   $scope.buttonDisabled = true;
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
var idUser = $scope.loggedin_id;

   str= urlApi2 + "cart-del-all.php?idUser=" + idUser + "&chave=" + $chave;

     $http.get(str)
     .success(function(response){

       if(response==true){


         $state.go('tab.carrinho',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não foi possivel, configura se está tudo certo e tente denovo.'
         });
         // era admin-admin
         $state.go('tab.carrinho',[],{location:"replace",reload:true});
       }
     }).error(function(){
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });
     })
 };
   $scope.delCarrinhoAcc=function(){
   $scope.buttonDisabled = true;
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   var idUser = $scope.loggedin_id;
   str= urlApi2 + "cart-del-all.php?idUser=" + idUser + "&chave=" + $chave;
     $http.get(str)
     .success(function(response){
       if(response==true){
           var alertPopup = $ionicPopup.alert({
             cssClass: 'custom-class',
             title: 'Informação',
             template: 'Pedido enviado com sucesso!'
           });
           alertPopup.then(function(res) {
           $scope.closeModalPagamento();
           $scope.closeModalCarrinho();
             $state.go('tab.status',[],{location:"replace",reload:true});
         });
   }else{
         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não foi possivel, configura se está tudo certo e tente denovo.'
         });
         // era admin-admin
         $state.go('tab.carrinho',[],{location:"replace",reload:true});
      }
      }).error(function(){
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });
     })
 };
 $scope.ConfirmaCarrinho=function(){
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   idUser = $scope.loggedin_in;
   str= urlApi2 + "endereco-show.php?idUser=" + idUser + "&chave=" + $chave;
   $http.get(str).success(function(response){
     $scope.showEnd=response.records;
       if($scope.showEnd.id_usuarios != $scope.loggedin_id ){
         $state.go('endereco',[],{location:"replace",reload:true});
       }
   })
 };
 //deletar item carrinho
 $scope.delItemCart=function(id){
  $("#preloader").fadeIn();
  $scope.buttonDisabled = true;
   if(id){
     str= urlApi2 + "cart-del-item.php?id=" + id + "&chave=" + $chave;
     $http.get(str)
     .success(function(response){
       if(response==true){
         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Item retirado do carrinho!'
         });
         $scope.buttonDisabled = false;
         $state.go('tab.carrinho',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não é possível retirar, tente mais tarde!'
         });
         // era admin-admin
         $scope.buttonDisabled = false;
         $state.go('tab.carrinho',[],{location:"replace",reload:true});
       }

     }).error(function(){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });
       $scope.buttonDisabled = false;
     })

   }else{
     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template:'Não pode retirar.'
     });

     $scope.buttonDisabled = false;

   }

 };

 $("#preloader").fadeOut();
})

//  se quiser adicionar mais controller tem que tirar o ponto e virgula, e colocalo no final da proxima controller
.controller('ProdutosCtrl',function($ionicPlatform, $scope, $http, $state,$ionicPopup, $timeout, $ionicModal, $filter, Empresa){
  sessionStorage.setItem("nomeCd", '');
  sessionStorage.setItem("valorCd", '');
  sessionStorage.setItem("nomeAd", '');
  sessionStorage.setItem("valorAd", '');
  sessionStorage.setItem("lst", '');
  sessionStorage.setItem("comple", '');

  $scope.numbercomple = [];
  $scope.qtdMax = [];
  var last;

  var lastChecked;

   $scope.clickItem = function(check, value, numbercomple, qtdMax) {
    var groupcheck = $('input[name="comple['+ numbercomple +']"]:checked').length;
    last = $('input[id="'+ value +'"]:checked');
    if( groupcheck > qtdMax ) {$(last).prop('checked', false);
    $ionicPopup.alert({cssClass: 'custom-class',
    title:'Aviso!',
    template:'Não é permitido mais do que ' + qtdMax + ' opções deste complemento.'
  });
  }
  if( groupcheck <= qtdMax ) {
  if(check){
    $scope.comple.push(value);
}else{ $scope.comple.splice($scope.comple.indexOf(value), 1); }
sessionStorage.setItem('comple' , $scope.comple);
    console.log(""+groupcheck);

  }
  var idAD = sessionStorage.getItem("comple");
  var empresa = Empresa.numero;
  var urlApi7 = 'https://topentregas.com.br/ionic/complementos/'; //online
//console.log("" + $scope.lst);
var total = 0;


  if (idAD != null || idAD != '') {


str= urlApi7 + "getad.php?idAD=" + idAD + "&empresa=" + empresa;

$http.get(str)
.success(function(response){

       $scope.mostrarCertoB=response.records;

        var total = 0;

       $scope.getValueADB = function() {

        for (var i = 0; i < $scope.mostrarCertoB.length; i++) {

          total += parseFloat(parseFloat($scope.mostrarCertoB[i].valorComplemento));

       }

       return total;
      }

      sessionStorage.setItem('valorCd' , $scope.getValueADB());
      $scope.valorCd = sessionStorage.getItem('valorCd');


      var nome = "";
      $scope.getNomeADB = function(){

        for (var i = 0; i < $scope.mostrarCertoB.length; i++) {
            if(nome != "") { nome += ', '};
          nome += ($scope.mostrarCertoB[i].nomeComplemento);

       }
       return nome;
      }
      sessionStorage.setItem('nomeCd' , $scope.getNomeADB());

})
}

}
  $scope.lst = [];

  $scope.change = function(check,value, preco){

  // apenas comente a linha abaixo para funcionar
   //  $scope.lst.length = 0;
        if(check){
            $scope.lst.push(value);
        }else{ $scope.lst.splice($scope.lst.indexOf(value), 1); }
   sessionStorage.setItem('lst' , $scope.lst);

   var idAD = sessionStorage.getItem("lst");
   var empresa = Empresa.numero;
   var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
 //console.log("" + $scope.lst);
 var total = 0;
   if (idAD != null || idAD != '') {


 str= urlApi7 + "getad.php?idAD=" + idAD + "&empresa=" + empresa;

 $http.get(str)
 .success(function(response){

        $scope.mostrarCerto=response.records;
         var total = 0;
        $scope.getValueAD = function() {

         for (var i = 0; i < $scope.mostrarCerto.length; i++) {

           total += parseFloat(parseFloat($scope.mostrarCerto[i].valor));


        }

        return total;
       }

       sessionStorage.setItem('valorAd' , $scope.getValueAD());
       $scope.valorAd = sessionStorage.getItem('valorAd');

       var nome = "";
       $scope.getNomeAD = function(){

         for (var i = 0; i < $scope.mostrarCerto.length; i++) {
             if(nome != "") { nome += ', '};
           nome += ($scope.mostrarCerto[i].nome);

        }
        return nome;
       }
       sessionStorage.setItem('nomeAd' , $scope.getNomeAD());

 })
 }


 $scope.getNomeAD();
 $scope.getValueAD();


  }
  //fim scope change

 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
 var urlApiGP = 'https://topentregas.com.br/ionic/adicionais/';
 var urlApiGPB = 'https://topentregas.com.br/ionic/complementos/';
 var idEmpresa = Empresa.numero;
 var categoria = sessionStorage.getItem('loggedin_id_cat');
var meioAmeio = 1;

$timeout(function() { $("#preloader").fadeOut(); }, 1000);
$scope.q = '';

     $scope.mostradesconto = 1;
//começo modal pedido
$ionicModal.fromTemplateUrl('my-modalPedido.html', {
 scope: $scope,
 backdropClickToClose: false,
 animation: 'slide-in-up'
}).then(function(modal) {
 $scope.modalPedido = modal;
});

$scope.openModalPedido = function(descricao) {
 $scope.descricaoc = descricao;
 $scope.modalPedido.show();
};
$scope.closeModalPedido = function() {
$scope.modalPedido.hide();
};
//Cleanup the modal when we're done with it!
$scope.$on('$destroy', function() {
 $scope.modalPedido.remove();
});

// Execute action on hide modal
$scope.$on('modalPedido.hidden', function() {
 // Execute action
});

// Execute action on remove modal
$scope.$on('modalPedido.removed', function() {
 // Execute action
});
//fim modal pedido

   $("#preloader").fadeIn();

     $timeout(function() {
     $scope.mostradesconto = 2;
     }, 2000)

   $scope.limparSemSair = function(){

     var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
     var idUserP = localStorage.getItem("loggedin_id");
   //    var idAD = sessionStorage.getItem("lst");
     var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
   //console.log("" + $scope.lst);
   //inicio tentativa

   str= urlApi7 + "delete_all_add.php?idProduto=" + idProdutoP + "&idUser=" + idUserP;

   $http.get(str)
   .success(function(response){

     if(response==true){

      //$state.go('produtos',[],{location:"replace",reload:true});

     }else{

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Erro!',
         template:'Algo deu errado, adicionais não foram limpados.'
       });
      // $state.go('tab.main',[],{location:"replace",reload:true});

     }
   })

   var lst = '';
   // $scope.modalAdicional.hide();
   // sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
   sessionStorage.setItem('lst' , lst);
   // sessionStorage.setItem('valorAd' , '');
   //sessionStorage.setItem('nomeAd' , '');
   //sessionStorage.removeItem('lst');
   sessionStorage.removeItem('valorAd');
   sessionStorage.removeItem('nomeAd');

   $timeout(function() {
   $ionicPlatform.ready(function () {
     $state.go('descricao-produto',[],{location:"replace",reload:true});
   });
   });

   }

   //complemento
   $scope.limparSemSairB = function(){

    var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
    var idUserP = localStorage.getItem("loggedin_id");
  //    var idAD = sessionStorage.getItem("lst");
    var urlApi7 = 'https://topentregas.com.br/ionic/complementos/'; //online
  //console.log("" + $scope.lst);
  //inicio tentativa

  str= urlApi7 + "delete_all_add.php?idProduto=" + idProdutoP + "&idUser=" + idUserP;

  $http.get(str)
  .success(function(response){

    if(response==true){

     //$state.go('produtos',[],{location:"replace",reload:true});

    }else{

      $ionicPopup.alert({cssClass: 'custom-class',
        title:'Erro!',
        template:'Algo deu errado, adicionais não foram limpados.'
      });
     // $state.go('tab.main',[],{location:"replace",reload:true});

    }
  })

  var comple = '';
  // $scope.modalAdicional.hide();
  // sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
  sessionStorage.setItem('comple' , comple);
  // sessionStorage.setItem('valorAd' , '');
  //sessionStorage.setItem('nomeAd' , '');
  //sessionStorage.removeItem('lst');
  //tava aqui \/
  //sessionStorage.removeItem('valorAd');
  //sessionStorage.removeItem('nomeAd');

  $timeout(function() {
  $ionicPlatform.ready(function () {
    $state.go('descricao-produto',[],{location:"replace",reload:true});
  });
  });

  }
  //fim complemento
//limpar os adicionais quando volta da descrição para lista de produtos
$scope.LSTverifica = sessionStorage.getItem('lst');
$scope.perguntar = function() {
 var confirmPopup = $ionicPopup.confirm({
   cssClass: 'custom-class',
   title: 'Pergunta:',
   template: 'Deseja retirar todos os adicionais?'
 });
 confirmPopup.then(function(res) {
   if(res) {
     $scope.limpar();

     return;
   }
   else {
return;
   } })
}
$scope.limparf = function(){
  sessionStorage.setItem("comple", '');

 $state.go('produtos',[],{location:"replace",reload:true});

}

$scope.limpar = function(){
 var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
 var idUserP = localStorage.getItem("loggedin_id");
//    var idAD = sessionStorage.getItem("lst");
 var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
//console.log("" + $scope.lst);
//inicio tentativa
str= urlApi7 + "delete_all_add.php?idProduto=" + idProdutoP + "&idUser=" + idUserP;

$http.get(str)
.success(function(response){

 if(response==true){

  //$state.go('produtos',[],{location:"replace",reload:true});

 }else{

   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Erro!',
     template:'Algo deu errado, adicionais não foram limpados.'
   });
  // $state.go('tab.main',[],{location:"replace",reload:true});

 }
})

var lst = '';
// $scope.modalAdicional.hide();
// sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
sessionStorage.setItem('lst' , lst);
// sessionStorage.setItem('valorAd' , '');
//sessionStorage.setItem('nomeAd' , '');
//sessionStorage.removeItem('lst');
sessionStorage.removeItem('valorAd');
sessionStorage.removeItem('nomeAd');

$timeout(function() {
$ionicPlatform.ready(function () {
 $state.go('descricao-produto',[],{location:"replace",reload:true});
});
});

}
//fim
   //--- programação meio a meio -começo
   $scope.meioameio = function(){
     sessionStorage.setItem('meioAmeio' , meioAmeio);
     $state.go('meio-a-meio',[],{location:"replace",reload:true});
   }

   $scope.pegarIDProduto2=function(nome, id, descricao, valor, promo_valor, imagens){

     var lst2 = '';
   // sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
    sessionStorage.setItem('lst2' , lst2);
    sessionStorage.setItem('valorAd2' , '');
    sessionStorage.setItem('nomeAd2' , '');
     sessionStorage.setItem('loggedin_nome_produto2',nome);
     sessionStorage.setItem('loggedin_id_produto2',id);
     sessionStorage.setItem('loggedin_desc_produto2',descricao);
     sessionStorage.setItem('loggedin_valor_produto2',valor);
     sessionStorage.setItem('loggedin_promo_valor_produto2',promo_valor);
     sessionStorage.setItem('loggedin_imagens_produto2',imagens);
     $state.go('descricao-produto2',{},{location:"replace",reload:true});
     }

     $scope.loggedin_nome_produto2 = sessionStorage.getItem('loggedin_nome_produto2');
     $scope.loggedin_id_produto2 = sessionStorage.getItem('loggedin_id_produto2');
     $scope.loggedin_desc_produto2 = sessionStorage.getItem('loggedin_desc_produto2');
     $scope.loggedin_valor_produto2 = sessionStorage.getItem('loggedin_valor_produto2');
     $scope.loggedin_promo_valor_produto2 = sessionStorage.getItem('loggedin_promo_valor_produto2');
     $scope.loggedin_imagens_produto2 = sessionStorage.getItem('loggedin_imagens_produto2');
     $scope.valorAd = sessionStorage.getItem('valorAd');

   // fim da programação meio a meio --

           str2= urlApiGP + "show_arc_adicionais.php?idEmpresa=" + idEmpresa;

          $http.get(str2)
          .success(function(response){

             $scope.showAdicionaisN=response.records;

          })

           var idProduto = sessionStorage.getItem("loggedin_id_produto");
           var idUser = localStorage.getItem("loggedin_id");

          str2= urlApiGP + "show_addCART.php?idUser=" + idUser + "&idProduto=" + idProduto;

          $http.get(str2)
          .success(function(response){

             $scope.showAdicionaisCart=response.records;

             angular.forEach($scope.showAdicionaisCart, function (adicional) {
               var meuArray = Array;
               meuArray = adicional.id_adicional;
               $scope.adicional = meuArray;
              });

           //  var data =   $scope.showAdicionaisCart=response.records;
             //var length =  $scope.showAdicionaisCart.length;

 //$scope.getADS = function(){

            // var result = data.map(function(item) {

            //   for (var i = 0; i < length; i++) {

             //  return item.id_adicional;
            //   }
            // });

          //   console.log(result);
         //  }
         })

         var idAD = sessionStorage.getItem("lst");
         var empresa = Empresa.numero;
         var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
       //console.log("" + $scope.lst);
       var total = 0;
         if (idAD != null || idAD != '') {


       str= urlApi7 + "getad.php?idAD=" + idAD + "&empresa=" + empresa;

       $http.get(str)
       .success(function(response){

              $scope.mostrarCerto=response.records;
             // var xz = 0;

             // $scope.getIDAD = function() {


              // for (var i = 0; i < $scope.mostrarCerto.length; i++) {

              //   xz = parseFloat($scope.mostrarCerto[i].id);

             // }
            //  return xz;

           //  }
           //    console.log(""+ $scope.getIDAD());

               var total = 0;


              $scope.getValueAD = function() {

               //for (var i = $scope.mostrarCerto.length - 1; i >= 0; i--) {
               for (var i = 0; i < $scope.mostrarCerto.length; i++) {

                 total += parseFloat(parseFloat($scope.mostrarCerto[i].valor));


              }

              return total;
             }

             sessionStorage.setItem('valorAd' , $scope.getValueAD());
             $scope.valorAd = sessionStorage.getItem('valorAd');

            //false to not run another digest

             var nome = "";
             $scope.getNomeAD = function(){

               //for (var i = $scope.mostrarCerto.length - 1; i >= 0; i--) {
               for (var i = 0; i < $scope.mostrarCerto.length; i++) {
                   if(nome != "") { nome += ', '};
                 nome += ($scope.mostrarCerto[i].nome);

              }
              return nome;
             }
             sessionStorage.setItem('nomeAd' , $scope.getNomeAD());

       })
     }
 if (sessionStorage.getItem("lst") == '') {
  $scope.finn = "nenhum";
  }else{
    $scope.finn = sessionStorage.getItem("lst");
    }




    //complemento aprte


    str2= urlApiGPB + "show_arc_complementos.php?idEmpresa=" + idEmpresa;

    $http.get(str2)
    .success(function(response){

       $scope.showAdicionaisNB=response.records;

    })

     var idProduto = sessionStorage.getItem("loggedin_id_produto");
     var idUser = localStorage.getItem("loggedin_id");

    str2= urlApiGPB + "show_addCART.php?idUser=" + idUser + "&idProduto=" + idProduto;

    $http.get(str2)
    .success(function(response){

       $scope.showAdicionaisCartB=response.records;

       angular.forEach($scope.showAdicionaisCartB, function (adicionalB) {
         var meuArrayB = Array;
         meuArrayB = adicionalB.id_adicionalB;
         $scope.adicionalB = meuArrayB;
        });


   })

   var idAD = sessionStorage.getItem("comple");
   var empresa = Empresa.numero;
   var urlApi7 = 'https://topentregas.com.br/ionic/complementos/'; //online
 //console.log("" + $scope.lst);
 var total = 0;
   if (idAD != null || idAD != '') {


 str= urlApi7 + "getad.php?idAD=" + idAD + "&empresa=" + empresa;

 $http.get(str)
 .success(function(response){

        $scope.mostrarCertoB=response.records;


         var total = 0;


        $scope.getValueADB = function() {

         for (var i = 0; i < $scope.mostrarCertoB.length; i++) {

           total += parseFloat(parseFloat($scope.mostrarCertoB[i].valorComplemento));

        }

        return total;
       }

       sessionStorage.setItem('valorCd' , $scope.getValueADB());
       $scope.valorCd = sessionStorage.getItem('valorCd');


       var nome = "";
       $scope.getNomeADB = function(){

         for (var i = 0; i < $scope.mostrarCertoB.length; i++) {
             if(nome != "") { nome += ', '};
           nome += ($scope.mostrarCertoB[i].nomeComplemento);

        }
        return nome;
       }
       sessionStorage.setItem('nomeCd' , $scope.getNomeADB());

 })
}
if (sessionStorage.getItem("comple") == '') {
$scope.finn = "nenhum";
}else{
$scope.finn = sessionStorage.getItem("comple");
}

$scope.comple = [];

$scope.limparXX = function(id){

  var arrayB = [];
  var index = [];
  $scope.comple = [];
  var idz = '146';
  arrayB = sessionStorage.getItem('comple');


  //$scope.comple.splice($scope.comple.indexOf(id), 1);
  //sessionStorage.setItem('comple' , $scope.comple);
  //$scope.lst = [];

 $scope.comple.splice($scope.comple.indexOf(idz), 1);
   sessionStorage.setItem('comple' , $scope.comple);

  //var lists = arrayB.filter(x => {
  //  return x.Id != id;
  //})

  sessionStorage.setItem('nomeCd' , $scope.getNomeADB());
  sessionStorage.setItem('valorCd' , $scope.getValueADB());

  //sessionStorage.setItem('Meu Teste ID:', id);

var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
var idUserP = localStorage.getItem("loggedin_id");
//    var idAD = sessionStorage.getItem("lst");
var urlApi7 = 'https://topentregas.com.br/ionic/complementos/'; //online
//console.log("" + $scope.lst);
//inicio tentativa

str= urlApi7 + "delete_add.php?idProdutoP=" + idProdutoP + "&idUser=" + idUserP + "&idAD=" + id;



$http.get(str)
.success(function(response){

if(response==true){

// $state.go('produtos',[],{location:"replace",reload:true});
$state.go('descricao-produto',[],{location:"replace",reload:true});

}else{

  $ionicPopup.alert({cssClass: 'custom-class',
    title:'Erro!',
    template:'Algo deu errado, adicionais não foram limpados.'
  });
 // $state.go('tab.main',[],{location:"replace",reload:true});

}
})




}

    //fim complemento parte




//incompleto
 $scope.limparX = function(id){

   sessionStorage.setItem('Meu Teste ID:', id);

 var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
 var idUserP = localStorage.getItem("loggedin_id");
//    var idAD = sessionStorage.getItem("lst");
 var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
//console.log("" + $scope.lst);
//inicio tentativa

str= urlApi7 + "delete_add.php?idProdutoP=" + idProdutoP + "&idUser=" + idUserP + "&idAD=" + id;

$http.get(str)
.success(function(response){

 if(response==true){

 // $state.go('produtos',[],{location:"replace",reload:true});

 }else{

   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Erro!',
     template:'Algo deu errado, adicionais não foram limpados.'
   });
  // $state.go('tab.main',[],{location:"replace",reload:true});

 }
})

//var lst = '';

 // sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
  //sessionStorage.setItem('lst' , lst);
 // sessionStorage.setItem('valorAd' , '');
  //sessionStorage.setItem('nomeAd' , '');
  //sessionStorage.removeItem('lst');
  //sessionStorage.removeItem('valorAd');
 // sessionStorage.removeItem('nomeAd');

  $ionicPlatform.ready(function () {
   $state.go('descricao-produto',[],{location:"replace",reload:true});
 });

 }

 //$scope.init = function(name, valor)
 //{
   //This function is sort of private constructor for controller
  // $scope.valor = valor;
  // $scope.name = name;

  // sessionStorage.setItem('valorAd' , $scope.valor);
  // sessionStorage.setItem('nomeAd' , $scope.name);
  // $scope.valorAd = sessionStorage.getItem('valorAd');

 //};

 $scope.valorAd = sessionStorage.getItem('valorAd');

   var idEmpresa= Empresa.numero;
   $http.get(urlApi2+"news-show.php?idEmpresa=" + idEmpresa).success(function(response){
     $scope.showCategorias=response.records;

   });
   $scope.loggedin_id_cat = sessionStorage.getItem('loggedin_id_cat');
   $scope.loggedin_id = sessionStorage.getItem('loggedin_id');

 $scope.form = {};
 $scope.form.observacao = "";
 $scope.rofl = "1";
 $scope.rofl= 1;

 $scope.qty_incr = function(item){
   item.quantity = item.quantity + 1;
}
$scope.qty_decr = function(item){
   if(item.quantity > 1){
      item.quantity = item.quantity - 1;
   }

}

 $scope.rofl1=function(){
   $scope.rofl = $scope.rofl + 1;

 };
 $scope.rofl2=function(){
   if($scope.rofl > 1) {
   $scope.rofl = $scope.rofl - 1;
 }
 };
 var idEmpresa = Empresa.numero;
           str= urlApi2 + "verificaHora.php?idEmpresa=" + idEmpresa;

       $http.get(str)
       .success(function(response){

         if(response==true){
        sessionStorage.setItem('Verifica',1);
         }
         else{
          sessionStorage.setItem('Verifica',0);//aqui para 0
         }
       })
       sessionStorage.getItem('Verifica');

$chave = '';
 //var url="http://localhost/MyApp/ionic/";
 //aqui eu faço o icone mudar (carrinho)
 $scope.Ircarrinho2 = function(){
   sessionStorage.setItem("aoCarrinho", 1);
   $state.go('tab.carrinho',{},{location:"replace",reload:true});
 };

 $scope.Ircarrinho = function(){
   sessionStorage.setItem("aoCarrinho", 2);
   $state.go('tab.carrinho',{},{location:"replace",reload:true});
 };
 $scope.loggedin_id = localStorage.getItem('loggedin_id');
 var idUser = $scope.loggedin_id;
   str2= urlApi2 + "show-cart.php?idUser=" + idUser;
 $http.get(str2).success(function(response){
   $scope.showCart=response.records;
   if($scope.showCart==false){
 $scope.getClass = function(){
     $scope.t = 'icon ion-ios-cart-outline';
     return $scope.t;
 }}
 else{
   $scope.getClass = function(){
     $scope.t = 'icon ion-ios-cart';
     return $scope.t;
 }

 $scope.getClass23 = function(){
   $scope.t = 'animation';
   return $scope.t;
}
}})
// fim mudar icone

 $scope.ProdutoData={};

 var idEmpresa= Empresa.numero;

 var idCatigoria =  sessionStorage.getItem('loggedin_id_cat');

 $http.get(urlApi2+"produtosShow.php?idEmpresa=" + idEmpresa + "&idCatigoria=" + idCatigoria).success(function(response){

   $scope.showProdutos=response.records;
   $scope.loggedin_id_cat = sessionStorage.getItem('loggedin_id_cat');
   $scope.loggedin_id_produto = sessionStorage.getItem('loggedin_id_produto');
   //$scope.semObs = sessionStorage.getItem('semObs');
    // console.log(""+);
    prod = $scope.showProdutos.valor;
    sec = $scope.showProdutos.promo_valor;


    angular.forEach($scope.showProdutos, function (prod, sec) {
     $scope.newValue = parseFloat(prod) - parseFloat(sec);

    });

    $scope.valorer = 'valor';
    //fez funcionar milagrosamente, amém.
        angular.forEach($scope.showProdutos, function (produto) {
          produto.valor = parseFloat(produto.valor);
         });

       //  $scope.valorerer = 'promo_valor';
         //fez funcionar milagrosamente, amém.
          //   angular.forEach($scope.showProdutos, function (produto) {
          //     produto.promo_valor = parseFloat(produto.promo_valor);
          //    });
 })

 $scope.pegarIDProduto=function(nome, id, descricao, valor, promo_valor, imagens, temcomple){

   $scope.limparSemSair();
   $scope.limparSemSairB();
   var lst = '';

 // sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
 sessionStorage.setItem('comple' , '');
  sessionStorage.setItem('lst' , lst);
  sessionStorage.setItem('valorAd' , '');
  sessionStorage.setItem('valorCd' , '');
  sessionStorage.setItem('nomeCd' , '');
  sessionStorage.setItem('nomeAd' , '');
  sessionStorage.setItem('loggedin_temcomple',temcomple);
   sessionStorage.setItem('loggedin_nome_produto',nome);
   sessionStorage.setItem('loggedin_id_produto',id);
   sessionStorage.setItem('loggedin_desc_produto',descricao);
   sessionStorage.setItem('loggedin_valor_produto',valor);
   sessionStorage.setItem('loggedin_promo_valor_produto',promo_valor);
   sessionStorage.setItem('loggedin_imagens_produto',imagens);
   $state.go('descricao-produto',{},{location:"replace",reload:true});

   }

   $scope.loggedin_temcomple = sessionStorage.getItem('loggedin_temcomple');
   $scope.loggedin_nome_produto = sessionStorage.getItem('loggedin_nome_produto');
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   $scope.loggedin_id_produto = sessionStorage.getItem('loggedin_id_produto');
   $scope.loggedin_desc_produto = sessionStorage.getItem('loggedin_desc_produto');
   $scope.loggedin_valor_produto = sessionStorage.getItem('loggedin_valor_produto');
   $scope.loggedin_promo_valor_produto = sessionStorage.getItem('loggedin_promo_valor_produto');
   $scope.loggedin_imagens_produto = sessionStorage.getItem('loggedin_imagens_produto');

$scope.GuardaProduto2=function(){
 $ionicPopup.alert({cssClass: 'custom-class',
 title:'Informação',
 template:'Funcionalidade em construção!'
});
}
//GuardaProduto fruta
$scope.data= {};
$scope.GuardaProduto3=function(nome, id, valor, promo_valor, imagens, quantity){
 // definir nome, desc, valor e atribuilos as variaveis (pegar na desc produto esses valores)
 //definindo
 var lst = '';

// sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
sessionStorage.setItem('lst' , lst);
sessionStorage.setItem('valorAd' , '');
sessionStorage.setItem('nomeAd' , '');
 sessionStorage.setItem('loggedin_nome_produto',nome);
 sessionStorage.setItem('loggedin_id_produto',id);
 sessionStorage.setItem('loggedin_valor_produto',valor);
 sessionStorage.setItem('loggedin_promo_valor_produto',promo_valor);
 sessionStorage.setItem('loggedin_imagens_produto',imagens);



 var imp = 0;
imp = sessionStorage.getItem('Verifica');
if  ( imp == '0'){
 $ionicPopup.alert({cssClass: 'custom-class',
 title:'Informação',
 template:'Infelizmente estamos fechados agora!'
});
}else {
//$scope.buttonDisabled = true;

 //atribuindo
 if ($scope.loggedin_id == '' || $scope.loggedin_id == null  )
 {
      $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Necessário Login.'
   });
 $("#preloader").fadeOut();
   $state.go('tab.login',[],{location:"replace",reload:true});
           return;
 }

else{
// lst = sessionStorage.getItem('lst');

 if(lst == ''){

   $scope.semObsx = sessionStorage.getItem('semOBS');


 var minhatemplate = '';
 switch ($scope.semObsx) {
   case '0':
     minhatemplate = '';
     break;
   case '1':
     minhatemplate = '<input type="text" ng-model="data.obs" placeholder="Observação (Opcional)" />';
     break;
 }
 $scope.data.obs = '';
     $ionicPopup.prompt({
       //template: '<input type="text" ng-model="observacao" placeholder="Observação (Opcional)">',
       title: 'Deseja adicionar ao carrinho?',
       template: minhatemplate,
       scope: $scope,
       buttons: [
         { text: 'Cancelar',
           onTap: function(e) {return 'cancel'}
       },
         {
           text: 'Adicionar',
           type: 'button-positive',
           onTap: function(e) {
             console.log($scope.data.obs);
             return $scope.data.obs;}
         },
       ]
     }).then(function(res) {

       if(res == 'cancel') { return;}
       $("#preloader").fadeIn();

   //repetindo codigo para que seja possivel a mensagem aparecer apenas a > 1 adicional

   $scope.loggedin_status = localStorage.getItem('loggedin_status');
 var nomeProduto = nome;
 var idProduto = id;
 //adicionais
 var nomeAd = sessionStorage.getItem('nomeAd');
 var valorAd = sessionStorage.getItem('valorAd');
 //fim adicionais
  //Complementos
  var nomeCd = sessionStorage.getItem('nomeCd');
  var valorCd = sessionStorage.getItem('valorCd');
  //fim complementos
 var idUser = $scope.loggedin_id;
 var valorProd = valor;
 var promo_valorProd = promo_valor;
 var imagensProd = imagens;
 var quantidadeProd = quantity;
 var nomeCliente = $scope.loggedin_status;
 var observacao = $scope.data.obs;
 var categoria = sessionStorage.getItem('loggedin_id_cat');
 var quantidade = $scope.rofl;

 sessionStorage.setItem('loggedin_obs_prod',$scope.data.obs);

//INSERT DE DADOS
 if( nomeProduto ){

   $scope.loggedin_obs_prod = sessionStorage.getItem('loggedin_obs_prod');

   var observacao = $scope.loggedin_obs_prod

   str= urlApi2 + "cart-insert.php?nomeProduto=" + nomeProduto + "&idUser=" + idUser + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&promo_valor=" + promo_valorProd  +"&idProduto=" + idProduto + "&valor=" + valorProd + "&imagens=" + imagensProd + "&nomeCliente=" + nomeCliente + "&quantidade=" + quantidadeProd + "&observacao=" + observacao;

   $http.get(str)
   .success(function(response){

     if(response==true){
       $("#preloader").fadeOut();
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Adicionado ao carrinho com sucesso!'
       });
           //var lst = '';

// sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
sessionStorage.setItem('lst' , lst);
sessionStorage.setItem('valorAd' , '');
sessionStorage.setItem('nomeAd' , '');
sessionStorage.setItem('loggedin_obs_prod', '');
$scope.data.obs = '';
      // $state.go('tab.lista',[],{location:"replace",reload:true});

     }else{
       $("#preloader").fadeOut();
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template: 'Não foi possivel, tente mais tarde!'
        // template:'Não é possível gravar dados.'
       });
       $state.go('produtos',[],{location:"replace",reload:true});

     }
   }).error(function(){
     $("#preloader").fadeOut();
     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template:'Não é possível fazer o contato do servidor.'
     });
   })
 }else{
   $("#preloader").fadeOut();
   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Por favor, preencha todas as informações.'
   });}

 } ) ;





}
 if($scope.rofl > 0 && lst){


 if($scope.rofl == 1 && lst){
   var confirmPopup = $ionicPopup.confirm({
     cssClass: 'custom-class',
     title: 'Pergunta:',
     template: 'Tudo certo?'
   });

 }
 if($scope.rofl != 1 && lst){
     var confirmPopup = $ionicPopup.confirm({
       cssClass: 'custom-class',
       title: 'Pergunta:',
       template: 'Adicional será aplicado a '+ $scope.rofl +' produto[s], tem certeza? Caso deseje em apenas 1, peça o produto individualmente.'
     });
   }
     confirmPopup.then(function(res) {
       if(res) {

 $scope.loggedin_status = localStorage.getItem('loggedin_status');


 var nomeProduto = $scope.loggedin_nome_produto;
 var idProduto = $scope.loggedin_id_produto;
 //adicionais
    var nomeAd = sessionStorage.getItem('nomeAd');
    var valorAd = sessionStorage.getItem('valorAd');
 //fim adicionais
  //complementos
  var nomeCd = sessionStorage.getItem('nomeCd');
  var valorCd = sessionStorage.getItem('valorCd');
//fim complementos
 var idUser = $scope.loggedin_id;
 var valor = $scope.loggedin_valor_produto;
 var promo_valor = $scope.loggedin_promo_valor_produto;
 var imagens = $scope.loggedin_imagens_produto;
 var nomeCliente = $scope.loggedin_status;
 var observacao = $scope.form.observacao;
 var categoria = sessionStorage.getItem('loggedin_id_cat');
 var quantidade = $scope.rofl;

 sessionStorage.setItem('loggedin_obs_prod',$scope.form.observacao);

//INSERT DE DADOS
 if( nomeProduto ){

   $scope.loggedin_obs_prod = sessionStorage.getItem('loggedin_obs_prod');

   var observacao = $scope.loggedin_obs_prod

   str= urlApi2 + "cart-insert.php?nomeProduto=" + nomeProduto + "&idUser=" + idUser + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&promo_valor=" + promo_valor  +"&idProduto=" + idProduto + "&valor=" + valor + "&imagens=" + imagens + "&nomeCliente=" + nomeCliente + "&quantidade=" + quantidade + "&observacao=" + observacao;

   $http.get(str)
   .success(function(response){

     if(response==true){

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Adicionado ao carrinho com sucesso!'
       });
           var lst = '';

// sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
sessionStorage.setItem('lst' , lst);
sessionStorage.setItem('valorAd' , '');
sessionStorage.setItem('nomeAd' , '');
       $state.go('tab.lista',[],{location:"replace",reload:true});

     }else{

       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template: 'Não foi possivel, tente mais tarde!'
        // template:'Não é possível gravar dados.'
       });
       $state.go('produtos',[],{location:"replace",reload:true});

     }
   }).error(function(){
     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template:'Não é possível fazer o contato do servidor.'
     });
   })
 }else{
   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Por favor, preencha todas as informações.'
   });
 }

} else {
// $scope.buttonDisabled = false;
}});}

}
}}
//FimProduto fruta
$scope.saveC=function() {
    //só descomentar
    var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
    var idUserP = localStorage.getItem("loggedin_id");
    var idAD = sessionStorage.getItem("comple");
    var urlApi7 = 'https://topentregas.com.br/ionic/complementos/'; //online
  //console.log("" + $scope.lst);
  //inicio tentativa

  if ($scope.comple == '') {

  //$scope.limpar();
  //$state.go('descricao-produto',[],{location:"replace",reload:true});
  //return;

  }


  str= urlApi7 + "add_complementos.php?idAD=" + idAD + "&idProdutoP=" + idProdutoP + "&idUser=" + idUserP;

  $http.get(str)
  .success(function(response){

    if(response==true){

    // $scope.closeModalAdicional();

     // $( "#here" ).load(window.location.href + " #here" );
   //  window.top.location = window.top.location

    //  $state.go('descricao-produto',[],{location:"replace",reload:true});

    }else{

      $ionicPopup.alert({cssClass: 'custom-class',
        title:'Erro!',
        template:'Algo deu errado.'
      });
     // $state.go('tab.main',[],{location:"replace",reload:true});
    }
  })
}
$scope.GuardaProduto=function(){
  //definir nome, desc, valor e atribuilos as variaveis (pegar na desc produto esses valores)
  //definindo

var urlApiGP = 'https://topentregas.com.br/ionic/complementos/';
var idEmpresa = Empresa.numero;
var idProduto = sessionStorage.getItem('loggedin_id_produto');
var MeusComplementos = sessionStorage.getItem("comple");
$scope.loggedin_temcomple = sessionStorage.getItem('loggedin_temcomple');

$scope.showOnlyComplementos = [];
var liberado = 1;
str = urlApiGP + "show_only_cat_comple.php?idEmpresa=" + idEmpresa + "&idProduto=" + idProduto;
$http.get(str).success(function(response){
 $scope.showOnlyComplementos=response.records;

 //inicio
// console.log("" + $scope.showOnlyComplementos.length);
sessionStorage.setItem("Liberado", 1);


 for (var i = 0; i < $scope.showOnlyComplementos.length; i++) {
 if($scope.showOnlyComplementos[i].CompleObriga == 1) {
   var numbercomple = [];
   var groupcheck = 0;
   var numbercomple = $scope.showOnlyComplementos[i].numbercomple;
   var groupcheck = $('input[name="comple['+ numbercomple +']"]:checked').length;
  // console.log("GroupCheck: " + groupcheck);
   //NUMERO DO COMPLE, SE É 1 OU 2, POIS ISSO INDICA A QUAL CATEGORIA ELE ESTÁ
  if(groupcheck < $scope.showOnlyComplementos[i].qtdMin) {
   // console.log("Necessário preecher complemento obrigatório");
    sessionStorage.setItem("Liberado", 0);
    liberado = sessionStorage.getItem("Liberado");
  }
 }
}
 //fim
})

$("#preloader").fadeIn();
$timeout(function() {
if(liberado == 0) {
$ionicPopup.alert({cssClass: 'custom-class',
title:'Informação',
template:'Necessário preencher corretamente o[s] complemento[s] obrigatório[s].'
});
}
 if(liberado == 1) {

  $scope.saveC();
//só descomentar
var idProdutoP = sessionStorage.getItem("loggedin_id_produto");
var idUserP = localStorage.getItem("loggedin_id");
var idAD = sessionStorage.getItem("lst");
var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
//console.log("" + $scope.lst);
//inicio tentativa
if ($scope.lst == '') {}

str= urlApi7 + "add_adicionais.php?idAD=" + idAD + "&idProdutoP=" + idProdutoP + "&idUser=" + idUserP;

$http.get(str)
.success(function(response){

if(response==true){

// $scope.closeModalAdicional();

 // $( "#here" ).load(window.location.href + " #here" );
//  window.top.location = window.top.location

//  $state.go('descricao-produto',[],{location:"replace",reload:true});

}else{

  $ionicPopup.alert({cssClass: 'custom-class',
    title:'Erro!',
    template:'Algo deu errado.'
  });
 // $state.go('tab.main',[],{location:"replace",reload:true});

}
})


      var idAD = sessionStorage.getItem("lst");
      var empresa = Empresa.numero;
      var urlApi7 = 'https://topentregas.com.br/ionic/adicionais/'; //online
    //console.log("" + $scope.lst);
    var total = 0;
      if (idAD != null || idAD != '') {


    str= urlApi7 + "getad.php?idAD=" + idAD + "&empresa=" + empresa;

    $http.get(str)
    .success(function(response){

           $scope.mostrarCerto=response.records;

            var total = 0;
           $scope.getValueAD = function() {
            //for (var i = $scope.mostrarCerto.length - 1; i >= 0; i--) {
            for (var i = 0; i < $scope.mostrarCerto.length; i++) {
              total += parseFloat(parseFloat($scope.mostrarCerto[i].valor));
           }
           return total;
          }
          sessionStorage.setItem('valorAd' , $scope.getValueAD());
          $scope.valorAd = sessionStorage.getItem('valorAd');
         //false to not run another digest
          var nome = "";
          $scope.getNomeAD = function(){
            //for (var i = $scope.mostrarCerto.length - 1; i >= 0; i--) {
            for (var i = 0; i < $scope.mostrarCerto.length; i++) {
                if(nome != "") { nome += ', '};
              nome += ($scope.mostrarCerto[i].nome);
           }
           return nome;
          }
          sessionStorage.setItem('nomeAd' , $scope.getNomeAD());
    })
  }
if (sessionStorage.getItem("lst") == '') {
$scope.finn = "nenhum";
}else{
 $scope.finn = sessionStorage.getItem("lst");
 }
 //complemento aprte
 str2= urlApiGPB + "show_arc_complementos.php?idEmpresa=" + idEmpresa;

 $http.get(str2)
 .success(function(response){

    $scope.showAdicionaisNB=response.records;

 })

  var idProduto = sessionStorage.getItem("loggedin_id_produto");
  var idUser = localStorage.getItem("loggedin_id");

 str2= urlApiGPB + "show_addCART.php?idUser=" + idUser + "&idProduto=" + idProduto;

 $http.get(str2)
 .success(function(response){

    $scope.showAdicionaisCartB=response.records;

    angular.forEach($scope.showAdicionaisCartB, function (adicionalB) {
      var meuArrayB = Array;
      meuArrayB = adicionalB.id_adicionalB;
      $scope.adicionalB = meuArrayB;
     });


})

var idAD = sessionStorage.getItem("comple");
var empresa = Empresa.numero;
var urlApi7 = 'https://topentregas.com.br/ionic/complementos/'; //online
//console.log("" + $scope.lst);
var total = 0;
if (idAD != null || idAD != '') {

str= urlApi7 + "getad.php?idAD=" + idAD + "&empresa=" + empresa;

$http.get(str)
.success(function(response){

     $scope.mostrarCertoB=response.records;
      var total = 0;

     $scope.getValueADB = function() {

      for (var i = 0; i < $scope.mostrarCertoB.length; i++) {
        total += parseFloat(parseFloat($scope.mostrarCertoB[i].valorComplemento));
     }

     return total;
    }

    sessionStorage.setItem('valorCd' , $scope.getValueADB());
    $scope.valorCd = sessionStorage.getItem('valorCd');

    var nome = "";
    $scope.getNomeADB = function(){

      for (var i = 0; i < $scope.mostrarCertoB.length; i++) {
          if(nome != "") { nome += ', '};
        nome += ($scope.mostrarCertoB[i].nomeComplemento);

     }
     return nome;
    }
    sessionStorage.setItem('nomeCd' , $scope.getNomeADB());

})
}
if (sessionStorage.getItem("comple") == '') {
$scope.finn = "nenhum";
}else{
$scope.finn = sessionStorage.getItem("comple");
}
//$scope.comple = [];
//fim
  var imp = 0;
imp = sessionStorage.getItem('Verifica');
if  ( imp == '0'){
  $ionicPopup.alert({cssClass: 'custom-class',
  title:'Informação',
  template:'Infelizmente estamos fechados agora!'
});
}else {
$scope.buttonDisabled = true;

  //atribuindo
  if ($scope.loggedin_id == '' || $scope.loggedin_id == null  )
  {
       $ionicPopup.alert({cssClass: 'custom-class',
      title:'Informação',
      template:'Necessário Login.'
    });
    $("#preloader").fadeOut();
    $state.go('tab.login',[],{location:"replace",reload:true});
            return;
  }

 else{
  lst = sessionStorage.getItem('lst');

  if(lst == ''){

    var confirmPopup = $ionicPopup.confirm({
      cssClass: 'custom-class',
      title: 'Pergunta:',
      template: 'Deseja adicionar ao carrinho ?'
    });

    confirmPopup.then(function(res) {
      if(res) {
       $timeout(function() {

    //repetindo codigo para que seja possivel a mensagem aparecer apenas a > 1 adicional

 $scope.loggedin_status = localStorage.getItem('loggedin_status');
var nomeProduto = $scope.loggedin_nome_produto;
var idProduto = $scope.loggedin_id_produto;
  //adicionais
var nomeAd = sessionStorage.getItem('nomeAd');
var valorAd = sessionStorage.getItem('valorAd');
  //fim adicionais
       //complementos
 var nomeCd = sessionStorage.getItem('nomeCd');
 var valorCd = sessionStorage.getItem('valorCd');
    //fim complementos
  var idUser = $scope.loggedin_id;
  var valor = $scope.loggedin_valor_produto;
  var promo_valor = $scope.loggedin_promo_valor_produto;
  var imagens = $scope.loggedin_imagens_produto;
  var nomeCliente = $scope.loggedin_status;
  var observacao = $scope.form.observacao;
  var categoria = sessionStorage.getItem('loggedin_id_cat');
  var quantidade = $scope.rofl;

  sessionStorage.setItem('loggedin_obs_prod',$scope.form.observacao);

//INSERT DE DADOS
  if( nomeProduto ){

    $scope.loggedin_obs_prod = sessionStorage.getItem('loggedin_obs_prod');

    var observacao = $scope.loggedin_obs_prod

    str= urlApi2 + "cart-insert.php?nomeProduto=" + nomeProduto + "&idUser=" + idUser + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&promo_valor=" + promo_valor  +"&idProduto=" + idProduto + "&valor=" + valor + "&imagens=" + imagens + "&nomeCliente=" + nomeCliente + "&quantidade=" + quantidade + "&observacao=" + observacao;

    $http.get(str)
    .success(function(response){

      if(response==true){

        $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template:'Adicionado ao carrinho com sucesso!'
        });
            var lst = '';

// sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
sessionStorage.setItem('lst' , lst);
sessionStorage.setItem('valorCd' , '');
sessionStorage.setItem('nomeCd' , '');
sessionStorage.setItem('valorAd' , '');
sessionStorage.setItem('nomeAd' , '');
       $state.go('tab.lista',[],{location:"replace",reload:true});

      }else{

        $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template: 'Não foi possivel, tente mais tarde!'
         // template:'Não é possível gravar dados.'
        });
        $state.go('descricao-produto',[],{location:"replace",reload:true});

      }
    }).error(function(){
      $ionicPopup.alert({cssClass: 'custom-class',
        title:'Informação',
        template:'Não é possível fazer o contato do servidor.'
      });
    })
  }else{
    $ionicPopup.alert({cssClass: 'custom-class',
      title:'Informação',
      template:'Por favor, preencha todas as informações.'
    });
  } $("#preloader").fadeOut(); }, 1000);
} else {
 $("#preloader").fadeOut();
  $scope.buttonDisabled = false;
}} );
}

  if($scope.rofl > 0 && lst){


  if($scope.rofl == 1 && lst){
    var confirmPopup = $ionicPopup.confirm({
      cssClass: 'custom-class',
      title: 'Pergunta:',
      template: 'Tudo certo?'
    });

  }

  if($scope.rofl != 1 && lst){
      var confirmPopup = $ionicPopup.confirm({
        cssClass: 'custom-class',
        title: 'Pergunta:',
        template: 'Adicional será aplicado a '+ $scope.rofl +' produto[s], tem certeza? Caso deseje em apenas 1, peça o produto individualmente.'
      });
    }
      confirmPopup.then(function(res) {
        if(res) { $timeout(function() {

  $scope.loggedin_status = localStorage.getItem('loggedin_status');

  var nomeProduto = $scope.loggedin_nome_produto;
  var idProduto = $scope.loggedin_id_produto;
  //adicionais
     var nomeAd = sessionStorage.getItem('nomeAd');
     var valorAd = sessionStorage.getItem('valorAd');
  //fim adicionais
       //Complementos
       var nomeCd = sessionStorage.getItem('nomeCd');
       var valorCd = sessionStorage.getItem('valorCd');
    //fim Complementos
  var idUser = $scope.loggedin_id;
  var valor = $scope.loggedin_valor_produto;
  var promo_valor = $scope.loggedin_promo_valor_produto;
  var imagens = $scope.loggedin_imagens_produto;
  var nomeCliente = $scope.loggedin_status;
  var observacao = $scope.form.observacao;
  var categoria = sessionStorage.getItem('loggedin_id_cat');
  var quantidade = $scope.rofl;
  sessionStorage.setItem('loggedin_obs_prod',$scope.form.observacao);

//INSERT DE DADOS
  if( nomeProduto ){

    $scope.loggedin_obs_prod = sessionStorage.getItem('loggedin_obs_prod');

    var observacao = $scope.loggedin_obs_prod

    str= urlApi2 + "cart-insert.php?nomeProduto=" + nomeProduto + "&idUser=" + idUser + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&promo_valor=" + promo_valor  +"&idProduto=" + idProduto + "&valor=" + valor + "&imagens=" + imagens + "&nomeCliente=" + nomeCliente + "&quantidade=" + quantidade + "&observacao=" + observacao;

    $http.get(str)
    .success(function(response){

      if(response==true){

        $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template:'Adicionado ao carrinho com sucesso!'
        });

 var lst = '';

// sessionStorage.setItem('lst' ,JSON.stringify($scope.lst));
sessionStorage.setItem('lst' , lst);
sessionStorage.setItem('valorAd' , '');
sessionStorage.setItem('nomeAd' , '');
sessionStorage.setItem('comple' , '');
sessionStorage.setItem('valorCd' , '');
sessionStorage.setItem('nomeCd' , '');
        $state.go('tab.lista',[],{location:"replace",reload:true});
      }else{
        $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template: 'Não foi possivel, tente mais tarde!'
         // template:'Não é possível gravar dados.'
        });
        $state.go('descricao-produto',[],{location:"replace",reload:true});
      }
    }).error(function(){
      $ionicPopup.alert({cssClass: 'custom-class',
        title:'Informação',
        template:'Não é possível fazer o contato do servidor.'
      });
    })
  }else{
    $ionicPopup.alert({cssClass: 'custom-class',
      title:'Informação',
      template:'Por favor, preencha todas as informações.'
    });
  }
  $("#preloader").fadeOut(); }, 1000);
} else {
 $("#preloader").fadeOut();
  $scope.buttonDisabled = false;
}

}); }


}}
} $("#preloader").fadeOut(); }, 2000);}
})

.controller('RetiradaCtrl', function($scope, $http, $state, $ionicPopup, $ionicModal, Empresa){
 $chave = '';
 var urlApi1 = 'https://topentregas.com.br/ionic/showNovidades.php?chave=' + $chave; //online
 var urlApi2 = 'https://topentregas.com.br/ionic/'; //online
 $scope.nomeEmpresaFacil = Empresa.nome;

//Endereco Picado
$scope.RuaEnderecoM = Empresa.RuaEndereco;
$scope.BairroEnderecoM = Empresa.BairroEndereco;
$scope.CidadeEnderecoM = Empresa.CidadeEndereco;
$scope.PaisEnderecoM = Empresa.PaisEndereco;

   $("#preloader").fadeIn();

   //começo modal pedido
   $ionicModal.fromTemplateUrl('my-ModalRetirada.html', {
     scope: $scope,
     backdropClickToClose: false,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.ModalRetirada = modal;
   });

   $scope.openModalRetirada = function() {
     $scope.ModalRetirada.show();
   };
   $scope.closeModalRetirada = function() {
   $scope.ModalRetirada.hide();
   };
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
     $scope.ModalRetirada.remove();
   });

   // Execute action on hide modal
   $scope.$on('ModalRetirada.hidden', function() {
     // Execute action
   });

   // Execute action on remove modal
   $scope.$on('ModalRetirada.removed', function() {
     // Execute action
   });
   //fim modal pedido
   //fim modal

   // modal

$scope.entreguem = function() {
 $state.go('tab.carrinho',[],{location:"replace",reload:true});
}

     var idUser = localStorage.getItem('loggedin_id');
     str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;

     $http.get(str2).success(function(response){

       $scope.showCart=response.records;


         if ($scope.showCart.length == 0) {


          $state.go('tab.lista',[],{location:"replace",reload:true});
          $ionicPopup.alert({cssClass: 'custom-class',
            title:'Informação',
            template: 'Adicione algum item para visualizar retirada no balcão.'
          });
          return;
       }else{

       }

       });

    //teste horario open
    var idEmpresa = Empresa.numero;
         str= urlApi2 + "verificaHora.php?idEmpresa=" + idEmpresa;

       $http.get(str)
       .success(function(response){
         $("#preloader").fadeOut();
         if(response==true){
        sessionStorage.setItem('Verifica',1);
         }
         else{
          sessionStorage.setItem('Verifica',0); //aqui para 0
         }
       })
       sessionStorage.getItem('Verifica');

         // fim do meu teste
   //var origin = 'R. Prudente de Moraes, 1465 - Parque Industrial, São José do Rio Preto - SP, 15025-045, Brasil';

   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   //idUser = $scope.loggedin_in;
     var idUser = $scope.loggedin_id;
   str= urlApi2 + "admin-show.php?idUser=" + idUser + "&chave=" + $chave;

   //pegando aqui o endereço do individuo
    $http.get(str).success(function(response){
      $scope.showUsers=response.records;

     })
   /// inicio pegar valor frete

      $scope.loggedin_id = localStorage.getItem('loggedin_id');
//idUser = $scope.loggedin_in;
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
 var idUser = $scope.loggedin_id;
str10= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;
  $http.get(str10).success(function(response){
    $scope.showEnd=response.records;
//pegando aqui o endereço do individuo

     $scope.getCidade = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].cidade); }
   return total;
    }
$scope.showEnd.cidade = $scope.getCidade();

   if($scope.showEnd.cidade == '' || $scope.showEnd.cidade == null || $scope.showEnd.cidade == undefined ){

     var confirmPopup = $ionicPopup.confirm({
       cssClass: 'custom-class',
       title: 'Pergunta:',
       template: 'Necessário que cadastre seu endereço para visualizar o carrinho, deseja cadastrar agora?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         sessionStorage.setItem('menuPerfil', 3);
         $state.go('endereco',[],{location:"replace",reload:true});
       }
       else {
         $state.go('tab.lista',[],{location:"replace",reload:true});
  return;
       } })
return;

   };
         $scope.getRua = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].rua); }
   return total;
    }
         $scope.getBairro = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].bairro); }
   return total;
    }
    $scope.getCep = function(){
      var total = "";
      for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
        total = ($scope.showEnd[i].CEP); }
    return total;
     }
         $scope.getNumero = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].numero); }
   return total;
    }
         $scope.getUF = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].uf); }
   return total;
    }
    $scope.getComplementoCliente = function()
    {
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].complemento);
   }
   return total;
    }
    $scope.getTelefoneCliente = function()
    {
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].telefoneCliente);
   }
   return total;
    }

//fim endereco individuo

sessionStorage.setItem('cityc',$scope.getCidade());
sessionStorage.setItem('ruac',$scope.getRua());
sessionStorage.setItem('bairroc',$scope.getBairro());
sessionStorage.setItem('numeroc',$scope.getNumero());
sessionStorage.setItem('ufc',$scope.getUF());


var ruaC = sessionStorage.getItem('ruac');
var numeroC = sessionStorage.getItem('numeroc');
var bairroC = sessionStorage.getItem('bairroc');
var cidadeC = sessionStorage.getItem('cityc');
var ufC =  sessionStorage.getItem('ufc');
var paisC = 'Brasil';


var origin = Empresa.localizacao;
//var origin = ruaA + ', ' + numeroA +' - '+cidadeA+' - '+ufA+', '+paisA+''; //endereço da empresa
var destination = ruaC + ', ' + numeroC +' - '+bairroC+ '-' +cidadeC+' - '+ufC+', '+paisC+''; //endereço do cliente
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
//var destination = 'R. Prudente de Moraes, 1467 - São José do Rio Preto - SP, Brasil'; //endereço do cliente
//VenuesAppServices.factory('VenueDistance', ['$resource',function($resource){
//return $resource('http://google.com/maps/api/distancematrix/json?origins='+ origin +'&destinations='+ destination, {}, { Distance: {method:'GET'}});}]);
//Key = AIzaSyBJEzfpDsJTA2hG3gyo7eUx6lQCGoW8c4w;
var googleMapsApiKey='AIzaSyCGU0PK5ks0K4jqqAZ6l2A6FKWUknklPkM';
//var urlAPIG = ('http://google.com/maps/api/distancematrix/json?origins='+ origin +'&destinations='+ destination +'&key=' + googleMapsApiKey);
//     strEnd= urlAPIG;
//       $http.get(strEnd)
//       .success(function(response){
//        $scope.showEndG=response.records;
//        console.log(showEndG);
//     })

      // var urlApiGP = 'https://topentregas.com.br/ionic/info.php?origins='+ origin +'&destinations='+ destination +'&key=' + googleMapsApiKey;
      $scope.loggedin_id = localStorage.getItem('loggedin_id');

      var urlApiGP = 'https://topentregas.com.br/ionic/' + Empresa.Tipo;

      str= urlApiGP + "economiaKey.php?idUser=" + $scope.loggedin_id + "&origin=" + origin + "&destination=" + destination + "&chave=" + $chave;

      $http.get(str)
      .success(function(response){

        if(response==true){

        }else{

          $ionicPopup.alert({cssClass: 'custom-class',
            title:'Informação',
            template: 'Endereço errado ou fora da area!'
           // template:'Não é possível gravar dados.'
          });
          $state.go('tab.main',[],{location:"replace",reload:true});

        }

      }).error(function(){

        $ionicPopup.alert({cssClass: 'custom-class',
          title:'Informação',
          template:'Endereço errado ou fora da area, Frete não calculado!'
        });

      })

})

     // ------ fim pegar valor frete

//CHAMADA HTTP MOSTRAR ITENS NO CARRINHO
//var url="http://localhost/MyApp/ionic/";

 $scope.showCart = {};
      //---------       //---------       //---------       //---------       //---------       //---------       //---------       //---------
      //---------       //---------       //---------       //---------       //---------       //---------       //---------       //---------       //---------

 str10= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;
 //pegando aqui o endereço do individuo
  $http.get(str10).success(function(response){
    $scope.showEnd=response.records;

    $scope.getCidade = function(){
     var total = "";
     for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
       total = ($scope.showEnd[i].cidade); }
   return total;
    }


    $scope.getFrete = function(){
   var total = 0;
   for (var i = $scope.showEnd.length - 1; i >= 0; i--) {
     total = ($scope.showEnd[i].frete); }
 return total;
  }


  sessionStorage.setItem('Frete', $scope.getFrete());
  $urlFrete = sessionStorage.getItem('Frete');


 })

 $scope.irParaRetirada = function (){
   sessionStorage.removeItem('Custom');
   sessionStorage.removeItem('moneyCustom');
   $state.go('retirada-balcao',[],{location:"replace",reload:true});
 }

//
//$scope.loggedin_id = localStorage.getItem('loggedin_id');

//var idUser = $scope.loggedin_id;

 //str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;

//var idUser = $scope.loggedin_id;

 str2= urlApi2 + "show-cart.php?idUser=" + idUser + "&chave=" + $chave;

$http.get(str2).success(function(response){

 $scope.showCart=response.records;
// tentativa falha de esconder carrinho
 //if ($scope.showCart == 0){

//   sessionStorage.setItem('Carrinho',0);

// }else{
  // sessionStorage.setItem('Carrinho',1);
 //}
 //$scope.carrinho = sessionStorage.getItem('Carrinho');

 $scope.getTotalCAdicional = function()
 {
   var novoValor = 0;
   var total = 0;
   var valorAd = 0;
   var valorCd = 0;

   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     var novoValor = 0;
     var valorAd = + $scope.showCart[i].valorAd;
     var valorCd = + $scope.showCart[i].valorCd;
     novoValor += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor);
     novoValor = novoValor + valorAd + valorCd;

     total += parseFloat(novoValor * $scope.showCart[i].quantidade );
 }

 return total;
 }
 $scope.getTotalval = function()
 {
   var novoValor = 0;
   var total = 0;

   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     var novoValor = 0;

      var valorAd = + $scope.showCart[i].valorAd;
      var valorCd = + $scope.showCart[i].valorCd;
  novoValor += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor );
        novoValor = novoValor + valorAd + valorCd;
     total += parseFloat(novoValor * $scope.showCart[i].quantidade );
 }

 return total;

 }

 $scope.getTotal = function()
 {

   var frete = sessionStorage.getItem('Frete');
   var frete1 =  parseFloat(frete);
   var total = 0;
   var novoValor = 0;
   var total1 = 0;
   var valorAd = 0;
   var valorCd = 0;
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     var valorAd = $scope.showCart[i].valorAd;
     var valorCd = $scope.showCart[i].valorCd;
     var novoValor = 0;
     novoValor += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor);
      novoValor = novoValor + valorAd + valorCd;
     total += parseFloat(novoValor * $scope.showCart[i].quantidade);
 }
 total1 += parseFloat(total+ frete1) //
 return total1;

 }

$scope.getClasse = function(){
 $scope.t = 'te';
 return $scope.t;
}
  if($scope.getTotal() == 0){
 $scope.getClasse = function(){
     $scope.t = 'te';
     return $scope.t;
 }}
 else{
   $scope.getClasse = function(){
     $scope.t = 'ten';
     return $scope.t;
 }
}


 $scope.getNomeProduto = function()
 {
   var nomeProduto = "";

   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     var valorProduto = 0;
     var valorTotalPedidoN = 0;
     var adicionalValor = 0;
     var valorCd = 0;

     n = i + 1;
     adicionalNome =  ($scope.showCart[i].nomeAd);
     adicionalValor +=  parseFloat($scope.showCart[i].valorAd);
     observacao =  ($scope.showCart[i].observacao);
     quantidade =  ($scope.showCart[i].quantidade);
     nomeCd = ($scope.showCart[i].nomeCd);
     valorCd += parseFloat($scope.showCart[i].valorCd);
     valorProduto += parseFloat($scope.showCart[i].valor - $scope.showCart[i].promo_valor);
     valorTotalPedidoN += parseFloat((valorProduto + adicionalValor + valorCd) * $scope.showCart[i].quantidade);
     if (observacao == '' || observacao == 'undefined'){
      observacao = "Sem Observação.";
     }
     if (adicionalNome == '' || adicionalNome == null){
       adicionalNome = "Sem adicional.";


      }
      if (nomeCd == '' || nomeCd == null){
        nomeCd = "Sem complemento.";
       }
     if (quantidade == 1){
       nomeProduto = "Pedido "+ n + "<br>" + "Produto: [" + quantidade + "] " +($scope.showCart[i].nomeProduto)+  "<br>" + "Valor: R$" + valorProduto.toFixed(2) +  "<br> Adicional: " + adicionalNome + " <br> " + "Valor: R$" + adicionalValor.toFixed(2)  + " <br> " +  "Complemento(s): " + nomeCd + " <br> " + "Valor: R$" + valorCd.toFixed(2)  + " <br> "  + " Observacao: " + observacao + "<br> Valor total do pedido "+n+": R$" + valorTotalPedidoN.toFixed(2) + " <br> <br>" + nomeProduto  ; // depois do "-" to pensando em por a quantidade que o usuario escolheu.
     }else{
     nomeProduto = "Pedido "+ n + "<br>" + "Produto: [" + quantidade + "] " +($scope.showCart[i].nomeProduto)+  "<br>" + "Valor: R$" + valorProduto.toFixed(2) +  "<br> Adicional: " + adicionalNome + " <br> " + "Valor: R$" + adicionalValor.toFixed(2) + " <br> " +  "Complemento(s): " + nomeCd + " <br> " + "Valor: R$" + valorCd.toFixed(2)  + " <br> " + " Observacao: " + observacao + "<br> Valor total do pedido "+n+": R$" + valorTotalPedidoN.toFixed(2) + " <br> <br>" + nomeProduto  ; // depois do "-" to pensando em por a quantidade que o usuario escolheu.
     }
 }
 return nomeProduto;
 }

 $scope.getIdProduto = function()
 {
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].idProduto);
 }
 return total;
 }
 $scope.getObservacao = function()
 {
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].observacao);
 }
 return total;
 }
   $scope.getnomeAd = function()
 {
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].nomeAd);
 }
 return total;
 }
   $scope.getvalorAd = function()
 {
   for (var i = $scope.showCart.length - 1; i >= 0; i--) {
     total = ($scope.showCart[i].valorAd);
 }
 return total;
 }
// fexamento era la embiaxo

//pegando aqui o endereço do individuo

})

str= urlApi2 + "show-status.php?idUser=" + idUser + "&chave=" + $chave;

$http.get(str).success(function(response){

 $scope.showStatus=response.records;
})
//aqi - manda requisição para gerencial

$scope.ircarrinhoK = function() {
$state.go('tab.carrinho',[],{location:"replace",reload:true});
}

$scope.showConfirmRetirada = function() {
 var confirmPopup = $ionicPopup.confirm({
   cssClass: 'custom-class',
   title: 'Pergunta:',
   template: 'Tem certeza que deseja concluir o pedido?'
 });

 confirmPopup.then(function(res) {
   if(res) {
     $scope.retirada();
   } else {

   }
 });
};

$scope.retirada=function(){
//
// impede o double click
     var imp = 0;
imp = sessionStorage.getItem('Verifica');
if  ( imp == '0'){
     $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Infelizmente estamos fechados agora!'
   });
}else {
$scope.buttonDisabled = true;
str= urlApi2 + "endereco-verifica.php?idUser=" + idUser + "&chave=" + $chave;
//pegando aqui o endereço do individuo
$http.get(str).success(function(response){
  $scope.showEnd=response.records;
  if($scope.showEnd == false){

   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Necessário cadastro de endereço!'
   });

   $state.go('endereco',[],{location:"replace",reload:true}); }
 })

 if($scope.getTotalval() == '0'){

   $ionicPopup.alert({cssClass: 'custom-class',
     title:'Informação',
     template:'Necessário algum pedido no carrinho!'
   });
   $state.go('tab.carrinho',[],{location:"replace",reload:true}); }

   if( $scope.getTotalval() != '0') {

  var cidadeCliente = $scope.getCidade();
  var bairroCliente = $scope.getBairro();
  var cepCliente = $scope.getCep();
  var ruaCliente = $scope.getRua();
  var numeroCasaCliente = $scope.getNumero();
  var telefoneCliente = $scope.getTelefoneCliente();

//alert(parsedJson.rua);
//var parsedJson=JSON.parse(data);
//alert(parsedJson.project_id);

var valor = $scope.getTotalval();
var nomeProduto = $scope.getNomeProduto();
var descricao = $scope.showCart.descricao;

var nomeAd = $scope.getnomeAd();
var valorAd = $scope.getvalorAd();

var nomeCd = sessionStorage.getItem('nomeCd');
var valorCd = sessionStorage.getItem('valorCd');

$scope.loggedin_status = localStorage.getItem('loggedin_status');
var nomeCliente = $scope.loggedin_status;
var observacao = $scope.showStatus.observacao;
var troco = 0;
// money
var troco = sessionStorage.getItem('moneyCustom');
var id_entrega = 1;
var idEmpresa = Empresa.numero;
var complemento = $scope.getComplementoCliente();
//var formaPagamento = $scope.Custom;
var formaPagamento = sessionStorage.getItem('Custom');
var status = "Aguardando";
var frete = "Undefined";

     //continuar daqui

      // $cidadeCliente = $_GET["cidadeCliente"]; pegar de outra tabela
       //$bairroCliente = $_GET["bairroCliente"];pegar de outra tabela
       //$ruaCliente = $_GET["ruaCliente"];pegar de outra tabela
      // $numeroCasaCliente = $_GET["numeroCasaCliente"];pegar de outra tabela
      // $telefoneCliente = $_GET["telefoneCliente"];pegar de outra tabela

       str= urlApi2 + "status_insert_cep.php?valor=" + valor +  "&nomeProduto=" + nomeProduto + "&cepCliente=" + cepCliente + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&frete=" + frete + "&status=" + status + "&nomeCliente=" + nomeCliente + "&observacao=" + observacao + "&chave=" + $chave + "&idEmpresa=" + idEmpresa + "&id_entrega=" + id_entrega + "&complemento=" + complemento + "&telefoneCliente=" + telefoneCliente + "&formaPagamento=" + formaPagamento + "&troco=" + troco + "&descricao=" + descricao + "&numeroCasaCliente=" + numeroCasaCliente + "&ruaCliente=" + ruaCliente + "&bairroCliente=" + bairroCliente + "&cidadeCliente=" + cidadeCliente + "&idUser=" + idUser;

       $http.get(str)
       .success(function(response){

         if(response==true){
                  var appe  = localStorage.getItem('loggedin_status');
                  var frete = sessionStorage.getItem('Frete');
               for (var i = 0; i < $scope.showCart.length; i++) {
                  var ids='';
                  var idUser=0;
                  var ids= $scope.showCart[i].nomeProduto;
                  var nomeCliente= appe;
                  var idUser= $scope.showCart[i].idUser;
                  var nomeAd = $scope.showCart[i].nomeAd;
                  var valorAd = $scope.showCart[i].valorAd;
                  var nomeCd = $scope.showCart[i].nomeCd;
                  var valorCd = $scope.showCart[i].valorCd;
                  var entrega = 1;
                  var idProduto= $scope.showCart[i].idProduto;
                  var valor= $scope.showCart[i].valor;
                  var promo_valor= $scope.showCart[i].promo_valor;
                  var quantidade= $scope.showCart[i].quantidade;
                  var categoria= $scope.showCart[i].categoria_id;
                  var empresa = Empresa.numero;
                  var freteT= frete;
                 str= urlApi2 + "insert_fiscal_com_complementos.php?nomeProduto=" + ids  + "&empresa=" + empresa + "&entrega=" + entrega + "&nomeAd=" + nomeAd + "&valorAd=" + valorAd + "&nomeCd=" + nomeCd + "&valorCd=" + valorCd + "&categoria=" + categoria + "&frete=" + freteT + "&idProduto=" + idProduto + "&nomeCliente=" + nomeCliente + "&idUser=" + idUser + "&valor=" + valor + "&promo_valor=" + promo_valor + "&idProduto=" + idProduto + "&idProduto=" + idProduto + "&quantidade=" + quantidade;
                 $http.get(str)
                 .success(function(){
                 }).error(function(){
                 })
               }

        //   $ionicPopup.alert({cssClass: 'custom-class',
         //    title:'Informação',
         //    template:'Pedido enviado com sucesso. Caso seja pedido, por favor anote o numero do pedido.'
         //  });
          // $state.go('tab.status',[],{location:"replace",reload:true});

         }else{

           $ionicPopup.alert({cssClass: 'custom-class',
             title:'Informação',
             template:'Não é possível gravar dados.'
           });
           $state.go('tab.carrinho',[],{location:"replace",reload:true});

         }

       }).error(function(){
         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não é possível fazer o contato do servidor.'
         });
       })
      $scope.delCarrinhoAcc();
 }
}
;}

//LIMPAR CARRINHO
$scope.loggedin_id = localStorage.getItem('loggedin_id');
idUser = $scope.loggedin_id;

$scope.showConfirmdelCarrinhoRe = function() {
 var confirmPopup = $ionicPopup.confirm({
   cssClass: 'custom-class',
   title: 'Pergunta:',
   template: 'Tem certeza que deseja limpar o carrinho?'
 });

 confirmPopup.then(function(res) {
   if(res) {
     $scope.delCarrinhoRetirada();
   } else {

   }
 });
};

 $scope.delCarrinhoRetirada=function(){
   $scope.buttonDisabled = true;
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
var idUser = $scope.loggedin_id;

   str= urlApi2 + "cart-del-all.php?idUser=" + idUser + "&chave=" + $chave;

     $http.get(str)
     .success(function(response){
       if(response==true){
         $state.go('tab.carrinho',[],{location:"replace",reload:true});
       }else{
         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não foi possivel, configura se está tudo certo e tente denovo.'
         });
         // era admin-admin
         $state.go('tab.carrinho',[],{location:"replace",reload:true});
       }
     }).error(function(){
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });
     })
 };
   $scope.delCarrinhoAcc=function(){
   $scope.buttonDisabled = true;
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   var idUser = $scope.loggedin_id;
   str= urlApi2 + "cart-del-all.php?idUser=" + idUser + "&chave=" + $chave;
     $http.get(str)
     .success(function(response){
       if(response==true){
         var alertPopup = $ionicPopup.alert({
           cssClass: 'custom-class',
           title: 'Informação',
           template: 'Pedido enviado com sucesso. Caso seja pedido, por favor anote o numero do pedido.'
         });

         alertPopup.then(function(res) {
           $state.go('tab.status',[],{location:"replace",reload:true});
         });

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não foi possivel, configura se está tudo certo e tente denovo.'
         });
         // era admin-admin
         $state.go('tab.carrinho',[],{location:"replace",reload:true});
       }
     }).error(function(){
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });
     })
 };
 $scope.ConfirmaCarrinho=function(){
   $scope.loggedin_id = localStorage.getItem('loggedin_id');
   idUser = $scope.loggedin_in;
   str= urlApi2 + "endereco-show.php?idUser=" + idUser + "&chave=" + $chave;

   $http.get(str).success(function(response){
     $scope.showEnd=response.records;
       if($scope.showEnd.id_usuarios != $scope.loggedin_id ){
         $state.go('endereco',[],{location:"replace",reload:true});
       }
   })

 };
 //deletar item carrinho
 $scope.delItemCart=function(id){
  $("#preloader").fadeIn();
  $scope.buttonDisabled = true;
   if(id){
     str= urlApi2 + "cart-del-item.php?id=" + id + "&chave=" + $chave;
     $http.get(str)
     .success(function(response){

       if(response==true){

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Item retirado!'
         });
         $scope.buttonDisabled = false;
         $state.go('retirada-balcao',[],{location:"replace",reload:true});

       }else{

         $ionicPopup.alert({cssClass: 'custom-class',
           title:'Informação',
           template:'Não é possível retirar, tente mais tarde!'
         });
         // era admin-admin
         $scope.buttonDisabled = false;
         $state.go('retirada-balcao',[],{location:"replace",reload:true});
       }
     }).error(function(){
       $ionicPopup.alert({cssClass: 'custom-class',
         title:'Informação',
         template:'Não é possível fazer o contato do servidor.'
       });
       $scope.buttonDisabled = false;
     })
   }else{
     $ionicPopup.alert({cssClass: 'custom-class',
       title:'Informação',
       template:'Não pode retirar.'
     });
     $scope.buttonDisabled = false;
   }
 };
 $("#preloader").fadeOut();
});
//  se quiser adicionar mais controller tem que tirar o ponto e virgula, e colocalo no final da proxima controller


