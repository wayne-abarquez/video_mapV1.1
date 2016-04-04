(function(){
'use strict';

angular.module('demoApp')
    .factory('placesServices', ['$rootScope', 'gmapServices', 'AIRPORT_PLACES', 'airportServices', 'airportUtils', placesServices]);

    function placesServices ($rootScope, gmapServices, AIRPORT_PLACES, airportServices, airportUtils) {
        var service = {};

        service.places = [];

        var placeInfowindow = gmapServices.createInfoWindow('');

        service.loadPlaces = loadPlaces;
        service.clearPlacesPath = clearPlacesPath;

        function loadPlaces() {
            AIRPORT_PLACES.forEach(function (place) {
                var icon = 'images/markers/poi/' + place.type + '.png';
                var marker = gmapServices.createCustomMarker(place.position, icon, {zIndex: 1});
                marker.type = place.type;
                marker.name = place.name;

                marker.polyline = computePlacePath(place.position);
                marker.stopPosition = marker.polyline.getPath().getAt(0);

                gmapServices.addListener(marker, 'click', function () {
                    //placeInfowindow.setContent(createPlaceContent(place));
                    //gmapServices.showInfoWindow(placeInfowindow, marker);

                    var placePosition = marker.getPosition();
                    gmapServices.panTo(placePosition);

                    gmapServices.showPolyline(marker.polyline);

                    $rootScope.$broadcast('new-place-route', {stop: marker.stopPosition});

                    // proceed to place
                    //      * get the nearest latlng attached to the path (polyline)
                    // update eta to gate
                    $rootScope.$broadcast('update-eta', {addStops:  {name: marker.name, position: placePosition, eta: marker.polyline.eta}});
                });

                service.places.push(marker);
            });
        }

        function clearPlacesPath () {
            service.places.forEach(function(place){
               gmapServices.hidePolyline(place.polyline);
            });
        }

        function computePlacePath (placePosition) {
            var nearestPoint = airportUtils.getNearestPointFromPath(placePosition, airportServices.completePath);
            //var near = gmapServices.createLetterMarker('A');
            //near.setPosition(nearestPoint);

            var polyline = gmapServices.createDashedPolyline([nearestPoint, placePosition], '#3498db');
            gmapServices.hidePolyline(polyline);

            polyline.eta = airportUtils.computeETARaw(nearestPoint, placePosition);

            return polyline;
        }

        function createPlaceContent(place) {
            var content = '<h2 style="margin:0px;"><b>' + place.name + '</b></h2>';
            content += '<p style="text-align:center;color:#95a5a6;font-weight:600;text-transform: uppercase;margin:0px;">' + place.type + '</p>';

            return content;
        }

        return service;
    }
}());