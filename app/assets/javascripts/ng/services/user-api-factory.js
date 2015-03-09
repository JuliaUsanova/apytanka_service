/**
 * Created by juliausanova on 3/6/15.
 */

(function(){
    var userMod = angular.module('user');
    userMod.factory('userApi', ['$resource', function($resource){
        return $resource('/api/users/:id', {id: "@id"}, {
            update: {method: 'PATCH'}
        })
    }])
})();
