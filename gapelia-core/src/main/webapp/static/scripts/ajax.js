function readCookie(name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function loadDelete() {
    // Drafts functionality
    $(".dd-link").click(function (e) {

        $(this).next(".delete-draft").toggle();
        e.preventDefault();

    });

    $(".yay-dd").click(function () {
        $(this).closest("li").remove();
    });

    $(".nay-dd").click(function () {
        $(this).closest(".delete-draft").hide();
    });
    $(".yay-dd").click(function () {
        e = $(this).closest(".yay-dd");
        console.log("deleting");
        bookId = e.parent().parent().attr("id");
        $(this).closest("li").remove();
        sessionId = readCookie("JSESSIONID");
        $.ajax({
            url: "/api/books/deleteBook",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            data: {
                sessionId: sessionId,
                bookId: bookId
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out");
                }
            }
        });
    });
}

function getBookmarkedBooks() {
    sessionId = readCookie("JSESSIONID");
    toInsert = "<section><p>No books have been added to your bookmarks yet.</p></section>";
    $.ajax({
        url: "/api/users/getBookmarkedBooks",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            bookmarks = data;
            if (bookmarks != []) {
                toInsert = '<ul id=\"bookmark-list\">';
                for (i in bookmarks) {
                    bookmark = bookmarks[i];
                    if (bookmark.bookId in bookmarked == true) {
                        toInsert += "<li id=\'" + bookmark.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + bookmark.coverPhoto + ");";
                    } else {
                        toInsert += "<li id=\'" + bookmark.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + bookmark.coverPhoto + ");";
                    }
                    toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
                    toInsert += "<div class=\"bookmark-this\"><span class=\"top-bm\"></span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div>";
                    //toInsert += "<div class=\"library-location\"><a href=\"#\" style=\"display: block; width: 100%; height: 100%;\">Camp Awesome</a></div>";
                    toInsert += "<div class=\"book-title\"><a href=\"/read/" + bookmark.bookId + "\">" + bookmark.title + "</a></div><div class=\"book-info\">";
                    toInsert += getUserFromBookId(bookmark.bookId);
                    toInsert += "</div></div></li>";
                }
                toInsert += "</ul>";
            }
            $(".bookmark-list-wrapper").html(toInsert);
            $("#library-list .library").css("height", $vH - 97 + "px");
            $("#bookmark-list .collection, #bookmark-list .new").css("height", $vH - 97 + "px");
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

function getFeaturedBooks() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getFeaturedBooks",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        async: false,
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            books = data;
            toInsert = "";
            for (i in books) {
                book = books[i];
                if (book.bookId in bookmarked == true) {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + book.coverPhoto + ");";
                } else {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + book.coverPhoto + ");";
                }
                toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\"><div class=\"bookmark-this\"><span class=\"top-bm\">";
                toInsert += "</span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class=\"library-location\">";
                toInsert += getLibraryFromBook(book.bookId);
                toInsert += "</div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + book.bookId + "\">" + book.title + "</a></div><div class=\"book-info\">";
                toInsert += getUserFromBookId(book.bookId);
                toInsert += "</div></div><div style=\"display:none\" class=\"book-snippet\"><p>" + book.snippet + "</p></div></li>";
            }
            $("#book-list").html(toInsert);
            h = $(this).outerHeight() - 92;
            $(".book").css("height", h);
            $("#book-list li").fadeIn("100");
            $("#book-list").fadeIn("100");
            if ($vW < "321") {
                $(".book-snippet").css("display", "block")
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
}

function getUserCreatedBooks() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getCreatedBooks",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            books = data;
            toInsert = "";
            for (i in books) {
                book = books[i];
                toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + book.coverPhoto + ");background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
                toInsert += "<div class=\"book-buttons\"><a href=\"#\" class=\"delete-this-book\" style=\"display: block; width: 100%; height: 100%;\">&#xf252;</a>"
                toInsert += "<a class=\"edit-this-book\" href=\"/editbook/" + book.bookId + "\">&#xf13d;</a></div><div class=\"library-location\">";
                toInsert += getLibraryFromBook(book.bookId);
                toInsert += "</div><div class=\"book-title\"><a href=\"/read/" + book.bookId + "\">" + book.title + "</a></div>";
                toInsert += "</div></div><div style=\"display:none\" class=\"book-snippet\"><p>" + book.snippet + "</p></div></li>";

            }
            if (toInsert == "") {
                (elem = document.getElementById('close-splash')).parentNode.removeChild(elem);
            }
            $("#user-book-list").html(toInsert);
            var w = 0,
                h = 0;

            $("#user-book-list li").each(function () {
                w += $(this).outerWidth();
                h += $(this).outerHeight();
            });

            w += 500;

            if ($vW > "1024") {
                $("#user-book-list").css("width", w + "px");
            }
            if ($vW < "321") {
                $(".book-snippet").css("display", "block")
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
}

function getUserDrafts() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getDraftBooks",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            drafts = data;
            toInsert = "";
            for (i in drafts) {
                draft = drafts[i]
                toInsert += "<li id =\"" + draft.bookId + "\"><a href=\"/editbook/" + draft.bookId + "\">" + draft.title + "</a>";
                toInsert += "<a href=\"#\" class=\"dd-link\">&times;</a>";
                toInsert += "<span class=\"delete-draft\">";
                toInsert += "Delete draft?";
                toInsert += "<button class=\"a yay-dd red\">Yes</button>";
                toInsert += "<button class=\"b nay-dd white\">No</button>";
                toInsert += "</span>";
                toInsert += "</li>";
            }
	    if (toInsert == "") {
		toInsert = "<li ><a>There are no drafts</a></li>";//code
	    }
            $("#draft-menu").html(toInsert);
            loadDelete();
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
}

function getBooksInLibrary() {
    $.ajax({
        url: "/api/libraries/getBooksInLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            books = data;
            toInsert = '';
            for (i in books) {
                book = books[i];
                if (book.bookId in bookmarked == true) {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + book.coverPhoto + ");";
                } else {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + book.coverPhoto + ");";
                }
                toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\"><div class=\"bookmark-this\"><span class=\"top-bm\">";
                toInsert += "</span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + book.bookId + "\">" + book.title + "</a></div><div class=\"book-info\">";
                toInsert += getUserFromBookId(book.bookId);
                toInsert += "<div style=\"display:none\" class=\"book-snippet\"><p>" + book.snippet + "</p></div></li>";
            }
            $("#book-list").html(toInsert);
            if ($vW < "321") {
                $(".book-snippet").css("display", "block")
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
}

function getBooksInLibraryOwner() {
    libraryId = document.URL.split("/")[document.URL.split("/").length - 1]
    $.ajax({
        url: "/api/libraries/getBooksInLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            books = data;
            toInsert = '';
            for (i in books) {
                book = books[i];
                toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + book.coverPhoto + ");";
                toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
                toInsert += "<div class=\"book-buttons\"><a href=\"#\" class=\"deny-this-book\">&#xf128;</a></div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + book.bookId + "\">" + book.title + "</a><\/div><div \class=\"book-info\">";
                toInsert += getUserFromBookId(book.bookId);
                toInsert += "</div></div><div style=\"display:none\" class=\"book-snippet\"><p>" + book.snippet + "</p></div></li>";
            }
            $("#book-list").html(toInsert);
            if ($vW < "321") {
                $(".book-snippet").css("display", "block")
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
}

function getCreatedLibraries() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getCreatedLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            libraries = data;
            toInsert = '';
            for (i in libraries) {
                library = libraries[i];
                toInsert += "<li id=\"" + library.libraryId + "\" class=\"library\" ><div class=\"library-buttons\">";
                toInsert += "<a class=\"delete-this-library\">&#xf252;</a><a class=\"edit-this-library\" href=\"/editlibrary/" + library.libraryId + "\">&#xf13d;</a></div>";
                toInsert += "<div class=\"library-info\"><div class=\"title\"><a href=\"/managelibrary/" + library.libraryId + "\">" + library.title + "</a></div>";
                toInsert += "<div class=\"lib-blurb\">" + library.description + "</div></div>";
                toInsert += "<span class=\"image-overlay\"></span><img src=\"" + library.coverPhoto + "\"></li>";
            }
            $("#library-list").html(toInsert)

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

function getSubmissionsInLibrary() {}

function getLibrary() {
    libraryId = document.URL.split("/")[document.URL.split("/").length - 1]
    sessionId = readCookie("JSESSIONID");

    $.ajax({
        url: "/api/libraries/getLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            library = data;
            userName = library.userId;
            featuredBookTitle = "STILL NEED TO GET";
            featuredBookId = library.featuredBook;
            toInsert = "<section id=\"library-splash\" class=\"imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + library.coverPhoto + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
            toInsert += "<div id=\"library-info\">";
            if (libraryId in subscribed == true) {
                toInsert += "<button class=\"unsubscribe red\">Unsubscribe</button>";
            } else {
                toInsert += "<button class=\"subscribe white\">Subscribe</button>";
            }
            toInsert += "<h1>" + userName + " Â· 8,349 subscribers</h1><h2>" + library.title + "</h2><p>" + library.description + "</p><section><a id=\"featured-library\" href=\"/read/" + featuredBookId + "\" style=\"display: block; width: 100%; height: 100%;\">" + featuredBookTitle;
            toInsert += "</a></section></div><div id=\"close-splash\">OPEN LIBRARY</div></section>";
            $("#mp-pusher").prepend(toInsert);
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

function getAllLibraries() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/libraries/getAllLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            libraries = data;
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

function getLibraries() {

    sessionId = readCookie("JSESSIONID");

    $.ajax({
        url: "/api/libraries/getGodLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            libraries = data;
            lib = "<ul id=\"library-list\">";
            for (i in libraries) {
                library = libraries[i];

                lib += "<li class=\"library imgLiquid_bgSize imgLiquid_ready\" id=\"" + library.libraryId + "\" style=\"background-image: url(" + library.coverPhoto + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

                lib += "<div class=\"library-info\"><div class=\"title\"><a href=\"library/" + library.libraryId + "\" style=\"display: block; width: 100%; height: 100%;\">" + library.title + "</a></div>";

                lib += "<div class=\"lib-blurb\">" + library.description + "</div></div><div class=\"wrapper\">";
                if (library.libraryId in subscribed == true) {
                    lib += "<button class=\"unsubscribe red\">Unsubscribe</button></div>";
                } else {
                    lib += "<button class=\"subscribe white\">Subscribe</button></div>";
                }

                lib += "<span class=\"image-overlay\"></span><img src=" + library.coverPhoto + " alt='' style=\"display: none;\"></li>";
            }

            lib += "</ul>";
            $(".library-list-wrapper").html(lib);
            getUser();

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

function callUpdate() {

    sessionId = readCookie("JSESSIONID");

    if (user.tags == undefined) {
        tags = null;
    }

    if (user.email == undefined) {
        email = null;
    }

    $.ajax({
        url: "/api/users/updateUser",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            fullName: name,
            email: email,
            location: current,
            avatarImage: avatarImage,
            coverImage: coverImage,
            displayName: displayName,
            personalWebsite: personalWebsite,
            bio: bio,
            tags: tags,
            fb: fb,
            gp: gp,
            twt: twt,
            isPublic: true
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });

}

function editLibrary() {
    libraryId = document.URL.split("/")[document.URL.split("/").length - 1]
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/libraries/getLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            library = data;
            $("#new-library-info h2").html(library.title);
            $("#new-library-info p").html(library.description);
            $("#new-library").css("background-image", 'url(' + library.coverPhoto + ')');
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

function createLibrary() {
    title = $("#new-library-info h2").html();
    description = $("#new-library-info p").html();
    bg = $("#new-library").css("background-image");
    coverPhoto = bg.replace("url(", "").replace(")", "");
    tags = '';
    var elms = $(".selectize-input div");
    elms.each(function (i) {
        var elm = $(this);
        tags += elm.html() + ",";
    });
    tags = tags.substring(0, tags.length - 1);
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/libraries/createLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            title: title,
            description: description,
            coverPhoto: coverPhoto,
            tags: tags
        },
        success: function (data) {
            console.log(data)
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

function updateLibrary() {
    title = $("#new-library-info h2").html();
    description = $("#new-library-info p").html();
    bg = $("#new-library").css("background-image");
    coverPhoto = bg.replace("url(", "").replace(")", "");
    tags = '';
    var elms = $(".selectize-input div");
    elms.each(function (i) {
        var elm = $(this);
        tags += elm.html() + ",";
    });
    tags = tags.substring(0, tags.length - 1);
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/libraries/updateLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: libraryId,
            title: title,
            description: description,
            coverPhoto: coverPhoto,
            tags: tags
        },
        success: function (data) {
            console.log(data)
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

function updateUserOnboard() {

    name = user.name;
    email = null;
    current = user.location; // if not, redirect
    var bg = $(".account-avatar-wrapper").css("background-image");

    if (bg == null) {
        avatarImage = user.avatarImage;
    } else {
        bg = bg.replace("url(", "").replace(")", "");
        avatarImage = bg;
    }

    bg = $("#onboard-photos-overlay").css("background-image");

    if (bg == null) {
        coverImage = "/static/images/cover-bg.jpg";
    } else {
        bg = bg.replace("url(", "").replace(")", "");
        coverImage = bg;
    }

    displayName = user.displayName;
    personalWebsite = null;
    bio = $("#user-bio").html();
    tags = null;
    fb = null;
    gp = null;
    twt = null;
    isPublic = true;
    callUpdate();
    onboard();

}

function onboard() {

    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/onboard",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });

}

function deleteAccount() {
    $.ajax({
        url: "/api/users/deleteUser",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            userId: user.userId
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });

    document.cookie = "JSESSIONID" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location = "";

}

function getUser() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getUser",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            user = data;
            load();
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }
        }
    });
    return null;
}

function getUserPublic() {
    profileUserId = document.URL.split('?id=')[1]
    $.ajax({
        url: "/api/users/getUserPublic",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            userId: profileUserId
        },
        success: function (data) {
            user = data;
            var uri = window.location.toString();
            if (uri.indexOf("user.jsp?") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("user.jsp?")) + user.displayName;
                window.history.replaceState({}, document.title, clean_uri);
            }
            load();
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }
        }
    });
    return null;
}

function getUserFromLibraryId(libraryId) {
    responseText = '';
    $.ajax({
        url: "/api/utils/getUserFromLibraryId",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            libraryId: libraryId
        },
        success: function (data) {
            //function for editor
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

function getUserFromBookId(bookId) {
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
            bookOwner = data;
            responseText = "<a href=\"" + data.displayName + "\"><img class=\"author-avatar\" src=\"" + data.avatarImage + "\"><div class=\"" + data.displayName + "\">" + data.displayName + "</a>";
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


function getBookFromBookId(bookId) {
    responseText = '';
    $.ajax({
        url: "/api/utils/getBookFromBookId",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            bookId: bookId
        },
        success: function (data) {
            if (data.libraryId != 0) {
                //featuredbook responseText = "<a href=\"library/" + data.libraryId + "\" style=\"display: block; width: 100%; height: 100%;\">" + data.title + "</a>";
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

function getLibraryFromBook(bookId) {
    responseText = '';
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
                responseText = "<a href=\"library/" + data.libraryId + "\" style=\"display: block; width: 100%; height: 100%;\">" + data.title + "</a>";
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

function getPublicCreatedBooks() {
    $.ajax({
        url: "/api/users/getCreatedBooksPublic",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            userId: profileUserId
        },
        success: function (data) {
            books = data;
            toInsert = "";
            for (i in books) {
                book = books[i];
                if (book.bookId in bookmarked == true) {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + book.coverPhoto + ");";
                } else {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + book.coverPhoto + ");";
                }
                toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\"><div class=\"bookmark-this\"><span class=\"top-bm\">";
                toInsert += "</span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class=\"library-location\">";
                toInsert += "<a href=\"#\" style=\"display: block; width: 100%; height: 100%;\">Camp Awesome</a></div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + book.bookId + "\">" + book.title + "</a></div>";
                toInsert += "<div style=\"display:none\" class=\"book-snippet\"><p>" + book.snippet + "</p></div></li>";
            }
            $("#user-book-list").html(toInsert);
            h = $(this).outerHeight() - 92;
            $("#user-book-list .book").css("height", h);
            if ($vW < "321") {
                $(".book-snippet").css("display", "block")
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

}


function quickUpdateUser() {
    name = user.name;
    email = user.email;
    current = user.location; // if not, redirect
    avatarImage = user.avatarImage;
    image = $("#user-splash").css("background-image");
    image = image.replace("url(", "").replace(")", "");
    coverImage = image;
    displayName = user.displayName;
    personalWebsite = user.personalWebsite;
    bio = $("#splash-user-bio").html();
    tags = user.tags;
    fb = user.fb;
    gp = user.gp;
    twt = user.twt;
    isPublic = user.isPublic;
    callUpdate();
}

function getUserAccounts() {

    if (user.email != undefined && user.email != "") {
        document.getElementById("user-email").value = user.email;
    }

    if (user.displayName != undefined && user.displayName != "") {
        document.getElementById("user-name").value = user.displayName;
    }

    if (user.location != undefined && user.location != "") {
        document.getElementById("user-location").value = user.location;
    }

    if (user.personalWebsite != undefined && user.personalWebsite != "") {
        document.getElementById("user-personal-website").value = user.personalWebsite;
    }

    if (user.twt != undefined && user.twt != "") {
        document.getElementById("user-twt").value = user.twt;
    }

    if (user.fb != undefined && user.fb != "") {
        document.getElementById("user-fb").value = user.fb;
    }

    if (user.gp != undefined && user.gp != "") {
        document.getElementById("user-gp").value = user.gp;
    }

}

function updateUser() {
    name = user.name;
    inputBox = document.getElementById("user-name");
    displayName = inputBox.value;
    inputBox = document.getElementById("user-email");
    email = inputBox.value;
    inputBox = document.getElementById("user-location");
    current = inputBox.value;
    bg = $(".account-avatar-wrapper").css("background-image");
    image = bg.replace("url(", "").replace(")", "");
    avatarImage = image;
    avatarImage = image;
    coverImage = user.coverImage;
    bio = user.bio;
    tags = user.tags;
    inputBox = document.getElementById("user-personal-website");
    personalWebsite = inputBox.value;
    inputBox = document.getElementById("user-fb");
    fb = inputBox.value;
    inputBox = document.getElementById("user-gp");
    gp = inputBox.value;
    inputBox = document.getElementById("user-twt");
    twt = inputBox.value;
    isPublic = user.isPublic;
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/updateUser",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            fullName: name,
            email: email,
            location: current,
            avatarImage: avatarImage,
            coverImage: coverImage,
            displayName: displayName,
            personalWebsite: personalWebsite,
            bio: bio,
            tags: tags,
            fb: fb,
            gp: gp,
            twt: twt,
            isPublic: true
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });

}
$(document).on("click", ".yay-delete-library", function () {
    sessionId = readCookie("JSESSIONID");
    e = $(this).closest(".yay-delete-library");
    libraryId = e.parent().parent().parent().attr("id")
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
$(document).on("click", ".quick-edit-profile", function () {
    quickUpdateUser();
});

$(document).on("click", ".subscribe", function (ev) {
    e = $(this).closest("button");
    library = e.parent().parent();
    libraryId = library.attr("id");
    if (libraryId == "library-splash") {
        libraryId = document.URL.split("/")[document.URL.split("/").length - 1];
    }
    a = parseInt(libraryId);
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/actions/subscribeLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: a
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });

});

$(document).on("click", ".unsubscribe", function (ev) {
    e = $(this).closest("button");
    library = e.parent().parent();
    libraryId = library.attr("id");
    if (libraryId == "library-splash") {
        libraryId = document.URL.split("/")[document.URL.split("/").length - 1];
    }
    a = parseInt(libraryId);
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/actions/removeSubscriptionLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: a
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
});

function getUserCreatedBooksForLibrary() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getCreatedBooks",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            books = data;
            toInsert = "";
            for (i in books) {
                book = books[i];
                toInsert += "<li id=\"" + book.bookId + "\"><a >" + book.title + "</a></li>";
            }
            $("#my-submissions ul").html(toInsert);
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
$(document).on("click", "#my-submissions ul li a", function (ev) {
    e = $(this).closest("li");
    bookId = e.attr("id");
    if (document.URL.split("/")[document.URL.split("/").length - 2] == "library") {
        console.log("submited for approval");
        submitToLibrary(bookId);
    } else if (document.URL.split("/")[document.URL.split("/").length - 2] == "managelibrary") {
        addBookToLibrary(bookId);
    }
    $("#my-submissions ul").toggle();
});

$(document).on("click", ".approve-book-confirm button", function (ev) {
    e = $(this).closest(".approve-book-confirm");
    bookId = e.parent().attr("id")
    sessionId = readCookie("JSESSIONID");
    //addBookToLibrary(bookId);
    //acceptBook(bookId);
});

function submitToLibrary() {

}

function acceptBook(bookId) {

}

function addBookToLibrary(bookId) {
    libraryId = document.URL.split("/")[document.URL.split("/").length - 1];
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/libraries/addBookToLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            bookId: bookId,
            libraryId: libraryId
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
}
$(document).on("click", ".deny-book-confirm button", function (ev) {
    e = $(this).closest(".deny-book-confirm");
    bookId = e.parent().attr("id")
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/libraries/removeBookFromLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            bookId: bookId,
            libraryId: document.URL.split("/")[document.URL.split("/").length - 1]
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });

});
$(document).on("click", ".yay-delete-book", function (ev) {
    e = $(this).closest(".yay-delete-book");
    bookId = e.parent().parent().parent().attr("id")
    sessionId = readCookie("JSESSIONID");
    if (document.URL.split("/")[document.URL.split("/").length - 1] == "me") {
        $.ajax({
            url: "/api/books/deleteBook",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            data: {
                sessionId: sessionId,
                bookId: bookId
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out");
                }
            }
        });
    }
});

function getListBookmarked() {
    bookmarked = {};
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getBookmarkedBooks",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            bookmarks = data;
            for (i in bookmarks) {
                bookmarked[bookmarks[i].bookId] = true;
            }

        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
}

function getListSubscribed() {
    subscribed = {};
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getSubscribedLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            libraries = data;
            for (i in libraries) {
                subscribed[libraries[i].libraryId] = true;
            }


        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
}

function getSubscribedLibrary() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getSubscribedLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            libraries = data;
            lib = "<ul id=\"subscription-list\">";
            for (i in libraries) {
                library = libraries[i];
                lib += "<li class=\"library imgLiquid_bgSize imgLiquid_ready\" id=\"" + library.libraryId + "\" style=\"background-image: url(" + library.coverPhoto + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";

                lib += "<div class=\"library-info\"><div class=\"title\"><a href=\"library/" + library.libraryId + "\" style=\"display: block; width: 100%; height: 100%;\">" + library.title + "</a></div>";

                lib += "<div class=\"lib-blurb\">" + library.description + "</div></div><div class=\"wrapper\"><button class=\"unsubscribe red\">Unsubscribe</button></div>";

                lib += "<span class=\"image-overlay\"></span><img src=" + library.coverPhoto + " alt='' style=\"display: none;\"></li>";
            }

            lib += "</ul>";
            $(".subscription-list-wrapper").html(lib);
            h = $(this).outerHeight() - 92;
            $(".library").css("height", h)
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
$(document).on("click", ".bookmark-this", function (ev) {
    e = $(this).closest(".bookmark-this");
    bookId = e.parent().attr("id");
    sessionId = readCookie("JSESSIONID");
    if (e.parent().hasClass('bookmarked') == true) {
        $.ajax({
            url: "/api/actions/removeBookmarkBook",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            data: {
                sessionId: sessionId,
                bookId: bookId
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out");
                }
            }
        });
    } else {
        $.ajax({
            url: "/api/actions/bookmarkBook",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            data: {
                sessionId: sessionId,
                bookId: bookId
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out");
                }
            }
        });
    }
});
$(document).on("click", ".update-user", function () {
    updateUser();
});

function createBook() {
    $.ajax({
        url: "/api/books/createBook",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            bookId = data;
            createFirstPage();
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err);
            }
        }
    });
}

function createFirstPage() {
    $.ajax({
        url: "/api/books/createPage",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            bookId: bookId
        },
        success: function (data) {
            pageId = data;
            pages = {
                "page": [{}],
                "bookId": bookId
            };
            pageId = 0;
            bookId = 0;
            pagesCreated = 0;
            author = user.displayName;
            templateId = 0;
            currentPage = 0;
            imageURL = null;
            attribution = null;
            title = null;
            text = null;
            videoURL = null;
            fluidLayout();
            pages.page[0] = {
                "pageId": data,
                "pageNumber": 0,
                "templateId": 0,
                "title": null,
                "text": null,
                "image": null,
                "video": null,
                "attribution": null,
            };
        },
        error: function (q, status, err) {

            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err);
            }

        }
    });
}

function createPage() {
    $.ajax({
        url: "/api/books/createPage",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            bookId: pages.bookId
        },
        success: function (data) {
            pageId = data;
            pages.page[pagesCreated] = {
                "pageNumber": pagesCreated,
                "pageId": data,
                "bookId": pages.bookId,
                "templateId": "0",
                "title": null,
                "text": null,
                "image": "null",
                "video": "null",
                "attribution": null
            };
        },
        error: function (q, status, err) {

            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err);
            }

        }
    });
}

function deletePage(deletePageId) {
    $.ajax({
        url: "/api/books/deletePage",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            pageId: deletePageId
        },
        success: function (data) {},
        error: function (q, status, err) {

            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err);
            }

        }
    });
}

function updateBookAndPages(isPublished) {
    tags = '';
    if (isPublished == true) {

        var elms = $(".selectize-input div");
        elms.each(function (i) {
            var elm = $(this);
            tags += elm.html() + ",";
        });
        tags = tags.substring(0, tags.length - 1);
    }
    $.ajax({
        url: "/api/books/updateBook",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            bookId: pages.bookId,
            coverPhoto: pages.page[0].image,
            title: pages.page[0].title,
            language: "English",
            tags: tags,
            isPublished: isPublished,
            snippet: $(".add-description").html()
        },
        success: function (data) {},
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err);
            }
        }
    });
    i = 0;
    while (i <= pagesCreated) {
        $.ajax({
            url: "/api/books/updatePage",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            async: false,
            type: "POST",
            data: {
                sessionId: sessionId,
                title: pages.page[i].title,
                pageId: pages.page[i].pageId,
                content: pages.page[i].text,
                creativeCommons: pages.page[i].attribution,
                templateId: pages.page[i].templateId,
                videoUrl: pages.page[i].video,
                bookId: pages.bookId,
                pageNumber: i,
                photoUrl: pages.page[i].image,
            },
            error: function (q, status, err) {
                if (status == "timeout") {
                    alert("Request timed out trying again");
                }
            }

        });
        i++;
    }
}

function loadBookEditor() {
    sessionId = readCookie("JSESSIONID");
    bookId = document.URL.split("/")[document.URL.split("/").length - 1];
    $.ajax({
        url: "/api/users/getBook",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        async: false,
        data: {
            sessionId: sessionId,
            bookId: bookId
        },
        success: function (data) {

            book = data;
            pages = {
                "page": [{}],
                "bookId": book.bookId
            };
            pagesCreated = 0;
            author = book.ownedBy;
            templateId = 0;
            currentPage = 0;
            imageURL = null;
            attribution = null;
            title = null;
            text = null;
            videoURL = null;
            loadPagesEditor();
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err);
            }
        }
    });
}

function loadPagesEditor() {
    $.ajax({
        url: "/api/users/getPages",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            bookId: bookId
        },
        success: function (data) {
            pagesTemp = data;
            pagesTemp.sort(function (a, b) {
                return a.pageNumber - b.pageNumber;
            });
            toInsert = '';
            for (i in pagesTemp) {
                console.log(i);
                page = pagesTemp[i];
                temp = {
                    "pageId": page.pageId,
                    "pageNumber": page.pageNumber,
                    "templateId": page.templateId,
                    "title": page.title,
                    "text": page.content,
                    "image": page.photoUrl,
                    "video": page.videourl,
                    "user": page.userId,
                    "attribution": page.creativeCommons
                };
                toInsert += "<li id=\"" + pagesCreated + "\"draggable='true'><div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"" + page.photoUrl + "\" id='page" + pagesCreated + "Image' alt=\"\"/><div id='page" + pagesCreated + "Title'><span class=\"page-thumb-number\">" + pagesCreated + "</span> &middot; <span class=\"page-thumb-title\">New Page</span></div></section></li>";
                pages.page[i] = temp;
                pagesCreated++;
            }
            pagesCreated--;
            toInsert += "<li id=\"add-page\" class=\"new-thumb disable-sort\"><div>+</div></li>";
            $("#page-menu").html(toInsert);
            title = pages.page[0].title;
            text = pages.page[0].text;
            imageURL = pages.page[0].image;
            videoURL = pages.page[0].video;
            attribution = pages.page[0].attribution;
            templateId = pages.page[0].templateId;
            loadEditorExtra(templateId);
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

function loadEditorExtra(templateId) {
    $("#add-page").click(function (e) {

        if (pagesCreated > 20) {
            alert("Your book is too big please remove a page!\n");
            return;
        }

        pagesCreated++;

        $(this).before($("<li id=\"" + pagesCreated + "\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/grayBG.png\" id='page" + (pagesCreated) + "Image' alt=\"\"/><div id='page" + (pagesCreated) + "Title'><span class=\"page-thumb-number\">" + (pagesCreated) + "</span> &middot; <span class=\"page-thumb-title\">New Page</span></div></section>"));

        title = $(".page-title-elem").html();
        text = $(".page-desc").html();
        imageURL = $(".page-bg").attr("src");
        attribution = $(".image-attribution").html();

        // save to previous page
        if (pagesCreated == 0) {
            pages.page[0] = {
                "pageNumber": pagesCreated,
                "templateId": 0,
                "title": null,
                "text": null,
                "image": "/static/images/grayBG.png",
                "video": "null",
                "attribution": null
            };

            templateId = 0;
            createPage();
            fluidLayout();
        } else {
            pages.page[currentPage].templateId = templateId;
            pages.page[currentPage].title = title;
            pages.page[currentPage].text = text;
            pages.page[currentPage].image = imageURL;
            pages.page[currentPage].video = videoURL;
            pages.page[currentPage].attribution = attribution;
            createPage();
            currentPage = pagesCreated;
            templateId = 0;
            title = null;
            text = null;
            imageURL = null;
            videoURL = null;
            attribution = null;
            fluidLayout();
        }

        // Page Sorter
        $("#pages-scroller ul").sortable({
            items: ":not(.disable-sort)"
        }).bind("sortupdate", function () {});

        e.preventDefault();

    });
    switch (templateId) {
    case 0:
        fluidLayout();
        break;

    case 1:
        photoLayout();
        break;

    case 2:
        overlayLayout();
        break;

    case 3:
        photoTextLayout();
        break;

    case 4:
        verticalLayout();
        break;

    case 5:
        videoLayout();
        break;

    default:
        baseLayout();
    }
}