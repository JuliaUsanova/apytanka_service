/**
 * Created by юля on 30.12.2014.
 */
(function(){
    angular.module('customFilter')
        .factory('serverFilter', ['$http', function($http){
            var params;
            var requestMethod;

            var parseUrl = function(url){

            };
            var doRequest = function(url){
                parseUrl(url);
                return $http({
                    method: requestMethod,
                    url: 'https:...' + params
                });
            };

            return {
                results: function(url){
                        return doRequest(url);
                }
            }

        }]);

})();