/* global angular */

(function () {
    angular
        .module('api.encuestas.direcciones', [])
        .service('$direcciones',
            function ($resource) {
                var url = 'https://encuestasattservices.herokuapp.com/v0/direccion';
                return $resource(url);
            });
})();