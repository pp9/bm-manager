'use strict';

angular.module('bms', [])
    .service('bookmarksProvider', function($q) {
        var bookmark;

        function getBookmarksAsync() {
            return $q(function(res, rej) {
                chrome.bookmarks.getSubTree('2', res);
            });
        }

        function getBookmarks() {
            if(bookmark) return $q.when(bookmark);
            return getBookmarksAsync()
                .then(function(data) {
                    bookmark = data;
                    return bookmark;
                })
        }



        // function getBookmarks() {
        //     if(bookmark) {
        //         console.log('is bookmarks');
        //         return bookmark;
        //     } else {
        //         console.log('get');
        //         return getBookmarksAsync().then(function(data) {
        //             console.log(data);
        //             bookmark = data[0].children.slice(0, 15);
        //         })
        //         // return $q(function(res, rej) {
        //         //     chrome.bookmarks.getSubTree('2', res);
        //         // })
        //         // chrome.bookmarks.getSubTree('2', function(data) {
        //         //     bookmark = data[0].children.slice(0, 15);
        //         //     console.log(bookmark);
        //         // });
        //     }
        // }


        // function getBookmarks() {
        //     return getBookmarksAsync().then(function(data) {
        //         bookmark = data[0].children.slice(0, 15);
        //     })
        // }

        return {
            getBookmarks: getBookmarks
        }
    })
    .service('tagProvider', function(bookmarksProvider) {
        var bookTags = [];

        var tags = [
            {id: '1', name: 'tag-1', items: ['15', '16']},
            {id: '2', name: 'tag-2', items: ['15']}
        ];

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

        // function getTagId(tagName) {
        //     dataProvider.tags.forEach(function(tag) {
        //         // if(tag.name)
        //     })
        // }



        // var books = console.log(bookmarksProvider.getBookmarks());
        // console.log(books);

        bookmarksProvider.getBookmarks().then(function(data) {
            console.log('map');
            // console.log(data);
            var booksLimit = data[0].children.slice(0, 15);
            bookTags = booksLimit.map(addTags);
        })
        // bookmarksProvider().then(function(data) {
        //     console.log(data);
        // });
        // var dataProvider = this;

        // dataProvider.bookmarksItems = [];

        // dataProvider.tags = [
        //     {id: '1', name: 'tag-1', items: ['15', '16']},
        //     {id: '2', name: 'tag-2', items: ['15']}
        // ];

        // function addTags(bookmark) {
        //     let tagsList = [];
        //     let intId = parseInt(bookmark.id, 10);
        //     dataProvider.tags.forEach(function(el) {
        //         el.items.forEach(function(itm) {
        //             let intItm = parseInt(itm, 10);
        //             if(intItm === intId) {
        //                 tagsList.push(el.name);
        //             }
        //         })
        //     });
        //     bookmark.tags = tagsList;
        //     return bookmark;
        // }
        // function getTagId(tagName) {
        //     dataProvider.tags.forEach(function(tag) {
        //         // if(tag.name)
        //     })
        // }

        // function filterByTag(id) {
        //     dataProvider.bookmarksItems.then(function(items) {
        //         return items.filter(function(el) {
        //             if(el.tags.length) {
        //                 if(el.tags[0] === 'tag-1') return el;
        //             }
        //         })
        //     });
        // }


        // function getData () {
        //     return $q(function(resolve, reject) {
        //         chrome.bookmarks.getSubTree('2', resolve);
        //     });
        // }

        // dataProvider.bookmarksItems = getData().then(function(data) {
        //     return data[0].children.slice(0, 15);
        // }).then(function(smm) {
        //     return smm.map(addTags);
        // });

        // return {
        //     bookmarksItems: dataProvider.bookmarksItems,
        //     tags: dataProvider.tags,
        //     filterByTag: filterByTag
        // }
    })
    // .factory('tags', function() {
    //     var tags = [
    //         {id: '1', name: 'tag-1', items: ['15', '16']},
    //         {id: '2', name: 'tag-2', items: ['15']}
    //     ];
    //     function addTags(bookmark) {
    //         let tagsList = [];
    //         let intId = parseInt(bookmark.id, 10);
    //         tags.forEach(function(el) {
    //             el.items.forEach(function(itm) {
    //                 let intItm = parseInt(itm, 10);
    //                 if(intItm === intId) {
    //                     tagsList.push(el.name);
    //                 }
    //             })
    //         });
    //         bookmark.tags = tagsList;
    //         return bookmark;
    //     }

    //     return {
    //         addTags: addTags,
    //         tags: tags
    //     }
    // })
    .controller('BmsController', function(tagProvider) {
        // bookmarksProvider.getBookmarks().then(function(data) {
        //     console.log(data);
        // })
        // var bmsMain = this;
        // bmsMain.bmsList = [];

        // dataProvider.bookmarksItems.then(function(ddd) {
        //     bmsMain.bmsList = ddd;
        // });
        
        // console.log(dataProvider.bookmarksItems);

        // chromeBms.getData().then(function(data) {
        //     bmsMain.bmsList = data[0].children.slice(0, 50);
        //     bmsMain.bmsList.map(tags.addTags);
        // });

        // var storage = localStorage;
        // console.log(storage.length);
    })
    // .controller('BmsTagsController', function(dataProvider) {
    //     var bmsTags = this;
    //     bmsTags.tags = dataProvider.tags;

    //     bmsTags.hello = function(tag) {
    //         // console.log(tag);
    //         var smm = dataProvider.filterByTag(parseInt(tag.id, 10))
    //         console.log(smm);
    //     }
    // })