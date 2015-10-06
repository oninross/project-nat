/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - Listeners
 */
var RR = (function (parent, $){
    'use strict';

    var debug = false,
        moduleCompletes = 0,
        $dashboard = $('.dashboard');

    if ( debug ) {
        var el = '.dateStamp .day, ';

        el += '.dateStamp .date, ';
        el += '.timeStamp .icon, ';
        el += '.timeStamp .time, ';
        el += '.weather h2, ';
        el += '.weather h3, ';
        el += '.weather .current .temp, ';
        el += '.weather .hilow, ';
        el += '.weather .icon, ';
        el += '.weather .text, ';
        el += '.location table td, ';
        el += '.widget, ';
        el += '.news-reports img, ';
        el += '.feedEkList .itemTitle, ';
        el += '.feedEkList .itemContent';

        TweenMax.set( el, { opacity: 1, top: 0 });
        TweenMax.set( '.line-b', { width: '100%' });
        TweenMax.set( '.line-r', { height: '100%' });
        TweenMax.set( '.line-l', { height: '100%' });
    }

    var setup = function () {
        var getUsername = RR.localStorage.getUsername();

        if ( !debug ) {
            TweenMax.set( '.preloader', { boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12)' });
            TweenMax.to('.preloader .icon', 2, { rotation: -360, repeat:-1, ease: Power0.easeNone });
            TweenMax.to('.preloader', 0.75, { scale: 1, ease: Expo.easeOut, delay: 1 });

            TweenMax.to('.time .colon', 1, { alpha: 0, repeat:-1, ease: Power0.easeNone, yoyo: true });

            if ( getUsername === '' ) {
                TweenMax.to('.preloader-input', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.25 });
                TweenMax.to('.btn', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.6 });
            } else {
                $dashboard.find('.username').text( getUsername );
            }
        }

        $('#username').on('keyup', function (e) {
            e.preventDefault();

            if (e.keyCode == 13) {
                $('.js-enter').trigger('click');
            }
        });

        $('.js-enter').on('click', function (e) {
            e.preventDefault();

            var $username = $('#username').val();

            if ( $username === '' ) {
                $('.floating .placeholder').text('I need to know your name.');
                return false;
            }

            RR.localStorage.setUsername($username);
            $dashboard.find('.username').val($username);

            splash();
        });

        var $jsSettings = $('.js-settings');
        $jsSettings.on( 'click', function (e) {
            e.preventDefault();

            var $this = $(this);

            $this.toggleClass('active');

            if ( $this.hasClass('active') ) {
                TweenMax.set( '.dashboard', { height: 'auto' });
                TweenMax.from( '.dashboard', 1, { height: 0, ease: Expo.easeOut, onComplete: function (){
                        TweenMax.set( '.dashboard', { overflow: 'visible' });
                    }
                });
            } else {
                TweenMax.to( '.dashboard', 1, { height: 0, overflow: 'hidden', ease: Expo.easeOut });
            }
        });

        toggleSideBar( RR.localStorage.getSidebar() );

        $dashboard
            .find('.username').val( RR.localStorage.getUsername() ).end()
            .find('#audio').attr( 'checked', RR.localStorage.getAudio() ).end()
            .find('#sidebar').attr( 'checked', RR.localStorage.getSidebar() ).end()
            .on('blur', '.username', function () {
                RR.localStorage.setUsername( $(this).val() );
            }).on('change', '#audio', function () {
                var $value = $(this).is(':checked');

                RR.localStorage.setAudio($value);
            }).on('change', '#sidebar', function () {
                var $value = $(this).is(':checked');

                RR.localStorage.setSidebar($value);

                toggleSideBar($value);
            }).on('click', '.js-close', function (e) {
                e.preventDefault();

                $jsSettings.trigger('click');
            });

    };

    var moduleComplete = function () {
        moduleCompletes++;

        if ( moduleCompletes === 6 ) {
            $.fn.matchHeight._update();

            if ( RR.localStorage.getUsername() === undefined || RR.localStorage.getUsername() === null ) {
                TweenMax.to( '.preloader', 0.5, { boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0), 0 1px 6px 0 rgba(0, 0, 0, 0)', scale: 0, ease: Expo.easeIn });
                TweenMax.to( '.preloader .icon', 0.5, { scale: 0, ease: Expo.easeIn });
            } else {
                splash();
            }
        }
    };

    var splash = function (){
        var vh = $(window).height(),
                vw = $(window).width(),
                b = 0,
                f = 0;

            if ( vw > vh ) {
                b = vw;
            } else {
                b = vh;
            }

            f = Math.ceil(b / $('.preloader').height()) + 2;

            TweenMax.to( '.preloader', 0.5, { boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0), 0 1px 6px 0 rgba(0, 0, 0, 0)' });
            TweenMax.to( '.preloader .icon', 0.5, { scale: 0, ease: Expo.easeIn });

            TweenMax.to('.preloader-input', 0.75, { opacity: 0, top: -25, ease: Expo.easeOut });
            TweenMax.to('.btn', 0.75, { opacity: 0, top: -25, ease: Expo.easeOut, delay: 0.5 });

            TweenMax.to( '.preloader', 0.5, { scale: f, ease: Expo.easeIn, delay: 0.5, onComplete: function () {
                    TweenMax.set('body', { backgroundColor: '#f8f8f8' });
                    $('.preloader-wrapper').remove();
                    animate();
                }
            });
    };

    var animate = function () {
        RR.audio.greetUser();

        TweenMax.staggerTo( '.line-b', 0.75, { width: '100%', ease: Expo.easeOut }, 0.2 );
        TweenMax.staggerTo( '.line-r', 0.75, { height: '100%', ease: Expo.easeOut, delay: 0.5 }, 0.2 );
        TweenMax.staggerTo( '.line-l', 0.75, { height: '100%', ease: Expo.easeOut, delay: 1 }, 0.2 );

        TweenMax.staggerTo( '.batch1', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1 }, 0.1 );
        TweenMax.staggerTo( '.batch2', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.25 }, 0.1 );
        TweenMax.staggerTo( '.batch3', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.5 }, 0.1 );
        TweenMax.staggerTo( '.batch4', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.75 }, 0.1 );
        TweenMax.staggerTo( '.batch5', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.0 }, 0.1 );

        TweenMax.staggerTo( '.batch6', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.0 }, 0.1 );
        TweenMax.staggerTo( '.batch7', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.25 }, 0.1 );

        TweenMax.staggerTo( '.news-listing:nth-child(1) .itemTitle', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.5 }, 0.1 );
        TweenMax.staggerTo( '.news-listing:nth-child(1) .itemContent', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.75 }, 0.1 );

        TweenMax.staggerTo( '.news-listing:nth-child(2) .itemTitle', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 3.0 }, 0.1 );
        TweenMax.staggerTo( '.news-listing:nth-child(2) .itemContent', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 3.25 }, 0.1 );

        TweenMax.staggerTo( '.news-listing:nth-child(3) .itemTitle', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 3.5 }, 0.1 );
        TweenMax.staggerTo( '.news-listing:nth-child(3) .itemContent', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 3.75 }, 0.1 );

        TweenMax.staggerTo( '.batch8', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.5 }, 0.1 );
        TweenMax.staggerTo( '.widget .ui-ul', 0.75, { opacity: 1, left: 0, top: 0, ease: Expo.easeOut, delay: 2.6 }, 0.1);
        TweenMax.staggerTo( '.widget .ui-ur', 0.75, { opacity: 1, right: 0, top: 0, ease: Expo.easeOut, delay: 2.6 }, 0.1);
        TweenMax.staggerTo( '.widget .ui-dr', 0.75, { opacity: 1, right: 0, bottom: 0, ease: Expo.easeOut, delay: 2.6 }, 0.1);
        TweenMax.staggerTo( '.widget .ui-dl', 0.75, { opacity: 1, left: 0, bottom: 0, ease: Expo.easeOut, delay: 2.6 }, 0.1);

        TweenMax.staggerTo( '.widget .lines-tb', 0.75, { scale: 1, ease: Expo.easeOut, delay: 2.7 }, 0.1);
        TweenMax.staggerTo( '.widget .lines-lr', 0.75, { scale: 1, ease: Expo.easeOut, delay: 2.7 }, 0.1);

        TweenMax.staggerTo( '.batch9', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.75 }, 0.1 );
    };

    var toggleSideBar = function (bool) {
        if ( bool ) {
            TweenMax.to( '.mainbar', 0.75, { width: '75%', ease: Expo.easeOut });
            TweenMax.to( '.sidebar', 0.75, { autoAlpha: 1, padding: '0 15px', width: '25%', ease: Expo.easeOut });
        } else {
            TweenMax.to( '.mainbar', 0.75, { width: '100%', ease: Expo.easeOut });
            TweenMax.to( '.sidebar', 0.75, { autoAlpha: 0, padding: 0, width: 0, ease: Expo.easeOut });
        }
    };

    // Export module method
    parent.listeners = {
        setup: setup,
        moduleComplete: moduleComplete,
        splash: splash,
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function($){
    // Self-init Call
    RR.listeners.setup();
});