<%@include file="../../tools.jsp" %>
<%
    Integer userId = getUserIdFromCookie(request);
    Integer libraryId = getIdFromUrl(request);

    Integer authorId = null;

    if(!isValidLibraryId(libraryId)) {
        //out.println("This library doesn't exist in the database!");
        response.sendRedirect("/");
        return;
    }
    authorId = QueryUtils.getUserFromLibraryId(libraryId).getUserId();

    if(!userId.equals(authorId)) {
       //out.println("you are not the author!");
       response.sendRedirect("/");
       return;
    }
%>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8" />
    <title>Folio &middot; Edit Library</title>

    <!--/ LIBRARY VIEW
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
    <link href="/static/images/favicon.png" rel="shortcut icon" />

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
                    <li><a href="/me">Me</a><a class="icon not-mobile" href="/accounts">&#xf13d;</a>
                    </li>
            <li class="not-mobile"><a href="/librarymanager">Library Manager</a>
                    </li>
                    <li class="not-mobile"><a href="/createbook">New Story</a>
                    </li>

                    <li id="gpl-menu-drafts" class="not-mobile"><a>Drafts</a>
                        <ul id="draft-menu"></ul>
                    </li>

                    <li id="gpl-menu-notify"><a>Notifications</a><a class="icon" href="#"></a>
                        <ul>
                        </ul>
                    </li>

                    <li class="fq"><a href="/read/755">How It Works</a>
            <li class="help"><a href="mailto:team@folio.is">Report a bug</a>
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
        
        <button id="delete-this-library" style="background-color: red !important; opacity: 0.6; position: absolute; top: 1rem; right: 1rem; z-index: 1000;"><a>Delete Library</a></button>
        
        <div id="delete-library-confirm" style="display: none; background-color: white; left: 0; top: 0; height: 100%; opacity: 0.85; padding-top: 12rem; position: absolute; text-align: center; width: 100%; z-index: 1000;"><h3>Hold on there, are you *sure* you want to delete your library?</h3><div class="wrapper" style="margin-top: 3rem;"><a href="#" class="button a red yay-delete-library">Yes, delete</a><a href="#" class="button b green nay-delete-library">No, cancel</a></div></div>

            <div class="button-wrapper">
        <input class="photo-picker" type="filepicker" data-fp-apikey="AqrddQT2HQIebG8DinaqUz" data-fp-mimetypes="image/*" data-fp-container="modal" data-fp-services="COMPUTER,BOX,DROPBOX,FACEBOOK,FLICKR,GOOGLE_DRIVE" onchange="url=event.fpfile.url; console.log(url); $('.spinner').show(); $('#new-library').css('background-image', 'url('+url+')'); $('.page-bg').attr('src', url).attr('data-adaptive-background', '1'); $('#new-library').imgLiquid({ fill: true }); $('.page-bg').bind('load', function () { $('.spinner').hide(); });">
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
    <script src="/static/scripts/userNotifications.js"></script>

    <script src="/static/scripts/classie.js"></script>
    <script src="/static/scripts/charLimiter.js"></script>
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

            var third = getNotifications();
            editLibrary();
            // Click "Save" button
            $("#confirm-create-library").click(function () {
                updateLibrary();
            });

            $("button.photo-picker").html("&#xf2e4;");
            $("#new-library").imgLiquid({
                fill: true
            });
            $("#g-menu-toggle").css("color", "#fcfcfc");

        });
    
    //cleans up text when copty/paste
    $('[contenteditable]').on('paste',function(e) {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
        document.execCommand('insertText', false, text);
    });
    
    //description limiter//
    $("#new-library-info p").limit({ maxlength: 300 });
    
    
    // Delete library
        $("#delete-this-library").click(function () {
            $("#delete-library-confirm").show();

            e.preventDefault();
            });


    // Confirm library deletion
        $(".yay-delete-library").click(function () {
            
            window.location.href=("/librarymanager");
            
            sessionId = readCookie("JSESSIONID");
            libraryId = libraryId;
            
            $.ajax({
            url: "/api/libraries/deleteLibrary",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            data: {
                sessionId: sessionId,
                libraryId: libraryId
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                alert("Request timed out");
                }
            }
            });  
        });
        
        $(".nay-delete-library").click(function () {
        
        $("#delete-library-confirm").hide();
        });
    
    </script>
    <!--//scripts /-->

</body>

</html>
