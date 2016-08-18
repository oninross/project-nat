/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - News Feeds
 */
var RR = (function (parent, $){
    'use strict';

    var setup = function (){
        $('#rssFeed1').FeedEk({
            FeedUrl: RR.localStorage.getNewsFeedURL(0),
            ShowDesc: true,
            ShowPubDate: false,
            TitleLinkTarget: '_blank'
        });

        $('#rssFeed2').FeedEk({
            FeedUrl: RR.localStorage.getNewsFeedURL(1),
            ShowDesc: true,
            ShowPubDate: false,
            TitleLinkTarget: '_blank'
        });

        $('#rssFeed3').FeedEk({
            FeedUrl: RR.localStorage.getNewsFeedURL(2),
            ShowDesc: true,
            ShowPubDate: false,
            TitleLinkTarget: '_blank'
        });

        $('#rssFeed4').FeedEk({
            FeedUrl: RR.localStorage.getNewsFeedURL(3),
            ShowDesc: true,
            ShowPubDate: false,
            TitleLinkTarget: '_blank'
        });
    };

    var setNewsFeedValue = function (idx, url) {
        updateNewsFeed(idx, url);
        console.log("setNewsFeedValue")
        RR.localStorage.setNewsFeedURL(idx, url);
    };

    var updateNewsFeed = function (idx, url) {
        TweenMax.to( '.news-listing:nth-child('+ (idx + 1) +') .news-source', 0.75, { opacity: 0, top: -25, ease: Expo.easeOut, onComplete: function () {
                TweenMax.set( '.news-listing:nth-child('+ (idx + 1) +') .news-source', { top: 25 });
            }
        });

        TweenMax.staggerTo( '.news-listing:nth-child('+ (idx + 1) +') .itemTitle', 0.75, { opacity: 0, top: -25, ease: Expo.easeOut, delay: 0.2 }, 0.1 );
        TweenMax.staggerTo( '.news-listing:nth-child('+ (idx + 1) +') .itemContent', 0.75, { opacity: 0, top: -25, ease: Expo.easeOut, delay: 0.4 }, 0.1, function () {
            switch (idx) {
                case 0:
                    $('#rssFeed1').empty();
                    $('#rssFeed1').FeedEk({
                        FeedUrl: url,
                        ShowDesc: true,
                        ShowPubDate: false,
                        TitleLinkTarget: '_blank'
                    });
                    break;

                case 1:
                    $('#rssFeed2').empty();
                    $('#rssFeed2').FeedEk({
                        FeedUrl: url,
                        ShowDesc: true,
                        ShowPubDate: false,
                        TitleLinkTarget: '_blank'
                    });
                    break;

                case 2:
                    $('#rssFeed3').empty();
                    $('#rssFeed3').FeedEk({
                        FeedUrl: url,
                        ShowDesc: true,
                        ShowPubDate: false,
                        TitleLinkTarget: '_blank'
                    });
                    break;

                case 3:
                    $('#rssFeed4').empty();
                    $('#rssFeed4').FeedEk({
                        FeedUrl: url,
                        ShowDesc: true,
                        ShowPubDate: false,
                        TitleLinkTarget: '_blank'
                    });
                    break;
            }

            TweenMax.staggerTo( '.news-listing:nth-child('+ (idx + 1) +') .itemTitle', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut }, 0.1 );
            TweenMax.staggerTo( '.news-listing:nth-child('+ (idx + 1) +') .itemContent', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut }, 0.1 );
        });
    };

    var checkValidRSS = function (idx, url) {
        var xhr;

        xhr = $.ajax({
            url: "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1&output=json&q=" + encodeURIComponent(url) + "&hl=en&callback=?",
            dataType: "json",
            success: function (data) {
                xhr.abort();

                switch ( data.responseStatus ) {
                    case 200:
                        // valid
                        TweenMax.set( '.rssSelection:nth-child('+ idx + 1 +') input[type="text"]', { 'border-bottom': '1px solid #4caf50' });
                        updateNewsFeed( idx, url );
                        setNewsFeedValue( idx, url );
                        break;

                    case 400:
                        // invalid
                        TweenMax.set( '.rssSelection:nth-child('+ idx + 1 +') input[type="text"]', { 'border-bottom': '1px solid #f44336' });
                        break;
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    // Export module method
    parent.newsFeeds = {
        setup: setup,
        setNewsFeedValue: setNewsFeedValue,
        checkValidRSS: checkValidRSS
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function($){
    // Self-init Call
    // RR.newsFeeds.setup();
});