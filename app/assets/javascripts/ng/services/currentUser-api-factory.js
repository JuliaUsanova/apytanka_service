/**
 * Created by juliausanova on 3/26/15.
 */
(function(){
    angular.module('user').factory('currentUserApi', ["$resource", function($resource){
        return $resource('/current_user');
    }]);
})();