// const debug = document.getElementById('debug');
// getCurrentTabUrl(function(data) {
//     debug.innerHTML = data;
//     console.log(data);
// })
angular.module('popup', [])
    .service('tabProvider', function($q) {
        var queryInfo = {
          active: true,
          currentWindow: true
        };

        function getTabInfo() {
            return $q(function(res, rej) {
                  chrome.tabs.query(queryInfo, function(tabs) {
                      res(tabs[0]);
                  });
            });
        }
        return {
            getTabInfo: getTabInfo
        }
    })
    .controller('tabController', function($scope, tabProvider) {
        $scope.tabInfo = {};
        tabProvider.getTabInfo()
            .then(function(data) {
                $scope.tabInfo = data;
            });
        $scope.addBookmark = function() {
            // string	(optional) parentId  Defaults to the Other Bookmarks folder.
            // integer	(optional) index
            // string	(optional) title
            // string	(optional) url

            let bmm = {title: $scope.tabInfo.title, url: $scope.tabInfo.url};

            chrome.bookmarks.create(bmm, function() {

            });
        }
    })
