'use strict';

angular.module('bms', [])
    .factory('chromeBms', function($q) {
        function getData () {
            return $q(function(resolve, reject) {
                chrome.bookmarks.getSubTree('2', resolve);
            });
        }
        return {
            getData: getData
        }
    })
    .controller('BmsController', function(chromeBms) {
        var bmsMain = this;
        bmsMain.bmsList = [];

        chromeBms.getData().then(function(data) {
            console.log(data);
            bmsMain.bmsList = data[0].children.slice(0, 10);
            // console.log(bmsMain.bmsList);
        });
    });