/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true, scrollMonitor: true */
/* jshint unused: false, strict: false */

/**
 * RR - Material Design Components
 */
var RR = (function (parent, $){
    'use strict';

    // Select Box Beautifier
    $.fn.materializeSelect = function() {
        return this.each(function() {
            var $this = $(this),
                $label = $('<span class = "material-label"/>'),
                $arrow = $('<span class = "icon-ic_arrow_drop_down"/>'),
                $wrapper = $('<div class = "material-select-wrapper"/>');

            $this
                .wrap($wrapper)
                    .before($label)
                    .before($arrow)
                    .on('change', function(e) {
                        $label.text($this.find(':selected').text());
                    }).trigger('change');
        });
    };

    $.fn.materializeMarkup = function() {
        return this.each(function() {
            var $this = $(this),
                $label = $('<span class = "material-label"/>'),
                $arrow = $('<span class = "icon-ic_arrow_drop_down"/>'),
                $wrapper = $('<div class = "material-select-wrapper js-material-drop"/>'),
                _markup = '';

            $this
                .wrap($wrapper)
                    .before($label)
                    .before($arrow)
                    .on('change', function(e) {
                        $label.text($this.find(':selected').text());
                    }).trigger('change');

            _markup += '<div class="card-wrapper">';
            _markup += '<ul>';

            $this.find('option').each(function (){
                var _this = $(this);

                _markup += '<li><button>' + _this.text() + '</button></li>';
            });

            _markup += '</ul>';
            _markup += '</div>';

            $this.after( _markup );

            $this.prev().prev().on('click', function (){
                var $this = $(this),
                    $card = $this.parent().find('.card-wrapper');

                TweenMax.to( $card, 0.25, { autoAlpha: 1, scale: 1, top: 0, ease: Expo.easeInOut } );
                TweenMax.staggerTo( $card.find('li'), 1, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 0.3 }, 0.1 );
            });

            $this.next().on('click', 'button', function (e){
                e.preventDefault();

                var $this = $(this),
                    $card = $this.parent().parent().parent(),
                    $materialWrapper = $card.parent(),
                    ind = $this.parent().index() + 1,
                    selectedValue = $card.parent().find('select option:nth-child('+ ind +')').val();

                $card.find('.active').removeClass('active');
                $this.addClass('active');

                TweenMax.to( $card, 0.25, { autoAlpha: 0, scale: 0.5, top: -20, ease: Expo.easeInOut } );
                TweenMax.to( $this.parent().parent().find('li'), 0.5, { opacity: 0, top: -20, ease: Expo.easeOut, delay: 0.25 });

                $materialWrapper.find('select').val( selectedValue ).trigger('change');
                $materialWrapper.find('.material-label').text( $card.parent().find('select option:nth-child('+ ind +')').text() );
            });
        });
    };

    var setup = function (){

        // Floating Label Input Box
        $('.floating-input').each(function (){
            var $this = $(this);

            $this
                .wrap('<div class="floating"></div>')
                .before('<span class="placeholder">' + $this.attr('placeholder') + '</span>')
                .attr('placeholder', '')
                .on('focus', function (){
                    var $this = $(this);

                    $this.parent().addClass('focus');
                }).on('blur', function (){
                    var $this = $(this);

                    if ( $this.val() === '' ){
                        $this.parent().removeClass('focus');
                    }
                });

            if ( $this.data('hint') !== undefined && $this.data('hint') !== '' ){
                $this.after('<span class="hint"><strong>*Hint: </strong>' + $this.data('hint') + '</span>');
            }

            $('.placeholder').on('click', function () {
                $(this).next().focus();
            });
        });


        // Progress Bar
        $('.progress').each(function(){
            var $this = $(this),
                $progressBar = $this.find('.progress-bar');

            if ( $progressBar.data('value') !== undefined ){
                $progressBar.css({ width: $progressBar.data('value') + '%' });
            }
        });

        $('.select').materializeSelect();

        $('.material').materializeMarkup();

        var $body = $('body');
        $body.on('click', function (e){
            var $eTarget = $( e.target ),
                $cardWrapper = $('.card-wrapper');

            if ( !$eTarget.hasClass('material-select-wrapper') && !$eTarget.parents('.material-select-wrapper').length ) {
                TweenMax.to( $cardWrapper, 0.25, { autoAlpha: 0, scale: 0.5, ease: Expo.easeIn } );
                TweenMax.to( $cardWrapper.find('li'), 0.5, { opacity: 0, top: -20, ease: Expo.easeIn, delay: 0.25 });
            }
        });

        // cards
        var $card = $('.card');
        if ( $card.length ){
            $card.each(function(i, el) {
                var $this = $(el);

                var cardWatcher = scrollMonitor.create( el );
                cardWatcher.enterViewport (function() {
                    $this.addClass('show', this.isInViewport );
                    $this.removeClass('up', this.isAboveViewport );
                });

                cardWatcher.exitViewport(function() {
                    $this.removeClass('show', this.isInViewport );
                    $this.toggleClass('up', this.isAboveViewport );
                });
            });
        }
    };

    /* Ripple Effect */
    var inc = 0;
    var ripple = function(e, el){

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
        circle.setAttributeNS(null, 'r', parseInt(el.outerWidth() / 2) + 25 );

        dummy.appendChild(g);
        g.appendChild(circle);
        el.append(dummy);

        var $ripple = el.find('.ripple' + inc);

        TweenMax.from( $ripple.find('circle'), 1, { attr: { r: 0 }, opacity: 0.75, ease: Expo.easeOut, onComplete: function (){
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

jQuery(function($){
    'use strict';
    // Self-init Call
    RR.materialDesign.setup();
});