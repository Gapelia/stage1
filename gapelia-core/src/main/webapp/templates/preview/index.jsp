<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Preview</title>

    <!--/
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

    <meta name="author" content="Folio" />
    <meta name="description" content="Reimagining scholarly publishing" />
    <meta name="keywords" content="academia, publishing, blogging, scholar, ideas, storytelling, long-form, platform, collaboration" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <link href="/static/css/style.css" rel="stylesheet" />
    <link href="/static/css/fluidbox.css" rel="stylesheet" />
    <link href="/static/images/favicon.png" rel="shortcut icon" />

    <style>
        #close-preview {
            top: 1rem;
            right: 1rem;
            color: #07d0eb;
            cursor: pointer;
            font-size: 3rem;
            position: fixed;
            z-index: 9999;
        }
    </style>

    <script src="/static/scripts/modernizr.custom.js"></script>
    <script src="/static/scripts/jquery-2.1.0.min.js"></script>

    <script src="/static/scripts/prefixfree.min.js"></script>

</head>

<body class="app full-book g-body">

    <div id="mp-pusher" class="super-wrapper">

        <div id="close-preview" title="Exit preview" onclick="window.close();">&times;</div>

        <div id="bb-nav-prev"><i class="ion-ios7-arrow-left"></i>
        </div>
        <div id="bb-nav-next"><i class="ion-ios7-arrow-right"></i>
        </div>

        <div id="the-book" class="bb-custom-wrapper">
            <div id="bb-bookblock" class="bb-bookblock">
            </div>
        </div>

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/nprogress.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/books.js"></script>

    <script src="/static/scripts/jquery.mousewheel.js"></script>

    <script src="/static/scripts/vimeothumb.js"></script>
    <script>
        $("img").VimeoThumb();
    </script>

    <!--/ scripts/page-flip /-->
    <script src="/static/scripts/jquerypp.custom.js"></script>
    <script src="/static/scripts/bookblock.js"></script>

    <!--/ scripts/fluidbox /-->
    <script src="/static/scripts/imagesloaded.min.js"></script>
    <script src="/static/scripts/fluidbox.min.js"></script>

    <script>
		
        $(function () {
	     
            function getUserFromBook(bookId) {
                    responseText = '';
                    $.ajax({
                        url: "/api/utils/getUserFromBookId",
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        async: false,
                        type: "POST",
                        data: {
                            bookId: bookId
                        },
                        success: function (data) {
                            bookOwner = data
                            responseText = "<div class=\"author-info\"><div class=\"author-name\"><a href=\"/" + data.displayName + "\">" + data.name + "</a><img class=\"author-avatar\" src=\"" + data.avatarImage + "\"></div></div>";
                        },
                        error: function (q, status, err) {
                            if (status == "timeout") {
                                alert("Request timed out");
                            } else {
                                alert("Some issue happened with your request: " + err.message);
                            }
                        }
                    });
                    return responseText;
             }
            var
            $vW = $(window).width(),
                $vH = $(window).height(),
                htmlToInsert = "",
                current;

            // Load Gapelia
            NProgress.start();

            setTimeout(function () {

                $(function () {
						
                    pages = JSON.parse(localStorage.getItem("pages"));
                    console.log(pages);
                    size = pages.page.length;
                    getUserFromBook(pages.bookId);
                    for (i = 0; i < size; i++) {
                        console.log("Read Item");
                        current = pages.page[i];

                        if (i == 0) {
                            htmlToInsert += "<div class=\"bb-item front-cover\" style=\"display: block\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
                            insertPage(1);
                        } else {
                            htmlToInsert += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
                            insertPage(0);
                        }
                    }

                    $("#bb-bookblock").html(htmlToInsert);
					
                    $(".content").css({
                        "width": $vW + "px",
                        "height": $vH + "px"
                    });

                    $(".fluid-wrapper").imgLiquid({
                        fill: true
                    });
						$(".photo-wrapper .page-bg-wrapper").imgLiquid({
                        fill: true
                    });
                    $(".overlay-wrapper").imgLiquid({
                        fill: true
                    });
                    $(".phototext-wrapper").imgLiquid({
                        fill: true
                    });
                    $(".vertical-wrapper .draggable-placeholder").imgLiquid({
                        fill: true
                    });

                    $(".photo-wrapper .page-bg-wrapper").css("top", $vH / 2 - 200 + "px");
                    $(".inserted-img").fluidbox();
		    
		    //adding http://, underline styling and new-tab-location to all hyperlinks//
		    $(function() {
				$(".full-book .page-desc a").each(function() {
					var href = $(this).attr("href");
					   //$(this).attr("href", "http://" + href);
					   $(this).attr("target", "_blank");
				});
				
				$(".full-book .page-desc a").css("text-decoration", "underline");
		    });
                });

                function insertPage(isFirst) {

                    switch (current.templateId) {
                    case 0:
                        fluidLayout(isFirst);
                        break;

                    case 1:
                        photoLayout(isFirst);
                        break;

                    case 2:
                        overlayLayout(isFirst);
                        break;

                    case 3:
                        photoTextLayout(isFirst);
                        break;

                    case 4:
                        verticalLayout(isFirst);
                        break;

                    case 5:
                        videoLayout(isFirst);
                        break;

                    default:
                        fluidLayout(isFirst);
                        break;
                    }

                }

                function fluidLayout(isFirst) {
			
                    if(current.image==null ||current.image=="../static/images/grayBG.png") {
                        htmlToInsert += "<section class=\"fluid-wrapper\"><section class=\"draggable-placeholder\">";
                         htmlToInsert += "</section>";
                        htmlToInsert +="<div class=\"fluid-preview\" style=\"padding: 1rem 2rem 0px; top: 0px;\">";
                    } else {
                        htmlToInsert += "<section class=\"fluid-wrapper\"><section class=\"draggable-placeholder\">";
                        htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
                        if (current.attribution != "Add photo credit?") {
                            htmlToInsert += "<span class=\"image-attribution\">" + current.attribution + "</span>";
                        } else {
			    htmlToInsert += "";
			}
                        htmlToInsert += "</section>";
                        htmlToInsert += "<div class=\"fluid-preview\">";
                    }

                    if (isFirst == 1) {
                                htmlToInsert += responseText;
                    }
                    htmlToInsert += "<article>";
                    htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

                    htmlToInsert += "<div class=\"page-desc\">" + current.text + "";

                    if (current.file != undefined) {
                        htmlToInsert += "" + current.file + "";
                    }

                    htmlToInsert += "</div>";

                    htmlToInsert += "</article></div>";
                    htmlToInsert += "</section>";
                    htmlToInsert += "</div></div>";

                }

                function photoLayout(isFirst) {

                    htmlToInsert += "<section class=\"photo-wrapper\">";
                    htmlToInsert += "<div class=\"page-bg-wrapper\">";

                    if (current.attribution != "Add photo credit?") {
                        htmlToInsert += "<span class=\"image-attribution\">" + current.attribution + "</span>";
                    } else {
			htmlToInsert += "";
		    }
                    htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/></div>";
                    htmlToInsert += "<div class=\"photo-preview\">";
                    htmlToInsert += "<article>";
                    htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

                    if (isFirst == 1) {
                        htmlToInsert += responseText;
                    }

                    htmlToInsert += "</article>";
                    htmlToInsert += "</div>";
                    htmlToInsert += "</section>";
                    htmlToInsert += "</div></div>";

                }

                function overlayLayout(isFirst) {

                    htmlToInsert += "<section class=\"overlay-wrapper\">";
                    htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
                    htmlToInsert += "<div class=\"overlay-preview\">";
                    htmlToInsert += "<article>";
                    htmlToInsert += "<div class=\"page-title-elem\">" + current.title + "</div>";

                    if (isFirst == 1) {
                        htmlToInsert += responseText;
                    }

                    htmlToInsert += "</article></div>";

                    if (current.attribution != "Add photo credit?") {
                        htmlToInsert += "<span class=\"image-attribution\">" + current.attribution + "</span>";
                    } else {
			htmlToInsert += "";
		    }
                    htmlToInsert += "</section>";
                    htmlToInsert += "</div></div>";

                }

                function photoTextLayout(isFirst) {

                    htmlToInsert += "<section class=\"phototext-wrapper\">";

                    if (current.attribution != "Add photo credit?") {
                        htmlToInsert += "<span class=\"image-attribution\">" + current.attribution + "</span>";
                    } else {
			htmlToInsert += "";
		    }
                    htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
                    htmlToInsert += "<div class=\"phototext-preview\">";
                    htmlToInsert += "<article>";
                    htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

                    if (isFirst == 1) {
                        htmlToInsert += responseText;
                    }

                    htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
                    htmlToInsert += "</article>";
                    htmlToInsert += "</div></section>";
                    htmlToInsert += "</div></div>";

                }

                function verticalLayout(isFirst) {

                    htmlToInsert += "<section class=\"vertical-wrapper\">";

                    if (current.attribution != "Add photo credit?") {
                        htmlToInsert += "<span class=\"image-attribution\">" + current.attribution + "</span>";
                    } else {
			htmlToInsert += "";
		    }
                    htmlToInsert += "<div class=\"draggable-placeholder\">";
                    htmlToInsert += "<img class=\"page-bg\" src=\"" + current.image + "\"/>";
                    htmlToInsert += "<div class=\"vertical-preview\">";
                    htmlToInsert += "<article>";
                    htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

                    if (isFirst == 1) {
                       htmlToInsert += responseText;
                    }
                    htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
                    htmlToInsert += "</article></div>";
                    htmlToInsert += "</div></section>";
                    htmlToInsert += "</div></div>";

                }

                function videoLayout(isFirst) {

                    htmlToInsert += "<section class=\"video-wrapper\">";

                    if (current.attribution != "Add photo credit?") {
                        htmlToInsert += "<span class=\"image-attribution\">" + current.attribution + "</span>";
                    } else {
			htmlToInsert += "";
		    }
                    htmlToInsert += "<div class=\"video-preview\">";

                    htmlToInsert += "<div class=\"button-wrapper\"><button class=\"play-video\">Play</button></div>";
                    htmlToInsert += "<div class=\"video-player-container\">";
                    htmlToInsert += "<iframe src=\"" + current.video + "\"></iframe>";
                    htmlToInsert += "</div>";
                    htmlToInsert += "<article>";
                    htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

                    if (isFirst == 1) {
                                htmlToInsert += responseText;
                            }

                    htmlToInsert += "<div class=\"page-desc\">" + current.text + "</div>";
                    htmlToInsert += "</article>";
                    htmlToInsert += "</div></section>";
                    htmlToInsert += "</div></div>";

                }

                var Page = (function () {

                    var config = {
                        $bookBlock: $("#bb-bookblock"),
                        $navNext: $("#bb-nav-next"),
                        $navPrev: $("#bb-nav-prev"),
                        $navFirst: $("#bb-nav-first")
                    },

                        init = function () {

                            config.$bookBlock.bookblock({
                                speed: 1000,
                                shadowSides: 0.8,
                                shadowFlip: 0.4
                            });

                            initEvents();

                        },

                        initEvents = function () {

                            var $slides = config.$bookBlock.children();

                            // add navigation events
                            config.$navNext.on("click touchstart", function () {
                                config.$bookBlock.bookblock("next");
                                return false;
                            });

                            config.$navPrev.on("click touchstart", function () {
                                config.$bookBlock.bookblock("prev");
                                return false;
                            });

                            config.$navFirst.on("click touchstart", function () {
                                config.$bookBlock.bookblock("first");
                                return false;
                            });

                            // add swipe events
                            $slides.on({
                                "swipeleft": function (event) {
                                    config.$bookBlock.bookblock("next");
                                    return false;
                                },

                                "swiperight": function (event) {
                                    config.$bookBlock.bookblock("prev");
                                    return false;
                                }
                            });

                            // add keyboard events
                            $(document).keydown(function (e) {

                                var keyCode = e.keyCode || e.which,
                                    arrow = {
                                        left: 37,
                                        up: 38,
                                        right: 39,
                                        down: 40
                                    };
									
                                switch (keyCode) {
                                case arrow.left:
                                    config.$bookBlock.bookblock("prev");
                                    break;
								
                                case arrow.right:
                                    config.$bookBlock.bookblock("next");
                                    break;
                                }
								
                            });
							
                        };
						
                    return {
                        init: init
                    };
					
                })();
				
                Page.init();
                NProgress.done();
				
				//export data dialog//
				setTimeout (function() {
				
						if (window.location.href.split("/")[3] == "preview?export") {
		
						    myBookId = pages.bookId;
							title = $(".page-title-elem").html();
							
							emailShare = "mailto:?subject=Feedback%20on%20My%20Writing&amp;body="+ title + " by " + bookOwner.fullName + "   " +  "http://folio/revision/" + myBookId+"";
							
							$(".content").append("<div id=\"export-container\"><div class=\"header-export\"><h3>Your data. Export it anytime.</h3></div><div id=\"child-export\"><a id=\"export-print\"><img src=\"/static/images/pdf-export.png\">Export to PDF via Print Preview</a><br><br><a id=\"html-export\"><img src=\"/static/images/html-export.png\">Export to HTML Plain Text</a><br><br><a id=\"email-export\" href=\""+emailShare+"\"><img src=\"/static/images/email-export.png\">Share a draft via email</a></div></div>");
							$("#the-book").css("overflow-y", "hidden");
							$("#close-preview").css("color", "white");
							
							document.title = $(".page-title-elem").text();
							
							//export to print preview//
							$("#export-container #export-print").click(function(){ window.print() });
							
							//export to html//
							$("#html-export").click(function() {
									
								$(".author-info").remove();
								$(".fluid-wrapper").wrap("<div id=\"export-ready\"></div>");
									
								function downloadInnerHtml(filename, elId, mimeType) {
										var elHtml = document.getElementById(elId).innerHTML;
										var link = document.createElement('a');
										mimeType = mimeType || 'text/plain';
									
										link.setAttribute('download', filename);
										link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
										link.click(); 
									}
									
								var fileName =  'tags.html'; // You can use the .txt extension if you want
								downloadInnerHtml(fileName, 'export-ready','text/html');
							});
							
						    if ($vW > "1599") {
								$(".content #email-export img").css("cssText", "left: 10.rem !important");
						    }
						}
				}, 500)

            });

        });
    </script>

</body>

</html>
