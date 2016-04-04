(function(){
'use strict';

angular.module('demoApp')
    .controller('etaPanelController', ['$scope', '$rootScope', 'airportUtils', 'airportServices', '$mdDialog', 'gmapServices', etaPanelController]);

    function etaPanelController ($scope, $rootScope, airportUtils, airportServices, $mdDialog, gmapServices) {
        var vm = this;

        var initialETA = 0;
        vm.etaToDest = null;
        vm.stops = [];
        vm.etaDetail = '';

        vm.initialize = initialize;
        vm.showDialog = showDialog;

        vm.initialize();

        /* Controller Functions here */

        function initialize () {
            $rootScope.$on('show-nearby-places', function (event, params) {
                computeETA(params.path);
            });

            $rootScope.$on('update-eta', function (event, params) {
                updateETA(params.addStops);
            });

            $rootScope.$on('new-place-route', function (ev, params) {
                //airportServices.placeStop = params.stop;
                //initialETA = airportUtils.getPathFromPolyline(params.stop, airportServices.generatedPath[generatedPath.length-1].position);
                // update initalETA
                var near = airportUtils.getPathFromPolyline(params.stop, airportServices.generatedPath);
                if (near) {
                    var path = airportServices.generatedPath.slice(near.index, airportServices.generatedPath[airportServices.generatedPath.length - 1].index);
                    computeETA(path);
                }
            });

            gmapServices.streetviewPanorama.addListener('position_changed', function () {
                var near = airportUtils.getPathFromPolyline(gmapServices.streetviewPanorama.getPosition(), airportServices.generatedPath);
                if (near) {
                    var path = airportServices.generatedPath.slice(near.index, airportServices.generatedPath[airportServices.generatedPath.length - 1].index);
                    computeETA(path);
                }
            });

            $scope.$watchCollection(function(){
               return vm.stops;
            }, updateStops);
        }

        /* Non Scope Functions here */

        function computeETA(path) {
            var distance = airportUtils.computeLength(airportUtils.extractAndCastCoords(path));
            initialETA = airportUtils.computeTimeRaw(distance);
            vm.etaToDest = initialETA;
            vm.stops = [];
            vm.etaDetail = '';
        }

        function updateETA (addStops) {
            vm.stops.push(addStops);
        }

        function updateStops (newValue) {
            if(newValue == 0) return;

            vm.etaDetail = '';

            var totalETA = 0;
            totalETA += initialETA;

            vm.etaDetail += '<h3><b>'+ airportUtils.getFormattedTime(initialETA) +'</b></h3><br>';

            newValue.forEach(function(place){
                totalETA += place.eta;
                vm.etaDetail += '<b>' + place.name + '</b>: '+ airportUtils.getFormattedTime(place.eta) + '<br>';
            });

            vm.etaToDest = totalETA;
        }


        function showDialog (ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('body')))
                    .clickOutsideToClose(true)
                    .title('ETA Detail')
                    .htmlContent(vm.etaDetail)
                    .ariaLabel('ETA Detail Dialog')
                    .ok('Close')
                    .targetEvent(ev)
            );
        }
    }
}());