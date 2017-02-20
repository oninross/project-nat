'use strict';

import Localstorage from '../localStorage/localStorage';
import Weather from '../weather/weather';

var $location = $('.location');

export default class Geoip {

    constructor() {
        var that = this,
            localStorage = new Localstorage();

        if (localStorage.getGeoIpData() === undefined) {
            $.ajax({
                url: '//freegeoip.net/json/',
                // url: '//www.geoplugin.net/json.gp?jsoncallback=?',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.city == '') {
                        ajaxError();
                        $('.preloader-text p').text('Whoops! We can\'t determine your location.  Did you enable your location?');
                        $('.preloader-wrapper .btn').hide();
                    } else {
                        localStorage.setGeoIpData(data);
                        that.populateLocation(data);
                    }
                },
                error: function (error) {
                    console.log(error);
                    ajaxError();
                },
                statusCode: function (code) {
                    console.log(code);
                }
            });
        } else {
            that.populateLocation(localStorage.getGeoIpData());
        }
    }

    populateLocation(data) {
        // https://freegeoip.net/json/

        // http://www.geoplugin.net/json.gp?jsoncallback=?

        $('.preloader-input').show();

        var weather = new Weather();
        weather.setup(data);
    }

    ajaxError() {
        TweenMax.killTweensOf('.preloader .icon');
        TweenMax.set('.preloader .icon', { rotation: 0 });
        TweenMax.set('.preloader', { background: '#f44336', color: '#f8f8f8' });

        $('.preloader .icon').removeClass('icon-ic_cached').addClass('icon-ic_warning');
        $('.preloader-text').show();

        TweenMax.to('.preloader-text', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 1.25 });
    }
}
