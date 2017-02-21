'use strict';

export default class Localstorage {
    constructor() {
    }

    init() {
        if (!localStorage.length) {
            localStorage.username = '';
            localStorage.isMute = false;

            $('.preloader-wrapper .btn').show();
        }

        if (localStorage.username == '') {
            $('.preloader-wrapper .btn').show();
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
        return $.parseJSON(localStorage.isMute);
    }

    setAudio(bool) {
        localStorage.isMute = $.parseJSON(bool);
    }
}
