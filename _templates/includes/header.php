<!DOCTYPE html>
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8 lt-ie10"> <![endif]-->
<!--[if IE 8]><html class="no-js is-ie lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]><html class="no-js is-ie lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--><html class="no-js"><!--<![endif]-->

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="">
        <title>Project N.A.T.</title>

        <meta name="robots" content="follow">
        <meta name="author" content="Nino Ross Rodriguez">
        <meta name="copyright" content="infinite imaginations 2016">
        <meta name="description" content="One page application that tells the wather and aggregates news to your preference">
        <meta name="keywords" content="news aggrigator, one page, weather" />

        <meta property="og:title" content="Project N.A.T.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="">
        <meta property="og:image" content="">
        <meta property="og:description" content="One page application that tells the wather and aggregates news to your preference">
        <meta property="og:site_name" content="">

        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:creator" content="Nino Ross Rodriguez"/>
        <meta name="twitter:url" content=""/>

        <meta name="twitter:title" content="Project N.A.T."/>
        <meta name="twitter:description" content="One page application that tells the wather and aggregates news to your preference"/>
        <meta name="twitter:image" content="" />

        <link rel="apple-touch-icon" sizes="57x57" href="assets/project-nat/images/favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="assets/project-nat/images/favicon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="assets/project-nat/images/favicon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="assets/project-nat/images/favicon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="assets/project-nat/images/favicon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="assets/project-nat/images/favicon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="assets/project-nat/images/favicon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="assets/project-nat/images/favicon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="assets/project-nat/images/favicon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="assets/project-nat/images/favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="assets/project-nat/images/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="assets/project-nat/images/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/project-nat/images/favicon/favicon-16x16.png">
        <link rel="manifest" href="assets/project-nat/images/favicon/manifest.json">
        <meta name="msapplication-TileColor" content="#54606e">
        <meta name="msapplication-TileImage" content="assets/project-nat/images/favicon/ms-icon-144x144.png">
        <meta name="theme-color" content="#54606e">

        <!-- build:css assets/project-nat/css/main.min.css -->
        <link href="assets/project-nat/css/main.css" rel="stylesheet">
        <!-- /build -->

        <!-- build:css assets/project-nat/css/responsive.min.css -->
        <link href="assets/project-nat/css/responsive.css" rel="stylesheet">
        <!-- /build -->

        <script src="assets/project-nat/js/vendor/modernizr.js"></script>
    </head>
    <body>
        <div class="dashboard">
            <div class="container">
                <h2>Settings</h2>

                <button class="close js-close">
                    <i class="icon icon-ic_close"></i>
                </button>

                <h3>Hello <input id="dashboard-username" class="username" type="text" /></h3>

                <p>To change the news feed, select any of the dropdown items below or key in your preferred RSS feed.</p>

                <div class="wrap">
                    <div class="col-2">
                        <input type="checkbox" name="name" id="audio" checked>
                        <label for="audio" class="checkbox">Mute N.A.T.</label>
                    </div>

                    <div class="col-8 col-offset-2 rssSelections">
                        <div class="wrap">
                            <div class="rssSelection rssCol-1 col-3">
                                <select class="material">
                                    <option value="https://news.yahoo.com/rss/world">Yahoo! News</option>
                                    <option value="http://rss.cnn.com/rss/edition_world.rss">CNN</option>
                                    <option value="http://www.huffingtonpost.com/feeds/index.xml">HuffingtonPost</option>
                                    <option value="http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories">USA Today</option>
                                    <option value="http://rss.nytimes.com/services/xml/rss/nyt/World.xml">New York Times</option>
                                    <option value="http://www.dailymail.co.uk/articles.rss">Mail Online</option>
                                    <option value="http://feeds.foxnews.com/foxnews/latest">Fox News</option>
                                    <option value="http://feeds.bbci.co.uk/news/world/rss.xml">BBC</option>
                                    <option value="http://www.theguardian.com/world/rss">The Guardian</option>
                                    <option value="http://feeds2.feedburner.com/time/topstories">Time</option>
                                    <option value="others">Others</option>
                                </select>

                                <div class="material-wrapper">
                                    <button class="js-refresh">
                                        <i class="icon icon-ic_cached"></i>
                                    </button>
                                    <input class="othersUrl" type="text" placeholder="URL of your preferred RSS Feed" />
                                </div>
                            </div>

                            <div class="rssSelection rssCol-2 col-3">
                                <select class="material">
                                    <option value="https://news.yahoo.com/rss/world">Yahoo! News</option>
                                    <option value="http://rss.cnn.com/rss/edition_world.rss">CNN</option>
                                    <option value="http://www.huffingtonpost.com/feeds/index.xml">HuffingtonPost</option>
                                    <option value="http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories">USA Today</option>
                                    <option value="http://rss.nytimes.com/services/xml/rss/nyt/World.xml">New York Times</option>
                                    <option value="http://www.dailymail.co.uk/articles.rss">Mail Online</option>
                                    <option value="http://feeds.foxnews.com/foxnews/latest">Fox News</option>
                                    <option value="http://feeds.bbci.co.uk/news/world/rss.xml">BBC</option>
                                    <option value="http://www.theguardian.com/world/rss">The Guardian</option>
                                    <option value="http://feeds2.feedburner.com/time/topstories">Time</option>
                                    <option value="others">Others</option>
                                </select>

                                <div class="material-wrapper">
                                    <button class="js-refresh">
                                        <i class="icon icon-ic_cached"></i>
                                    </button>
                                    <input class="othersUrl" type="text" placeholder="URL of your preferred RSS Feed" />
                                </div>
                            </div>

                            <div class="rssSelection rssCol-3 col-3">
                                <select class="material">
                                    <option value="https://news.yahoo.com/rss/world">Yahoo! News</option>
                                    <option value="http://rss.cnn.com/rss/edition_world.rss">CNN</option>
                                    <option value="http://www.huffingtonpost.com/feeds/index.xml">HuffingtonPost</option>
                                    <option value="http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories">USA Today</option>
                                    <option value="http://rss.nytimes.com/services/xml/rss/nyt/World.xml">New York Times</option>
                                    <option value="http://www.dailymail.co.uk/articles.rss">Mail Online</option>
                                    <option value="http://feeds.foxnews.com/foxnews/latest">Fox News</option>
                                    <option value="http://feeds.bbci.co.uk/news/world/rss.xml">BBC</option>
                                    <option value="http://www.theguardian.com/world/rss">The Guardian</option>
                                    <option value="http://feeds2.feedburner.com/time/topstories">Time</option>
                                    <option value="others">Others</option>
                                </select>

                                <div class="material-wrapper">
                                    <button class="js-refresh">
                                        <i class="icon icon-ic_cached"></i>
                                    </button>
                                    <input class="othersUrl" type="text" placeholder="URL of your preferred RSS Feed" />
                                </div>
                            </div>

                            <div class="rssSelection rssCol-4 col-3">
                                <select class="material">
                                    <option value="https://news.yahoo.com/rss/world">Yahoo! News</option>
                                    <option value="http://rss.cnn.com/rss/edition_world.rss">CNN</option>
                                    <option value="http://www.huffingtonpost.com/feeds/index.xml">HuffingtonPost</option>
                                    <option value="http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories">USA Today</option>
                                    <option value="http://rss.nytimes.com/services/xml/rss/nyt/World.xml">New York Times</option>
                                    <option value="http://www.dailymail.co.uk/articles.rss">Mail Online</option>
                                    <option value="http://feeds.foxnews.com/foxnews/latest">Fox News</option>
                                    <option value="http://feeds.bbci.co.uk/news/world/rss.xml">BBC</option>
                                    <option value="http://www.theguardian.com/world/rss">The Guardian</option>
                                    <option value="http://feeds2.feedburner.com/time/topstories">Time</option>
                                    <option value="others">Others</option>
                                </select>

                                <div class="material-wrapper">
                                    <button class="js-refresh">
                                        <i class="icon icon-ic_cached"></i>
                                    </button>
                                    <input class="othersUrl" type="text" placeholder="URL of your preferred RSS Feed" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <header class="header lines">
            <h1 class="visuallyhidden">
                <a href="/">Project NAT</a>
            </h1>

            <div class="container">

                <div class="clearfix">

                    <div class="dateStamp">
                        <span class="batch1 day"></span>
                        <span class="batch1 date"></span>
                    </div>

                    <div class="timeStamp">
                        <span class="batch1 icon icon-ic_my_location"></span>

                        <div class="batch1 time">
                            <span class="h">12</span>
                            <span class="colon">:</span>
                            <span class="m">00</span>
                            <span class="dn">pm</span>
                        </div>

                        <div class="settings">
                            <div class="line line-l"></div>

                            <button class="js-settings">
                                <i class="batch1 icon icon-ic_settings"></i>
                                <span class="visuallyhidden">Settings</span>
                            </button>

                        </div>
                    </div>
                </div>

                <div class="line line-b"></div>
            </div>
        </header>