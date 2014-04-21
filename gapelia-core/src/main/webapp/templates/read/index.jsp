<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Gapelia &middot; Now reading *BOOK TITLE*</title>

    <!--/
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

    <meta name="author" content="Gapelia" />
    <meta name="description" content="This should be a synopsis about the book" />
    <meta name="keywords" content="This should be the keywords the author chose, as well as the author's name/username/alias" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <link href="/static/images/favicon.png" rel="shortcut icon" />

    <link href="/static/css/style.css" rel="stylesheet" />
    <link href="/static/css/fluidbox.css" rel="stylesheet" />

    <script src="//use.typekit.net/web3vzl.js"></script>
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
                    <li class="home"><a href="/featured">Folio</a>
                    </li>
                    <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a>
                    </li>
                    <li class="not-mobile"><a href="/createbook">Create book</a>
                    </li>
                    <li class="not-mobile"><a href="/librarymanager">Library Manager</a>
                    </li>

                    <li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
                        <ul id="draft-menu"></ul>
                    </li>

                    <li id="gpl-menu-notify"><a>Notifications</a>
                        <a class="icon" href="#"></a>
                        <ul></ul>
                    </li>

		    <li class="fq"><a href="#">Help</a>
		    <li class="help"><a href="#">Contact</a>
		    <li class="logout"><a href="#">Log Out</a>
			
                </ul>

            </div>
        </nav>
        <!--//site-menu /-->
	
	<!--/ site-menu when not logged in /-->
	<nav id="site-menu-not-logged" class="mp-menu">
            <div class="mp-level">

                <ul>
                    <li class="home"><a href="/">Folio</a>
                    </li>
                    <li><a href="/">Sign up</a>
		    </li>
		    <li><a href="#">Learn more</a>
		    </li>			
                </ul>

            </div>
        </nav>
	<!--/ site-menu when not logged in /-->

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
        </div>

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/nprogress.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/books.js"></script>

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
    <script src="/static/scripts/readBook.js"></script>
    <script>
        setTimeout(function () {
            $(".fluid-wrapper").imgLiquid({
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
        }, 1000);
    </script>
</body>

</html>
