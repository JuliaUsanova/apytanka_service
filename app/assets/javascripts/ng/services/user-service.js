/**
 * Created by юля on 20.11.2014.
 */

(function(){

    var userMod = angular.module('user');

    userMod.service('userService', function(){

        var User = (function(){

            function UserClass ( data ) {
                this.id = data.id || null;
                this.name = data.name || null;
                this.surname = data.surname || null;
                this.email = data.email || null;
                this.sex = data.sex || 1;
                this.birthday = new Date(data.birthday) || new Date();
                this.address_attributes = data.address_attributes || null;
                this.skills_attributes = data.skills_attributes || null;
                this.avatar = data.avatar || '/assets/default-user-image.png';
                this.newAvatar = null;
            }

            UserClass.prototype.isRegistered = (function(result){
                var state = false;

                return function(result){
                    if ( result ) state = result;
                    return state;
                };
            })();

            UserClass.prototype.addNewSkill = function(){
                this.skills_attributes.push({});
            };

            UserClass.prototype.removeSkill = function(skill){
                var index = this.skills.indexOf(skill);
                this.skills_attributes.splice(index, 1);
            };

            return UserClass;

        })();

        var user = (function(data){
            var current = new User({});
            return function(data){
                if ( data ) {
                    current = new User(data);
                }
                return current
            };
        })();

        var userData = {
            id: 1, name: 'User', surname: 'Userov', email: 'user@gmail.com', avatar: '/assets/563469251.png', gender: 'f',
            dateOfBirth: 634600800000, country: 'Belarus', city: 'Minsk', street: 'Russianova',
            skills: [
                {university: 0, speciality: 1, job: 4, experience: 0},
                {university: 3, speciality: 2, job: 0, experience: 2}
            ],
            interests: [{value: 0, descr: 'tra ta ta'},{value: 1, descr: 'like to listen the music'},{value: 4, descr: 'do sport every day'},{value: 5, descr: ''}]
        };

        this.setUser = function(data){
            user (data);
            if ( !user().isRegistered() && data ) user().isRegistered(true);
            //if (downloadUserData('login', 'loginUser', data)) return true;
        };

        this.getUser = function(){
            return user();
        };

        this.changeAvatar  = function(link){
            user.newAvatar = link;
        };

        this.userFactory =  User;


    });

})();