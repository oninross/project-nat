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


// Simple Service Worker to make App Install work
window.addEventListener('load', function() {
    var outputElement = document.getElementById('output');

    navigator.serviceWorker.register('service-worker.js', { scope: './' })
        .then(function(r) {
          console.log('registered service worker');
      })
    .catch(function(whut) {
        console.error('uh oh... ');
        console.error(whut);
    });

    window.addEventListener('beforeinstallprompt', function(e) {
        outputElement.textContent = 'beforeinstallprompt Event fired';
    });
});

window.addEventListener('beforeinstallprompt', function(e) {
    outputElement.textContent = 'beforeinstallprompt Event fired';

    // e.userChoice will return a Promise. For more details read: http://www.html5rocks.com/en/tutorials/es6/promises/
    e.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome == 'dismissed') {
            console.log('User cancelled homescreen install');
        } else {
            console.log('User added to homescreen');
        }
    });
});



// Caching stuff
'use strict';

//Cache polyfil to support cacheAPI in all browsers
importScripts('./cache-polyfill.js');

var cacheName = 'initial-cache-v1';

//Files to save in cache
var files = [
    './',
    './index.html',
    './index.html?utm=homescreen', //SW treats query string as new page
    './assets/project-nat/css/main.min.css',
    './assets/project-nat/css/responsive.min.css',
    './images/icons/android-icon-192x192.png',
    './images/icons/favicon-16x16.png',
    './images/icons/favicon-32x32.png',
    './manifest.json'
];

//Adding `install` event listener
self.addEventListener('install', function (event) {
    console.info('Event: Install');

    event.waitUntil(
            caches.open(cacheName)
                .then(function (cache) {
                    //[] of files to cache & if any of the file not present `addAll` will fail
                    return cache.addAll(files)
                        .then(function () {
                            console.info('All files are cached');
                            return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
                        }).catch(function (error) {
                            console.error('Failed to cache', error);
                        })
        })
    );
});

/*
FETCH EVENT: triggered for every request made by index page, after install.
*/

//Adding `fetch` event listener
self.addEventListener('fetch', function (event) {
    console.info('Event: Fetch');

    var request = event.request;

    //Tell the browser to wait for newtwork request and respond with below
    event.respondWith(
        //If request is already in cache, return it
        caches.match(request).then(function (response) {
            if (response) {
                return response;
            }

            //if request is not cached, add it to cache
            return fetch(request).then(function (response) {
                var responseToCache = response.clone();

                caches.open(cacheName).then(
                    function (cache) {
                        cache.put(request, responseToCache).catch(function (err) {
                            console.warn(request.url + ': ' + err.message);
                        });
                    });

                return response;
            });
        })
    );
});

/*
ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', function (event) {
    console.info('Event: Activate');

    //Active Service Worker to set itself as the active on current client and all other active clients.
    return self.clients.claim();
});


/*
PUSH EVENT: triggered everytime, when a push notification is received.
*/

//Adding `push` event listener
self.addEventListener('push', function (event) {
    console.info('Event: Push');

    var title = 'Push notification demo';
    var body = {
        'body': 'click to return to application',
        'tag': 'demo',
        'icon': './images/icons/apple-touch-icon.png',

        //Custom actions buttons
        'actions': [
            { "action": "yes", "title": "I ♥ this app!"},
            { "action": "no", "title": "I don\'t like this app"}
        ]
    };

    event.waitUntil(self.registration.showNotification(title, body));
});

/*
BACKGROUND SYNC EVENT: triggers after `bg sync` registration and page has network connection.
It will try and fetch github username, if its fulfills then sync is complete. If it fails,
another sync is scheduled to retry (will will also waits for network connection)
*/

self.addEventListener('sync', function (event) {
    console.info('Event: Sync');

    //Check registered sync name or emulated sync from devTools
    if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
        event.waitUntil(

        //To check all opened tabs and send postMessage to those tabs
        self.clients.matchAll().then(function (all) {
            return all.map(function (client) {
                    return client.postMessage('online'); //To make fetch request, check app.js - line no: 122
                })
            }).catch(function (err) {
                console.error(err);
            })
        );
    }
});

/*
NOTIFICATION EVENT: triggered when user click the notification.
*/

//Adding `notification` click event listener
self.addEventListener('notificationclick', function(event) {
    var appURL = new URL('/', location).href;

    //Listen to custom action buttons in push notification
    if (event.action === 'yes') {
        console.log('I ♥ this app!');
    } else if (event.action === 'no') {
        console.warn('I don\'t like this app');
    }

    event.notification.close(); //Close the notification

    //To open the app after clicking notification
    event.waitUntil(
        clients.matchAll()
        .then(function (clients) {
            for (var i = 0; i < clients.length; i++) {
                var client = clients[i];
                //If site is opened, focus to the site
                if (client.url === appURL) {
                    return client.focus();
                }
            }

            //If site is cannot be opened, open in new window
            return clients.openWindow('/');
        }).catch(function (err) {
            console.error(err);
        })
    );
});
