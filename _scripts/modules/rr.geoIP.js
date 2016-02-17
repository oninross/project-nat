/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - Geo IP
 */
var RR = (function (parent, $){
    'use strict';

    var $location = $('.location');

    var setup = function (){
        if ( RR.localStorage.getGeoIpData() === undefined ) {
            $.ajax({
                url: 'https://freegeoip.net/json/',
                // url: 'https://www.geoplugin.net/json.gp?jsoncallback=?',
                dataType: 'json',
                success: function(data) {
                    RR.localStorage.setGeoIpData( data );
                    populateLocation(data);
                },
                error: function (error){
                    console.log(error);
                    ajaxError();
                },
                statusCode: function (code) {
                    console.log(code);
                }
            });
        } else {
            populateLocation( RR.localStorage.getGeoIpData() );
        }
    };

    var populateLocation = function (data) {
        $location.find('.ip').text( data.ip );
        $location.find('.long').text( deg_to_dms(data.longitude, true) );
        $location.find('.lat').text( deg_to_dms(data.latitude, false) );
        $location.find('.loc').text( data.country );
        $location.find('.loc').text( data.country_name );

        // $location.find('.ip').text( data.geoplugin_request );
        // $location.find('.long').text( deg_to_dms(data.geoplugin_longitude, true) );
        // $location.find('.lat').text( deg_to_dms(data.geoplugin_latitude, false) );
        // $location.find('.loc').text( data.geoplugin_countryName );

        $('.preloader-input').show();

        RR.weatherAPI.setup(data);
        RR.newsFeeds.setup(data);
    };

    var ajaxError = function () {
        TweenMax.killTweensOf('.preloader .icon');
        TweenMax.set('.preloader .icon', { rotation: 0 });
        TweenMax.set('.preloader', { background: '#f44336', color: '#f8f8f8' });

        $('.preloader .icon').removeClass('icon-ic_cached').addClass('icon-ic_warning');
        $('.preloader-text').show();

        TweenMax.to('.preloader-text', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.25 });
    };

    var deg_to_dms = function (deg, _bool) {
        var d = Math.floor (deg),
            minfloat = (deg-d)*60,
            m = Math.floor(minfloat),
            secfloat = (minfloat-m)*60,
            s = secfloat.toFixed(4), //Math.round(secfloat);
            _dir;

        // After rounding, the seconds might become 60. These two
        // if-tests are not necessary if no rounding is done.
        if (s == 60) {
            m++;
            s = 0;
        }
        if (m == 60) {
            d++;
            m = 0;
        }

        if ( _bool ){
            if (d > 0){
                _dir = 'N';
            } else {
                _dir = 'S';
            }
        } else {
            if (d > 0){
                _dir = 'E';
            } else {
                _dir = 'W';
            }
        }

        return (d + '° ' + m + '\' ' + s + '" ' + _dir);
    };

    // Export module method
    parent.geoIP = {
        setup: setup
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function($){
    // Self-init Call
    RR.geoIP.setup();
});