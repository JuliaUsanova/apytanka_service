/**
 * Created by юля on 26.11.2014.
 */

(function(){

    var userControllers = angular.module('user');

    userControllers.controller('loginCtrl', ['$scope', 'userService', 'userApi', 'sessionApi',
        function($scope, userService, userApi, sessionApi){

        $scope.serverValidation = {};

        $scope.registered = false;

        $scope.user = {email: '', password: '', name: '', surname: '', sex: '1', remember_me: false};

        $scope.logIn = function(){

            var session = { email: $scope.user.email, password: $scope.user.password, remember_me: $scope.user.remember_me ? '1' : '0'};
            var sessionResource = new sessionApi(session);

            sessionResource.$save(function(data){
                if(data.errors){
                    $scope.serverValidation.failed = true;
                    $scope.serverValidation.errors = data.errors;
                    return;
                }
                userService.setUser(data.user);
                $scope.serverValidation.failed = false;
            });
        };

        $scope.register = function(){

            var user = new userApi($scope.user);
            user.$save(function(data){
                if(data.errors){
                    $scope.serverValidation.failed = true;
                    $scope.serverValidation.errors = data.errors;
                    return;
                }
                userService.setUser(data.user);
                $scope.serverValidation.failed = false;
            });
        };

    }]);

    userControllers.controller('profileCtrl', ['$scope', 'userService', 'userApi', 'user_data', function($scope, userService, userApi, user_data){

        $scope.user = new userService.userFactory(user_data);

        $scope.selectFile = function(){
            jQuery('#fileselect').click();
        };

        $scope.setAvatar = function(params){
            var event = params.event;

            var ParseFile = function (file){
                // display an image
                if (file.type.indexOf("image") == 0) {
                    var reader = new FileReader();

                    reader.readAsDataURL(file);

                    reader.onload = function(e) {
                        userService.changeAvatar(e.target.result);
                    };

                }
            };

            if (window.File && window.FileList && window.FileReader && event && event.target.files.length > 0) {

                var file = event.target.files[event.target.files.length-1] || event.dataTransfer.files[event.dataTransfer.files.length-1];

                // process File object

                ParseFile(file);

            }

        };

        $scope.update = function(data){
            if (userService.getUser().id == data.id) {
                //data.avatar = data.newAvatar;
                userApi.update( {id: data.id}, {user: data}, function(response) {
                    if ( response.result ) userService.setUser(data);
                });
            }
        };

        $scope.profData = {
            universities: [
                {value: 0, name: 'БГЭУ'}, {value: 1, name: 'БГУ'}, {value: 2, name: 'БГУИР'},
                {value: 3, name: 'ЕГУ'}, {value: 4, name: 'ГПТУ'}, {value: 5, name: 'коледж'}, {value: 6, name: 'іншае'}],
            specialities: [
                {value: 0, name: 'эканаміст'}, {value: 1, name: 'праграміст'},{value: 2, name: 'лекар'}, {value: 3, name: 'ІП'},
                {value: 4, name: 'не працую'}, {value: 5, name: 'іншае'}],
            jobs: [{value: 0, name: 'Эканаміст'}, {value: 1, name: 'Юрыст'}, {value: 2, name: 'Праграміст'}, {value: 3, name: 'Будаўнік'},
                {value: 4, name: 'Лекар'}, {value: 5, name: 'Не працую'}],
            experience: [{value: 0, name: '< 1 года'},{value: 1, name: '> 1 года'},{value: 2, name: 'няма вопыту'}]
        };

        $scope.interestsData = [{value: 0, name: "Раслінавоцтва"}, {value: 1, name: "Музыка"}, {value: 2, name: "Танцы"}, {value: 3, name: "Маляванне"},
            {value: 4, name: "Спорт"}, {value: 5, name: "Вегетарыянства"}, {value: 6, name: "Развядзенне жывел"}, {value: 7, name: "Кансалтынг"},
            {value: 8, name: "Турызм"}, {value: 9, name: "Дызайн"}];

    }]);

    userControllers.controller('chosenUserProfile', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
//        $http({
//         method: 'getChosenUser',
//         url: 'https:...' + $routeParams.id
//         }).success(function(data){
//            $scope.chosenUser = data;
//        });

        $scope.chosenUser = {
            id: 1, name: 'User', surname: 'Userov', email: 'user@gmail.com', avatar: '563469251.png', gender: 'f',
            dateOfBirth: 634600800000, country: 'Belarus', city: 'Minsk', street: 'Russianova',
            skills: [
                {university: 0, speciality: 1, job: 4, experience: 0},
                {university: 3, speciality: 2, job: 0, experience: 2}
            ],
            interests: [{value: 0, descr: 'tra ta ta'},{value: 1, descr: 'like to listen the music'},{value: 4, descr: 'do sport every day'},{value: 5, descr: ''}]
        };
    }]);

})();
