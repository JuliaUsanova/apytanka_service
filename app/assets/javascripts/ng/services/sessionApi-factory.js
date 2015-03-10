/**
 * Created by juliausanova on 3/10/15.
 */
(function(){
    angular.module('user').factory('sessionApi', ['$resource', function($resource){
        return $resource('/api/sessions', {

        })
    }])
})();