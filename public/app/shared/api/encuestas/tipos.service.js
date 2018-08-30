/* global angular */

(function () {
    angular
        .module('api.encuestas.tipo', [])
        .service('$tiposEncuesta',
            function ($resource) {
                var url = 'https://encuestasattservices.herokuapp.com/v0/tipo-encuesta';
                return $resource(url);
            });
})();