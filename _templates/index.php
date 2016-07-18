<?php
    set_include_path($_SERVER['DOCUMENT_ROOT'] . '/includes');
    $primary = 0;
    include('header.php');
?>

<div class="preloader-wrapper">
    <div class="preloader">
        <i class="icon icon-ic_cached"></i>
    </div>

    <div class="preloader-text">
        <p>Oops! This is embarrasing. Can you please refresh the page? Thank you!</p>
    </div>

    <div class="preloader-input">
        <input id="username" class="floating-input" type="text" placeholder="Hello! May I know your name?" autocomplete="off"/>
    </div>

    <button class="btn colored js-enter">Enter</button>
</div>

<main id="main" role="document">
    <div class="container">
        <div class="wrapper">

            <div class="mainbar col">
                <section class="lines weather">
                    <h1 class="visuallyhidden">Weather Report</h1>

                    <div class="clearfix">
                        <div class="current-wrapper matchHeight col-3">
                            <h2 class="batch2">Current Conditions</h2>

                            <div class="clearfix">
                                <div class="current">
                                    <div class="batch2 temp">0°</div>
                                    <div class="batch2 hilow">0° / 0°</div>
                                </div>

                                <div class="condition">
                                    <div class="batch2 icon"></div>
                                </div>

                                <div class="batch2 text"></div>
                            </div>

                            <div class="line line-r"></div>
                            <div class="line line-b"></div>
                        </div>

                        <div class="col-9 matchHeight">
                            <div class="clearfix">
                                <div class="forecast matchHeight">
                                    <h3 class="batch3"></h3>
                                    <div class="batch3 icon"></div>
                                    <div class="batch3 hilow">0° / 0°</div>
                                    <div class="batch3 text"></div>

                                    <div class="line line-r"></div>
                                </div>

                                <div class="forecast matchHeight">
                                    <h3 class="batch4"></h3>
                                    <div class="batch4 icon"></div>
                                    <div class="batch4 hilow">0° / 0°</div>
                                    <div class="batch4 text"></div>

                                    <div class="line line-r"></div>
                                </div>

                                <div class="forecast matchHeight">
                                    <h3 class="batch5"></h3>
                                    <div class="batch5 icon"></div>
                                    <div class="batch5 hilow">0° / 0°</div>
                                    <div class="batch5 text"></div>

                                    <div class="line line-r"></div>
                                </div>

                                <div class="forecast matchHeight">
                                    <h3 class="batch6"></h3>
                                    <div class="batch6 icon"></div>
                                    <div class="batch6 hilow">0° / 0°</div>
                                    <div class="batch6 text"></div>
                                    <div class="line line-r"></div>
                                </div>

                                <div class="forecast matchHeight">
                                    <h3 class="batch7"></h3>
                                    <div class="batch7 icon"></div>
                                    <div class="batch7 hilow">0° / 0°</div>
                                    <div class="batch7 text"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="line line-b"></div>
                </section>

                <section class="news-reports">
                    <h1 class="visuallyhidden">News Reports</h1>

                    <div class="wrapper">
                        <div class="news-listing col-3">
                            <h2 class="lines matchHeight clearfix">
                                <span class="news-source batch6"></span>
                                <!-- <img class="batch6" src="/assets/project-nat/images/logos/nyt.svg" alt="" > -->

                                <div class="line line-b"></div>
                            </h2>

                            <div id="rssFeed1"></div>
                        </div>

                        <div class="news-listing col-3">
                            <h2 class="lines matchHeight clearfix">
                                <span class="news-source batch6"></span>
                                <!-- <img class="batch6" src="/assets/project-nat/images/logos/bbc.svg" alt="" > -->

                                <div class="line line-b"></div>
                            </h2>

                            <div id="rssFeed2"></div>
                        </div>

                        <div class="news-listing col-3">
                            <h2 class="lines matchHeight clearfix">
                                <span class="news-source batch6"></span>
                                <!-- <img class="batch6" src="/assets/project-nat/images/logos/theguardian.svg" alt="" > -->

                                <div class="line line-b"></div>
                            </h2>

                            <div id="rssFeed3"></div>
                        </div>

                        <div class="news-listing col-3">
                            <h2 class="lines matchHeight clearfix">
                                <span class="news-source batch6"></span>
                                <!-- <img class="batch6" src="/assets/project-nat/images/logos/theguardian.svg" alt="" > -->

                                <div class="line line-b"></div>
                            </h2>

                            <div id="rssFeed4"></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</main>

<?php include('footer.php'); ?>










