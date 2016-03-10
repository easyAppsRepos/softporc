'Use Strict';


angular.module('App').controller('homeController', function ($scope,$firebaseObject, $firebaseArray,$ionicSideMenuDelegate, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  

    $scope.usuario=localStorage.getItem('ngStorage-email').replace('"','');
  $scope.usuario=$scope.usuario.replace('"','');
  $scope.usuarioID=localStorage.getItem("ngStorage-userkey").replace('"','');
  $scope.usuarioID=  $scope.usuarioID.replace('"','');
  
//  var ref = new Firebase(FURL+"/granjas/correoDueno");
  var ref = new Firebase(FURL);
 //nombre de usuario **Pendiente**

var refUsuario=new Firebase(FURL+'/granjas/'+$scope.usuarioID);

function alertOK(tipo){


	if(tipo==1){Utils.alertshow("Granja agregada","La granja fue agregada correctamente");}
	if(tipo==2){Utils.alertshow("Galpon agregado","El galpon fue agregado correctamente");}
	if(tipo==3){Utils.alertshow("Corral agregado","El corral fue agregado correctamente");}
	if(tipo==4){Utils.alertshow("Inmunocastracion agregada","La inmunocastracion fue agregada correctamente");}
  if(tipo==6){Utils.alertshow("Error","Necesita especificar una granja");}
}
  $scope.granjas=$firebaseArray(ref.child("granjas"));

// Attach an asynchronous callback to read the data at our posts reference
refUsuario.on("value", function(snapshcot) {
  //$scope.granjasUser=Object.keys(snapshot.val());
/*snapshot.forEach(function(messageSnapshot) {
    // Will be called with a messageSnapshot for each child under the /messages/ node
    var key = messageSnapshot.key();  // e.g. "-JqpIO567aKezufthrn8"


    console.log(messageSnapshot.key());
    console.log(snapshot.key());
  });

*/
  if(snapshcot.val()==null){

    console.log("undefuned");
    $scope.corralesGranja={};
  }

  else{ $scope.granjasUser=Object.keys(snapshcot.val());}

 
});

/*
app.controller('MainCtrl', function($scope) {
  $scope.listOfOptions = ['One', 'Two', 'Three'];

  $scope.selectedItemChanged = function(){
    $scope.calculatedValue = 'You selected number ' + $scope.selectedItem;
  }
});

And the HTML:

<select ng-options="option for option in listOfOptions" 
        ng-model="selectedItem"
        ng-change="selectedItemChanged()">
</select>

*/
$scope.cambioCorral=function(galponNombre,granjaNombre){
console.log(galponNombre + "  s  "+granjaNombre);



    refUsuario3= new Firebase(FURL+'/granjas/'+$scope.usuarioID+'/'+granjaNombre+"/"+'galpones'+"/"+galponNombre+"/corrales"); 
  refUsuario3.on("value", function(snapshot) {
  
  if(snapshot.val()==null){

    console.log("undefuned");
    $scope.corralesGranja={};
  }

  else{$scope.corralesGranja=Object.keys(snapshot.val());}
  

  //console.log(Object.keys(snapshot.val()));
}, function (errorObject) {
  console.log("error: " + errorObject.code);
});
  




}



$scope.cambioGalpon=function(granjaNombre){

  //console.log(granjaNombre);
    refUsuario3= new Firebase(FURL+'/granjas/'+$scope.usuarioID+'/'+granjaNombre+'/galpones'); 
  refUsuario3.on("value", function(snapshot) {


if(snapshot.val()==null){

    console.log("undefuned");
    $scope.galponesGranja={};
  }

  else{$scope.galponesGranja=Object.keys(snapshot.val());}
});

  


}

  $scope.agregarGranja=function(granja){

    refUsuario= new Firebase(FURL+'/granjas/'+$scope.usuarioID); 

   refUsuario.child(granja.nombre).set(
        {
        areaDisponible: granja.area,
        ubicacion: granja.ubicacion,
        sistemaAlimentacion:granja.alimentacion,
        galpones:{}
        }, Utils.alertshow("Granja agregada","La granja fue agregada correctamente")
    );



  }

  $scope.agregarGalpon=function(galpon){

if(galpon.granja==undefined){alert("Todos los espacios son requeridos");}
  else{
   refUsuario2= new Firebase(FURL+'/granjas/'+$scope.usuarioID+'/'+galpon.granja+'/galpones');   
   refUsuario2.child(galpon.nombre).set(
        {
        nombre: galpon.nombre,
        corrales:{}
        },Utils.alertshow("Galpon agregado","El galpon fue agregado correctamente")
    );
 }

  }

    $scope.agregarCorrales=function(corral){

      if(corral.granja==undefined || corral.galpon==undefined ){alert("Todos los espacios son requeridos");}
      else{
   refUsuario2= new Firebase(FURL+'/granjas/'+$scope.usuarioID+'/'+corral.granja+'/galpones/'+corral.galpon+'/corrales');
   refUsuario2.child(corral.corral).set(
        {
        corral: corral.corral,
        areaDisponible:corral.areaDisponible,
        capacidad:corral.capacidad
        }, Utils.alertshow("Corral agregado","El corral fue agregado correctamente")
    );
 }

  }

      $scope.agregarInmunocastracion=function(inmunocastracion){

         if(inmunocastracion.granja==undefined){alert("Necesita especificar una granja");}
      else{
   refUsuario= new Firebase(FURL+'/granjas/'+$scope.usuarioID+'/'+inmunocastracion.granja+'/inmunocrastracion');
   refUsuario.set(
        {
        PrimeraDosis: inmunocastracion.primera,
        SegundaDosis:inmunocastracion.segunda,
        TerceraDosis:inmunocastracion.tercera,
        Rastro:inmunocastracion.rastro,
        PeriodoDeVenta:inmunocastracion.pDeVenta
        },Utils.alertshow("Inmunocastracion agregada","La inmunocastracion fue agregada correctamente")
    );}

  }


$scope.cdMortalidad=function(mortalidad){
//console.log(mortalidad.granja);
if(mortalidad.granja==undefined ){alert("Todos los espacios son requeridos");}
else{
   refUsuario= new Firebase(FURL+'/capturaDeDatos/'+$scope.usuarioID+'/'+'mortalidad');

   refUsuario.child(mortalidad.granja).push( {
        Fecha: mortalidad.fecha,
        Lote:mortalidad.lote,
        Sexo:mortalidad.sexo
        },Utils.alertshow("Datos agregados correctamente"));



}
}


$scope.cdMedicamentos=function(medicamento){
     refUsuario= new Firebase(FURL+'/capturaDeDatos/'+$scope.usuarioID+'/'+'medicamentos');

   refUsuario.push( {
        Indicacion: medicamento.indicacion
        },Utils.alertshow("Datos agregados correctamente"));
}





$scope.cdTrasladoAlimento=function(trasladoAlimento){

   refUsuario= new Firebase(FURL+'/capturaDeDatos/'+$scope.usuarioID+'/trasladoAlimento');


   refUsuario.push( {
       Fecha: trasladoAlimento.fecha,
       Origen:trasladoAlimento.origen,
       Destino:trasladoAlimento.destino,
       ReferenciaAlimento:trasladoAlimento.referencia,
       Cantidad:trasladoAlimento.cantidad,
       ValorFlete:trasladoAlimento.valor
        },Utils.alertshow("Datos agregados correctamente"));

}

$scope.cdPatologias=function(patologia){

     refUsuario= new Firebase(FURL+'/capturaDeDatos/'+$scope.usuarioID+'/patologias');
     refUsuario.push({
                      Causa:patologia.causa,
                     Grupo:patologia.grupo,
                     CausaMuerte:"'"+patologia.causaMuerte+"'", 
                     CausaDescarte:"'"+patologia.Descarte+"'", 
                     Activo:"'"+patologia.activo+"'", 
                     CausaTratamiento:"'"+patologia.causaTratamiento+"'" 
                  },Utils.alertshow("Datos agregados correctamente"));

}

$scope.cdFabricaAlimentos=function(fabrica){



     refUsuario= new Firebase(FURL+'/capturaDeDatos/'+$scope.usuarioID+'/fabricaDeAlimentos');
     refUsuario.push(
  {Nombre: fabrica.nombre,
  Activo: "'"+fabrica.activo+"'"},Utils.alertshow("Datos agregados correctamente"));

}

$scope.cdAgregarPrecebo=function(precebo){


if(precebo.granja==undefined ){alert("Todos los espacios son requeridos");}
else{
     refUsuario= new Firebase(FURL+'/capturaDeDatos/'+$scope.usuarioID+'/'+'salidasPrecebo');

   refUsuario.child(precebo.granja).push( {
          Etapa:precebo.etapa,
          PesoInicial:precebo.pesoI,
           PesoFinal:precebo.pesoF,
           EdadInicial: precebo.edadI,
           Mortalidad:precebo.mortalidad,
           Conversion:precebo.conversion,
           Ganancia: precebo.ganancia,
           GDP:precebo.gdp

        },Utils.alertshow("Datos agregados correctamente"));

}
}


$scope.ingresarAnimales=function(animal){

  if(animal.granja==undefined || animal.corral==undefined || animal.galpon==undefined  ){alert("Todos los espacios son requeridos");}
else{
   refUsuario= new Firebase(FURL+'/capturaDeDatos/'+$scope.usuarioID+'/'+'IngresoAnimal/'+animal.granja+"/"+animal.galpon+"/"+animal.corral);

   refUsuario.push( {
 lote: animal.lote, 
 edad: animal.edad, 
 numeroMachos: animal.numeroMachos, 
 numeroHembras:animal.numeroHembras, 
 pesoTotal: animal.pesoTotal, 
 remision: animal.remision, 
 valorLote: animal.valorLote,
 Procedencia:animal.procedencia,
 Genetica:animal.genetica,
 Observaciones:animal.observaciones
},Utils.alertshow("Datos agregados correctamente"));
}}



$scope.compraAlimento=function(alimento){

if(alimento.granja==undefined ){alert("Todos los espacios son requeridos");}
else{
   refUsuario= new Firebase(FURL+'/inventarioInsumos/'+$scope.usuarioID+'/'+alimento.granja+"/compra/alimento");

   refUsuario.push( {
 fecha: alimento.fecha, 
 referencia: alimento.referencia, 
 cantidad: alimento.cantidad, 
 loteFabricacion:alimento.lote, 
 valorAlimento: alimento.valorA, 
 valorTotal: alimento.valorT, 
 medicado: "'"+alimento.medicado+"'"
},Utils.alertshow("Datos agregados correctamente"));
}}


$scope.compraMedicamento=function(medicamento){
if(medicamento.granja==undefined ){alert("Todos los espacios son requeridos");}

else{
   refUsuario= new Firebase(FURL+'/inventarioInsumos/'+$scope.usuarioID+'/'+medicamento.granja+"/compra/medicamento");

   refUsuario.push( {
 fecha: medicamento.fecha, 
 producto: medicamento.producto, 
 cantidad: medicamento.cantidad, 
 loteFabricacion:medicamento.loteF, 
  loteVencimiento:medicamento.loteV,
  retiro: medicamento.retiro, 
 valor: medicamento.valor
},Utils.alertshow("Datos agregados correctamente"));
}
}


$scope.compraInsumos=function(insumo){

if(insumo.granja==undefined ){alert("Todos los espacios son requeridos");}
else{
     refUsuario= new Firebase(FURL+'/inventarioInsumos/'+$scope.usuarioID+'/'+insumo.granja+"/compra/insumos");

   refUsuario.push( {
 fecha: insumo.fecha, 
 producto: insumo.producto, 
 cantidad: insumo.cantidad, 
 valor: insumo.valor
},Utils.alertshow("Datos agregados correctamente"));

}
}

$scope.pedidoMedicamento=function(medicamento){

if(medicamento.granja==undefined ){alert("Todos los espacios son requeridos");}

else{
     refUsuario= new Firebase(FURL+'/inventarioInsumos/'+$scope.usuarioID+'/'+medicamento.granja+"/pedidos/medicamentos");

   refUsuario.push( {
 fecha: medicamento.fecha, 
 producto: medicamento.producto, 
 cantidad: medicamento.cantidad, 
 valor: medicamento.valor,
  lote: medicamento.lote
},Utils.alertshow("Datos agregados correctamente"));

}
}


$scope.consumoFarmacos=function(farmaco){

if(farmaco.granja==undefined ){alert("Todos los espacios son requeridos");}
else{

     refUsuario= new Firebase(FURL+'/inventarioInsumos/'+$scope.usuarioID+'/'+farmaco.granja+"/consumo/farmacos");

   refUsuario.push( {
    nombre:farmaco.nombre,
 producto: farmaco.producto, 
 cantidad: farmaco.cantidad, 
  lote: farmaco.lote,
  ubicacion:farmaco.ubicacion
},Utils.alertshow("Datos agregados correctamente"));
}

}



$scope.consumoInsumos=function(insumo){

  if(insumo.producto==undefined || insumo.granja==undefined ){alert("Todos los espacios son requeridos");}
else{
     refUsuario= new Firebase(FURL+'/inventarioInsumos/'+$scope.usuarioID+'/'+insumo.granja+"/consumo/insumos");

   refUsuario.push( {
    fecha:insumo.fecha,
 producto: insumo.producto, 
 cantidad: insumo.cantidad, 
  lote: insumo.lote,
  ubicacion: insumo.ubicacion
},Utils.alertshow("Datos agregados correctamente"));
}

}




  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
       $state.go('login');
  }

}
);




















