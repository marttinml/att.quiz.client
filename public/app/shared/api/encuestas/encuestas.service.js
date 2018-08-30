/* global angular */

(function () {
    angular
        .module('api.encuestas', [])
        .service('$encuestas',
            function ($resource) {
                var url = 'https://encuestasattservices.herokuapp.com/v0/encuesta/:id_encuesta';
                return $resource(url, {
                    id_encuesta: '@id_encuesta'
                });
            });


        angular
        .module('api.encuestas')
        .service('$attuidValid',
            function ($resource) {
                var url = 'https://encuestasattservices.herokuapp.com/v0/validar_examen/:id_encuesta';
                return $resource(url, {
                    id_encuesta: '@id_encuesta'
                });
            });
})();