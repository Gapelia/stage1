<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Gapelia &middot; [Library Name] Library</title>

    <!--/ LIBRARY VIEW
			 ______   ______   ______  ______   __       __   ______    
			/\  ___\ /\  __ \ /\  == \/\  ___\ /\ \     /\ \ /\  __ \   
			\ \ \__ \\ \  __ \\ \  _-/\ \  __\ \ \ \____\ \ \\ \  __ \  
			 \ \_____\\ \_\ \_\\ \_\   \ \_____\\ \_____\\ \_\\ \_\ \_\ 
				\/_____/ \/_/\/_/ \/_/    \/_____/ \/_____/ \/_/ \/_/\/_/ 

				01000111011000010111000001100101011011000110100101100001

		/-->

    <meta name="author" content="Gapelia" />
    <meta name="description" content="Better stories, together." />
    <meta name="keywords" content="Gapelia, storytelling, lifestyle, story, creator, travel, pulse, art, wow, life, flow, wonder, dimension" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <link href="/static/css/style.css" rel="stylesheet" />
    <link href="/static/images/favicon.png" rel="shortcut icon" />

    <script src="//use.typekit.net/web3vzl.js"></script>
    <script>
        try {
            Typekit.load();
        } catch (e) {}
    </script>

    <script src="/static/scripts/modernizr.custom.js"></script>
    <script src="/static/scripts/jquery-2.1.0.min.js"></script>

    <script src="/static/scripts/selectize.js"></script>
    <script src="/static/scripts/nprogress.js"></script>

</head>

<body class="app">

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

                    <li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#"></a>
                        <ul>
                        </ul>
                    </li>

                    <li class="fq"><a href="#">Help</a>
		    <li class="help"><a href="#">Contact</a>
                    <li class="logout"><a href="#">Log Out</a>
                </ul>

            </div>
        </nav>
        <!--//site-menu /-->

        <!--/ main-panel /-->
        <div id="featured-panel">
            <button id="g-menu-toggle" class="notification-time">
                <span id="notification-count"></span>
                <i class="ion-drag"></i>
            </button>
        </div>

        <!--/ library-editing /-->
        <section id="new-library">
            <div class="library-controls">
                <button id="confirm-create-library" class="outline">Save</button>
            </div>

            <div class="button-wrapper">
                <input class="photo-picker" type="filepicker" data-fp-apikey="ABFuSiQFbQRylrWy9nCs7z" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="url=event.fpfile.url; console.log(url); $('.spinner').show(); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('#new-library').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); });">
            </div>

            <div id="new-library-info">
                <small>Editor's Name &middot; 8,349 subscribers</small>

                <h2 data-placeholder="Write your title here" contenteditable="true"></h2>
                <p data-placeholder="Add a description" contenteditable="true"></p>

                <section>
                    <input type="text" id="input-tags" placeholder="Add up to three tags" value="" />

                    <script>
                        $("#input-tags").selectize({
                            delimiter: ",",
                            maxItems: 3,
                            persist: false,
                            create: function (input) {
                                return {
                                    value: input,
                                    text: input
                                }
                            }
                        });
                    </script>
                </section>
            </div>

            <div id="close-splash">Continue to Library Manager</div>
            </div>
            <img class="page-bg" src="/static/images/cover-bg.jpg" />
        </section>
        <!--//library-editing /-->

    </div>

    <!--/ scripts /-->
    <script src="/static/scripts/filepicker2.js"></script>
    <script src="/static/scripts/spin.js"></script>
    <script src="/static/scripts/g.money.js"></script>
    <script src="/static/scripts/imgLiquid.js"></script>
    <script src="/static/scripts/ajax.js"></script>
    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/mlpushmenu.js"></script>

    <script>
        if ($vW > "1024") {
            new mlPushMenu(document.getElementById("site-menu"), document.getElementById("g-menu-toggle"));

            $(".mp-pushed").ready(function () {
                $("#book-scroller").css("z-index", "0");
            });
        }

        Spinner({
            radius: 40,
            length: 10
        }).spin(document.getElementById("new-library"));

        $(function () {

            var third = getUserDrafts();
            editLibrary()
            // Click "Save" button
            $("#confirm-create-library").click(function () {
                updateLibrary();
                // Disable
                $(".button-wrapper").css("opacity", "0").hide();
                $("#confirm-cancel-library, #confirm-create-library").hide();
                $("[contenteditable='true']").attr("contenteditable", "false");

                // Enable
                $("#new-library-info").css({
                    "border-top": "1px solid #fcfcfc",
                    "border-bottom": "1px solid #fcfcfc"
                });

                $("#new-library-info small").css("opacity", "1");
                $("#close-splash").css("opacity", "1");

                $("#confirm-edit-library").css("right", "0");

            });

            // Click "Edit" button
            $("#confirm-edit-library").click(function () {

                // Disable
                $("#new-library-info small").css("opacity", "0");
                $("#close-splash").css("opacity", "0");
                $("#confirm-edit-library").css("right", "-10rem");

                // Enable
                $(".button-wrapper").css("opacity", "1").show();

                $("#new-library-info").css({
                    "border-top": "1px solid transparent",
                    "border-bottom": "1px solid transparent"
                });

                $("[contenteditable='false']").attr("contenteditable", "true");
                $("#confirm-cancel-library, #confirm-create-library").show();

            });

            // Close overlay and get to user's library manager
            $(document).on("click", "#close-splash", function () {
                window.location.href = "/librarymanager";
            });

            $("button.photo-picker").html("&#xf2e4;");
            $("#new-library").imgLiquid({
                fill: true
            });
            $("#g-menu-toggle").css("color", "#fcfcfc");

        });
    </script>
    <!--//scripts /-->

</body>

</html>
