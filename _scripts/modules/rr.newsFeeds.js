/* global RR: true, TweenMax: true, TimelineMax: true, jQuery: true, ripple: true, Ease: true, Expo: true */
/* jshint unused: false */

/**
 * RR - News Feeds
 */
var RR = (function (parent, $){
    'use strict';

    var setup = function (){
        $('#guardianRss').FeedEk({
            FeedUrl: 'http://www.theguardian.com/world/rss',
            ShowDesc: true,
            ShowPubDate: false,
            // DescCharacterLimit:100,
            TitleLinkTarget: '_blank'
        });

        $('#bbcRss').FeedEk({
            FeedUrl: 'http://feeds.bbci.co.uk/news/world/rss.xml',
            ShowDesc: true,
            ShowPubDate: false,
            // DescCharacterLimit:100,
            TitleLinkTarget: '_blank'
        });

        $('#nytRss').FeedEk({
            FeedUrl: 'http://rss.nytimes.com/services/xml/rss/nyt/World.xml',
            ShowDesc: true,
            ShowPubDate: false,
            // DescCharacterLimit:100,
            TitleLinkTarget: '_blank'
        });
    };

    // Export module method
    parent.newsFeeds = {
        setup: setup
    };

    return parent;

}(RR || {}, jQuery));

jQuery(function($){
    // Self-init Call
    // RR.newsFeeds.setup();
});