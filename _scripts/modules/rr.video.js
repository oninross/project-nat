/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - Video / Emotion
 */
var RR = (function (parent, $) {
    'use strict';

    var vid = document.getElementById('videoel'),
        ctrack = new clm.tracker({ useWebGL : true }),
        ec = new emotionClassifier(),
        emotionWrapper;

    var setup = function () {

        if (RR.mobileCheck.isMobile.any()) {
            offline();
            $('.widget').remove();
            $('.icon-ic_videocam').addClass('inactive');
            return false;
        }

        /********** check and set up video/webcam **********/
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

        // check for camerasupport
        if (navigator.getUserMedia) {
            // set up stream

            var videoSelector = {video : true};
            if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
                var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
                if (chromeVersion < 20) {
                    videoSelector = "video";
                }
            };

            navigator.getUserMedia(videoSelector, function (stream) {
                if (vid.mozCaptureStream) {
                    vid.mozSrcObject = stream;
                } else {
                    vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                }
                vid.play();
            }, function () {
                console.log("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");

                offline();
                $('.icon-ic_videocam').addClass('inactive');
            });
        } else {
            console.log("This demo depends on getUserMedia, which your browser does not seem to support. :(");

            offline();
            $('.icon-ic_videocam').addClass('inactive');
        }

        vid.addEventListener('canplay', startVideo, false);
        vid.addEventListener('abort', offline, false);

        /*********** setup of emotion detection *************/
        ctrack.init(pModel);

        ec.init(emotionModel);


        /*********** setup of emotion chart *************/
        emotionWrapper = $('.emotion-wrapper').highcharts({
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            chart: {
                animation: false,
                type: 'bar',
                // polar: true,
                // type: 'line',
                marginTop: 20,
                marginBottom: 20,
                // marginLeft: 50,
                // marginRight: 40,
                height: 125
            },
            xAxis: {
                categories: ['HAPPY', 'SAD', 'SURPRISED', 'ANGRY'],
                labels: {
                    style: {
                        fontFamily: 'HelveticaNeue',
                        fontWeight: 'bold'
                    }
                }
            },
            yAxis: {
                // gridLineInterpolation: 'polygon',
                // gridLineDashStyle: 'dot',
                // lineWidth: 0,
                min: 0,
                max: 100,
                tickInterval: 25,
                title: {
                    text: null
                },
                labels: {
                    enabled: false
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    pointWidth: 10,
                    pointPadding: 0
                }
            },
            series: [{
                // ["happy", "sad", "surprised", "angry"]

                data: [
                  { y: 0, color: '#383838'},
                  { y: 0, color: '#383838'},
                  { y: 0, color: '#383838'},
                  { y: 0, color: '#383838'}
                ],
                marker: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            }]
        });
    };

    var offline = function () {
        $('.camera .offline').show();
        $('.camera').addClass('off');
        $('.emotion .offline').show();
    };

    var drawLoop = function () {
        requestAnimFrame(drawLoop);

        var cp = ctrack.getCurrentParameters(),
            er = ec.meanPredict(cp),
            emotionWrapper = $('.emotion-wrapper').highcharts();

        if (er) {
            // ["angry", "sad", "surprised", "happy"]
            // console.log(Math.round(er[0].value * 100))
            emotionWrapper.series[0].data[0].update(Math.round(er[3].value * 100));
            emotionWrapper.series[0].data[1].update(Math.round(er[1].value * 100));
            emotionWrapper.series[0].data[2].update(Math.round(er[2].value * 100));
            emotionWrapper.series[0].data[3].update(Math.round(er[0].value * 100));
        }
    };

    var enablestart = function () {
        var startbutton = document.getElementById('startbutton');
        startbutton.value = "start";
        startbutton.disabled = null;
    };

    var startVideo = function () {
        vid.play();
        // start tracking
        ctrack.start(vid);
        // start loop to draw face
        drawLoop();
    };

    // Export module method
    parent.video = {
        startVideo: startVideo,
        setup: setup
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function ($) {
    // Self-init Call
    RR.video.setup();
});