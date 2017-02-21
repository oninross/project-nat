// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import 'lazyload';
import 'TweenMax';
import 'doT';
import './_modernizr';
import 'jquery-match-height';

import Localstorage from '../../../_modules/localStorage/localStorage';
import Geoip from '../../../_modules/geoIp/geoIp';
import Audio from '../../../_modules/audio/audio';

import Header from '../../../_modules/header/header';
import Navigation from '../../../_modules/navigation/navigation';
import TablePreview from '../../../_modules/table-preview/table-preview';

import { debounce, isMobile, easeOutExpo } from './_helper';

// Variable declaration
let $window = $(window),
    $body = $('body'),
    $header = $('.header'),
    isMobileDevice = isMobile(),
    lastScrollTop = 0,
    moduleCompletes = 0;

$(() => {
    var localStorage = new Localstorage();         // Activate LocalStorage modules logic
    localStorage.init();

    var audio = new Audio();         // Activate LocalStorage modules logic

    new Geoip();

    new Header();               // Activate Header modules logic
    new Navigation();           // Activate Primary Nav modules logic
    new TablePreview();         // Activate Table Preview modules logic

    ////////////////////////////
    // Set framerate to 60fps //q
    ////////////////////////////
    TweenMax.ticker.fps(60);



    //////////////////
    // Match Height //
    //////////////////
    if (!isMobileDevice) {
        $('.matchHeight').matchHeight();
    }

    var debug = false,
        moduleCompletes = 0,
        $dashboard = $('.dashboard'),
        isLoaded = false;

    if (debug) {
        var el = '.dateStamp .day, ';

        el += '.dateStamp .date, ';
        el += '.timeStamp .icon, ';
        el += '.timeStamp .time, ';
        el += '.weather h2, ';
        el += '.weather h3, ';
        el += '.weather .current .temp, ';
        el += '.weather .hilow, ';
        el += '.weather .icon, ';
        el += '.weather .text';

        TweenMax.set(el, { opacity: 1, top: 0 });
        TweenMax.set('.line-b', { width: '100%' });
        TweenMax.set('.line-r', { height: '100%' });
        TweenMax.set('.line-l', { height: '100%' });
        TweenMax.set('.dashboard', { height: '100%', overflow: 'visible' });

        $('.js-settings').addClass('active');
    }

    var getUsername = localStorage.getUsername();

    if (!debug) {
        TweenMax.set('.preloader', { boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12)' });
        TweenMax.to('.preloader .icon', 2, { rotation: -360, repeat: -1, ease: Power0.easeNone });
        TweenMax.to('.preloader', 0.75, { scale: 1, ease: Expo.easeOut, delay: 1 });

        TweenMax.to('.time .colon', 1, { alpha: 0, repeat: -1, ease: Power0.easeNone, yoyo: true });

        if (getUsername === '') {
            TweenMax.to('.preloader-input', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.25 });
            TweenMax.to('.btn', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.6 });
        } else {
            $dashboard.find('.username').text(getUsername);
        }
    }

    $('#username').on('keyup', function (e) {
        e.preventDefault();

        if (e.keyCode == 13) {
            $('.js-enter').trigger('click');
        }
    });

    $('#dashboard-username').on('blur', function () {
        var $this = $(this),
            $val = $this.val();

        if ($val == '') {
            TweenMax.set($this, { 'border-bottom': '1px solid #f44336' });
        } else {
            TweenMax.set($this, { 'border-bottom': '1px solid #ffffff' });
            localStorage.setUsername($this.val());
        }
    }).on('keyup', function (e) {
        e.preventDefault();

        if (e.keyCode == 13) {
            $(this).blur();
        }
    });


    $('.js-enter').on('click', function (e) {
        e.preventDefault();

        var $username = $('#username').val();

        if ($username === '') {
            $('.floating .placeholder').text('I need to know your name.');
            return false;
        }

        localStorage.setUsername($username);
        $dashboard.find('.username').val($username);

        splash();
    });

    var $jsSettings = $('.js-settings');
    $jsSettings.on('click', function (e) {
        e.preventDefault();

        var $this = $(this);

        $this.toggleClass('active');

        if ($this.hasClass('active')) {
            $dashboard.slideDown(easeOutExpo);
        } else {
            $dashboard.slideUp(easeOutExpo);
        }
    });

    $dashboard
        .find('.username').val(localStorage.getUsername()).end()
        .find('#audio').attr('checked', localStorage.getAudio()).end()
        .on('blur', '.username', function () {
            localStorage.setUsername($(this).val());
        }).on('change', '#audio', function () {
            var $value = $(this).is(':checked');

            localStorage.setAudio($value);
        }).on('click', '.js-close', function (e) {
            e.preventDefault();

            $jsSettings.trigger('click');
        });


    window.II = {};
    window.II.moduleComplete = function () {
        moduleCompletes++;

        if (moduleCompletes === 1) {
            if (!isMobileDevice) {
                $.fn.matchHeight._update();
            }

            if (localStorage.getUsername() === undefined || localStorage.getUsername() === '') {
                TweenMax.to('.preloader', 0.5, { boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0), 0 1px 6px 0 rgba(0, 0, 0, 0)', scale: 0, ease: Expo.easeIn });
                TweenMax.to('.preloader .icon', 0.5, { scale: 0, ease: Expo.easeIn });
            } else {
                splash();
            }

            isLoaded = true;
        }
    };

    var splash = function () {
        var vh = $(window).height(),
            vw = $(window).width(),
            b = 0,
            f = 0;

        if (vw > vh) {
            b = vw;
        } else {
            b = vh;
        }

        f = Math.ceil(b / $('.preloader').height()) + 2;

        TweenMax.to('.preloader', 0.5, { boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0), 0 1px 6px 0 rgba(0, 0, 0, 0)' });
        TweenMax.to('.preloader .icon', 0.5, { scale: 0, ease: Expo.easeIn });

        TweenMax.to('.preloader-input', 0.75, { opacity: 0, top: -25, ease: Expo.easeOut });
        TweenMax.to('.btn', 0.75, { opacity: 0, top: -25, ease: Expo.easeOut, delay: 0.5 });

        // Will not trigger for some weird reason
        TweenMax.to('.preloader', 0.5, {
            scale: f,
            ease: Expo.easeIn,
            delay: 1,
            onComplete: function () {
                if ($('.pm').length) {
                    TweenMax.set('body', { backgroundColor: '#383838' });
                } else {
                    TweenMax.set('body', { backgroundColor: '#f8f8f8' });
                }

                $('.preloader-wrapper').remove();
                animate();
            }
        });

        audio.speak('Loading all information. Please wait.');
    };

    var animate = function () {
        audio.greetUser();

        TweenMax.staggerTo('.line-b', 0.75, { width: '100%', ease: Expo.easeOut }, 0.2);
        TweenMax.staggerTo('.line-r', 0.75, { height: '100%', ease: Expo.easeOut, delay: 0.5 }, 0.2);
        TweenMax.staggerTo('.line-l', 0.75, { height: '100%', ease: Expo.easeOut, delay: 1 }, 0.2);

        TweenMax.staggerTo('.batch1', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1 }, 0.1);
        TweenMax.staggerTo('.batch2', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.25 }, 0.1);
        TweenMax.staggerTo('.batch3', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.5 }, 0.1);
        TweenMax.staggerTo('.batch4', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.75 }, 0.1);
        TweenMax.staggerTo('.batch5', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.0 }, 0.1);
        TweenMax.staggerTo('.batch6', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.25 }, 0.1);
        TweenMax.staggerTo('.batch7', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 2.5 }, 0.1);
    };


    console.log("I'm a nat!");
});


// Simple Service Worker to make App Install work (OPTIONAL)
window.addEventListener('load', function () {
    let outputElement = document.getElementById('output');

    navigator.serviceWorker.register('/service-worker.js', { scope: './' })
        .then(function (r) {
            console.log('registered service worker');
        })
    .catch(function (whut) {
        console.error('uh oh... ');
        console.error(whut);
    });

    window.addEventListener('beforeinstallprompt', function (e) {
        outputElement.textContent = 'beforeinstallprompt Event fired';
    });
});

window.addEventListener('beforeinstallprompt', function (e) {
    outputElement.textContent = 'beforeinstallprompt Event fired';

    // e.userChoice will return a Promise. For more details read: http://www.html5rocks.com/en/tutorials/es6/promises/
    e.userChoice.then(function (choiceResult) {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome == 'dismissed') {
            console.log('User cancelled homescreen install');
        } else {
            console.log('User added to homescreen');
        }
    });
});
