/* global RR: true, TweenMax: true, jQuery: true, Modernizr: true, jRespond: true, Expo: true */
/* jshint unused: false */

/* requestAnimationFrame Shim */
(function () {
    'use strict';

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            },
                    timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

(function($, undefined){
    'use strict';

    // document ready begin
    // Using the shorthand method to save characters
    $(function() {

        // Set framerate to 60fps
        TweenMax.ticker.fps(60);

        // Init Lazy Loading
        $('img.lazy').lazyload({
            effect : 'fadeIn'
        });


        // Match Height
        $('.matchHeight').matchHeight();
        $.fn.matchHeight._afterUpdate = function(event, groups) {
            RR.listeners.moduleComplete();
        };


        /* Placeholder Alternative */
        (function (){
            // if ( Modernizr.placeholder === true ){
                var $inputText = $('input[type="text"]');

                $inputText
                    .each(function () {
                        var $this = $(this);
                        $this.addClass('blur').attr('value' , $this.attr('placeholder'));
                    })
                    .on('focus', function (){
                        var $this = $(this);
                        if ( $this.val() ===  $this.attr('placeholder')) $this.val('').removeClass('blur');
                    })
                    .on('blur', function (){
                        var $this = $(this);
                        if ( $this.val() ===  '') $this.val($this.attr('placeholder')).addClass('blur');
                });
            // }
        })();


        /* Backstretch Alternative */
        (function (){
            var $backStretch = $('.backstretch');

            $backStretch.each(function (){
                var $this = $(this);
                if(Modernizr.bgsizecover === true) {
                    $this.css({ 'background-image'  : 'url(' + $this.data('background') + ')' });
                } else {
                    // Do your alternative background cover magic
                }
            });
        })();


        /* JRespond Breakpoints */
        var jRes = jRespond([
            {
                label: 'mobile',
                enter: 0,
                exit: 767
            },{
                label: 'tablet',
                enter: 768,
                exit: 1023
            },{
                label: 'desktop',
                enter: 1024,
                exit: 10000
            }
        ]);

        /* JRespond Functions(Desktop) */
        jRes.addFunc({
            breakpoint: ['desktop'],
            enter: function() {
            },
            exit: function (){
            }
        });

        /* JRespond Functions(Tablet) */
        jRes.addFunc({
            breakpoint: ['tablet'],
            enter: function() {
            },
            exit: function() {
            }
        });

        /* JRespond Functions(Mobile) */
        jRes.addFunc({
            breakpoint: ['mobile'],
            enter: function() {
            },
            exit: function() {
            }
        });
    });
}(jQuery));