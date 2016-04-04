(function(){
'use strict';

angular.module('demoApp')
    .factory('airportServices', ['$rootScope', 'AIRPORT_GATES', 'AIRPORT_PATHS', 'AIRPORT_EXTENDED_PATHS',
        'AIRPORT_SOUTH_PATHS', 'RAW_EXTENDED_PATHS', '$timeout',
        'gmapServices', 'alertServices', 'airportUtils', airportServices]);

    function airportServices ($rootScope, AIRPORT_GATES, AIRPORT_PATHS, AIRPORT_EXTENDED_PATHS,
                              AIRPORT_SOUTH_PATHS, RAW_EXTENDED_PATHS, $timeout,
                              gmapServices, alertServices, airportUtils) {
        var service = {};

        var startPoint = {lat: 37.3693791, lng: -121.9297233},
            entranceMarker = null,
            airportPathPolyline = null
        ;

        var currentPosition = null,
            destination = null
        ;

        service.completePath = null;
        service.generatedPath = null;

        service.placeStop = null;

        var defaultPitch = -7,
            directionsPathPolyline = null,
            animationSpeedByMillis = 2000,
            //animationSpeedByMillis = 500,
            pathCtr = 0,
            animationTimeout = null
        ;

        service.gates = [];

        service.initialize = initialize;
        service.toggleGates = toggleGates;
        service.continueAnimation = continueAnimation;

        function initialize () {
            gmapServices.defaultLatLng = startPoint;

            gmapServices.createMap('map-canvas');

            loadPath();
            loadGates();
        }

        function loadPath () {
            if (!airportPathPolyline) {
                //var extendedPaths = convertJsonToArray(AIRPORT_EXTENDED_PATHS);

                var firstPath = angular.copy(AIRPORT_PATHS).reverse();
                service.completePath = firstPath.concat(AIRPORT_SOUTH_PATHS);

                var paths = airportUtils.extractCoords(service.completePath),
                    opts = {strokeColor: '#00ff00', strokeOpacity: 0, strokeWeight: 1.5};

                airportPathPolyline = gmapServices.createCustomPolyline(paths, opts);
            }
        }

        /* Gates Functions */

        function loadGates () {
            entranceMarker = gmapServices.createCustomMarker(startPoint, 'images/markers/entrance.png');
            gmapServices.showMarker(entranceMarker);

            for (var gateNo in AIRPORT_GATES) {
                var gate = AIRPORT_GATES[gateNo];
                gate.gateNo = gateNo;

                gate.gateIcon = 'images/markers/gates/' + gateNo + '.png';

                var marker = gmapServices.createCustomMarker(gate.position, gate.gateIcon, {zIndex: 2});
                marker.gate = gate;

                gmapServices.addListener(marker, 'click', function () {
                    if (animationTimeout) {
                        $timeout.cancel(animationTimeout);
                        pathCtr = 0;
                        animationTimeout = null;
                    }

                    proceedGate(this.gate);
                });

                service.gates.push(marker);
            }

            gmapServices.showMarkers(service.gates);
        }

        var computedPath = null;
        var selectedGate = null;

        function proceedGate(gate) {
            service.placeStop = null;

            pathCtr = 0;
            computedPath = computePath(gate);

            currentPosition = gmapServices.streetviewPanorama.getPosition();
            destination = computedPath[computedPath.length - 1].position;

            computeDirection(currentPosition, destination);
            broadcastNavigation(gate, service.generatedPath);

            gmapServices.setZoomIfGreater(20);

            selectedGate = gate;
            // start path animation
            startAnimation(service.generatedPath, gate);
        }

        function broadcastNavigation(gate, _path) {
            $rootScope.$broadcast('show-nearby-places', {path: _path});
            $rootScope.$broadcast('show-streetview-panel');
            alertServices.proceedingToGate(gate.gateNo);
        }

        function computePath (gate) {
            var paths = [];
            if (gate.gateNo >= 1 && gate.gateNo <= 3) {
                paths = AIRPORT_EXTENDED_PATHS[gate.gateNo].slice(0);
            } else {
                var pathSrc = gate.gateNo >= 4 && gate.gateNo <= 11
                        ? AIRPORT_PATHS // paths 1 - 11 here
                        : AIRPORT_SOUTH_PATHS // paths 12 - 28 here
                    ;
                paths = gate.pathIndex
                    ? pathSrc.slice(gate.pathIndex[0], gate.pathIndex[1])
                    : pathSrc.slice(0) // this means it is the last path of the array
                ;
            }
            return paths;
        }

        function computeDirection (currentPosition, destination) {
            var currentPositionApprox = airportUtils.getPathFromPolyline(currentPosition, service.completePath),
                destinationApprox = airportUtils.getPathFromPolyline(destination, service.completePath)
            ;

            service.generatedPath = destinationApprox.index <= currentPositionApprox.index
                            ? service.completePath.slice(destinationApprox.index + 1, currentPositionApprox.index + 2).reverse()
                            : service.completePath.slice(currentPositionApprox.index + 1, destinationApprox.index + 2)
            ;

            // Show Polyline for paths
            showPath(service.generatedPath);
        }

        function showPath (paths) {
            var pathsCoords = airportUtils.extractCoords(paths);

            if (directionsPathPolyline && directionsPathPolyline.getMap()) {
                directionsPathPolyline.setPath(pathsCoords);
            } else {
                directionsPathPolyline = gmapServices.createDashedPolyline(pathsCoords, '#2980b9');
            }
        }

        function startAnimation(paths, gate) {
            if (pathCtr >= paths.length) {
                pathCtr = 0;
                gmapServices.streetviewPanorama.setPov({
                    heading: gate.heading,
                    pitch: defaultPitch
                });
                // show alert
                alertServices.arrivedOnGatePrompt(gate.gateNo);
                return;
            }

            var path = paths[pathCtr++];

            gmapServices.streetviewPanorama.setPosition(path.position);

            try {
                var nextPath = paths[pathCtr];
                var heading = path.heading
                        ? path.heading
                        : airportUtils.computeHeading(
                            path.position,
                            nextPath.position
                          )
                ;

                gmapServices.streetviewPanorama.setPov({
                    heading: heading,
                    pitch: defaultPitch
                });


                if (service.placeStop) {
                    var distance = airportUtils.computeDistance(
                        service.placeStop,
                        path.position
                    );

                    if (distance < 1) {
                        return;
                    }
                }

            } catch (err) {}

            animationTimeout = $timeout(function () {
                startAnimation(paths, gate);
            }, animationSpeedByMillis);
        }

        function continueAnimation() {
            if(animationTimeout) {
                $timeout.cancel(animationTimeout);
                startAnimation(service.generatedPath, selectedGate);
            }
        }

        /* End Gates Functions */

        function toggleGates (hideMarker) {
            if (hideMarker) {
                gmapServices.hideMarkers(service.gates);
                gmapServices.hideMarker(entranceMarker);
                return;
            }

            gmapServices.showMarkers(service.gates);
            gmapServices.showMarker(entranceMarker);
        }

        return service;
    }
}());