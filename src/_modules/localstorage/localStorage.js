'use strict';

export default class Localstorage {
    constructor() {
    }

    init() {
        if (!localStorage.length) {
            localStorage.username = '';
            localStorage.audio = true;

            $('.preloader-wrapper .btn').show();
        }

        if (localStorage.username == '') {
            $('.preloader-wrapper .btn').show();
        }
    }


    // GeoIP Data
    setGeoIpData(data) {
        localStorage.geoIpData = JSON.stringify(data);
    }

    getGeoIpData() {
        var cookieData = localStorage.geoIpData;

        if (cookieData === undefined) {
            return undefined;
        } else {
            return JSON.parse(cookieData);
        }
    }


    // UserName
    setUsername(username) {
        localStorage.username = username;
    }

    getUsername() {
        return localStorage.username;
    }


    // Audio On/Off
    getAudio() {
        return $.parseJSON(localStorage.audio);
    }

    setAudio(bool) {
        localStorage.audio = $.parseJSON(bool);
    }
}
