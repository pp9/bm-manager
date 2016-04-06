angular.module('bms', [])
    .service('serv', function() {
        const data = {
            some: 10,
            smm: 15,
        }
        return data;
    })
    .controller('BmsController', function($scope, serv) {
        // console.log(serv);
        $scope.some = serv.some;
    })
    .controller('BmsTagsController', function($scope, serv) {
        $scope.smm = serv.smm;
        $scope.act = function() {
            $scope.smm = 13;
        }
    })
