<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Folio: Now Reading</title>

    <meta name="author" content="Gapelia" />
    <meta name="description" content="This should be a synopsis about the book" />
    <meta name="keywords" content="This should be the keywords the author chose, as well as the author's name/username/alias" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <link href="/static/images/favicon.png" rel="shortcut icon" />

    <link href="/static/css/style.css" rel="stylesheet" />
    <link href="/static/css/fluidbox.css" rel="stylesheet" />

    <script src="//use.typekit.net/web3vzl.js"></script>
    <script defer src='http://www.readrboard.com/static/engage.js'></script>
    <script>
        try {
            Typekit.load();
        } catch (e) {}
    </script>

    <script src="/static/scripts/modernizr.custom.js"></script>
    <script src="/static/scripts/jquery-2.1.0.min.js"></script>

</head>

<body class="app full-book g-body">

    <div id="mp-pusher" class="super-wrapper">

        <!--/ site-menu /-->
        <nav id="site-menu" class="mp-menu">
            <div class="mp-level">
                <h2><a href="/featured">Gapelia</a></h2>
		<ul>
                    <li><a href="/">Sign up</a> </li>
		    <li><a href="#">Learn more</a></li>
                </ul>
            </div>
        </nav>
        <!--//site-menu /-->

        <button id="g-menu-toggle"><i class="ion-drag"></i>
        </button>
        <button id="next-book-toggle"><i class="ion-forward"></i>
        </button>

        <header>
            <div id="header-info">
                <span id="header-title"></span>
                <span id="header-author"></span>
            </div>

            <ul class="share-book"></ul>
        </header>

        <div id="bb-nav-prev">&#xf153;</div>
        <div id="bb-nav-next">&#xf154;</div>
        <!--/ div id="the-book" /-->
        <div id="the-book" class="bb-custom-wrapper">
            <div id="bb-bookblock" class="bb-bookblock">
            </div>
	    	<ul id="stay-right">
			<li id="my-libraries">
			    <a class=submission-dropdown href="#">Collect to library</a>
				<ul></ul>
			</li>
		</ul>
		<ul id="collection-pop" style="display: none;"><p>Story added to library<p/></ul>
        </div>

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/nprogress.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/books.js"></script>
    <script defer src='http://www.readrboard.com/static/engage.js'></script>

    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>

    <script src="/static/scripts/jquery.mousewheel.js"></script>
    <script src="/static/scripts/vimeothumb.js"></script>

    <!--/ scripts/page-flip /-->
    <script src="/static/scripts/jquerypp.custom.js"></script>
    <script src="/static/scripts/bookblock.js"></script>

    <!--/ scripts/fluidbox /-->
    <script src="/static/scripts/imagesloaded.min.js"></script>
    <script src="/static/scripts/fluidbox.min.js"></script>

    <script src="/static/scripts/ajax.js"></script>
    <script src="/static/scripts/userNotifications.js"></script>
    <script src="/static/scripts/readBook.js"></script>
    
    <script src="/static/scripts/cookie.js"></script>
    <script src="/static/scripts/merci.js"></script>
    
    
     <script>
				$(function () {getCreatedLibrariesForBook();});
    </script>
    
    <script>
	
	
        // Click "Collect to Libraries"
        $("#the-book #my-libraries a").click(function (e) {

		$("#my-libraries ul").toggle();
		e.preventDefault();

        });		
	
	
	// submissions confirm popup
		
	$(document).on("click", "#my-libraries ul a", function () {
		$("#collection-pop").css({"display": "block"});
		
		setTimeout(function() {
		$("#collection-pop").fadeOut("slow");
		}, 2500);
	});
	
	// Hide submission dropdown when click outisde

	$(document).mouseup(function (e) {

	var container = $("#my-libraries ul, #collection-pop");

	// if the target of the click isn't the container...
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.hide(); // ... nor a descendant of the container
	}

	});
	

	
        setTimeout(function () {
        loadDelete();
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
            
	    /*
	    $(".inserted-img").fluidbox();
	    */
	    
        }, 1000);
        addLoggedInMenu();
	getCreatedLibraries();
	window.READRBOARDCOM.actions.reInit();
	
    </script>

</body>

</html>
