/**
 * Created by юля on 19.11.2014.
 */

jQuery(document).ready(function(){
    jQuery('.carousel').carousel();

    jQuery('body').on('click', '.modal .close', function(){
        $(this).parents('.modal').modal('hide');
    });

    jQuery('.container-fluid').on('click', '#login', function(){
        jQuery('#loginForm').modal('show');
    });

});