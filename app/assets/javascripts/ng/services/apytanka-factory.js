/**
 * Created by юля on 26.11.2014.
 */

(function(){

    var apytanka = angular.module('apytanka');

    apytanka.factory('ApytankaFactory', ['userService', function(userService){

        var user = userService.getUser();

        var Apytanka = (function(data){
            function ApytankaClass (data){
                this.id = data.id;
                this.user = data.user || {id: '', name: '', surname: '', avatar: '', country: {}, city: ''};
                this.title = data.title || '';
                this.content = data.content || '';
                this.date = new Date(data.date);
                this.rating = data.rating || {likes: [], dislikes: []};
                this.comments = data.comments;
            }
            ApytankaClass.prototype.like = function(){
                var index = this.rating.likes.indexOf(user.id);
                index == -1 ? this.rating.likes.push(user.id) : this.rating.likes.splice(index, 1);
            };
            ApytankaClass.prototype.dislike = function(){
                var index = this.rating.dislikes.indexOf(user.id);
                index == -1 ? this.rating.dislikes.push(user.id) : this.rating.dislikes.splice(index, 1);
            };

            return ApytankaClass;

        })();

        return Apytanka;


    }]);





})();