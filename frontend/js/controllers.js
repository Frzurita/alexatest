var _ = require('underscore');
module.exports = function (app) {
    app.controller('mainPage', function ($scope,$http) {
        $scope.selectedIndex = 0;
        $scope.contactWithGW = function () {
            $scope.pepe = {};
            console.log('hey!');
            $http.get("/api/test")                            /*get: coger datos de un url*/
                .success(function(data){
                    $scope.pepe = data;
                })
                .error(function (error) {
                    $scope.pepe = error;
                })
        };

        $http.get('/api/lights')
            .success(function (data) {
                console.log('print1');
                console.log(data);
                $scope.lights = data;
                $scope.lights.map(function (light) {
                    console.log('estoy aqui');
                    light.hex = rgbToHex(light.r, light.g, light.b);
                });
                console.log('print2');
                console.log($scope.lights);
            })
            .error(function (error) {
                console.log(error);
            });

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        $scope.convertHexToRGB = function(light) {
            console.log(light);
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(light.hex);
            console.log(result);
            light.r = parseInt(result[1], 16);
            light.g = parseInt(result[2], 16);
            light.b = parseInt(result[3], 16);
            console.log(light);
        }

        $scope.updateLight = function (light) {
            $http.post('/api/update/light', light)
            .success(function (data) {
                console.log('all is right');
                console.log(data);
            })
            .error(function (error) {
                console.log(error);
            })
        }

        $scope.next = function (){
            console.log('pepe');
            $scope.selectedIndex = Math.max($scope.selectedIndex +1, 2);
        };
        $scope.previous= function(){
            console.log('popo');
            $scope.selectedIndex = Math.min($scope.selectedIndex -1, 0);
        }
    });
    app.controller('mainCtrl', function ($scope,$http) {

    })
};
