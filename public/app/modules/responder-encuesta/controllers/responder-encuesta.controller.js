/* global angular*/
(function () {

    var Controller = function ($scope, $rootScope, $window, $internal, $encuestas, $routeParams, $attuidValid) {
        
        $scope.encuestaId = $routeParams.id;
        $scope.tipo = 'Encuesta';

         $scope.ingresar = function () {

            if ($scope.encuestaId !== "") {
                $rootScope.spin = true;
                $scope.encuesta = $encuestas.get({
                    id_encuesta: $scope.encuestaId
                }, function (data) {
                    $rootScope.spin = false;
                    
                    if (data.success) {
                        $scope.encuesta = data.data;

                        if($scope.encuesta.tipoEncuesta.id > 2){
                            $scope.tipo = $scope.encuesta.tipoEncuesta.name;
                        }

                        $scope.encuesta.vigenciaInicio = new Date($scope.encuesta.vigenciaInicio);
                        $scope.encuesta.vigenciaInicio = $scope.encuesta.vigenciaInicio.setHours($scope.encuesta.vigenciaInicio.getHours() + 5);

                        $scope.encuesta.valides = new Date($scope.encuesta.valides);
                        $scope.encuesta.valides = $scope.encuesta.valides.setHours($scope.encuesta.valides.getHours() + 5);

                        $scope.encuesta.date = new Date($scope.encuesta.date);
                        $scope.encuesta.date = $scope.encuesta.date.setHours($scope.encuesta.date.getHours() + 5);
                        
                        $internal.encuesta = data.data;
                        $scope.init();
                    } else {
                        // $window.location = '#/inicio-alert/' + $scope.encuestaId;

                        $internal.nombre = "Oh";                 
                        $internal.msj = data.msjError;
                        
                        
                        $window.location = '#/error/';
                    }
                }, function (e) {
                    $rootScope.spin = false;
                    console.log(e);
                });
            } else {

            }
        };
        
        $scope.init = function(){
            for(var i in $scope.encuesta.preguntas){
                var pregunta = $scope.encuesta.preguntas[i];
                    for(var j in pregunta.respuestas){
                        var respuesta = pregunta.respuestas[j];
                        respuesta.selected = false;
                    }

         }
        };

        $scope.validATTUID = function(fn){

            $rootScope.spin = true;
            var attuidValid = new $attuidValid();
            attuidValid.idEncuesta = $scope.encuestaId;
            attuidValid.attuid = $scope.encuesta.attuid.toUpperCase();

            attuidValid.$save().then(function (data) {
                $rootScope.spin = false;
                if(data.success){
                    fn();
                }else{
                    $rootScope.alert = true;
                    $rootScope.mensajeAlerta = data.msjError;
                }
                id_encuesta: $scope.encuestaId
            }, function(){
                $rootScope.spin = false;
                console.log(e);
            });
        };

        $scope.contestar = function () {


            if($scope.encuesta.tipoEncuesta.id === 3){

                preguntas = $scope.encuesta.preguntas;
                $scope.encuesta.preguntas = preguntas.sort(function() {return Math.random() - 0.5});

                for(var i in $scope.encuesta.preguntas){
                    var lista = $scope.encuesta.preguntas[i].respuestas;
                    $scope.encuesta.preguntas[i].respuestas = lista.sort(function() {return Math.random() - 0.5});
                }
            }


            $internal.responderEncuesta = {
                idEncuesta: $routeParams.id,
                preguntas: $scope.encuesta.preguntas,
                attuid: $scope.encuesta.attuid,
                nombre: $scope.encuesta.nombre,
                wr: $scope.encuesta.wr
            };
            $internal.responderEncuesta.respuesta = {};
            $internal.index = 0;
            if ($scope.encuesta.tipoEncuesta.id == 1) {

                $window.location = '#/responder-satisfaccion/';
            } else {
                if($scope.encuesta.tipoEncuesta.id === 3 || $scope.encuesta.tipoEncuesta.id === 4 || $scope.encuesta.tipoEncuesta.id === 10){
                    
                    if($scope.encuesta.tipoEncuesta.id === 3){
                        if($scope.encuesta.attuid  && $scope.encuesta.nombre){
                            if( $scope.encuesta.attuid.length === 6){
                            
                                $scope.validATTUID(function(){
                                    $window.location = '#/responder-categoria/'+$scope.encuestaId;
                                });
                            }else{
                                $rootScope.alert = true;
                                $rootScope.mensajeAlerta = "EL ATTUID es incorrecto";
                            }
                        }else{
                            $rootScope.alert = true;
                            $rootScope.mensajeAlerta = "Debes llenar todos los campos.";
                        }
                    }

                    if($scope.encuesta.tipoEncuesta.id === 4 || $scope.encuesta.tipoEncuesta.id === 10){
                        if($scope.encuesta.attuid  && $scope.encuesta.wr){
                            if( $scope.encuesta.attuid.length === 6){
                                $window.location = '#/responder-satisfaccion/';
                            }else{
                                $rootScope.alert = true;
                                $rootScope.mensajeAlerta = "EL ATTUID es incorrecto";
                            }
                        }else{
                            $rootScope.alert = true;
                            $rootScope.mensajeAlerta = "Debes llenar todos los campos.";
                        }
                    }
                }else{

                    $window.location = '#/responder-categoria/';
                }
            }
        };

        $scope.ingresar();
    };

    Controller.$inject = ['$scope', '$rootScope', '$window', '$internal', '$encuestas', '$routeParams', '$attuidValid'];

    angular
        .module('responderEncuesta')
        .controller('ResponderEncuestaController', Controller);
})();