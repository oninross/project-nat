/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true, scrollMonitor: true */
/* jshint unused: false, strict: false */

/**
 * RR - Material Design Components
 */
var RR = (function (parent, $) {
    'use strict';

    var $body = $('body'),
        $window = $(window);

    // Select Box Beautifier
    $.fn.materialize = function () {
        return this.each(function () {
            var $this = $(this),
                $label = $('<span class = "material-label"/>'),
                $arrow = $('<span class = "icon-ic_arrow_drop_down"/>'),
                $wrapper = $('<div class = "material-select-wrapper js-material-drop"/>'),
                markup = '';

            $this
                .wrap($wrapper)
                    .before($label)
                    .before($arrow)
                    .on('change', function (e) {
                        $label.text($this.find(':selected').text());
                    });//.trigger('change');

            $label.text($this.find(':selected').text());

            markup += '<div class="card-wrapper">';
            markup += '<ul>';


            $this.find('option').each(function () {
                var that = $(this);

                if (that.is(':selected')) {
                    markup += '<li><button class="active">' + that.text() + '</button></li>';
                } else {
                    markup += '<li><button>' + that.text() + '</button></li>';
                }
            });

            markup += '</ul>';
            markup += '</div>';

            $this.after(markup);

            var $jsMaterialDrop = $('.js-material-drop');

            $jsMaterialDrop.on('click', '.material-label', function () {
                var $this = $(this),
                    $card = $this.parent().find('.card-wrapper');

                TweenMax.to($card, 0.25, { autoAlpha: 1, scale: 1, ease: Expo.easeOut });
                TweenMax.staggerTo($card.find('li'), 1, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 0.3 }, 0.1);
            }).on('click', 'button', function () {
                var $this = $(this),
                    $cardWrapper = $this.parents('.card-wrapper'),
                    $materialSelectWrapper = $this.parents('.material-select-wrapper'),
                    ind = $this.parent().index() + 1,
                    selectedValue = $materialSelectWrapper.find('select option:nth-child(' + ind + ')').val();

                $cardWrapper.find('.active').removeClass('active');
                $this.addClass('active');

                TweenMax.to($cardWrapper, 0.25, { autoAlpha: 0, scale: 0.5, ease: Expo.easeIn });
                TweenMax.to($cardWrapper.find('li'), 0.5, { opacity: 0, top: -20, ease: Expo.easeIn, delay: 0.25 });

                $materialSelectWrapper
                    .find('select').val(selectedValue).trigger('change').end()
                    .find('.material-label').text($this.text());
            });

            $window.on('scroll', function () {
                TweenMax.to('.card-wrapper', 0.25, { autoAlpha: 0, scale: 0.5, ease: Expo.easeIn });
                TweenMax.to('.card-wrapper li', 0.5, { opacity: 0, top: -20, ease: Expo.easeIn, delay: 0.25 });
            });

            $this.next().mCustomScrollbar({
                setHeight: 300,
                theme: 'minimal-dark',
                scrollbarPosition: 'outside'
            });
        });
    };

    var setup = function () {

        // Ripple Effect
        var $rippleEffect = $('button, .cta');

        $rippleEffect.on('click', function (e) {
            var $this = $(this);

            if (!$this.hasClass('disabled')) {
                ripple(e, $this);
            }
        });


        // Hamburger Menu
        var $materialMenu = $('.material-menu');

        // TimelineMax the menu-icon animation for easier control on Touch/Mouse Events
        var tl = new TimelineMax();

        tl.to($materialMenu.find('.top'), 0.2, { top: 4, ease: Expo.easeInOut });
        tl.to($materialMenu.find('.bot'), 0.2, { top: -4, ease: Expo.easeInOut }, '-=0.2');

        tl.to($materialMenu.find('.mid'), 0.2, { opacity: 0, ease: Expo.easeInOut });
        tl.to($materialMenu.find('.top'), 0.2, { rotation: 45, ease: Expo.easeInOut }, '-=0.2');
        tl.to($materialMenu.find('.bot'), 0.2, { rotation: -45, ease: Expo.easeInOut }, '-=0.2');


        // Stop the Timeline at 0 else the animation will play after initiation
        tl.pause();

        $materialMenu.on('click', function () {
            var $this = $(this);

            $this.toggleClass('active');

            if ($this.hasClass('active')) {
                tl.reverse();
            } else {
                tl.play();
            }
        });


        // Floating Label Input Box
        $('.floating-input').each(function () {
            var $this = $(this);

            $this
                .wrap('<div class="floating"></div>')
                .before('<span class="placeholder">' + $this.attr('placeholder') + '</span>')
                .attr('placeholder', '')
                .on('focus', function () {
                    var $this = $(this);

                    $this.parent().addClass('focus');
                }).on('blur', function () {
                    var $this = $(this);

                    if ($this.val() === '') {
                        $this.parent().removeClass('focus');
                    }
                });

            if ($this.data('hint') !== undefined && $this.data('hint') !== '') {
                $this.after('<span class="hint"><strong>*Hint: </strong>' + $this.data('hint') + '</span>');
            }

            $('.placeholder').on('click', function () {
                $(this).next().focus();
            });
        });


        // Progress Bar
        $('.progress').each(function () {
            var $this = $(this),
                $progressBar = $this.find('.progress-bar');

            if ($progressBar.data('value') !== undefined) {
                $progressBar.css({ width: $progressBar.data('value') + '%' });
            }
        });

        $('.material').materialize();

        var $cardWrapper = $('.card-wrapper');

        $body.on('click', function (e) {
            var $eTarget = $(e.target),
                $cardWrapper = $('.card-wrapper');

            if (!$eTarget.hasClass('material-select-wrapper') && !$eTarget.parents('.material-select-wrapper').length) {
                TweenMax.to($cardWrapper, 0.25, {
                    autoAlpha: 0,
                    scale: 0.5,
                    top: 0,
                    ease: Expo.easeInOut,
                    onComplete: function () {
                        TweenMax.set($cardWrapper.find('li'), { opacity: 0, top: -20 });
                    }
                });
            }
        });

        // cards
        var $card = $('.card');
        if ($card.length) {
            $card.each(function (i, el) {
                var $this = $(el);

                var cardWatcher = scrollMonitor.create(el);
                cardWatcher.enterViewport (function () {
                    $this.addClass('show', this.isInViewport);
                    $this.removeClass('up', this.isAboveViewport);
                });

                cardWatcher.exitViewport(function () {
                    $this.removeClass('show', this.isInViewport);
                    $this.toggleClass('up', this.isAboveViewport);
                });
            });

            scrollMonitor.recalculateLocations();
        }

    };

    /* Ripple Effect */
    var inc = 0;
    var ripple = function (e, el) {

        // create SVG element
        var dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        dummy.setAttributeNS(null, 'version', '1.1');
        dummy.setAttributeNS(null, 'width', '100%');
        dummy.setAttributeNS(null, 'height', '100%');
        dummy.setAttributeNS(null, 'class', 'ripple ripple' + inc);

        var ripplePosX = e.pageX - el.parent().offset().left;
        var ripplePosY = e.pageY - el.parent().offset().top;

        var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttributeNS(null, 'transform', 'translate(' + ripplePosX + ', ' + ripplePosY + ')');

        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null, 'cx', 0);
        circle.setAttributeNS(null, 'cy', 0);
        circle.setAttributeNS(null, 'r', parseInt(el.outerWidth() / 2) + 25);

        dummy.appendChild(g);
        g.appendChild(circle);
        el.append(dummy);

        var $ripple = el.find('.ripple' + inc);

        TweenMax.from($ripple.find('circle'), 1, { attr: { r: 0 }, opacity: 0.75, ease: Expo.easeOut, onComplete: function () {
                $ripple.remove();
            }
        });

        inc++;
    };

    // Export module method
    parent.materialDesign = {
        setup: setup,
        ripple: ripple
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function ($) {
    'use strict';
    // Self-init Call
    RR.materialDesign.setup();
});
