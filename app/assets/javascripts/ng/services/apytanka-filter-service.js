/**
 * Created by юля on 05.01.2015.
 */
(function(){

    var customServices = angular.module('customFilter');

    customServices.factory('filterService', ['$http', function($http){
        var _parseParams = function(params){
            return {params: params};
        };
        var _parseAction = function(action){
            return 'getLength' + action;
        };
        var _getData = function (action, params) {
//            var data = _parseParams(params);
//                            return $http({
//                                method: action,
//                                url: 'https:...' + params
//                            })

                //return [
                //    {id: '1', user: {name: 'Ivan', surname: 'Ivanov', id: 123, avatar: '/assets/563469251.png', country: {id: 2, name: 'Thailand'}, city: 'Bangkok'}, title: "First", content: 'bla-bla-bla',
                //        date: 634600801000, rating: {likes: [2, 12, 125, 45, 85, 44], dislikes: [14,58,21]}},
                //    {id: '2', user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: '/assets/563469251.png', country: {id: 1, name: 'Italy'}, city: 'Rome'}, title: "AHAHAHAH",
                //        content: 'Fortune, which has a great deal of power in other matters but especially in war, can bring about great changes in a situation through very slight forces',
                //        date: 634600801001, rating: {likes: [14, 12, 115, 15, 84, 42,64], dislikes: [18,88,26,53]}},
                //    {id: '3', user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: '/assets/563469251.png', country: {id: 3, name: 'Germany'}, city: 'Berlin'}, title: "fsdadfg",
                //        content: 'What we wish, we readily believe, and what we ourselves think, we imagine others think also',
                //        date: 634600801401, rating: {likes: [1, 12, 10, 13, 8], dislikes: [18]}},
                //    {id: '1', user: {name: 'Ivan', surname: 'Ivanov', id: 123, avatar: '/assets/563469251.png', country: {id: 2, name: 'Thailand'}, city: 'Bangkok'}, title: "First", content: 'bla-bla-bla',
                //        date: 634600801000, rating: {likes: [2, 12, 125, 45, 85, 44], dislikes: [14,58,21]}},
                //    {id: '2', user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: '/assets/563469251.png', country: {id: 1, name: 'Italy'}, city: 'Rome'}, title: "AHAHAHAH",
                //        content: 'Fortune, which has a great deal of power in other matters but especially in war, can bring about great changes in a situation through very slight forces',
                //        date: 634600801001, rating: {likes: [14, 12, 115, 15, 84, 42,64], dislikes: [18,88,26,53]}},
                //    {id: '3', user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: '/assets/563469251.png', country: {id: 3, name: 'Germany'}, city: 'Berlin'}, title: "fsdadfg",
                //        content: 'What we wish, we readily believe, and what we ourselves think, we imagine others think also',
                //        date: 634600801401, rating: {likes: [1, 12, 10, 13, 8], dislikes: [18]}}
                //];
            };

        var _listLength = function (action, params) {
            //            var data = _parseAction(action);
//                            return $http({
//                                method: action,
//                                url: 'https:...' + params
//                            })
            return 6;
        };

        return {
            list: _getData,
            listLength: _listLength
        }
    }]);

})();