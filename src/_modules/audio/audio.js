'use strict';

import { isiOS, isAny } from '../../_assets/nat/js/_helper';

import Localstorage from '../localStorage/localStorage';
import Weather from '../weather/weather';
import TimeDate from '../timeDate/timeDate';

var voices,
    weather = new Weather(),
    localStorage = new Localstorage(),
    timeDate = new TimeDate();

export default class Audio {
    constructor() {
        if (isAny()) {
            this.offline();
            return false;
        }

        this.canITalk();

        window.speechSynthesis.onvoiceschanged = function (e) {};
    }

    offline() {
        $('.icon-ic_keyboard_voice').addClass('inactive');
        $('.voice .offline').show();
    }

    speak(string) {
        this.canITalk();

        // Create a new instance of SpeechSynthesisUtterance.
        var msg = new SpeechSynthesisUtterance();

        // Set the text.
        msg.text = string;

        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2

        // If a voice has been selected, find the voice and set the
        // utterance instance's voice attribute.
        msg.voice = speechSynthesis.getVoices().filter(function (voice) {
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

        // msg.onend = function (e) {
        //     console.log('Finished in ' + event.elapsedTime + ' seconds.');
        // };
    }

    greetUser() {
        var timeOfDay = timeDate.getTimeOfDay(),
            weatherTodayData = weather.getWeatherTodayData(),
            weatherCode = weatherTodayData.query.results.channel.item.condition.code;

        this.speak('Good ' + timeOfDay + ' ' + localStorage.getUsername() + '!');

        switch (weatherCode.toLowerCase()) {
            case '0':
                // 'tornado'
                this.speak('Take cover now, NOWWWW! Before you get sucked away.');
                break;
            case '1':
                // 'tropical storm'
                this.speak('Heavy showers accompanied with lightning and thunder. Take cover now!');
                break;
            case '2':
                // 'hurricane'
                this.speak('Take cover now, NOWWWW! Before you get sucked away.');
                break;
            case '3':
                // 'severe thunderstorms'
                this.speak('Heavy showers accompanied with lightning and thunder. Take cover now!');
                break;
            case '4':
                // 'thunderstorms'
                this.speak('Heavy showers accompanied with lightning and thunder. Take cover now!');
                break;
            case '5':
                // 'mixed rain and snow'
                this.speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '6':
                // 'mixed rain and sleet'
                this.speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '7':
                // 'mixed snow and sleet'
                this.speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '8':
                // 'freezing drizzle'
                this.speak('Looks like there\'s a drizzle. Make sure you bring an umbrella with you and keep yourself warm!');
                break;
            case '9':
                // 'drizzle'
                this.speak('Looks like there\'s a drizzle. Make sure you bring an umbrella with you!');
                break;
            case '10':
                // 'freezing rain'
                this.speak('The rain is freezing. Make sure you bring an umbrella with you and keep yourself warm!');
                break;
            case '11':
                // 'showers'
                this.speak('When life throws you a rainy day, play in the puddles!');
                break;
            case '12':
                // 'showers'
                this.speak('When life throws you a rainy day, play in the puddles!');
                break;
            case '13':
                // 'snow flurries'
                this.speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '14':
                // 'light snow showers'
                this.speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '15':
                // 'blowing snow'
                this.speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '16':
                // 'snow'
                this.speak('It\'s time to build a snowman!');
                break;
            case '17':
                // 'hail'
                this.speak('It\'s raining snowballs, take cover!');
                break;
            case '18':
                // 'sleet'
                this.speak('It\'s raining ice. Bring along a raincoat.');
                break;
            case '19':
                // 'dust'
                this.speak('There\'s dust in the air today. Better to get some masks prepared.');
                break;
            case '20':
                // 'foggy'
                this.speak('Low visibility everywhere. Take care especially if you\'re on the road.');
                break;
            case '21':
                // 'haze'
                this.speak('Air quality is poor today. Some masks may come in handy.');
                break;
            case '22':
                // 'smoky'
                this.speak('Air quality is poor today. Some masks may come in handy.');
                break;
            case '23':
                // 'blustery'
                this.speak('Make sure you hold tight to your belongings. The wind is quite strong outside');
                break;
            case '24':
                // 'windy'
                this.speak('It\'s a perfect day for kite-flying!');
                break;
            case '25':
                // 'cold'
                this.speak('BBBRRRRRRR!!! Keep yourself warm all the time!');
                break;
            case '26':
                // 'cloudy'
                this.speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '27':
                // 'mostly cloudy (night)'
                this.speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '28':
                // 'mostly cloudy (day)'
                this.speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '29':
                // 'partly cloudy (night)'
                this.speak('Looks like it may rain. You might want to consider bringing an umbrella.');
                break;
            case '30':
                // 'partly cloudy (day)'
                this.speak('Looks like it may rain. You might want to consider bringing an umbrella.');
                break;
            case '31':
                // 'clear (night)'
                this.speak('There\'s no better time than now for stargazing.');
                break;
            case '32':
                // 'sunny'
                this.speak('Put on your swimsuit and sunscreen. What are you waiting for!');
                break;
            case '33':
                // 'fair (night)'
                this.speak('There\'s no better time than now for stargazing.');
                break;
            case '34':
                // 'fair (day)'
                this.speak('Time to go outside and play!');
                break;
            case '35':
                // 'mixed rain and hail'
                this.speak('It\'s raining ice. Bring along a raincoat and a helmet.');
                break;
            case '36':
                // 'hot'
                this.speak('It\'s blazong hot outsite. Don\'t forget to drink lots of water!');
                break;
            case '37':
                // 'isolated thunderstorms'
                this.speak('Isolated showers accompanied with lightning and thunder.');
                break;
            case '38':
                // 'scattered thunderstorms'
                this.speak('Scattered showers accompanied with lightning and thunder.');
                break;
            case '39':
                // 'scattered thunderstorms'
                this.speak('Scattered showers accompanied with lightning and thunder.');
                break;
            case '40':
                // 'scattered showers'
                this.speak('When life throws you a rainy day, play in the puddles!');
                break;
            case '41':
                // 'heavy snow'
                this.speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '42':
                // 'scattered snow showers'
                this.speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '43':
                // 'heavy snow'
                this.speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '44':
                // 'partly cloudy'
                this.speak('As you gaze up at the clouds in the sky, be a rainbow in someone else\'s cloud today!');
                break;
            case '45':
                // 'thundershowers'
                this.speak('Shower accompanied with lightning and thunder. Take cover now!');
                break;
            case '46':
                // 'snow showers'
                this.speak('It\'s time to build a snowman! But keep yourself warm all the time.');
                break;
            case '47':
                // 'isolated thundershowers'
                this.speak('Shower accompanied with lightning and thunder. Take cover now!');
                break;
            case '3200':
                // "not available"
                this.speak('Bullocks! I can\'t seem to see the weather.');
                break;
        }
    }

    canITalk() {
        var Localstorage;

        if (isiOS() || !localStorage.getAudio()) {
            return false;
        }

        var SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance || window.oSpeechSynthesisUtterance || window.SpeechSynthesisUtterance;

        if (SpeechSynthesisUtterance === undefined) {
            return false;
        }
    }
}
