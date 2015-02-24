/**
 * Created by юля on 06.01.2015.
 */
(function(){
    var customServices = angular.module('customFilter');

    customServices.factory('Pagination', [function(){

        function Pagination(arr){

            var _itemsOnPage = 5;
            var _buttonsLength = 1;
            var _numbersList = [];
            var _pagesLength = 1;
            var _getData = {
                start: null,
                end: null,
                buffer: null
            };
            var _allData = (function(){
                var data = [];
                return function(array){
                    if ( array != null ) data = array;
                    return data;
                }
            })() ;
            var _prevData = (function(){
                var data = [];
                return function(array){
                    if ( array != null ) data = array;
                    return data;
                }
            })() ;
            var _nextData = (function(){
                var data = [];
                return function(array){
                    if ( array != null ) data = array;
                    return data;
                }
            })() ;


            var _pageIndex = 1;

            function _next(){
                if ( _numbersList[_numbersList.length-1] < _pagesLength ) {
                    _prevData(_allData());
                    _allData(_nextData());
                    _setPageIndex(_pageIndex, 'next');
                    for (var i = 0; i < _buttonsLength; i++) {
                        _numbersList[i] += _buttonsLength;
                    }
                    var obj = {};
                    obj.start = _pageIndex + _itemsOnPage * _buttonsLength ;
                    obj.end = _pageIndex + _itemsOnPage * _buttonsLength * 2;
                    obj.buffer = _nextData;
                    angular.copy(obj, _getData);
                }
            };
            function _prev(){
                if ( _numbersList[0] > 1) {
                    _nextData(_allData());
                    _allData(_prevData());
                    _setPageIndex(_pageIndex, 'prev');
                    for (var i = 0; i < _buttonsLength; i++) {
                        _numbersList[i] -= _buttonsLength;
                    }
                    var obj = {};
                    obj.start = _pageIndex - _itemsOnPage * _buttonsLength * 2;
                    obj.end = _itemsOnPage * _buttonsLength;
                    obj.buffer = _prevData;
                    angular.copy(obj, _getData);
                }
            };

            function _setPageIndex (oldIndex, oper) {
                var result = oldIndex % _pagesLength == 0;
                if ( oper == 'next' && result && Math.max(null, _numbersList) == oldIndex ) _pageIndex += 1;
                if ( oper == 'prev' && result &&  Math.min(null, _numbersList) == oldIndex ) _pageIndex -= 1;
                if ( !result ) {
                    _pageIndex = oper == 'next' ? Math.max(null, _numbersList) + 1 : Math.min(null, _numbersList) + 1;
                }
            };

            function _setPagination (data) {
                if ( data.list && typeof(data.list) == "object" && data.list.length > 0 ) _allData(data);
//                _pagesLength = Math.ceil( _allData().length / _itemsOnPage );
                _pagesLength = Math.ceil(data.itemsNumber / _itemsOnPage);
                _numbersList = [];

                var startPoint = ( _pagesLength - _pageIndex < _pagesLength / 2 ) ? 1 :  ( _pagesLength / 2 );
                numbersListLoop();
                function numbersListLoop (){
                    for ( var i = 0; i <= _buttonsLength; i ++ ) {
                        startPoint += i;
                        _numbersList.push(startPoint);
                    }
                    if ( _numbersList.indexOf(_pageIndex) == -1 ) {
                        _numbersList = [];
                        numbersListLoop();
                    }
                };

//                for ( var i = 0; i <= _buttonsLength; i++ ) {
//                    _numbersList.push(i+1);
//                    if( i+1 == _pagesLength ) return;
//                }
            };

            function _currentPage (index) {
                 if( _pageIndex != index )  _pageIndex = index;
                 if ( _pageIndex > _pagesLength ) return;
                 var startIndex = _pageIndex*_itemsOnPage - _itemsOnPage;
                 var endIndex = _pageIndex*_itemsOnPage;
                 return _pageIndex == null ? _allData() : _allData().slice(startIndex, endIndex);
            };

            function _setBuffers (data) {
                var firstPage = _numbersList[0] == 1 ? 0 : _numbersList[0];
                var lastPage = _numbersList[_numbersList.length-1];
                _allData( data.slice( firstPage * _itemsOnPage,  lastPage * _itemsOnPage ) );
                _prevData( data.slice( _itemsOnPage * ( firstPage - _buttonsLength ), firstPage * _itemsOnPage ) );
                _nextData( data.slice( lastPage * _itemsOnPage, _itemsOnPage * ( lastPage + _buttonsLength ) ) );
            };

            this.next = _next;

            this.prev = _prev;

            this.pagesLength = function(){ return _pagesLength };

            this.buttonsLength = _buttonsLength;

            this.pageIndex = function(index){
                return index == null ? _pageIndex :  _pageIndex = index;
            };

            this.numbersList = function(){ return _numbersList };

            this.currentPage = _currentPage;

            this.setData = _setPagination;

            this.allData = _allData;
            this.prevData = _prevData;
            this.nextData = _nextData;

            this.itemsOnPage = _itemsOnPage;

            this.getData = _getData;

            this.setBuffers = _setBuffers;

        };

        return Pagination;
    }]);

})();
