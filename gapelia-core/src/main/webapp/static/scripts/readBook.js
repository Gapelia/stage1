var Page = (function () {
    
    var config = {
        $bookBlock: $("#bb-bookblock"),
        $navNext: $("#bb-nav-next"),
        $navPrev: $("#bb-nav-prev"),
        $navFirst: $("#bb-nav-first"),
        //$navLast: $("#go-to-credits"),
        //$navLast: $("#go-to-credits")
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

            
	    /*config.$navLast.on("click touchstart", function () {
		config.$bookBlock.bookblock("last");
		return false;
	    });

            // add swipe events
            /*$slides.on({
                "swipeleft": function (event) {
                    config.$bookBlock.bookblock("next");
                    return false;
                },

                "swiperight": function (event) {
                    config.$bookBlock.bookblock("prev");
                    return false;
                }
            });*/

            // add keyboard events
            $(document).keydown(function (e) {

                var
                keyCode = e.keyCode || e.which,
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

function loadBook() {
    
    /*
    $(document).on("mouseenter", ".inserted-img", function () {
        if ($(this).parent().hasClass("minimized-p")) {
            $(this).before("<div class=\"resize-bigger\">[bigger]</div>");
        } else {
            $(this).before("<div class=\"resize-smaller\">[smaller]</div>");
        }

    });

    $(document).on("click", ".resize-smaller", function () {

        $(this).parent().addClass("minimized-p");
        $(this).parent().mouseleave();

    });

    $(document).on("click", ".resize-bigger", function () {

        $(this).parent().removeClass("minimized-p");
        $(this).parent().mouseleave();

    });
    */
    
    //window.READRBOARDCOM.actions.reInit();

    $(document).on("mouseleave", ".resize-smaller, .resize-bigger", function () {
        $(".resize-smaller, .resize-bigger").remove();
    });
    if ($vW > "1024") {

        $(".content").css({
            "width": $vW + "px",
            "height": $vH + "px"
        });
        Page.init();


    }
    share = "";

        share += "<li><a href=\"javascript:window.open(facebookShare,'','width=555,height=368');void(0)\"><i class=\"ion-social-facebook\"></i></a></li>";
        share += "<li><a href=\"javascript:window.open(twitterShare,'','width=550,height=257');void(0)\"><i class=\"ion-social-twitter\"></i></a></li>";
        share += "<li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li>";
        $(".share-book").html(share)

}
$(function () {
    
    function makeBackPage() {
        getUserFromBookId(bookId);
        $.ajax({
            url: "/api/users/getUserPublic",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            data: {
                userId: bookOwner.userId
            },
            success: function (data) {
                bookUser = data;
                currentWebsite = document.URL;
                facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=' + currentWebsite;
                twitterShare = 'http://twitter.com/share?text=Check%20out%20this%20story%20on%20Folio&url=' + currentWebsite;
                emailShare = 'mailto:?subject=Recommended%20Library&amp;body=Check out this story on Folio ' + currentWebsite;
                backPage = "";
                backPage += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\"><section class=\"backcover-wrapper\">";
                backPage += "<div id=\"fin\"><figure class=\"merci merciful\" data-id=\"0\"><a class=\"mercibject\"><div class=\"opening\">";
                backPage += "<div class=\"circle\"></div></div></a><a href=\"#merci\" class=\"count\"><span class=\"num\">" + getNumberVotes(bookId) + "</span>";
                backPage += "<span class=\"txt\">Vote</span><span class=\"dont-move\">Don't move</span></a></figure>";
                backPage += "<h2>" + pages[0].title + "</h2><ul class=\"share-book\"><li><a href=\"javascript:window.open("+ facebookShare +",'','width=555,height=368');void(0)\">";
                backPage += "<i class=\"ion-social-facebook\"></i></a></li><li><a href=\"javascript:window.open("+twitterShare+",'','width=550,height=257');void(0)\">";
                backPage += "<i class=\"ion-social-twitter\"></i></a></li><li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li></ul><hr/><section id=\"author-section\">";
                backPage += getUserFromBookId(bookId);
                backPage += "<div id=\"author-bio-blurb\">" + bookOwner.bio + "</div></section>"
                backPage += "<hr/><section><div id=\"library-avatar\"><img src=\"" + library.coverPhoto + "\"></div>";
                backPage += "<div id=\"library-name\">" + getLibraryFromBook(current.bookId) + "</div>";
                backPage += "<div id=\"library-info-blurb\"><a>" + library.description + "</a>";
                backPage += "</div></section></div>";
                getReadNextBook();
                
                initializeMerciObject();
                
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out");
                }
            }
        });
    }
    
    
    function initializeMerciObject(){
        // "Merci" code
			// needs to be a string for jquery.cookie
			var postId = "1";
                        //console.log("merci'ing initializing outside");
                        
                        
                        

			$(function () {
                                //console.log("merci'ing initializing");

				// initialize merci
				$("figure.merciful").merciful();

                                
                                //  this is the check at the server if user has already voted   (this is the prefill if already voted)
				//if ($.cookie(postId) == "false") {
                                
                                if (hasAlreadyVoted(bookId) == "True") {
                                    $("figure.merciful").removeClass("animate").addClass("complete");
                                }
                                else{
                                    //console.log("has not voted");
				    $("figure.merciful").removeClass("animate").removeClass("complete");
                                    //$(".num").html(1);
                                }
				//	$("figure.merciful").removeClass("animate").addClass("complete");
                                  //      console.log("merci'ing cookie true");
					// your server would take care of the proper merci count, but because this is a
					// static page, we need to set it here so it doesn't become -1 when you remove
					// the merci after a reload
					
				//}

				// when merci'ing      MOUSEOVER
				$("figure.merci").bind("merci:active", function (e) {

					$("span.num, span.txt").hide();
					$("span.dont-move").show();

					//console.log("merci'ing active");

				});

				// when not merci'ing      MOUSE LEAVES
				$("figure.merci").bind("merci:inactive", function (e) {

					//console.log("merci'ing inactive");

					$("span.num, span.txt").show();
					$("span.dont-move").hide();

				});

				// after merci'd        MERCI VOTES
				$("figure.merci").bind("merci:added", function (e) {

					var element = $(this);

					// ajax'y stuff or whatever you want
					//console.log("Merci'd:", element.data("id"), ":)");
                                        
                                        voteBook(bookId);

					// set cookie so user cannot merci again for 7 days
					//$.cookie(postId, "true", { expires: 7 });

					$("span.num, span.txt").show();
					$("span.dont-move").hide();

				});

				// after removing a merci  UNVOTE
				$("figure.merci").bind("merci:removed", function (e) {

					var element = $(this);
					// ajax'y stuff or whatever you want
					//console.log("Un-merci'd:", element.data("id"), ":(");
                                        
                                        removeVoteBook(bookId);


				});

			});
	
	
    }
    
    function hasAlreadyVoted(bookId) {
        var result = "Null";
        $.ajax({
            url: "/api/actions/hasAlreadyVoted",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            async: false,
            data: {
			sessionId: sessionId,
                        bookId: bookId
            },
            complete: function(r){
                 result = r.responseText;
        }
        });
        return result;
    }
    
    function voteBook(bookId) {
        $.ajax({
	    url: "/api/notifications/createBookNotification",
	    contentType: "application/x-www-form-urlencoded;charset=utf-8",
	    type: "POST",
	    async: false,
	    data: {
		sessionId: sessionId,
		recipient: bookOwner.userId,
		sender: user.userId,
		referencedBook: bookId
	    }});
            $.ajax({
            url: "/api/actions/voteBook",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            async: false,
            data: {
                    sessionId: sessionId,
                    bookId: bookId
            }});
    }
    
    function removeVoteBook(bookId) {
        $.ajax({
            url: "/api/actions/removeVoteBook",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            async: false,
            data: {
                    sessionId: sessionId,
                    bookId: bookId
            }});
    }
    
    
    /*
    function getNumberVotes() {
        $.ajax({
            url: "/api/books/getNumVotes",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            async: false,
            data: {
			sessionId: sessionId,
                bookId: bookId
            },
            success: function (data) {

                if (data == null) {
                	numVotes = 0;
                }
                else{
                	numVotes = data[0];
                }
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out");
                } else {
                    alert("Some issue happened with your request: " + err.message);
                }
            }
        });
        
        return numVotes;
    }*/

    function getReadNextBook() {
        $.ajax({
            url: "/api/users/getNextReadRecommendation",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            async: false,
            data: {
                sessionId: sessionId,
                userId: user.userId,
                bookId:current.bookId 
            },
            success: function (data) {
                nextBook = data;
                backPage += "<div id=\"fin-next\" style=\"background-image: url("+nextBook.coverPhoto+"); background-size: cover;\"><div class=\"book-title\"><a href=\"/read/" + nextBook.bookId + "\">" + nextBook.title + "</a></div><div class=\"book-info\"></div></div></div></section></div></div>";
                htmlToInsert += backPage;
                $("#bb-bookblock").html(htmlToInsert);
                $("#header-author").html(bookOwner.name);
                $("#header-title").html(pages[0].title);
                $(".inserted-img").fluidbox();
                loadBook();
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out");
                } else {
                    alert("Some issue happened with your request: " + err.message);
                }
            }
        });
    }

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
                responseText = "<div class=\"author-info\"><div class=\"author-name\"><a href=\"/" + data.fullName + "\">" + data.fullName + "</a><img class=\"author-avatar\" src=\"" + data.avatarImage + "\"></div></div>";
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
    var $vW = $(window).width(),
        $vH = $(window).height();

    // Load Gapelia
    NProgress.start();

    // Get book info and its pages
    bookId = document.URL.split("/")[document.URL.split("/").length - 1];
    getUserFromBook(bookId);

    $.ajax({
        url: "/api/users/getPages",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            bookId: bookId
        },
        success: function (data) {

            pages = data;
            pages.sort(function (a, b) {
                return a.pageNumber - b.pageNumber;
            });

            htmlToInsert = "";
            backPage = '';

            for (i = 0; i < pages.length; i++) {
                current = pages[i];
                if (i == 0) {
                    htmlToInsert += "<div class=\"bb-item front-cover\" style=\"display: block\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
                    insertPage(1);
                } else {
                    htmlToInsert += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\">";
                    insertPage(0);
                }
            }
            makeBackPage();




        },

        error: function (q, status, err) {

            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }

        }
    });

    // Set up page layouts
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
            phototextLayout(isFirst);
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
        if(current.photoUrl ==null ||current.photoUrl=="static/images/grayBG.png") {
            htmlToInsert += "<section class=\"fluid-wrapper\" style=\"top: -2rem;\"><section class=\"draggable-placeholder\" style=\"display: none;\">";
            htmlToInsert += "</section>";
            htmlToInsert +="<div class=\"fluid-preview\" style=\"padding: 1rem 2rem 0px; top: 0px;\">";
        } else {
            htmlToInsert += "<section class=\"fluid-wrapper\">";
            getUserFromBook(bookId)
            htmlToInsert += "<section class=\"draggable-placeholder\">";
            htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";

            if (current.creativeCommons != "Add photo credit?") {
                htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
            }

            htmlToInsert += "</section>";
            htmlToInsert += "<div class=\"fluid-preview\">";
        }
        if (isFirst == 1) {
            htmlToInsert += responseText;
        }
        htmlToInsert += "<article>";
        htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";

        htmlToInsert += "<div class=\"page-desc\">" + current.content + "";
        
        if (current.file != undefined) {
            htmlToInsert += "" + current.file + "";
        }

        htmlToInsert += "</div>";
        
        if (pages.length == 1) {
        
        facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=' + currentWebsite;
        twitterShare = 'http://twitter.com/share?text=Check%20out%20this%20story%20on%20Folio&url=' + currentWebsite;
        emailShare = 'mailto:?subject=Recommended%20Library&amp;body=Check out this story on Folio ' + currentWebsite;
        htmlToInsert += "<hr/><div id=\"fin\"><figure class=\"merci merciful\" style=\"z-index: 10;\" data-id=\"0\"><a class=\"mercibject\"><div class=\"opening\">";
        htmlToInsert += "<div class=\"circle\"></div></div></a><a href=\"#merci\" class=\"count\"><span class=\"num\">" + getNumberVotes(bookId) + "</span>";
        htmlToInsert += "<span class=\"txt\">Vote</span><span class=\"dont-move\">Don't move</span></a></figure><div/>";
        htmlToInsert += "<h2>" + pages[0].title + "</h2><div id=\"credits\">" + current.title + getUserFromBookId(bookId);
        htmlToInsert += "<ul class=\"share-book\"><li><a href=\"javascript:window.open("+ facebookShare +",'','width=555,height=368');void(0)\">";
        htmlToInsert += "<i class=\"ion-social-facebook\"></i></a></li><li><a href=\"javascript:window.open("+twitterShare+",'','width=550,height=257');void(0)\">";
        htmlToInsert += "<i class=\"ion-social-twitter\"></i></a></li><li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li></ul>";
        htmlToInsert += "</div></div>";
        htmlToInsert += "</div>";
        getReadNextBook();
        
        }

        htmlToInsert += "</article></div>";
        htmlToInsert += "</section>";
        htmlToInsert += "</div></div>";

    }

    function photoLayout(isFirst) {

        htmlToInsert += "<section class=\"photo-wrapper\">";
        htmlToInsert += "<div class=\"page-bg-wrapper\">";

        if (current.attribution != "Add photo credit?") {
            htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
        }

        htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
        htmlToInsert += "</div>";
        htmlToInsert += "<div class=\"photo-preview\">";
        htmlToInsert += "<article>";
        htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
        getUserFromBook(bookId)

        if (isFirst == 1) {
            htmlToInsert += responseText;
        }

        htmlToInsert += "</article>";
        htmlToInsert += "</div></section>";
        htmlToInsert += "</div></div>";

    }

    function overlayLayout(isFirst) {

        htmlToInsert += "<section class=\"overlay-wrapper\">";
        htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
        htmlToInsert += "<div class=\"overlay-preview\">";
        htmlToInsert += "<article>";
        htmlToInsert += "<div class=\"page-title-elem\">" + current.title + "</div>";
        getUserFromBook(bookId)

        if (isFirst == 1) {
            htmlToInsert += responseText;
        }

        htmlToInsert += "</article></div>";

        if (current.creativeCommons != "Add photo credit?") {
            htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
        }

        htmlToInsert += "</section>";
        htmlToInsert += "</div></div>";

    }

    function phototextLayout(isFirst) {

        htmlToInsert += "<section class=\"phototext-wrapper\">";

        if (current.creativeCommons != "Add photo credit?") {
            htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
        }

        htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
        htmlToInsert += "<div class=\"phototext-preview\">";
        htmlToInsert += "<article>";
        htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
        getUserFromBook(bookId)

        if (isFirst == 1) {
            htmlToInsert += responseText;
        }

        htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
        htmlToInsert += "</article>";
        htmlToInsert += "</div></section>";
        htmlToInsert += "</div></div>";

    }

    function verticalLayout(isFirst) {

        htmlToInsert += "<section class=\"vertical-wrapper\">";

        if (current.creativeCommons != "Add photo credit?") {
            htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
        }

        htmlToInsert += "<div class=\"draggable-placeholder\">";
        htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";
        htmlToInsert += "<div class=\"vertical-preview\">";
        htmlToInsert += "<article>";
        htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
        getUserFromBook(bookId)

        if (isFirst == 1) {
            htmlToInsert += responseText;
        }

        htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
        htmlToInsert += "</article></div>";
        htmlToInsert += "</div></section>";
        htmlToInsert += "</div></div>";

    }

    function videoLayout(isFirst) {

        htmlToInsert += "<section class=\"video-wrapper\">";

        if (current.creativeCommons != "Add photo credit?") {
            htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
        }

        htmlToInsert += "<div class=\"video-preview\">";

        htmlToInsert += "<div class=\"button-wrapper\"><button class=\"play-video\">Play</button></div>";
        htmlToInsert += "<div class=\"video-player-container\">";
        htmlToInsert += "<iframe src=\"" + current.videoUrl + "\"></iframe>";
        htmlToInsert += "</div>";
        htmlToInsert += "<article>";
        htmlToInsert += "<h1 class=\"page-title-elem\">" + current.title + "</h1>";
        getUserFromBook(bookId)

        if (isFirst == 1) {
            htmlToInsert += responseText;
        }

        htmlToInsert += "<div class=\"page-desc\">" + current.content + "</div>";
        htmlToInsert += "</article>";
        htmlToInsert += "</div></section>";
        htmlToInsert += "</div></div>";

    }

    // Styling layouts
    $(".backcover-wrapper #fin-next").imgLiquid({
        fill: true
    });

    if ($vW > "1024") {

        $("img").VimeoThumb();

        setTimeout(function () {
            $(".video-player-container").imgLiquid({
                fill: true
            });
        }, 1000); // prevent placeholder from appearing

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

        $(document).on("click", ".play-video", function () {

            $(".play-video").hide();

            $(".video-player-container img").hide();
            $(".video-player-container iframe").show();

        });

    }

    // Streamline book for mobile
    if ($vW < "1025") {

        $("#header-toggle, #bb-nav-prev, #bb-nav-next").css("display", "none");

        $(".video-player-container img").hide();
        $(".video-player-container iframe").show();

    }

    if ($vW < "321") {

        // $(".frontcover-wrapper, .frontcover-wrapper article, .overlay-wrapper").css("height", $vH - 50 + "px");
        $(".frontcover-wrapper, .frontcover-wrapper article, .overlay-wrapper").css("height", $vH);
        $(".frontcover-wrapper, .overlay-wrapper").imgLiquid({
            fill: true
        });

    }

    // FIN
    NProgress.done();

    // &c
    var third = getUserDrafts();

    // Slide menu for desktop
    if ($vW > "1024") {
        new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

        $(".mp-pushed").ready(function () {
            $("#book-scroller").css("z-index", "0");
        });
    }

    // Dropdown menu for mobile
    if ($vW < "1025") {

        menu = "";
        menu += "<ul id=\"book-menu\" style=\"display: none;\">";
        menu += "<li id=\"nav-featured\"><a href=\"/featured\">Featured</a></li>";
        menu += "<li id=\"nav-explore\"><a href=\"/me\">Libraries</a></li>";
        menu += "<li id=\"nav-profile\"><a href=\"/me\">My Profile</a></li>";
        /*menu += "<li id=\"nav-notify\"><a href=\"#\">Notifications</a>";
        menu += "<ul>";
        menu += "<li><a href=\"#\">Diego thanked you for your story: \"The Matrix Has You\"</a></li>";
        menu += "<li><a href=\"#\">Tommy commented on your story: \"Well that was weird\"</a></li>";
        menu += "<li><a href=\"#\">Daniel added your story to a library: \"Gapelia Nation\"</a></li>";
        menu += "<li><a href=\"#\">Frankie wants to collaborate on your story: \"Hoverboards Are The Future\"</a></li>";
        menu += "<li><a href=\"#\">2 edit requests are pending for your review</a></li>";
        menu += "</ul>";*/
        menu += "</li>";
        menu += "<li id=\"nav-profile\"><a href=\"/accounts\">Account Settings</a></li>";
        menu += "<li id=\"nav-logout\"><a href=\"#\">Log Out</a></li>";
        menu += "</ul>";

        var currentWebsite = document.URL;

        facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=' + currentWebsite;
        twitterShare = 'http://twitter.com/share?text=Check%20out%20this%20story%20on%20Folio&url=' + currentWebsite;
        emailShare = 'mailto:?subject=Recommended%20Library&amp;body=Check out this story on Folio ' + currentWebsite;
        share = "";
        share += "<ul id=\"share-menu\" style=\"display: block;\">";

        share += "<li><a href=\"javascript:window.open(facebookShare,'','width=555,height=368');void(0)\">Share via Facebook</a></li>";
        share += "<li><a href=\"javascript:window.open(twitterShare,'','width=550,height=257');void(0)\">Share via Twitter</a></li>";
        share += "<li><a href=\""+emailShare+"\">Share via Email</a></li>";
        share += "</ul>";

        $("#g-menu-toggle").after(menu);
        
        $(document).on("click", "#g-menu-toggle", function () {

            $("#book-menu").toggle();

            if ($("#book-menu").css("display") == "block") {
                $("#g-menu-toggle").css("color", "#70a1b1");
            } else {
                $("#g-menu-toggle").css("color", "#fcfcfc");
            }

            if ($("#share-menu").css("display") == "block") {
                $("#share-menu").hide();
            }

        });

        $(document).on("click", "#nav-notify", function (e) {

            $("#nav-notify ul").toggle();

            if ($("#nav-notify ul").css("display") == "block") {
                $("#nav-notify").css("padding", "1rem 0 0 0");
            } else {
                $("#nav-notify").css("padding", "1rem");
            }

            e.preventDefault();

        });
        
        // Log Out
	$("#logout").click(function (e) {
	    document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	    window.location = "";
	});

    }

});