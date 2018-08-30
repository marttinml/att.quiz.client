/* global angular */

(function () {
    angular
        .module('api.encuestas.satisfaccion', [])
        .service('$satisfaccion',
            function ($resource) {
                var url = 'https://encuestasattservices.herokuapp.com/v0/satisfaccion';
                return $resource(url);
            });
})();