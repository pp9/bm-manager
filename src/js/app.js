'use strict';

angular.module('bms', [])
    .service('bookmarksProvider', function($q) {
        // var bookmark;

        function getBookmarks() {
            return $q(function(res, rej) {
                chrome.bookmarks.getSubTree('2', function(data) {
                    // bookmark = data[0].children.slice(0, 15);
                    // res(data[0].children.slice(0, 15));
                    res(data[0].children);
                })
            })
        }
        return {
            getBookmarks: getBookmarks
        }
    })
    .service('tagProvider', function(bookmarksProvider) {
        var storage = localStorage;
        var tags = getTags();
        // var tags = [
        //     {id: '1', name: 'tag-1', items: ['15', '16']},
        //     {id: '2', name: 'tag-2', items: ['15']}
        // ];



        function getNewId() {
            return tags.length + 1;
        }

        function Tag(data) {
            this.id = data.id || getNewId();
            this.name = data.name || '';
            this.items = data.items || [];
        }
        function saveTags(newTags) {
            let ttg = newTags || tags
            storage.setItem('tags', JSON.stringify(ttg));
            console.log('saved');
        }

        function getTags() {
            let resp = JSON.parse(storage.getItem('tags'));
            if(resp) {
                console.log('get from local');
                return resp;
            }
            return tags;
        }
        function addTag(tag) {
            let tgg = new Tag(tag);
            tags.push(tgg);
            saveTags();
        }

        function addTags(bookmark) {
            let tagsList = [];
            let intId = parseInt(bookmark.id, 10);
            tags.forEach(function(el) {
                el.items.forEach(function(itm) {
                    let intItm = parseInt(itm, 10);
                    if(intItm === intId) {
                        tagsList.push(el.name);
                    }
                })
            });
            bookmark.tags = tagsList;
            return bookmark;
        }

        function upplyTags() {
            return bookmarksProvider.getBookmarks()
                .then(function(data) {
                    return data.map(addTags);
            });
        }

        return {
            upplyTags: upplyTags,
            getTags: getTags,
            addTag: addTag,
            saveTags: saveTags
        }
    })
    .controller('BmsController', function($scope, tagProvider) {
        $scope.bmsList = [];
        $scope.tags = tagProvider.getTags();
        $scope.editMod = false;
        $scope.currentItem = {};
        $scope.newTag = '';
        $scope.activeFilters = [];

        $scope.setCurrent = function(index) {
            $scope.currentItem = $scope.bmsList[index];
            $scope.editMod = true;
        }

        $scope.filterBytags = function(tag) {
            $scope.activeFilters.push(tag);

            tagProvider.upplyTags()
            .then(data => {
                $scope.bmsList = data.filter(function(el) {
                    if(el.tags.indexOf(tag.name) !== -1) return el;
                });
            })
        }

        $scope.removeTag = function(index) {
            $scope.tags = $scope.tags.filter(el => {
                if(el.name !== $scope.currentItem.tags[index]) return el;
            });
            $scope.currentItem.tags.splice(index, 1);

            tagProvider.saveTags($scope.tags);
        }

        $scope.subminAddTag = function() {
            $scope.currentItem.tags.push($scope.newTag);
            tagProvider.addTag({name: $scope.newTag, items: [$scope.currentItem.id]});
            $scope.newTag = '';
            $scope.tags = tagProvider.getTags();
        }

        tagProvider.upplyTags()
            .then(function(data) {
                $scope.bmsList = data;
            })
    })
