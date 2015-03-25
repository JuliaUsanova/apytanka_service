/**
 * Created by juliausanova on 3/6/15.
 */

(function(){
    var userMod = angular.module('user');
    userMod.factory('userApi', ['$resource', function($resource){
        return $resource('/api/users/:id/:action', {id: "@id", action: '@action'}, {
            update: {method: 'PUT'}
        })
    }])
})();
