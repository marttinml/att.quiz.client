/* global angular*/
(function () {

    var Controller = function ($scope, $rootScope, $window, $internal, $responderEncuesta) {
        
        // Obtenemos el array Normal de preguntas
        //$scope.encuesta = $internal.responderEncuesta;
        // var socket = io.connect('https://ancient-journey-62555.herokuapp.com/');// SOcket.io
        

        var respuesta = new $responderEncuesta();
        $scope.tipoEncuestaId = $internal.encuesta.tipoEncuesta ? $internal.encuesta.tipoEncuesta.id : false;

        $scope.save = function () {

           if($internal.responderEncuesta.tipoEncuesta.id === 4){
            if(  $scope.comentario && $scope.comentario.replace(/ /g, "") !== ""){

            
            if($internal.responderEncuesta){
                $rootScope.spin = true;
            
                respuesta.idEncuesta = $internal.responderEncuesta.idEncuesta;
                respuesta.preguntas = $internal.responderEncuesta.preguntas;
                respuesta.attuid = $internal.responderEncuesta.attuid;
                respuesta.nombre = $internal.responderEncuesta.nombre;
                respuesta.wr = $internal.responderEncuesta.wr;
                respuesta.comentario = $scope.comentario;

                if(respuesta.attuid){
                    respuesta.attuid = respuesta.attuid.toUpperCase();
                }

                respuesta.$save().then(function (data) {
                    $rootScope.spin = false;
                    if(data.success){
                        if($internal.encuesta.tipoEncuesta.id === 3){
                            $internal.calificacion = data.data.calificacion;
                        }
                        // socket.emit('event-responder-encuesta', { id: $internal.responderEncuesta.idEncuesta });
                        $window.location = '#/finalizar-encuesta/';
                    }else{
                        
                        $internal.nombre = $internal.responderEncuesta.nombre;
                        $internal.attuid = $internal.responderEncuesta.attuid;                   
                        $internal.msj = data.msjError;
                        
                        
                        $window.location = '#/error/';
                    }
                }, function (e) {
                    $rootScope.spin = false;
                    console.log(e);
                });
            }else{
                $internal.msj = "Ups, algo salió mal";
                $window.location = '#/error/';
            }
            
        }else{
            $rootScope.alert = true;
            $rootScope.mensajeAlerta = "Los comentarios son obligatorios.";
        }
    }

        else{

            
            if($internal.responderEncuesta){
                $rootScope.spin = true;
            
                respuesta.idEncuesta = $internal.responderEncuesta.idEncuesta;
                respuesta.preguntas = $internal.responderEncuesta.preguntas;
                respuesta.attuid = $internal.responderEncuesta.attuid;
                respuesta.nombre = $internal.responderEncuesta.nombre;
                respuesta.wr = $internal.responderEncuesta.wr;
                respuesta.comentario = $scope.comentario;

                if(respuesta.attuid){
                    respuesta.attuid = respuesta.attuid.toUpperCase();
                }

                respuesta.$save().then(function (data) {
                    $rootScope.spin = false;
                    if(data.success){
                        if($internal.encuesta.tipoEncuesta.id === 3){
                            $internal.calificacion = data.data.calificacion;
                        }
                        // socket.emit('event-responder-encuesta', { id: $internal.responderEncuesta.idEncuesta });
                        $window.location = '#/finalizar-encuesta/';
                    }else{
                        
                        $internal.nombre = $internal.responderEncuesta.nombre;
                        $internal.attuid = $internal.responderEncuesta.attuid;                   
                        $internal.msj = data.msjError;
                        
                        
                        $window.location = '#/error/';
                    }
                }, function (e) {
                    $rootScope.spin = false;
                    console.log(e);
                });
            }else{
                $internal.msj = "Ups, algo salió mal";
                $window.location = '#/error/';
            }
            

    }
        };
        


    };

    Controller.$inject = ['$scope', '$rootScope', '$window', '$internal', '$responderEncuesta'];

    angular
        .module('preguntas')
        .controller('EnviarEncuestaController', Controller);
})();