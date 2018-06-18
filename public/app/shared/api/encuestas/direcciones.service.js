/* global angular */

(function () {
    angular
        .module('api.encuestas.direcciones', [])
        .service('$direcciones',
            function ($resource) {
                var url = 'https://rocky-basin-62683.herokuapp.com/v0/direccion';
                return $resource(url);
            });
})();