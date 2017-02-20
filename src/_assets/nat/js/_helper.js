'use strict';

let bp = {
    "maxMobile": 767,
    "minDesktop": 1025
}

let debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

let isMobile = function () {
    return Modernizr.mq('(max-width: 767px)');
};

let isTablet = function () {
    return Modernizr.mq('(min-width: 768px)');
};

let isDesktop = function () {
    return Modernizr.mq('(min-width: 1024px)');
};

let isLargeDesktop = function () {
    return Modernizr.mq('(min-width: 1200px)');
};

let isAndroid = function () {
    return navigator.userAgent.match(/Android/i);
};

let isBlackBerry = function () {
    return navigator.userAgent.match(/BlackBerry/i);
};

let isiOS = function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
};

let isOpera = function () {
    return navigator.userAgent.match(/Opera Mini/i);
};

let isWindows = function () {
    return navigator.userAgent.match(/IEMobile/i);
};

let isAny = function () {
    return (isAndroid() || isBlackBerry() || isiOS() || isOpera() || isWindows());
};


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing.jswing = jQuery.easing.swing;

jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) {
            return b;
        }

        if (t == d) {
            return b + c;
        }

        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }

        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

let easeOutExpo = {
    duration: 500,
    easing: 'easeOutExpo',
    queue: false
};

export {
    bp,
    debounce,
    isMobile,
    isTablet,
    isDesktop,
    isAndroid,
    isBlackBerry,
    isiOS,
    isOpera,
    isWindows,
    isAny,
    isLargeDesktop,
    easeOutExpo
};
