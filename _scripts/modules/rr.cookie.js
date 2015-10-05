/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - Cookie
 */
var RR = (function (parent, $) {
    'use strict';

    var globalSettings = {
        username: undefined,
        mute: false
    };

    var setGeoIpData = function (data) {
        Cookies.set('geoIpData', data);
    };

    var getGeoIpData = function () {
        var cookieData = Cookies.get('geoIpData');

        if ( cookieData === undefined ) {
            return undefined;
        } else {
            return JSON.parse( cookieData );
        }
    };

    var setUsername = function (username) {
        Cookies.set('username', username);
    };

    var getUsername = function () {
        return Cookies.get('username');
    };

    var getSettings = function () {

    };

    var setSettings = function () {

    };

    // Cookies.set('name', 'value');
    // Export module method
    parent.cookie = {
        getGeoIpData: getGeoIpData,
        setGeoIpData: setGeoIpData,
        getUsername: getUsername,
        setUsername: setUsername,
        getSettings: getSettings,
        setSettings: setSettings
    };

    return parent;

}(RR || {}, jQuery));