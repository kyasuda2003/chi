'use strict';

/* Controllers */
angular.module('poeApp.controllers', [])
.controller('alpha', ['$scope', function (sc) {
    var __settings = app.settings;
    sc.$on('$routeChangeSuccess', function () {
        __settings.stage = 'main';
        $('#header').css('height', '666px');
        $('#header .show').show();
        $('#header .container:eq(1)').show();
        /*preloadImages([
         "./img/link-bg-hover.jpg",
         "./img/link1-bg-hover.jpg",
         "./img/link2-bg-hover.jpg",
         "./img/menu-a-bg.gif"
         ]);*/
        function formatText(index, panel) {
            return index + "";
        }
        ;
        //
        //
        $('.anythingSlider2').anythingSlider({
            easing: "easeInCirc", // Anything other than "linear" or "swing" requires the easing plugin
            autoPlay: false, // This turns off the entire FUNCTIONALY, not just if it starts running or not.
            delay: 6000, // How long between slide transitions in AutoPlay mode
            startStopped: false, // If autoPlay is on, this can force it to start stopped
            animationTime: 1000, // How long the slide transition takes
            hashTags: true, // Should links change the hashtag in the URL?
            buildNavigation: false, // If true, builds and list of anchor links to link to each slide
            pauseOnHover: false, // If true, and autoPlay is enabled, the show will pause on hover
            startText: "", // Start text
            stopText: "", // Stop text
            navigationFormatter: formatText   // Details at the top of the file on this use (advanced use)
        });
        //
        //$("#slide-jump").click(function(){
        //         $('.anythingSlider').anythingSlider(6);
        //});

        Cufon.replace('.menu li a, .slogan, h3, h2', {fontFamily: 'News Gothic', hover: true});
        Cufon.replace('.link, .link1, .link2, #SubscribeForm a', {fontFamily: 'Swiss 721'});
        Cufon.replace('.policy', {fontFamily: 'Swiss 721 R'});
        Cufon.now();

        // slideshow with play/pause
        var slideShow = $('.playPauseExample').slideShow({
            interval: 5
        });
        // now add logic to play/pause button
        $('.playPauseExample a.togglePlayback').click(function () {
            if (slideShow.isPlaying()) {
                $(this).html('Play');
            } else {
                $(this).html('Stop');
            }
            slideShow.togglePlayback();
            return false;
        });

        $('.playPauseExample a.page').click(function () {
            if (slideShow.isPlaying()) {
            } else {
                $('.playPauseExample a.togglePlayback').html('Stop');
            }
            return false;
        });

        $('.banner').hover(function () {
            $(this).find('h3').animate({left: '30'}, 100, 'easeInCirc').animate({left: '-50'}, 10, 'easeInCirc').animate({left: '0'}, 400, 'easeOutBounce');
            $(this).find('span').animate({left: '50'}, 100, 'easeInCirc').animate({left: '-5'}, 10, 'easeInCirc').animate({left: '0'}, 400, 'easeOutBounce');
            $(this).find('strong').animate({left: '50'}, 100, 'easeInCirc').animate({left: '-20'}, 10, 'easeInCirc').animate({left: '0'}, 400, 'easeOutBounce');
        }, function () {
        });
        $('#login-block').fadeOut(500, function () {});

    });
    /*
     sc.permissions={
     showMainContent:__settings.isMain,
     headerStyle:__settings.isMain?'height:666px':''
     }
     */

}])
.controller('beta', ['$scope','$window', function (sc,wi) {
    var __settings = app.settings;

    sc.$on('$routeChangeSuccess', function () {
        __settings.stage = 'product';
            $('#header').css('height', '');
            $('#header .show').hide();
            $('#header .container:eq(1)').hide();

        $('#login-block').fadeOut(500, function (){});
    });
    
    sc.getPhoto = function (pIds,isthumb) {
        var _ref=app.data.photos[pIds[0].toString()].filename;
        
        return app.settings.apihost+app.settings.mediapath + '/' +_ref +(isthumb?'/1':'');
    };
    
    sc.productData=app.util.getProducts1RowTable(3);
    
    sc.browsePhoto=function(pIds){
        
        $('body').append($('<div />').attr({
            'class':'poe-photo-block'
        }).css({
            'position': 'fixed',
            'z-index': 4001,
            'width': '100%',
            'height': '100%',
            'background-color': 'rgba(0,0,0,0.5)',
            'top': '0px',
            'left': '0px',
            'text-align':'center',
            'padding-top':'20px'
        }).append($('<img />').attr({
            'src':sc.getPhoto(pIds,false),
            'class':'poe-photo-show'
        })).on({'click':function(){
            this.remove();
        }}));
    };
    /*
     sc.permissions={
     showMainContent:__settings.isMain
     }
     */
}])
.controller('gamma', ['$scope','$window', function (sc,wi) {
     sc.$on('$routeChangeSuccess', function () {
         app.settings.stage = 'contact';
        $('#header').css('height', '');
            $('#header .show').hide();
            $('#header .container:eq(1)').hide();

        $('#login-block').fadeOut(500, function (){});
    });
}]);
