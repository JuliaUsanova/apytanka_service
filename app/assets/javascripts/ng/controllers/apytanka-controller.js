/**
 * Created by юля on 28.12.2014.
 */
(function(){
    var apytanka = angular.module('apytanka');

    apytanka.controller('apytankaListCtrl', ['$scope', '$location', 'filterService', 'Pagination', function($scope, $location, filterService, Pagination){

        var selected = {'country': 'all', 'search': '', date: 'all', rating: 'all'};
        $scope.hideFiltersPanel = false;

        $scope.pagination = new Pagination();

        $scope.filter = {
            countries: {
                list: [{id: 'all', name: 'Усе'}]
            },
            searchParam: '',
            date: {
                options: [{value: 0, name: 'Спачатку новыя'}, {value: 1, name: 'Спачатку старыя'}, {value: 'all', name: 'Не мае сэнса'}]
            },
            rating: {
                options: [{value: 0, name: 'Спачатку з вышэйшым'}, {value: 1, name: 'Спачатку з ніжэйшым'}, {value: 'all', name: 'Не мае сэнса'}]
            },
            selected: angular.copy(selected),
            reset: function(){
                angular.copy(selected, $scope.filter.selected)
            }
        };

        $scope.createApytanka = function(){
            $scope.ap = {id: '?', date: new Date(), comments: [], user: {}};
            $scope.hideFiltersPanel = true;

            //maybe should set it to apytanka factory
        };
        $scope.addApytanka = function(){
            angular.extend($scope.ap.user, $scope.currentUser);
            $scope.pagination.allData().unshift($scope.ap);
            $scope.hideFiltersPanel = false;
            //$http.put for updating only?
            //should set it to apytanka factory
        };

//        $scope.$on('searchParamsChanged', function(event, searchObj){
////                filterService.list('apytanki', searchObj).success(function(data){
////                                $scope.filteredList = data;
////                            });
//
//            if ( $scope.pagination.allData() == [] ) {
//                // делаем спец запрос, чтобы узнать кол-во элементов подходящих под параметры фильтра
//               // на саксэсс вызываем $scope.pagination.setData(result), где автоматически рассчит-ся кол-во страниц и срабатывает цикл функций для numbersList
//              // searchObj добавляем старт индекс
//            }
//
//
//
//            var filteredList = filterService.list('apytanki', searchObj);
////            $scope.pagination.allData(filteredList);
//            $scope.pagination.setData(filteredList);
//            event.stopPropagation();
//        });

//        $scope.$on('$routeUpdate', function(event, routeParams){
//            var val = parseInt($location.hash());
//            if ( $scope.pagination.pageIndex() != val ) $scope.pagination.pageIndex(val);
//        }, true);

        $scope.$on('searchParamsChanged', function(event, searchObj){
            $scope.pagination.allData([]);
        });

        $scope.$on('$routeUpdate', function(event, routeParams){
            var val = parseInt($location.hash());
            if ( $scope.pagination.pageIndex() != val ) $scope.pagination.pageIndex(val);
            if ( $scope.pagination.getData.buffer != null ) {
                var getData = $scope.pagination.getData;
                routeParams.params.startIndex = getData.start;
                routeParams.params.endIndex = getData.end;
                var filteredBuffer = filterService.list('apytanki', routeParams.params);
                getData.buffer(filteredBuffer);
                getData.buffer = null;
            }
            if ( $scope.pagination.allData().length == 0 ) {
                var data = {};
                data.itemsNumber = filterService.listLength('apytanki', routeParams.params);
                $scope.pagination.setData(data);

                var firstPage = $scope.pagination.numbersList()[0];
                var lastPage = $scope.pagination.numbersList[$scope.pagination.numbersList().length-1];

                routeParams.params.startIndex = $scope.pagination.itemsOnPage * (firstPage - $scope.pagination.buttonsLength);
                routeParams.params.endIndex = $scope.pagination.itemsOnPage * (lastPage + $scope.pagination.buttonsLength);

                var filteredList = filterService.list('apytanki', routeParams.params);

                $scope.pagination.setBuffers(filteredList);
            }
        }, true);

        $scope.$watch('pagination.getData', function(newVal, oldVal){
            $location.hash($scope.pagination.pageIndex());
        });

    }]);

    apytanka.controller('apytankaCtrl', ['$scope', 'ApytankaFactory', 'userService', function($scope, ApytankaFactory, userService){

        var user = userService.getUser();

        var apytanka = {id: '1', user: {name: 'Inna', surname: 'Ivanova', id: 123, avatar: 'css/images/1644835.jpg', country: 'Thailand',
            city: 'Bangkok'}, title: "First", content: 'bla-bla-bl-nnnnnnnnnnnnnnn-knbvccvg ghjb c gcvbnb fhggfc dddfg ga', date: 634600801000,
            comments: [
                {user: {name: 'Kiloak', surname: 'Kiser', id: 123, avatar: 'css/images/563469251.png', country: 'Germany', city: 'Berlin'}, id: 1,
                    comment: {content: 'fffffff', title: 'Yjdfkdre fesadfjfds fvgnbvcxzx', rating: 3, date: '30.08.2014'}},
                {user: {name: 'Julian', surname: 'Cesar', id: 123, avatar: 'css/images/563469251.png', country: 'Italy', city: 'Rome'}, id: 2,
                    comment: {content: 'fjsddfudisd hfduioskzxmc sodklxmcnvb sbddfskx bdszkxc fds', title: 'Ijdnfjd fhuew', date: '12.05.2014', rating: 4}}
            ]};

        $scope.apytanka = new ApytankaFactory(apytanka);

        var pureComment = {
            content: '',
            title: '',
            date: new Date(),
            rating: (function(){
                var number = 0;

                function rating (){
                    return number
                };

                rating.setR = function(val){
                    if(typeof(val) == 'number' && val <= 5) number = val;
                    rating();
                };

                rating.isPositive = function(val){
                    return number - val >= 0;
                };

                return rating;

            })()
        };

        $scope.uComment = angular.copy(pureComment);

        $scope.addComment = function(){
            var comment =  {user: {name: user.name, surname: user.surname, id: user.id, avatar: user.avatar, country: user.country, city: user.city},
                id: 'new', comment: {content: $scope.uComment.content, title: $scope.uComment.title, date: $scope.uComment.date,
                    rating: $scope.uComment.rating()}};

//            http request should be here, with user id expept user: {}
//            in the respond the id of new comment will come


            $scope.apytanka.comments.unshift(comment);
            pureComment.rating.setR(0);
            $scope.uComment = angular.copy(pureComment);
        };

    }]);
})();