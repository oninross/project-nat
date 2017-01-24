/*
* FeedEk jQuery RSS/ATOM Feed Plugin v2.0
* http://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com
*/

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            FeedUrl: "https://rss.cnn.com/rss/edition.rss",
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            CharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en"
        }, opt);

        var id = $(this).attr("id"), i, s = "",dt;

        var xhr;

        xhr = $.ajax({
            url: "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(def.FeedUrl) + "&api_key=ejrvzkxjws1zoggpho7zy0wbsgzraolsuawgr8fj&order_by=pubDate&order_dir=desc&count=" + def.MaxCount,
            dataType: "json",
            success: function (data) {
                $("#" + id).empty().parent().find('.news-source').html( data.feed.title );
                $.each(data.items, function (e, item) {
                    s += '<li><div class="itemTitle"><a href="' + item.link + '" target="' + def.TitleLinkTarget + '" >' + item.title + "</a></div>";

                    if (def.ShowPubDate){
                        dt= new Date(item.publishedDate);
                        if ($.trim(def.DateFormat).length > 0) {
                            try {
                                moment.lang(def.DateFormatLang);
                                s += '<div class="itemDate">' + moment(dt).format(def.DateFormat) + "</div>";
                            }
                            catch (e){s += '<div class="itemDate">' + dt.toLocaleDateString() + "</div>";}
                        }
                        else {
                            s += '<div class="itemDate">' + dt.toLocaleDateString() + "</div>";
                        }
                    }

                    if (def.ShowDesc) {
                        if (def.DescCharacterLimit > 0 && item.content.length > def.DescCharacterLimit) {
                            s += '<div class="itemContent">' + item.content.substr(0, def.DescCharacterLimit) + "...</div>";
                        }
                        else {
                            s += '<div class="itemContent">' + item.content + "</div>";
                        }
                    }
                });

                $("#" + id).append('<ul class="feedEkList">' + s + "</ul>");

                xhr.abort();

                if ( RR.listeners.getModuleCompletes() === 5 ) {
                    TweenMax.to( '.news-listing .news-source', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut });
                    TweenMax.staggerTo( '.news-listing .itemTitle', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 0.2 }, 0.1 );
                    TweenMax.staggerTo( '.news-listing .itemContent', 0.75, { opacity: 1, top: 0, ease: Expo.easeOut, delay: 0.4 }, 0.1 );
                } else {
                    RR.listeners.moduleComplete();
                }
            },
            error: function (error) {
                console.log(error);
            },
            statusCode: function (code) {
                console.log(code);
            }
        });
    };
})(jQuery);