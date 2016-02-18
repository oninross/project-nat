/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - Audio Spectrum
 */
var RR = (function (parent, $){
    'use strict';

    var voices;

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

        canITalk();

        window.speechSynthesis.onvoiceschanged = function(e) {};
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

    var speak = function (string) {
        canITalk();

        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

        // Set the text.
        msg.text = string;

        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2

        // If a voice has been selected, find the voice and set the
        // utterance instance's voice attribute.
        msg.voice = speechSynthesis.getVoices().filter(function(voice) {
            return voice.name == 'Google UK English Female';
            // native
            // Google Deutsch
            // Google US English
            // Google UK English Female
            // Google UK English Male
            // Google español
            // Google español de Estados Unidos
            // Google français
            // Google हिन्दी
            // Google Bahasa Indonesia
            // Google italiano
            // Google 日本語
            // Google 한국의
            // Google Nederlands
            // Google polski
            // Google português do Brasil
            // Google русский
            // Google 普通话（中国大陆）
            // Google 粤語（香港）
            // Google 國語（臺灣）
        })[0];


        window.speechSynthesis.speak(msg);

        // msg.onend = function(e) {
        //     console.log('Finished in ' + event.elapsedTime + ' seconds.');
        // };
    };

    var greetUser = function () {
        var timeOfDay = RR.dateWidget.getTimeOfDay(),
            weatherTodayData = RR.weatherAPI.getWeatherTodayData(),
            weatherCode = weatherTodayData.query.results.channel.item.condition.code;

        speak('Good ' + timeOfDay + ' ' + RR.localStorage.getUsername() + '!');

        switch (weatherCode.toLowerCase()) {
            case '0':
                // 'tornado'
                speak('Take cover now, NOWWWW! Before you get sucked away.');
                break;
            case '1':
                // 'tropical storm'
                speak('Heavy showers accompanied with lightning and thunder. Take cover now!');
                break;
            case '2':
                // 'hurricane'
                speak('Take cover now, NOWWWW! Before you get sucked away.');
                break;
            case '3':
                // 'severe thunderstorms'
                speak('Heavy showers accompanied with lightning and thunder. Take cover now!');
                break;
            case '4':
                // 'thunderstorms'
                speak('Heavy showers accompanied with lightning and thunder. Take cover now!');
                break;
            case '5':
                // 'mixed rain and snow'
                speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '6':
                // 'mixed rain and sleet'
                speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '7':
                // 'mixed snow and sleet'
                speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '8':
                // 'freezing drizzle'
                speak('Looks like there\'s a drizzle. Make sure you bring an umbrella with you and keep yourself warm!');
                break;
            case '9':
                // 'drizzle'
                speak('Looks like there\'s a drizzle. Make sure you bring an umbrella with you!');
                break;
            case '10':
                // 'freezing rain'
                speak('The rain is freezing. Make sure you bring an umbrella with you and keep yourself warm!');
                break;
            case '11':
                // 'showers'
                speak('When life throws you a rainy day, play in the puddles!');
                break;
            case '12':
                // 'showers'
                speak('When life throws you a rainy day, play in the puddles!');
                break;
            case '13':
                // 'snow flurries'
                speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '14':
                // 'light snow showers'
                speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '15':
                // 'blowing snow'
                speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '16':
                // 'snow'
                speak('It\'s time to build a snowman!');
                break;
            case '17':
                // 'hail'
                speak('It\'s raining snowballs, take cover!');
                break;
            case '18':
                // 'sleet'
                speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '19':
                // 'dust'
                speak('There\'s dust in the air today. Better to get some masks prepared.');
                break;
            case '20':
                // 'foggy'
                speak('Low visibility everywhere. Take care especially if you\'re on the road.');
                break;
            case '21':
                // 'haze'
                speak('Air quality is poor today. Some masks may come in handy.');
                break;
            case '22':
                // 'smoky'
                speak('Air quality is poor today. Some masks may come in handy.');
                break;
            case '23':
                // 'blustery'
                speak('Make sure you hold tight to your belongings. The wind is quite strong outside');
                break;
            case '24':
                // 'windy'
                speak('It\'s a perfect day for kite-flying!');
                break;
            case '25':
                // 'cold'
                speak('BBBRRRRRRR!!! Keep yourself warm all the time!');
                break;
            case '26':
                // 'cloudy'
                speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '27':
                // 'mostly cloudy (night)'
                speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '28':
                // 'mostly cloudy (day)'
                speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '29':
                // 'partly cloudy (night)'
                speak('Looks like it may rain. You might want to consider bringing an umbrella.');
                break;
            case '30':
                // 'partly cloudy (day)'
                speak('Looks like it may rain. You might want to consider bringing an umbrella.');
                break;
            case '31':
                // 'clear (night)'
                speak('There\'s no better time than now for stargazing.');
                break;
            case '32':
                // 'sunny'
                speak('Put on your swimsuit and sunscreen. What are you waiting for!');
                break;
            case '33':
                // 'fair (night)'
                speak('There\'s no better time than now for stargazing.');
                break;
            case '34':
                // 'fair (day)'
                speak('Time to go outside and play!');
                break;
            case '35':
                // 'mixed rain and hail'
                speak('It\'s raining ice. Bring along a raincoat and a helmet.');
                break;
            case '36':
                // 'hot'
                speak('It\'s blazong hot outsite. Don\'t forget to drink lots of water!');
                break;
            case '37':
                // 'isolated thunderstorms'
                speak('Isolated showers accompanied with lightning and thunder.');
                break;
            case '38':
                // 'scattered thunderstorms'
                speak('Scattered showers accompanied with lightning and thunder.');
                break;
            case '39':
                // 'scattered thunderstorms'
                speak('Scattered showers accompanied with lightning and thunder.');
                break;
            case '40':
                // 'scattered showers'
                speak('When life throws you a rainy day, play in the puddles!');
                break;
            case '41':
                // 'heavy snow'
                speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '42':
                // 'scattered snow showers'
                speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '43':
                // 'heavy snow'
                speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '44':
                // 'partly cloudy'
                speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '45':
                // 'thundershowers'
                speak('Shower accompanied with lightning and thunder. Take cover now!');
                break;
            case '46':
                // 'snow showers'
                speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '47':
                // 'isolated thundershowers'
                speak('Shower accompanied with lightning and thunder. Take cover now!');
                break;
            case '3200':
                // "not available"
                speak('Bullocks! I can\'t seem to see the weather.');
                break;
        }
    };

    var canITalk = function () {
        if ( RR.mobileCheck.isMobile.iOS() || !RR.localStorage.getAudio() ){
            return false;
        }

        var SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance || window.oSpeechSynthesisUtterance || window.SpeechSynthesisUtterance;

        if ( SpeechSynthesisUtterance === undefined ) {
            return false;
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