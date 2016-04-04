(function () {
'use strict';

angular.module('demoApp')
    .factory('alertServices', ['$mdToast', alertServices]);

    function alertServices($mdToast) {
        var service = {};

        service.showTopRightToast = showTopRightToast;
        service.proceedingToGate = proceedingToGate;
        service.arrivedOnGatePrompt = arrivedOnGatePrompt;

        function showTopRightToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(2000)
            );
        }

        function proceedingToGate(gateNo) {
            service.showTopRightToast('Proceeding to Gate ' + gateNo);
        }

        function arrivedOnGatePrompt (gateNo) {
            service.showTopRightToast('You are on Gate ' + gateNo);
        }

        return service;
    }
}());