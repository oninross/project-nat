<?php
    set_include_path($_SERVER['DOCUMENT_ROOT'] . '/includes');
    $primary = 0;
    include('header.php');
?>

<div class="preloader-wrapper">
    <div class="preloader">
        <i class="icon icon-ic_cached"></i>
    </div>

    <div class="preloader-input">
        <input id="username" class="floating-input" type="text" placeholder="Hello! May I know your name?" required/>
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
                        <div class="current-wrapper matchHeight col-4">
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

                        <div class="col-8 matchHeight">
                            <div class="clearfix">
                                <div class="forecast col-4">
                                    <h3 class="batch3"></h3>
                                    <div class="batch3 icon"></div>
                                    <div class="batch3 hilow">0° / 0°</div>
                                    <div class="batch3 text"></div>

                                    <div class="line line-r"></div>
                                </div>
                                <div class="forecast col-4">
                                    <h3 class="batch4"></h3>
                                    <div class="batch4 icon"></div>
                                    <div class="batch4 hilow">0° / 0°</div>
                                    <div class="batch4 text"></div>

                                    <div class="line line-r"></div>
                                </div>
                                <div class="forecast col-4">
                                    <h3 class="batch5"></h3>
                                    <div class="batch5 icon"></div>
                                    <div class="batch5 hilow">0° / 0°</div>
                                    <div class="batch5 text"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="line line-b"></div>
                </section>

                <section class="news-reports">
                    <h1 class="visuallyhidden">News Reports</h1>

                    <div class="wrapper">
                        <div class="news-listing col-4">
                            <h2 class="lines clearfix">
                                <span class="visuallyhidden">New York Times</span>
                                <img class="batch6" src="/assets/project-nat/images/logos/nyt.svg" alt="New York Times" >

                                <!-- <button class="refresh js-refresh">
                                    <i class="icon icon-ic_cached"></i>
                                </button> -->

                                <div class="line line-b"></div>
                            </h2>

                            <div id="nytRss"></div>
                        </div>

                        <div class="news-listing col-4">
                            <h2 class="lines clearfix">
                                <span class="visuallyhidden">BBC</span>
                                <img class="batch6" src="/assets/project-nat/images/logos/bbc.svg" alt="BBC" >

                                <!-- <button class="refresh js-refresh">
                                    <i class="icon icon-ic_cached"></i>
                                </button> -->

                                <div class="line line-b"></div>
                            </h2>

                            <div id="bbcRss"></div>
                        </div>

                        <div class="news-listing col-4">
                            <h2 class="lines clearfix">
                                <span class="visuallyhidden">The Guardian</span>
                                <img class="batch6" src="/assets/project-nat/images/logos/theguardian.svg" alt="The Guardian" >

                                <!-- <button class="refresh js-refresh">
                                    <i class="icon icon-ic_cached"></i>
                                </button> -->

                                <div class="line line-b"></div>
                            </h2>

                            <div id="guardianRss"></div>
                        </div>
                    </div>
                </section>
            </div>

            <div class="sidebar col">
                <div class="batch8 location lines">
                    <table>
                        <tr>
                            <td class="batch6">IP:</td>
                            <td class="batch7 ip">0.0.0.0</td>
                        </tr>
                        <tr>
                            <td class="batch6">Long:</td>
                            <td class="batch7 long">0.0</td>
                        </tr>
                        <tr>
                            <td class="batch6">Lat:</td>
                            <td class="batch7 lat">0.0</td>
                        </tr>
                        <tr>
                            <td class="batch6">Location:</td>
                            <td class="batch7 loc">Unknown</td>
                        </tr>
                    </table>

                    <div class="line line-b"></div>
                </div>

                <div class="batch8 widget voice">
                    <div class="offline">OFFLINE</div>

                    <span class="ui">
                        <span class="ui-ul"></span>
                        <span class="ui-ur"></span>
                        <span class="ui-dr"></span>
                        <span class="ui-dl"></span>
                    </span>
                    <span class="lines lines-tb"></span>
                    <span class="lines lines-lr"></span>

                    <!-- <div id="audio_box"></div> -->
                    <canvas id="analyser_render"></canvas>
                </div>

                <div class="batch8 widget camera">
                    <div class="offline">OFFLINE</div>

                    <span class="ui">
                        <span class="ui-ul"></span>
                        <span class="ui-ur"></span>
                        <span class="ui-dr"></span>
                        <span class="ui-dl"></span>
                    </span>
                    <span class="lines lines-tb"></span>
                    <span class="lines lines-lr"></span>

                    <div class="video-wrapper">
                        <video id="videoel" width="400" height="300" preload="auto" loop></video>
                    </div>
                </div>

                <div class="batch8 widget emotion">
                    <div class="offline">OFFLINE</div>

                    <span class="ui">
                        <span class="ui-ul"></span>
                        <span class="ui-ur"></span>
                        <span class="ui-dr"></span>
                        <span class="ui-dl"></span>
                    </span>
                    <span class="lines lines-tb"></span>
                    <span class="lines lines-lr"></span>

                    <div class="emotion-wrapper"></div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php include('footer.php'); ?>










