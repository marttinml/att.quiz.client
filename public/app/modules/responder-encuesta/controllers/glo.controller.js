/* global angular*/
(function () {

    var Controller = function ($scope, $rootScope, $glo, $internal, $window) {
        
        // var socket = io.connect('https://ancient-journey-62555.herokuapp.com/');// SOcket.io
        $scope.id = '';
        $scope.attuid = '';
        $scope.nombre = '';
        $scope.respuestasOK = '';
        

        var glo = new $glo();
        
        $scope.contestar = function () {

            $rootScope.spin = true;
            glo.id = $scope.id;
            glo.attuid = $scope.attuid; 
            glo.nombre = $scope.nombre;
            glo.respuestasOK = $scope.respuestasOK;

            $internal.encuesta = { tipoEncuesta: { id: 3 } };
            $internal.responderEncuesta = { nombre: glo.nombre };

            if($scope.id && $scope.attuid && $scope.nombre){
                glo.$save().then(function (data) {
                    
                    $rootScope.spin = false;
                if(data.success){
                    $internal.calificacion = data.data.calificacion;
                    // socket.emit('event-responder-encuesta', { id: glo.id });
                    $window.location = '#/finalizar-encuesta/';
                }else{
                    $rootScope.alert = true;
                    $rootScope.mensajeAlerta = data.msjError;
                    
                    setTimeout(function(){
                        $window.location = '#/';
                    },50000);
                }
                    
                }, function (e) {
                    $rootScope.spin = false;
                    console.log(e);
                });
            }
        };

    };

    Controller.$inject = ['$scope', '$rootScope','$glo', '$internal','$window'];

    angular
        .module('responderEncuesta')
        .controller('GloController', Controller);
})();