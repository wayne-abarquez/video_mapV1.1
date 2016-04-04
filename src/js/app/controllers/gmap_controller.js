(function(){
'use strict';

angular.module('demoApp')
    .controller('gmapController', ['$rootScope', '$scope', '$timeout', '$mdSidenav', 'gmapServices', 'airportServices', 'placesServices', gmapController]);

    function gmapController($rootScope, $scope, $timeout, $mdSidenav, gmapServices, airportServices, placesServices) {
        var vm = this;

        vm.filter = {
            query: '',
            show: false,
            form: null
        };

        vm.hideMarkers = false;
        vm.showStreetview = false;
        vm.showPlacesBtn = false;
        vm.showEtaPanel = false;

        vm.initialize = initialize;
        vm.showPlacesList = showPlacesList;
        vm.triggerProceedGate = triggerProceedGate;
        vm.removeFilter = removeFilter;
        vm.showStreetviewPanel = showStreetviewPanel;
        vm.closePlacesList =  closePlacesList;

        vm.initialize();

        function initialize () {
            airportServices.initialize();

            placesServices.loadPlaces();

            $scope.$watch(function(){
                return vm.hideMarkers;
            }, function (newValue, oldValue) {
                if(newValue === oldValue) return;

                airportServices.toggleGates(newValue);
            });

            $rootScope.$on('show-streetview-panel', function () {
                showStreetviewPanel();
                vm.showEtaPanel = true;
            });

            // Close Streetview, triggers from a custom control on gmapServices
            $rootScope.$on('close-streetview', function(){
                hideStreetviewPanel();
            });

            $rootScope.$on('new-place-route', function (ev, params) {
                airportServices.continueAnimation();
                airportServices.placeStop = params.stop;

                //console.log('airportServices.placeStop: ', airportServices.placeStop);
            });

            //gmapServices.addMapListener('click', function(e){
            //    console.log('Position Clicked: ', e.latLng.toJSON());
            //});
        }

        function showPlacesList() {
            $mdSidenav('placesPanelSidenav')
                .open()
                .then(function(){
                    vm.showPlacesBtn = false;
                });
        }

        function triggerProceedGate (gate, event) {
            $mdSidenav('gateListSideNav')
                .close()
                .then(function(){
                    gmapServices.triggerEvent(gate, 'click');
                });
        }

        function removeFilter() {
            vm.filter.show = false;
            vm.filter.query = '';

            if (vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }

        /* Streetview Functions */

        function showStreetviewPanel () {
            if(!vm.showStreetview) {
                vm.showStreetview = true;

                $timeout(function () {
                    google.maps.event.trigger(gmapServices.streetviewPanorama, 'resize');
                }, 100);
            }
        }

        function hideStreetviewPanel() {
            if (vm.showStreetview) {
                $scope.$apply(function () {
                    vm.showStreetview = false;
                });
            }
        }

        function closePlacesList () {
            $mdSidenav('placesPanelSidenav')
                .close()
                .then(function(){
                    vm.showPlacesBtn = true;
                });
        }

        /* End of Streetview Functions */
    }
}());