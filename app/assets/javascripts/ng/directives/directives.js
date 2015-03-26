/**
 * Created by юля on 20.11.2014.
 */
(function(){

    var app = angular.module('customDirectives');

    app.directive('customOnChange', ['$timeout', function($timeout) {
        'use strict';

        return {
            restrict: "A",

            scope: {
                handler: '&'
            },
            link: function(scope, element){

                element.change(function(event){
                    scope.$apply(function(){
                        var params = {event: event, el: element};
                        scope.handler({params: params});
                        $timeout(function(){}, 500);
                    });
                });
            }

        };
    }]);

    app.directive('includeReplace', function () {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });

    app.directive('apytanka', ['ApytankaFactory', function(ApytankaFactory){
        return {
            restrict: 'EA',
            require: '^ngModel',
            //scope: {
            //    apytanka: '='
            //},
            templateUrl: 'ng/templates/apytanka_tmpl.html',
            link: function(scope, el, attr, ctrl){
                scope.apytanka = new ApytankaFactory(scope.apytanka);
            },
            replace: true
        }
    }]);

    app.directive('apytankaComment', [function(){
        return {
            restrict: 'EA',
            templateUrl: 'ng/templates/apytanka-comment.html',
            replace: true
        }
    }]);

    app.directive('filter', ['$http', function($http){
        return{
            restrict: 'EA',
            templateUrl: 'ng/templates/filter.html',

            controller: ['$scope', '$location', function($scope, $location){

                var setParams = function (obj1, obj2){
                    var keyArr = Object.keys(obj1);
                    for ( var i=0; i < keyArr.length; i++ ) {
                        if (keyArr[i] == 'search' && obj1[keyArr[i]] != '') {
                            obj2[keyArr[i]] = obj1[keyArr[i]];
                        }
                        else if (keyArr[i] != 'search' && !isNaN(parseInt(obj1[keyArr[i]])) ) {
                            obj2[keyArr[i]] = obj1[keyArr[i]];
                        }
                    }
                };

                $scope.updateSearchLocation = function (urlObj){
                    var filtersObj = {};
                    setParams(urlObj, filtersObj);
                    jQuery.isEmptyObject(filtersObj) ? $location.search({'search': ''}).hash('1') : $location.search(filtersObj).hash('1');
                    $scope.$emit('searchParamsChanged', $location.search());
                };

                $scope.updateFilterSelectedParams = function(number){
                    setParams($location.search(), $scope.filter.selected);
                    if ( jQuery.isEmptyObject($location.search()) ) $location.search({'search': ''}).hash('1');
                };

                $scope.updateFilterSelectedParams();
                $scope.$emit('searchParamsChanged', $location.search());

            }],
            link: function($scope, iElement, iAttrs, ctrl){

                $scope.$watch('filter.selected', function(newVal, oldVal){
                    if ( !angular.equals(newVal, oldVal) ) $scope.updateSearchLocation(newVal);
                }, true);

            },
            transclude: true
        }

    }]);

})();
