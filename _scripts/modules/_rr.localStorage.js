/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - Cookie
 */
var RR = (function (parent, $) {
    'use strict';


    var setDefault = function () {
        if ( !localStorage.length ) {
            console.log('localStorage is empty')
            localStorage.username = '';
            localStorage.audio = true;
            localStorage.sidebar = true;
            localStorage.newsFeedUrl0 = 'http://rss.nytimes.com/services/xml/rss/nyt/World.xml';
            localStorage.newsFeedUrl1 = 'http://feeds.bbci.co.uk/news/world/rss.xml';
            localStorage.newsFeedUrl2 = 'http://www.theguardian.com/world/rss';
        }
    };


    // GeoIP Data
    var setGeoIpData = function (data) {
        localStorage.geoIpData = JSON.stringify(data);
    };

    var getGeoIpData = function () {
        var cookieData = localStorage.geoIpData;

        if ( cookieData === undefined ) {
            return undefined;
        } else {
            return JSON.parse( cookieData );
        }
    };


    // UserName
    var setUsername = function (username) {
        localStorage.username = username;
    };

    var getUsername = function () {
        return localStorage.username;
    };


    // Audio On/Off
    var getAudio = function () {
        return $.parseJSON( localStorage.audio );
    };

    var setAudio = function (bool) {
        localStorage.audio = $.parseJSON( bool );
    };


    // Side bar On/Off
    var getSidebar = function () {
        return $.parseJSON( localStorage.sidebar );
    };

    var setSidebar = function (bool) {
        localStorage.sidebar = $.parseJSON( bool );
    };


    // News Feed URL
    var getNewsFeedURL = function (idx) {
        switch ( idx ) {
            case 0:
                return localStorage.newsFeedUrl0;

            case 1:
                return localStorage.newsFeedUrl1;

            case 2:
                return localStorage.newsFeedUrl2;

        }
    };

    var setNewsFeedURL = function (idx, url) {
        switch ( idx ) {
            case 0:
                localStorage.newsFeedUrl0 = url;
                break;

            case 1:
                localStorage.newsFeedUrl1 = url;
                break;

            case 2:
                localStorage.newsFeedUrl2 = url;
                break;

        }
    };

    // Export module method
    parent.localStorage = {
        getGeoIpData: getGeoIpData,
        setGeoIpData: setGeoIpData,
        getUsername: getUsername,
        setUsername: setUsername,
        getAudio: getAudio,
        setAudio: setAudio,
        getSidebar: getSidebar,
        setSidebar: setSidebar,
        getNewsFeedURL: getNewsFeedURL,
        setNewsFeedURL: setNewsFeedURL,
        setDefault: setDefault
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function($){
    // Self-init Call
    RR.localStorage.setDefault();
});