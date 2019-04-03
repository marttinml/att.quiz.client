    /* global angular*/
(function () {

    var Controller = function ($scope, $rootScope, $routeParams, $window, $internal) {

        console.log($internal);
        // Obtenemos el array Normal de preguntas
        $scope.pregunta = $internal.responderEncuesta.preguntas[0];
        $scope.animationLeft = false;
        $scope.total = $internal.responderEncuesta.preguntas.length;
        $scope.index = $internal.index;
        for(var i in $scope.pregunta.respuestas){
            var respuesta = $scope.pregunta.respuestas[i];
            respuesta.select = respuesta.select ? true : false;
        }
        $scope.siguiente = function(respuesta){
            
            for(var i in $scope.pregunta.respuestas){
                var item = $scope.pregunta.respuestas[i];
                item.select = false;
            }
            respuesta.select = true;

            setTimeout(function(){

                $internal.responderEncuesta.preguntas[$internal.index].respuesta = respuesta; 
                $internal.index++;
               if($internal.index === $internal.responderEncuesta.preguntas.length){
                    $window.location ='#/enviar-encuesta/';
                } else{
                    $scope.pregunta = $internal.responderEncuesta.preguntas[$internal.index];
                }
                
                
                $scope.animationLeft = true;
                $scope.$apply();
                setTimeout(function(){
                    $scope.animationLeft = false;
                    $scope.index = $internal.index;
                    $scope.$apply();
                },300);


            },200);
        };

        $scope.backAction = function(){
            if($internal.index===0){
                $window.history.back();
            }else{
                console.log($internal.index);
                $internal.index--;
                $scope.pregunta = $internal.responderEncuesta.preguntas[$internal.index];
            }
        };


    };

    Controller.$inject = ['$scope', '$rootScope', '$routeParams', '$window', '$internal'];

    angular
        .module('preguntas')
        .controller('ResponderSatisfaccionController', Controller);
})();