/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - dateWidget
 */
var RR = (function (parent, $) {
    'use strict';

    var $dateStamp = $('.dateStamp'),
        $timeStamp = $('.timeStamp');

    var setup = function () {
        updateTime();
    };

    var updateTime = function () {
        var d = new Date(),
            hours = d.getHours(),
            minutes = d.getMinutes(),
            seconds = d.getSeconds(),
            dn = 'am',
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Set Date
        $dateStamp.find('.day').html(days[d.getDay()] + '<span class="comma">,</span> ');
        $dateStamp.find('.date').text(d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear());

        if (hours >= 18 || hours <= 6) {
            $('body').addClass('pm');
        }


        if (hours >= 12) {
            dn = 'pm';

            if (hours > 12) {
                hours = hours - 12;
            }
        } else if (hours == 0) {
            hours = 12;
        }


        if (minutes <= 9) {
            minutes = '0' + minutes
        }

        $timeStamp.find('.h').text(hours);
        $timeStamp.find('.m').text(minutes);
        $timeStamp.find('.dn').text(dn);

        setTimeout(updateTime, 60000);
    };

    var getTimeOfDay = function () {
        var d = new Date(),
            hours = d.getHours();

        if (hours < 12) {
            return 'morning';
        } else if (hours >= 12 && hours <= 18) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    };

    // Export module method
    parent.dateWidget = {
        setup: setup,
        getTimeOfDay: getTimeOfDay
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function ($) {
    // Self-init Call
    RR.dateWidget.setup();
});
