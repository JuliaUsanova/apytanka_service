/**
 * Created by юля on 20.11.2014.
 */

(function(){

    var userMod = angular.module('user');

    userMod.service('userService', ['$http', function($http){

        var User = (function(){

            function UserClass ( data ) {
                this.id = data ? data.id : null;
                this.name = data ? data.name : null;
                this.surname = data ? data.surname : null;
                this.email = data ? data.email : null;
                this.gender = data ? data.gender : null;
                this.dateOfBirth = data ? new Date(data.dateOfBirth) : new Date();
                this.country = data ? data.country : null;
                this.city = data ? data.city : null;
                this.street = data ? data.street : null;
                this.skills = data ? data.skills : [{value: '', name: ''}];
                this.interests = data ? data.interests : [{value: '', descr: ''}];
                this.avatar = data ? data.avatar : 'assets/default-user-image.png';
                this.newAvatar = null;
            }

            UserClass.prototype.addNewSkill = function(){
                this.skills.push({});
            };

            UserClass.prototype.addNewInterest = function(){
                this.interests.push({});
            };

            UserClass.prototype.removeSkill = function(skill){
                var index = this.skills.indexOf(skill);
                this.skills.splice(index, 1);
            };

            UserClass.prototype.removeInterest = function(interest){
                var index = this.interests.indexOf(interest);
                this.interests.splice(index, 1);
            };

            UserClass.prototype.update = function(data){
                if (this.id == data.id) {
                    data.avatar = data.newAvatar;
                    setUser(data);
                }
            };

            return UserClass;

        })();
        var user = new User();

        var registered = false;

        function downloadUserData(url, method, data){

//            $http.get(url, {method: data}).success(function(){

            setUser (data);

            return registered;

//            });
        };

        function setUser (data){
            for (var k in user){
                if (user.hasOwnProperty(k)) {
                    if(k == 'dateOfBirth'){
                        user[k] = new Date(data[k]);
                    }
                    else user[k] = data[k];
                }
            };
            registered = true;


        };

        var userData = {
            id: 1, name: 'User', surname: 'Userov', email: 'user@gmail.com', avatar: 'assets/563469251.png', gender: 'f',
            dateOfBirth: 634600800000, country: 'Belarus', city: 'Minsk', street: 'Russianova',
            skills: [
                {university: 0, speciality: 1, job: 4, experience: 0},
                {university: 3, speciality: 2, job: 0, experience: 2}
            ],
            interests: [{value: 0, descr: 'tra ta ta'},{value: 1, descr: 'like to listen the music'},{value: 4, descr: 'do sport every day'},{value: 5, descr: ''}]
        };

        this.loginUser = function(data){
            data = userData;
            if (downloadUserData('login', 'loginUser', data)) return true;
        };

        this.registerUser = function(data){
            if (downloadUserData('register', 'registerUser', data)) return true;
        };

        this.isRegistered = function(){
            return registered;
        };

        this.getUser = function(){
            return user;
        };

        this.changeAvatar  = function(link){
            user.newAvatar = link;
        };

    }]);

})();