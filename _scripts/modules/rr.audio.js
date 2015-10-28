/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - Audio Spectrum
 */
var RR = (function (parent, $){
    'use strict';

    var voices;

    // var audio = new Audio();
    // audio.src = 'Walk The Moon - Shut Up and Dance.mp3';
    // audio.controls = true;
    // audio.loop = true;
    // audio.autoplay = true;

    // Establish all variables that your Analyser will use
    var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

    var setup = function() {

        if ( RR.mobileCheck.isMobile.any() ) {
            offline();
            return false;
        }

        // document.getElementById('audio_box').appendChild(audio);
        context = new AudioContext(); // AudioContext object instance
        analyser = context.createAnalyser(); // AnalyserNode method
        canvas = document.getElementById('analyser_render');
        ctx = canvas.getContext('2d');

        // Re-route audio playback into the processing graph of the AudioContext
        // source = context.createMediaElementSource(audio);
        // source.connect(analyser);
        // analyser.connect(context.destination);


        navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                {
                    video:false,
                    audio:true
                },
                function(stream) {
                    var mic = context.createMediaStreamSource(stream);

                    mic.connect(analyser);

                    analyser.connect(context.destination);
                },
                function(error) {
                    console.log("There was some problem trying to fetch audio from your microphone. If you have a microphone, please make sure to accept when the browser asks for access to your microphone.");
                    offline();
                }
            );
        } else {
            console.log('Sorry, the browser you are using doesn\'t support getUserMedia');
            offline();
            return;
        };

        frameLooper();
    };

    // frameLooper() animates any style of graphics you wish to the audio frequency
    // Looping at the default frame rate that the browser provides(approx. 60 FPS)
    var frameLooper = function() {
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#54606e'; // Color of the bars

        var bars = 50,
            barWidth = canvas.width / bars;

        for (var i = 0; i < bars; i++) {
            bar_x = (i * barWidth);
            bar_width = canvas.width / bars;
            bar_height = -(fbc_array[i] / 2);
            //  fillRect( x, y, width, height ) // Explanation of the parameters below
            // ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

            ctx.fillRect(0, (canvas.height / 2), canvas.width, 2);
            ctx.fillRect(bar_x, (canvas.height / 2), bar_width, (bar_height / 2));
            ctx.fillRect(bar_x, (canvas.height / 2), bar_width, -(bar_height / 2));
        }
    };

    var offline = function () {
        $('.icon-ic_keyboard_voice').addClass('inactive');
        $('.voice .offline').show();
    };

    var speak = function (txt) {
        if ( RR.mobileCheck.isMobile.iOS() || !RR.localStorage.getAudio() ){
            return false;
        }

        var SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance || window.oSpeechSynthesisUtterance || window.SpeechSynthesisUtterance;

        if ( SpeechSynthesisUtterance === undefined ) {
            return false;
        }

        var msg = new SpeechSynthesisUtterance(),
            voices = window.speechSynthesis.getVoices();

        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = txt;
        msg.lang = 'en-GB';
        speechSynthesis.speak(msg);

        // msg.onend = function(e) {
        //     console.log('Finished in ' + event.elapsedTime + ' seconds.');
        // };
    };

    var greetUser = function () {
        var timeOfDay = RR.dateWidget.getTimeOfDay(),
            weatherTodayData = RR.weatherAPI.getWeatherTodayData(),
            weatherTodayStatus = weatherTodayData.query.results.channel.item.condition.text,
            msg;

        speak('Good ' + timeOfDay + ' ' + RR.localStorage.getUsername() + '!');

        speak('Looks like there is ' + weatherTodayStatus.toLowerCase() + ' outside.');

        if ( weatherTodayStatus.toLowerCase() == 'rain' || weatherTodayStatus.toLowerCase() == 'thunderstorm' || weatherTodayStatus.toLowerCase() == 'drizzle' ) {
            speak('Don\'t forget to bring your umbrella.');
        } else if ( weatherTodayStatus.toLowerCase() == 'snow' ) {
            speak('Don\'t forget to keep warm outside.');
        } else if ( weatherTodayStatus.toLowerCase() == 'clouds' ) {
            speak('You might want to consider bringing an umbrella.');
        } else if ( weatherTodayStatus.toLowerCase() == 'haze' ) {
            speak('Keep yourself hydrated all the time.');
        } else if ( weatherTodayStatus.toLowerCase() == 'clear' ) {
            speak('Time to go outside and have some fun!');
        }
    };

    // Export module method
    parent.audio = {
        setup: setup,
        speak: speak,
        greetUser: greetUser
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function($){
    // Self-init Call
    RR.audio.setup();
});