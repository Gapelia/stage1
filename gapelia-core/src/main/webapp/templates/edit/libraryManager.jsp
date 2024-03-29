<% /* *********************************************** */ %>
<% /* Include this line below to make page login-safe */ %>
<%@include file="../../auth.jsp" %>
<% /* *********************************************** */ %>

<!DOCTYPE html>
<html lang="en">

      <head>

	<meta charset="utf-8"/>
	      <title>Folio &middot; Libraries</title>

	<!--/ LIBRARY MANAGER VIEW
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

	<link href="/static/css/style.css" rel="stylesheet"/>
        <link href="/static/css/slytest.css" rel="stylesheet" />
	<link href="/static/images/favicon.png" rel="shortcut icon"/>
        
	<script src="/static/scripts/modernizr.custom.js"></script>
	<script src="/static/scripts/jquery-2.1.0.min.js"></script>
        <script src="/static/scripts/sly.js"></script>
        <script src="/static/scripts/typeahead.js"></script>
        <script src="/static/scripts/nprogress.js"></script>

	<script src="/static/scripts/selectize.js"></script>

    </head>

    <body class="app library-manager"><!--/ library-manager /-->

	<div id="mp-pusher" class="super-wrapper">

	<!--/ site-menu /-->
	<nav id="site-menu" class="mp-menu">
            <div class="mp-level"><h2><a href="/"></a></h2>
                <ul>
                    <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a></li>
                    <li class="not-mobile"><a href="/librarymanager">Libraries</a></li>
                    <li class="not-mobile"><a href="/createbook">New Story</a></li>
            
                    <li id="gpl-menu-drafts" class="not-mobile"><a>My Drafts</a>
                        <ul id="draft-menu"></ul>
                    </li>
                    
                    <li class="not-mobile"><a href="/analytics">Analytics</a></li>
            
                    <li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#"></a>
                        <ul></ul>
                    </li>
            
                    <div id="footer-items"><li class="fq"><a href="/read/755">How It Works</a>
                        <li class="help"><a href="mailto:team@folio.is">Report a bug</a>
                        <li class="logout"><a href="#">Log Out</a>
                    </div>
                </ul>
            </div>
	</nav>
	<!--//site-menu /-->

	<!--/ main-panel /-->
	<div id="featured-panel">
            <button id="g-menu-toggle" class="notification-time">
                <span id="notification-count" style="display: none;"></span>
                <i class="ion-drag"></i>
            </button>
	</div>
	<!--//main-panel /-->

	<!--/ main-content /-->
	<div id="featured-scroller">
        <div id="nav-wrapper">
            <ul id="featured-nav">
                <li id="nav-explore" class="current"><a href="#">Search and explore libraries in Folio</a></li>
                
                <div id="nav-search" style="display: none; margin-left: 22%; opacity: 0.15;"><img href="#" src="../static/images/search.png" style="height: 18px; width: 18px;"></a></div>	   	   
                <input class="typeahead" placeholder="Search libraries..." style="display: block;"></input>
                <img class="glass" href="#" src="../static/images/search.png" style="height: 18px; width: 18px;">
                    
    <div class="suggested-libs">
        <ul id="suggested-lib-list"></ul>
    </div>
    
    <script>
        
            // instantiate the bloodhound suggestion engine
            var books = new Bloodhound({
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                
                limit: 20,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: 'http://folio.is/api/utils/search/%QUERY',
                    filter: function (results) {
                      return $.map(results.books, function (book) {
                            return {
                                value: '<a href=\"http://folio.is/read/' + book.bookId + '\"><img src=\"'+book.coverPhoto+'\" height=50px width=50px>'+book.title+'</a>'
                            }
                        }); 
                    }
                }
            });
            
            var libraries = new Bloodhound({
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                
                limit: 20,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: 'http://folio.is/api/utils/search/%QUERY',
                    filter: function (results) {
                      return $.map(results.libraries, function (library) {
                            return {
                                value: '<a href=\"http://folio.is/library/' + library.libraryId + '\"><img src=\"'+library.coverPhoto+'\" height=50px width=50px>'+library.title+'</a>',
                                displayValue: ''+library.title+''
                            }
                        });
                    }
                }
            });
            
            // initialize the bloodhounds!
            libraries.initialize();
            
            // instantiate the typeahead UI
            $('.typeahead').typeahead({
              highlight: true,
              hint: false,
              minLength: 2
            },    
            {
              name: 'books',
              displayKey: 'value',
              source: books.ttAdapter(),
              templates: {
                header: '<center><h5 class="label-name" style="font-size: 0.7rem; margin-top: 0.2rem; opacity: 0.7; text-transform: uppercase;">Books</h5></center>'
              }
            },
            {
              name: 'libraries',
              displayKey: 'value',
              source: libraries.ttAdapter(),
              templates: {
                //header: '<center><h5 class="label-name" style="font-size: 0.7rem; margin-top: 0.5rem; opacity: 0.7; text-transform: uppercase;">Libraries</h5></center>'
              }
            });
    </script>
    
            <div id="stay-right">
                <button id="add-new-library" class="brand-i">New Library</button>
                </div>
        </ul>
	</div>
        
            <!--/ explore List /-->
            <div class="scrollbar">
                <div class="handle">
                        <div class="mousearea"></div>
                </div>
            </div>                          
            <!--/ Explore List /-->
            <div class="explore-list-wrapper">
                <ul id="explore-list"></ul>
            </div>
        </div>
	</div>

	<!--/ scripts /-->
	<script src="/static/scripts/touchSwipe.min.js"></script>
	<script src="/static/scripts/g.money.js"></script>
	<script src="/static/scripts/imgLiquid.js"></script>
	<script src="/static/scripts/ajax.js"></script>
	<script src="/static/scripts/userNotifications.js"></script>
	<script src="/static/scripts/classie.js"></script>
	<script src="/static/scripts/mlpushmenu.js"></script>		

	<script>
        
	if ($vW > "1024") {
	    new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));
    
            $(".mp-pushed").ready(function () {
                    $("#book-scroller").css("z-index", "0");
            });
            
            //explore carousel list doesnt appear on computer browser//
            $("document").ready(function() {
                $(".explore-list-wrapper").hide();
            });    
                
            //hide search box after clicking on item//
            $(".tt-dropdown-menu").click(function () {
                $(".typeahead").css("display", "none");
                $(".suggested-libs").css("display", "none");
            });
            
            //hide glass and suggestions when typing//
            $(".typeahead").keydown(function () {
                $(".glass").css("opacity", "0");
                $(".suggested-libs").css("opacity", "0");
                $(".tt-dropdown-menu").css("opacity", "1");
            });
            
            //show suggestion when clicking on search//
            $(".typeahead").click(function () {
                $(".tt-dropdown-menu").css("opacity", "1");
                $(".suggested-libs").css("opacity", "0");
            });
            
            //bring back sugestion applicable when search box is empty//
            $(".suggested-libs").mouseover(function () {
                $(".suggested-libs").css("opacity", "1");
            });
   
            //bring back suggestion when leaving the results//
            $(".tt-dropdown-menu").mouseleave(function() {
                $(".suggested-libs").css("opacity", "1");
                $(".tt-dropdown-menu").css("opacity", "0");
            });
            
            //text limit for library suggestions//
            $(function(){
                $("#suggested-lib-list .lib-blurb").each(function(i){
                len=$(this).text().length;
                if(len>50)
                {
                  $(this).text($(this).text().substr(0,80)+'...');
                }
            });    
        });
            
        $("#add-new-library").click(function () { window.location.href = "/createlibrary"; });
	}

        $(document).on("ready", function () {
            
            var third = getUserDrafts();
            
            //hide subscription buttons//
            $("#suggested-lib-list button").remove();
            
        });
    
        // Dropdown menu for mobile
        if ($vW < "1025") {
        
            $("#featured-scroller").css("cssText", "overflow-y: scroll !important");
            $(".bookmark-list-wrapper, #featured-panel .featured-info").remove();   
            $("#featured-panel").append('<span id="category-title">Explore Libraries</span>');
            $("#featured-panel").append('<ul id="featured-nav" style="display: none"><li id="nav-featured"><a href="/featured">Folio</a><li id="nav-featured"><a href="/featured">Featured</a></li><li id="nav-featured"><a href="/me">Me</a></li><li id="nav-featured"><a href="/libraryManager">Libraries</a></li><li id="nav-featured"><a href="/accounts">Account Settings</a></li><li id="nav-logout"><a href="#" id="logout">Log Out</a></li></ul>');	    
            $(document).on("click", "#g-menu-toggle", function () { $("#featured-nav").toggle(); });    
            $("#featured-scroller").css({"top": "70px"});
            $(".library-list-wrapper").css({"z-index": "0", "top": "-1rem"});
            
            // Log Out
            $("#logout").click(function (e) {
                document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                window.location = "";
            });
            
        }   
        
        if ($vW > "1919") {
            $("#featured-nav .typeahead").css("cssText", "left: 14rem !important");
        }
        
        // Log Out
        $("#logout").click(function (e) {
            document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            window.location = "";
        });
        
        if ($vW > "1599") {
            $(".suggested-libs").css("cssText", "margin-left: 28% !important");
        }     
        
        if ($vH > "1079") {
            $(".library").css("cssText", "height: 900px !important");
            $("#featured-nav .typeahead").css("cssText", "left: 13rem !important");
        }
        
	</script>

	<script>
	$(function () {
            getNotifications();
            getListSubscribed();
            getLibrariesSuggestion(); //featured recommendation//
            getLibrariesSuggestionTwo(); //created by user//
            getLibrariesSuggestionThree(); //subscribed by user//
        });
    
        // delete draft
        loadDelete();

        function load() {
            
            var $vW = $(window).width(), $vH = $(window).height();
            h = $(this).outerHeight() - 92;
            $(".library").css("height", h);
            $("#explore-list li").fadeIn("100");
            $("#explore-list").fadeIn("100");
            
            // Load Gapelia
            NProgress.start();
    
            $("#featured-panel, #featured-scroller").css("opacity", "0").show();
    
                var allBooks = $("#explore-list li"),   // gets all books in a section
                firstBook = $(allBooks).first();  // gets first book in list
                setTimeout(function () {
        
                $("#explore-list").hide();
                $("#library-list").hide();
                $("#subscription-list").hide();
        
                var w = 0;
        
                $("#explore-list li").each(function () {
                    w += $(this).outerWidth();
                });
        
                w += 500;
        
                $("#explore-list").css("width", w + "px");
        
                // fades in the all the books after section width is added
                $("#explore-list li").fadeIn("100");
                $("#explore-list").fadeIn("100");
        
                // "fix" featured menu pop-in
                setTimeout(function () {
                $("#featured-panel, #featured-scroller").css("opacity", "1");
                    }, 400);
                }, 1000);
                
            NProgress.done();
        
        }
        
        setInterval(function () {
            h = $(this).outerHeight() - 92;
            $(".library").css("height", h);
            h = $(this).outerHeight() - 92;
            $(".book").css("height", h);
            loadDelete();
        }, 1000);
        
        </script>
        <!--//scripts /-->
    </body>

</html>
