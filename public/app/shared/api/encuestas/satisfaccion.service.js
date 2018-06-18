/* global angular */

(function () {
    angular
        .module('api.encuestas.satisfaccion', [])
        .service('$satisfaccion',
            function ($resource) {
                var url = 'https://rocky-basin-62683.herokuapp.com/v0/satisfaccion';
                return $resource(url);
            });
})();