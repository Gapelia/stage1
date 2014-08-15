var Page = (function () {
    
    var config = {
        $bookBlock: $("#bb-bookblock"),
        $navNext: $("#bb-nav-next"),
        $navPrev: $("#bb-nav-prev"),
        $navFirst: $("#bb-nav-first"),
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
	    async: false,
            data: {
                userId: bookOwner.userId
            },
            success: function (data) {
                bookUser = data;
                firstTitle = pages[0].title;
                
                facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=folio.is/read/' + current.bookId;
                twitterShare = "http://twitter.com/share?text=" + firstTitle + " by "+ bookOwner.fullName;"&url=http://folio.is/read/" + current.bookId;
                emailShare = 'mailto:?subject=Recommended%20Read%20on%20Folio&amp;body='+ firstTitle + " by " + bookOwner.fullName + "   " +  "http://folio.is/read/" + current.bookId;
                backPage = "";
                backPage += "<div style=\"display: none\" class=\"bb-item\" id=\"page" + (i + 1) + "\"><div class=\"content\"><section class=\"backcover-wrapper\">";
                backPage += "<div id=\"fin\"><figure class=\"merci merciful\" data-id=\"0\"><a class=\"mercibject\"><div class=\"opening\">";
                backPage += "<div class=\"circle\"><i class=\"ion-lightbulb\"></i></div></div></a><a href=\"#merci\" class=\"count\"><span class=\"num\">" + getNumberVotes(bookId) + "</span>";
                backPage += "<span class=\"txt\">Vote</span><span class=\"dont-move\">Don't move</span></a></figure>";
                backPage += "<h2>" + pages[0].title + "</h2><ul class=\"share-book\"><li><a href=\"javascript:window.open("+ facebookShare +",'','width=555,height=368');void(0)\">";
                backPage += "<i class=\"ion-social-facebook\"></i></a></li><li><a href=\"javascript:window.open("+twitterShare+",'','width=550,height=257');void(0)\">";
                backPage += "<i class=\"ion-social-twitter\"></i></a></li><li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li></ul><hr/><section id=\"author-section\">";
                backPage += getUserFromBookId(bookId);
                if (bookOwner.bio == "") {
                    backPage += "<div id=\"author-bio-blurb\">" + "This user has not added a bio yet." + "</div></section>"
                } else {
                    backPage += "<div id=\"author-bio-blurb\">" + bookOwner.bio + "</div></section>"   
                }
                backPage += "<hr/><section>";
                
                if (getLibraryFromBook(current.bookId) != "") {
                    backPage += getLibraryFromBookBackCover(current.bookId);
                } else {
                    backPage += "<section><a id=\"library-avatar\"><img  style=\"border: 1px solid rgba(0, 0, 0, 0.33);\" src=\"../static/images/whiteBG.jpg\"></a><div id=\"library-name\"><a style=\"display: block; width: 100%; height: 100%;\">--</a></div><div id=\"library-info-blurb\"><a>This story is not part of a library yet.<br> Visit the <a href=\"/"+user.userId+"\">author's profile</a> or browse <a href=\"/\">curated stories</a></a></div><section>";
                }
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
	    //$(function () {
            //console.log("merci'ing initializing");

	    // initialize merci
	    $("figure.merciful").merciful();
                                
            //  this is the check at the server if user has already voted   (this is the prefill if already voted)
            if (hasAlreadyVoted(bookId) == "True") {
                $("figure.merciful").removeClass("animate").addClass("complete");
            } else{
            //console.log("has not voted");
            $("figure.merciful").removeClass("animate").removeClass("complete");
            }
	    // when merci'ing      MOUSEOVER
	    $("figure.merci").bind("merci:active", function (e) {
		$("span.num, span.txt").hide();
		$("span.dont-move").show();
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
                        
            voteBook(bookId);
                $("span.num, span.txt").show();
                $("span.dont-move").hide();
	    });

	    // after removing a merci  UNVOTE
	    $("figure.merci").bind("merci:removed", function (e) {

		var element = $(this);
                removeVoteBook(bookId);
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
            }
        });
    }

    
function getLibraryFromBookRec(bookId) {
   
    $.ajax({
        url: "/api/utils/getLibraryFromBookId",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            bookId: bookId
        },
        success: function (data) {
            if (data.libraryId != 0) {
                
               // console.log("getting next book in library");
		
			$.ajax({
				url: "/api/users/getNextLibraryRead",
				contentType: "application/x-www-form-urlencoded;charset=utf-8",
				async: false,
				type: "POST",
				data: {
				    sessionId: sessionId,
				    userId: user.userId,
				    bookId: bookId,
				    libraryId: data.libraryId
				},
				success: function (data) {
					nextBook = data;
					backPage += "<div id=\"fin-next\" style=\"background-image: url("+nextBook.coverPhoto+"); background-size: cover; background-position: 50% 50%\"><div class=\"book-title\"><a href=\"/read/" + nextBook.bookId + "\">" + nextBook.title + "</a></div><div class=\"book-info\"></div></div></div></section></div></div>";
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
		
                responseText = "<a href=\"library/" +  + "\" style=\"display: block; width: 100%; height: 100%;\">" + data.title + "</a>";
            }
            else{
                
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
                    backPage += "<div id=\"fin-next\" style=\"background-image: url("+nextBook.coverPhoto+"); background-size: cover; background-position: 50% 50%\"><div class=\"book-title\" style=\"text-shadow: 3px 3px 3px rgba(25, 25, 25, 0.7);\"><a href=\"/read/" + nextBook.bookId + "\">" + nextBook.title + "</a></div><div class=\"book-info\"></div></div></div></section></div></div>";
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
    
function getReadNextBook() {
        
        if (typeof user == "undefined") {
            backPage += "<div id=\"fin-next\" style=\"background-image: url(../static/images/cover.jpg); background-size: cover; background-position: 50% 50%\"><div class=\"book-title\"><a href=\"/\">Sign up with Folio. Join a community of thinkers and storytellers</a></div><div class=\"book-info\"></div></div></div></section></div></div>";
            
            htmlToInsert += backPage;
            $("#bb-bookblock").html(htmlToInsert);
            loadBook();
        }
        else{
            getLibraryFromBookRec(current.bookId); 
        }
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
                responseText = "<div class=\"author-info\"><div class=\"author-name\"><a href=\"/" + data.displayName + "\">" + data.name + "<img class=\"author-avatar\" src=\"" + data.avatarImage + "\"></a></div></div>";
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
    var urlBookId = document.URL.substring(document.URL.lastIndexOf('/')+1).replace("#","");
    bookId = urlBookId.split("?")[0];
    //bookId = document.URL.split("/")[document.URL.split("/").length - 1];
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
        if(current.photoUrl ==null ||current.photoUrl=="../static/images/grayBG.png") {
            if ($vW > "1025") {
                htmlToInsert += "<section class=\"fluid-wrapper\" style=\"top: -6rem;\"><section class=\"draggable-placeholder\" style=\"display: none;\">";
                htmlToInsert += "</section>";
                htmlToInsert +="<div class=\"fluid-preview\" style=\"padding: 1rem 2rem 0px; top: 4rem;\">";
            } else {
                htmlToInsert += "<section class=\"fluid-wrapper\" style=\"margin-bottom: 10rem; top: -6rem;\"><section class=\"draggable-placeholder\" style=\"display: none;\">";
                htmlToInsert += "</section>";
                htmlToInsert +="<div class=\"fluid-preview\" style=\"padding: 1rem 2rem 0px; top: 10rem;\">";
            }
        } else {
            htmlToInsert += "<section class=\"fluid-wrapper\">";
            getUserFromBook(bookId)
            htmlToInsert += "<section class=\"draggable-placeholder\">";
            htmlToInsert += "<img class=\"page-bg\" src=\"" + current.photoUrl + "\"/>";

            if (current.creativeCommons != "null" && current.creativeCommons != "Add photo credit?") {
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
        
        facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=folio.is/read/' + current.bookId;
        twitterShare = "http://twitter.com/share?text="+current.title+" by "+ bookOwner.fullName;"&url=http://folio.is/read/" + current.bookId;
        emailShare = 'mailto:?subject=Recommended%20Read%20on%20Folio&amp;body='+ current.title + " by " + bookOwner.fullName + "   " +  "www.folio.is/read/" + current.bookId;
        if (getLibraryFromBook(bookId) == "") {
            htmlToInsert += "<hr/><div id=\"fin\" style=\"padding: 2rem 0 3rem 0\">";
        } else {
            htmlToInsert += "<hr/><div id=\"fin\">";
        }    
        htmlToInsert += "<figure class=\"merci merciful\" style=\"z-index: 10;\" data-id=\"0\"><a class=\"mercibject\"><div class=\"opening\">";
        htmlToInsert += "<div class=\"circle\"><i class=\"ion-lightbulb\"></i></div></div></a><a href=\"#merci\" class=\"count\"><span class=\"num\">" + getNumberVotes(bookId) + "</span>";
        htmlToInsert += "<span class=\"txt\">Vote</span><span class=\"dont-move\">Don't move</span></a></figure><div/>";
        htmlToInsert += "<h2>" + pages[0].title + "</h2><div id=\"credits\">" + current.title + getUserFromBookId(bookId);
        htmlToInsert += "<ul class=\"share-book\"><li><a href=\"javascript:window.open("+ facebookShare +",'','width=555,height=368');void(0)\">";
        htmlToInsert += "<i class=\"ion-social-facebook\"></i></a></li><li><a href=\"javascript:window.open("+twitterShare+",'','width=550,height=257');void(0)\">";
        htmlToInsert += "<i class=\"ion-social-twitter\"></i></a></li><li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li></ul>";
        htmlToInsert += "</div></div>";
        htmlToInsert += "</div>";
        if (getLibraryFromBook(bookId) == "") {
            if ($vW > 1024) {
                htmlToInsert += "<div id=\"next-book\" style=\"margin-top: -8rem;\"><p>This story is not part of a library yet. Visit the <a href=\"/"+bookOwner.displayName+"\">author's profile</a> or browse <a href=\"/featured\">curated stories.</a></p></div>";    
            }
        } else {
            getReadNextBook();
        }
        
        }

        htmlToInsert += "</article></div>";
        htmlToInsert += "</section>";
        htmlToInsert += "</div></div>";
    }

    function photoLayout(isFirst) {

        htmlToInsert += "<section class=\"photo-wrapper\">";
        htmlToInsert += "<div class=\"page-bg-wrapper\">";

        if (current.creativeCommons != "null" && current.creativeCommons != "Add photo credit?") {
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

        if (current.creativeCommons != "null" && current.creativeCommons != "Add photo credit?") {
            htmlToInsert += "<span class=\"image-attribution\">" + current.creativeCommons + "</span>";
        }   
        htmlToInsert += "</section>";
        htmlToInsert += "</div></div>";

    }

    function phototextLayout(isFirst) {

        htmlToInsert += "<section class=\"phototext-wrapper\">";

        if (current.creativeCommons != "null" && current.creativeCommons != "Add photo credit?") {
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

        if (current.creativeCommons != "null" && current.creativeCommons != "Add photo credit?") {
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

        if (current.creativeCommons != "null" && current.creativeCommons != "Add photo credit?") {
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

    //side menu for iMac
    if ($vH > "1190") {
	$(".mp-menu ul .fq").css("cssText", "margin-top: 260% !important");
    }
        
    // Logout for mobile
    if ($vW < "1025") {        
	$("#logout").click(function (e) {
	    document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	    window.location = "";
	});

    }

});
