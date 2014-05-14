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

function getFullBookFromBookId(bookId) {
    $.ajax({
        url: "/api/utils/getBookFromBookId",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            bookId: bookId
        },
        success: function (data) {
            book = data;
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }
        }
    });
    return book;
}

function loadDelete() {
    $(".remove-notification").click(function () {
        
        notificationId = $(this).closest("li").attr('id');
        type = $(this).closest("li").attr('class');
	
	//remove li
        $(this).closest("li").remove();
	
	//update counters
	$("#gpl-menu-notify .icon").html($("#gpl-menu-notify li").size());
	
	if ($("#gpl-menu-notify li").size() == 0)  $(".notification-time span").css("display", "none");
	else $("#notification-count").html($("#gpl-menu-notify li").size());
	
        if(type == "library-notification") {
		
            $.ajax({
                url: "/api/notifications/removeLibraryNotification",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                type: "POST",
                data: {
                    sessionId: sessionId,
                    notificationId: notificationId
                }
            });
        } else {
            $.ajax({
                url: "/api/notifications/removeBookNotification",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                type: "POST",
                data: {
                    sessionId: sessionId,
                    notificationId: notificationId
                }
            });
        }
    });
    
    $(".respond-link").click(function (e) {
        $(this).next(".respond-submision").toggle();
        e.preventDefault();
    });
    
    $(".nay-respond-link").click(function () {
        e = $(this).closest(".nay-respond-link");
        notificationId = e.parent().parent().attr("id");
        $(this).closest("li").remove();
        rejectBook(notificationId)
	$("#gpl-menu-notify .icon").html($("#gpl-menu-notify li").size());
	
        if ($("#gpl-menu-notify li").size() == 0)  $(".notification-time span").css("display", "none");
	else $("#notification-count").html($("#gpl-menu-notify li").size());
    });
    
    $(".yay-respond-link").click(function () {
        e = $(this).closest(".yay-respond-link");
        notificationId = e.parent().parent().attr("id");
        bookId = e.parent().parent().attr("bookId");
        libraryId = e.parent().parent().attr("libraryId");
        $(this).closest("li").remove();
        addBookToLibrary2(bookId, libraryId);
        acceptBook(notificationId);
	
	
	$("#gpl-menu-notify .icon").html($("#gpl-menu-notify li").size());
	
	if ($("#gpl-menu-notify li").size() == 0)  $(".notification-time span").css("display", "none");
	else $("#notification-count").html($("#gpl-menu-notify li").size());
    });
    $(".dd-link").click(function (e) {
        $(this).next(".delete-draft").toggle();
        e.preventDefault();
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
                toInsert = "<ul id=\"bookmark-list\">";
                for (i in bookmarks) {
                    bookmark = bookmarks[i];
                    if (bookmark.bookId in bookmarked == true) {
                        toInsert += "<li id=\'" + bookmark.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + bookmark.coverPhoto + ");";
                    } else {
                        toInsert += "<li id=\'" + bookmark.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + bookmark.coverPhoto + ");";
                    }
                    toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
                    toInsert += "<div class=\"bookmark-this\"><span class=\"top-bm\"></span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div>";
                    toInsert += "<div class=\"library-location\">";
		    toInsert += getLibraryFromBook(bookmark.bookId);
                    toInsert += "</div><div class=\"book-title\"><a href=\"/read/" + bookmark.bookId + "\">" + bookmark.title + "</a></div><div class=\"book-info\">";
                    toInsert += getUserFromBookId(bookmark.bookId);
		    toInsert += "</div><div class=\"num-votes\">&hearts; " + getNumberVotes(bookmark.bookId) + "</div>";
                    toInsert += "</div></div></li>";
                }

                if (toInsert == "<ul id=\"bookmark-list\">") {
                    toInsert += "<ul id=\"bookmark-list\"><section><p>No books have been added to your bookmarks yet.</p></section></ul>";		    
                }
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
function getNumSubscribers() {
	$.ajax({
        url: "/api/libraries/getNumSubscribers",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
        	sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            numSubscribers = data;
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
                    toInsert = "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + book.coverPhoto + ");";
                } else {
                    toInsert = "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + book.coverPhoto + ");";
                }
                toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\"><div class=\"bookmark-this\"><span class=\"top-bm\">";
                toInsert += "</span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class=\"library-location\">";
                toInsert += getLibraryFromBook(book.bookId);
                toInsert += "</div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + book.bookId + "\">" + book.title + "<a class=\"book-snippet\"><p>" + book.snippet + "</p></a></a></div><div class=\"book-info\">";
                toInsert += getUserFromBookId(book.bookId);
		toInsert += "</div><div class=\"num-votes\">&hearts; " + getNumberVotes(book.bookId) + "</div></li>";
		$("#book-list").append(toInsert);
            }
            h = $(this).outerHeight() - 92;
            $(".book").css("height", h);
            $("#book-list li").fadeIn("100");
            $("#book-list").fadeIn("100");
            if ($vW > "300") {
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
                toInsert += "<a class=\"edit-this-book\" href=\"/editbook/" + book.bookId + "\">&#9998;</a></div><div class=\"library-location\">"; 
                toInsert += getLibraryFromBook(book.bookId);
                toInsert += "</div><div class=\"book-title\"><a href=\"/read/" + book.bookId + "\">" + book.title + "<a class=\"book-snippet\"><p>" + book.snippet + "</p></a></a></div>";
                toInsert += "<div class=\"book-info\"";
		toInsert += "<div class=\"num-votes\" style=\"text-align: right; font-size: 1.1rem;\">&hearts; " + getNumberVotes(book.bookId) + "</div>";
		toInsert += "</div></div></li>";

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
		if (draft.title == "") {
			toInsert += "<li id =\"" + draft.bookId + "\"><a href=\"/editbook/" + draft.bookId + "\">" + "Untitled" + "</a>";	
		} else {
			toInsert += "<li id =\"" + draft.bookId + "\"><a href=\"/editbook/" + draft.bookId + "\">" + draft.title + "</a>";	
		}
                toInsert += "<a href=\"#\" class=\"dd-link\">&times;</a>";
                toInsert += "<span class=\"delete-draft\">";
                toInsert += "Delete draft?";
                toInsert += "<button class=\"a yay-dd red\">Yes</button>";
                toInsert += "<button class=\"b nay-dd white\">No</button>";
                toInsert += "</span>";
                toInsert += "</li>";
            }
            if (toInsert == "") {
                toInsert = "<li ><a>There are no drafts</a></li>"; //code
            }
            $("#draft-menu").html(toInsert);
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
	    
	    myLibraries = getCreatedLibrariesArray(sessionId);
		var ownThisLibrary = false;
    
		for (i in myLibraries) {
		    currentLibrary = myLibraries[i];
		    if (currentLibrary.libraryId == library.libraryId) {
			    ownThisLibrary = true;
		    }
		}
            toInsert = '';
            for (i in books) {
                book = books[i];
                if (book.bookId in bookmarked == true) {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + book.coverPhoto + ");";
                } else {
                    toInsert += "<li id=\'" + book.bookId + "\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + book.coverPhoto + ");";
                }
                toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
		if (ownThisLibrary) {
		toInsert += "<div class=\"book-buttons\"><a href=\"#\" class=\"delete-this-book\" style=\"display: block; width: 100%; height: 100%;\">&#xf252;</a></div>";
		}else {
		toInsert += "";	
		}
		toInsert += "<div class=\"bookmark-this\"><span class=\"top-bm\">";
                toInsert += "</span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + book.bookId + "\">" + book.title + "<a class=\"book-snippet\"><p>" + book.snippet + "</p></a></a></div><div class=\"book-info\">";
                toInsert += getUserFromBookId(book.bookId);
		toInsert += "</div><div class=\"num-votes\">&hearts; " + getNumberVotes(book.bookId) + "</div></li>";
            }
            if (toInsert == "") {
                toInsert = "<section><p/>No stories have been publised here yet.</p></section>";
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
                toInsert += "<div class=\"book-buttons\"><a href=\"#\" class=\"delete-this-book\">&#xf128;</a></div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + book.bookId + "\">" + book.title + "<a class=\"book-snippet\"><p>" + book.snippet + "</p></a></a><\/div><div \class=\"book-info\">";
                toInsert += getUserFromBookId(book.bookId);
                toInsert += "</div></div></li>";
            }
            if (toInsert == "") {
                toInsert = "<div class=\"library-empty\"><a class=\"empty-created-libraries\">No stories have been added to this library yet.</a></div>";
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


function getCreatedLibrariesArray() {
    sessionId = readCookie("JSESSIONID");
    libraries = [];
    $.ajax({
        url: "/api/users/getCreatedLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
	async: false,
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
    return libraries;
}


function getCreatedLibraries() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/users/getCreatedLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
	async: false,
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            libraries = data;
            toInsert = '';
            for (i in libraries) {
                library = libraries[i];
                toInsert += "<li id=\"" + library.libraryId + "\" class=\"library imgLiquid_bgSize imgLiquid_ready\" id=\"" + "\" style=\"background-image: url(" + library.coverPhoto + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat; class=\"library\" ><div class=\"library-buttons\">";
                toInsert += "<a class=\"delete-this-library\">&#xf252;</a><a class=\"edit-this-library\" href=\"/editlibrary/" + library.libraryId + "\">&#9998;</a></div>";
                toInsert += "<div class=\"library-info\"><div class=\"title\"><a href=\"/library/" + library.libraryId + "\">" + library.title + "</a></div>";
                toInsert += "<div class=\"lib-blurb\">" + library.description + "</div></div>";
                toInsert += "<span class=\"image-overlay\"></span><img src=" + library.coverPhoto + " alt='' style=\"display: none;\"></li>";
            }
            if (toInsert == "") {
                toInsert = "<div class=\"library-empty\"><a class=\"empty-created-libraries\">Create libraries to organize content from across the platform.</a></div>";
            }
            $("#library-list").html(toInsert);
	    toInsert += "<div id=\"close-splash\">Your library was created! Other users can now submit stories to it.<a Id=\"go-to-library\" href=\"/library/" + library.libraryId + "\">Go to your library</a></div>";

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

function getCreatedLibrariesForBook() {
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
		
		containedBooks = getAlreadyAddedBookIdsInLibrary(library.libraryId);
		
		var doesContain = false;
		for(b in containedBooks){
			book = containedBooks[b];
			console.log(book);
			if(current.title == book.title){
				console.log("yes");
				 doesContain = true;
			}
		}
		
		if (doesContain == true) {
			toInsert += "<li id=\"" + library.libraryId + "\" style=\"opacity: 0.5; color: #59B3A6;\"><a id=\"check-icon\">&#10003;<a/>" + library.title + "</li>";
		}
		else{
		        toInsert += "<li id=\"" + library.libraryId + "\"><a>" + library.title + "</a></li>";
		} 
            }
	    
	    if (libraries.length == 0) {
			toInsert += "<li style=\"opacity: 0.7;\">You have no libraries</li>";
	    }
	    
	    $("#my-libraries ul").html(toInsert);
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


function getAlreadyAddedBookIdsInLibrary(libraryId) {
	books = [];
	$.ajax({
        url: "/api/libraries/getBooksInLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
	async: false,
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            books = data;
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }
        }
    });
	
	return books;
}


function getSubmissionsInLibrary() {
    $.ajax({
        url: "/api/notifications/getNotificationsLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            notificationLibraries = data;
            toInsert = '';
            for (i in notificationLibraries) {
                currBook = getFullBookFromBookId(notificationLibraries[i].bookId);
                toInsert += "<li notificationId=\"" + notificationLibraries[i].notificationId + "\"id=\"" + currBook.bookId + "\" booksUser=\"" + notificationLibraries[0].senderUserId + "\" class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + currBook.coverPhoto + "); background-size: cover;";
                toInsert += " background-position: 50% 50%; background-repeat:no-repeat no-repeat;\"><div class=\"book-buttons\" style=\"top: 0; left: 75%;\"><a class=\"approve-this-book\" style=\"display: block; width: 100%; height: 100%;\">&#xf120;</a>";
                toInsert += "<a class=\"deny-this-book\">&#xf128;</a></div><div class=\"book-title\">";
                toInsert += "<a href=\"/read/" + currBook.bookId + "\">" + currBook.title + "</a></div><div class=\"book-info\">";
                toInsert += getUserFromBookId(currBook.bookId);
                toInsert += "</div></div></li>";
            }
            if (toInsert == "") {
                toInsert = "<div class=\"library-empty\"><a class=\"empty-created-libraries\">Nobody submitted stories to your libary yet.</a></div>";
            }
            $("#submission-list").html(toInsert);
            var w = 0,
                h = 0;

            $("#submission-list li").each(function () {
                w += $(this).outerWidth();
                h += $(this).outerHeight();
            });
            w += 500;
            if ($vW > "1024") {
                $("#submission-list").css("width", w + "px");
            }
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
}
function getFeaturedBook() {
    featuredBookTitle = '';
    featuredBookId= '';
    $.ajax({
    	url: "/api/libraries/getMostVotedBookInLibrary",
    	contentType: "application/x-www-form-urlencoded;charset=utf-8",
    	type: "POST",
    	async: false,
    	data: {
    		sessionId: sessionId,
    	    libraryId: libraryId
    	},
    	success: function (data) {
    		featuredBookTitle = data.title;
    		featuredBookId = data.bookId;
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

function getLibrary() {
    libraryId = document.URL.split("/")[document.URL.split("/").length - 1];
    sessionId = readCookie("JSESSIONID");
    getFeaturedBook();
    $.ajax({
        url: "/api/libraries/getLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
	async: false,
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            library = data;
            userName = libraryOwner.name;
	    bookId = featuredBookId;
            currentWebsite = document.URL;
	facebookShare = 'http://www.facebook.com/sharer/sharer.php?u=folio.is/library/' + libraryId;
	twitterShare = "http://twitter.com/share?text="+library.title+" edited by "+ libraryOwner.fullName;"&url=http://folio.is/library" + libraryId;
	emailShare = 'mailto:?subject=Recommended%20Library%20on%20Folio&amp;body='+ library.title + " edited by " + libraryOwner.fullName + "   " +  "folio.is/read/" + libraryId;

	    
	    myLibraries = getCreatedLibrariesArray(sessionId);
		var ownThisLibrary = false;
    
		for (i in myLibraries) {
		    currentLibrary = myLibraries[i];
		    if (currentLibrary.libraryId == library.libraryId) {
			    ownThisLibrary = true;
		    }
		}
	    
	    if (ownThisLibrary) {
			    $("#nav-books a").html(library.title);
	    }
	    else{
			    $("#nav-books a").html(library.title + "<c>" + "&#124;" + "<c/>" + "   edited by" + "<a href=/"+ userName+">" + userName);
			    $("#nav-submissions").css("display", "none");
	    }	    
	    toInsert = "<section id=\"library-splash\" class=\"imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url(" + library.coverPhoto + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
	    toInsert += "<div id=\"library-info\">";
            if (libraryId in subscribed == true) {
                toInsert += "<button class=\"unsubscribe brand-blue\">Unsubscribe</button>";
            } else {
                toInsert += "<button class=\"subscribe white-border\">Subscribe</button>";
            }
	    if (numSubscribers != null) {
				toInsert += "<h1>Edited by " + "<a href=/"+ userName+">" + userName + "<a/>" + "<c>" + "&#124;" + "<c/>" + "<span>" + numSubscribers + " subscribers<span/></h1><h2>" + library.title + "</h2><p>" + library.description + "</p>";
	    } else {
				toInsert += "<h1>Edited by " + "<a href=/"+ userName+">" + userName + "<a/>" + "<c>" + "&#124;" + "<c/>" + "<span>" + "No subscribers<span/></h1><h2>" + library.title + "</h2><p>" + library.description + "</p>";
	    }
	    if (featuredBookTitle == "") {
		toInsert += "<section><a id=\"featured-library\" href=\"/read/" + featuredBookId + "\" style=\"display: block; width: 100%; height: 100%;\"></a>" + "Sorry, but this library is empty. Become the first contributor!" + "</a></section></div>";
	    } else {
		toInsert += "<section><a id=\"featured-library\" href=\"/read/" + featuredBookId + "\" style=\"display: block; width: 100%; height: 100%;\">";
		toInsert += featuredBookTitle + getUserFromBookIdForFeaturedBook(bookId) + "</a></section></div>";
		if ($vW > "1024") {
			toInsert += "<div id=\"close-splash\">OPEN LIBRARY</div>";
		} else {
			toInsert += "<div id=\"close-splash\">^</div>";
		}
	    }
	    if (ownThisLibrary) {
			    toInsert += "<ul id=\"submission-pop\" style=\"display: none; padding-right: 15rem; padding-left: 15rem;\"><p>" + "Added to your library." + "<p/></ul>";

	    }
	    else{
			    toInsert += "<ul id=\"submission-pop\" style=\"display: none;\"><p>" + "Your story was submitted! You will get notified when the editor reviews your submission." + "<p/></ul>";
	    }

	    toInsert += "<div id=\"library-share\">";
	    toInsert += "<ul class=\"share-book\">";
	    toInsert += "<li><a href=\"javascript:window.open(facebookShare,'','width=555,height=368');void(0)\"><i class=\"ion-social-facebook\"></i></a></li>";
            toInsert += "<li><a href=\"javascript:window.open(twitterShare,'','width=550,height=257');void(0)\"><i class=\"ion-social-twitter\"></i></a></li>";
            toInsert += "<li><a href=\""+emailShare+"\"><i class=\"ion-email\"></i></a></li></ul><div/></section>";
            
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
function getLibraryFromLibraryId(libraryId) {
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
            currlibrary = data;
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
            for (i in libraries) {
                library = libraries[i];

                lib = "<li class=\"library imgLiquid_bgSize imgLiquid_ready\" id=\"" + library.libraryId + "\" style=\"background-image: url(" + library.coverPhoto + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
		
		lib += "<div class=\"library-info\"><div class=\"title\"><a href=\"library/" + library.libraryId + "\" style=\"display: block; width: 100%; height: 100%;\">" + library.title + "</a></div>";
		
		lib += "<div class=\"lib-blurb\">" + library.description + "</div></div><div class=\"wrapper\">";
                if (library.libraryId in subscribed == true) {
                    lib += "<button class=\"unsubscribe brand-blue\">Unsubscribe</button></div>";
                } else {
                    lib += "<button class=\"subscribe white-border\">Subscribe</button></div>";
                }
                                                                               		
		lib += "<span class=\"image-overlay\"></span><img src=" + library.coverPhoto + " alt='' style=\"display: none;\"></li>";
                $("#explore-list").append(lib);
             }
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
            name: name,
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
            $("#new-library").css({"background-image": 'url(' + library.coverPhoto + ')',"background-size": "cover","background-position": "50% 50%"});
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
    //title = $("#new-library-info h2").html();
    //description = $("#new-library-info p").html();
    //bg = $("#new-library").css("background-image");
    //coverPhoto = bg.replace("url(", "").replace(")", "");
    tags = '';
    var elms = $(".selectize-input div");
    elms.each(function (i) {
        var elm = $(this);
        tags += elm.html() + ",";
    });
    tags = tags.substring(0, tags.length - 1);
    
       
    
    $.ajax({
        url: "/api/libraries/createLibrary",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
	async: false,
        data: {
            sessionId: sessionId,
            title: title,
            description: description,
            coverPhoto: coverPhoto,
            tags: tags
        },
        success: function (data) {
            console.log(data)
	    return data;
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
            console.log(data);
            location="/library/"+libraryId;
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
    
    if (bio == "Add your bio...") {
	bio = "";
    }
    
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

function getUserFromUserId(userId) {
    userFrom = null;
    $.ajax({
        url: "/api/users/getUserPublic",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            userId: userId
        },
        success: function (data) {
            userFrom = data;
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }
        }
    });
    return userFrom;
}
function getUserFromLibraryId(libraryId) {
    $.ajax({
        url: "/api/utils/getUserFromLibraryId",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            libraryId: libraryId
        },
        success: function (data) {
            libraryOwner = data;
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
function checkName(displayName) {
	console.log("new name: " + displayName);
    if (displayName=="") {//add check for all our pages
	console.log("null name: " + displayName);
        return false;
    } else if(user.displayName == displayName) {
	console.log("username unchanged");
	return true;
    } else {
	result = false;
    $.ajax({
        url: "/api/utils/isUserNameAvailable",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            userName: displayName
        },
	 complete: function(r){
		console.log("responsetext:"+r.responseText);
		if (r.responseText == "\"OK\"") {
			console.log("username ok");
			result =  true;
		}
		console.log("username taken");
	}
	
       
    });
    
    return result;
     }
     
     
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
            responseText = "<a href=\"/" + data.displayName + "\"><img class=\"author-avatar\" src=\"" + data.avatarImage + "\"><div class=\"author-name\">" + data.name + "</a>";
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

function getUserFromBookIdForFeaturedBook(bookId) {
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
            responseText = "<a href=\"/" + data.displayName + "\"><div class=\"author-name\">" + data.name + "</a>";
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

function addLoggedInMenu(){
	sessionId = readCookie("JSESSIONID");
	if(sessionId != null) {
	 $.ajax({
        url: "/api/users/getUser",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            user = data;
            menu = "<div class=\"mp-level\"><h2><a href=\"/featured\">Gapelia</a></h2>";
			menu +="<ul><li><a href=\"/me\">Me</a><a class=\"icon not-mobile\" href=\"/accounts\">&#xf13d;</a></li>";
			menu +="<li class=\"not-mobile\"><a href=\"/librarymanager\">Libraries</a><li/><li class=\"not-mobile\"><a href=\"/createbook\">Create book</a>";
			menu +="</li><li id=\"gpl-menu-drafts\" class=\"not-mobile\"><a>Drafts</a><ul id=\"draft-menu\"></ul></li>";
			menu +="<li id=\"gpl-menu-notify\"><a>Notifications</a><a class=\"icon\" href=\"#\"></a><ul></ul></li>";
			menu +="<li class=\"fq\"><a href=\"#\">Help</a><li class=\"help\"><a href=\"#\">Contact</a><li class=\"logout\"><a href=\"#\">Log Out</a></ul></div>";
			$("#site-menu").html(menu);
			var fifth = getNotifications();
		}
	});
	}
}
function getNumberVotes(incomingBookId) {
    numVotes=0;
    $.ajax({
	url: "/api/books/getNumVotes",
	contentType: "application/x-www-form-urlencoded;charset=utf-8",
	type: "POST",
	async: false,
	data: {
		bookId: incomingBookId
	},
	success: function (data) {
		if (data != null) {
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
            bookFromBookId = data;
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

function getLibraryFromBookBackCover(bookId) {
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
                responseText = "<img src=\""+data.coverPhoto+"\"></div><div id=\"library-name\"><a href=\"/library/" + data.libraryId + "\" style=\"display: block; width: 100%; height: 100%;\">" + data.title + "</a></div><div id=\"library-info-blurb\"><a>"+data.description+"</a>";
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
            var toInsert = "";
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
                toInsert += "</div><div class=\"book-title\"><a href=\"/read/" + book.bookId + "\">" + book.title + "<a class=\"book-snippet\"><p>" + book.snippet + "</p></a></a></div>";
                toInsert += "<div class=\"book-info\"";
		toInsert += "<div class=\"num-votes\" style=\"text-align: right; font-size: 1.1rem;\">&hearts; " + getNumberVotes(book.bookId) + "</div>";
		toInsert += "</div>";
		toInsert += "</li>";
            }
	    
	    if (toInsert == "") {
                (elem = document.getElementById('close-splash')).parentNode.removeChild(elem);
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
    if (user.name != undefined && user.name != "") {
            document.getElementById("user-name").value = user.name;
    }

    if (user.displayName != undefined && user.displayName != "") {
        document.getElementById("user-display-name").value = user.displayName;
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
    if (user.emailOptOut != undefined && user.emailOptOut != "") {
	
	var elem = document.querySelector('.js-switch');
	if(user.emailOptOut){
		console.log("user opted out of email CLICKING");
		$('.switchery').click();
		//document.querySelector(".js-switch").checked = true;
	}
	
    }

}

function updateUserAccounts() {
        inputBox = document.getElementById("user-name");
        name = inputBox.value;
        inputBox = document.getElementById("user-display-name");
        displayName = inputBox.value;
        displayName = displayName.toLowerCase().trim().replace(/\W/g, '');
        inputBox = document.getElementById("user-email");
        email = inputBox.value;
        inputBox = document.getElementById("user-location");
        current = inputBox.value;
        bg = $(".account-avatar-wrapper").css("background-image");
        image = bg.replace("url(", "").replace(")", "");
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
	emailOptOut = !(document.querySelector(".js-switch").checked);
	console.log("emailoptout : "+emailOptOut);
        
        if(checkName(displayName)) {
             $.ajax({
            url: "/api/users/updateUser",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            type: "POST",
            data: {
                sessionId: sessionId,
                name: name,
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
                isPublic: true,
		emailOptOut: emailOptOut
            }
            });
        } else {
            alert("That Username is already taken");
        }

}
$(document).on("click", ".yay-delete-library", function () {
    sessionId = readCookie("JSESSIONID");
    e = $(this).closest(".yay-delete-library");
    libraryId = e.parent().parent().parent().attr("id");
    $(this).closest("li").remove();
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
    $(this).closest("li").remove();
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

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i].title === obj.title) {
           return true;
       }
    }
    return false;
}

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
            userCreatedBooks = data;
            toInsert = "";
            $.ajax({
                url: "/api/notifications/getAllreadySubmitted",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                type: "POST",
                async: false,
                data: {
                    sessionId: sessionId,
                    libraryId: libraryId
                },
                success: function (data) {
                    alreadyThere = {};
		    
		    libraryBooks = getAlreadyAddedBookIdsInLibrary(library.libraryId);
		    
                    for (i in data) {
                        alreadyThere[data[i]] = true;
                    }
                    for (i in userCreatedBooks) {
                        book = userCreatedBooks[i];
                        if (alreadyThere[book.bookId] != true) {
                            toInsert += "<li id=\"" + book.bookId + "\"><a >" + book.title + "</a></li>";
                        }
			else{
				
				if (contains(libraryBooks,book) == true) {
					toInsert += "<li div=\"" + book.bookId + "\" style=\"opacity: 0.7;\"><span id=\"check-icon\">&#10003;</span>" + book.title + "</li>";
				}
				else{
					toInsert += "<li id=\"" + book.bookId + "\"style=\"opacity: 0.7;\"><span id=\"pending-icon\">Pending review</span>" + book.title + "</li>";
				}
			}
                    }
		    
		    
		    if (userCreatedBooks.length == 0) {
			toInsert += "<li style=\"opacity: 0.7;\">You have no stories</li>";
		    }
                
		    $("#my-submissions ul").html(toInsert);
		    
                }
            });
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
    
    
    //detect if this is the users own library
    
    myLibraries = getCreatedLibrariesArray(sessionId);
    var ownThisLibrary = false;
    
    for (i in myLibraries) {
	currentLibrary = myLibraries[i];
	if (currentLibrary.libraryId == library.libraryId) {
		ownThisLibrary = true;
	}
    }
    
    if (ownThisLibrary == false) {
	$(this).closest("li").prepend("<span id=\"pending-icon\">Pending review</span>").css("opacity", "0.7");
        submitToLibrary(bookId);
	$("#my-submissions ul").hide();
    } else{
	$(this).closest("li").prepend("<span id=\"check-icon\">&#10003;</span>").css("opacity", "0.7");
        addBookToLibrary(bookId);
	$("#my-submissions ul").hide();
	$(this).closest("li a").contents().unwrap();
    }
    
});

$(document).on("click", "#my-libraries ul a", function (ev) {
    e = $(this).closest("li");
    libraryId = e.attr("id");
    $(this).closest("li").prepend("<span id=\"check-icon\">&#10003;<span/>").css("opacity", "0.5");
    
     addBookToSpecificLibrary(bookId,libraryId);
    
    $("#my-libraries ul").hide();
});



$(document).on("click", ".approve-book-confirm button", function (ev) {
    e = $(this).closest(".approve-book-confirm");
    bookId = e.parent().attr("id")
    notificationId = e.parent().attr("notificationId")
    sessionId = readCookie("JSESSIONID");
    senderId = e.parent().attr("booksuser");
    $(this).closest("li").remove();
    addBookToLibrary(bookId);
    acceptBook(notificationId);
});

function submitToLibrary(bookId) {
    getUserFromLibraryId(libraryId);
    recipient = libraryOwner.userId;
    $.ajax({
        url: "/api/notifications/createLibraryNotification",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            recipient: recipient,
            bookId: bookId,
            referencedLibrary: libraryId,
            sender: user.userId,
            message: null
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
}

function acceptBook(notificationId) {
    console.log("ACCEPTING BOOK");
    $.ajax({
        url: "/api/notifications/acceptLibraryNotification",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            sessionId: sessionId,
            notificationId: notificationId
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

function rejectBook(notificationId) {
    console.log("REJECTING BOOK");
    $.ajax({
        url: "/api/notifications/rejectLibraryNotification",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            sessionId: sessionId,
            notificationId: notificationId
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }
        }
    });
    
    refreshLibraryNotifications();
}



function refreshLibraryNotifications() {
    $.ajax({
        url: "/api/notifications/getNotificationsLibraries",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId,
            libraryId: libraryId
        },
        success: function (data) {
            notificationLibraries = data;
            toInsert = '';
            for (i in notificationLibraries) {
                toInsert += "notif";
            }
            if (toInsert == "") {
                toInsert = "<div class=\"library-empty\"><a class=\"empty-created-libraries\">Nobody submitted stories to your libary yet.</a></div>";
		$("#submission-list").html(toInsert);
	    }
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            }
        }
    });
}



function addBookToLibrary2(bookId, libraryId) {
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


function addBookToSpecificLibrary(bookId,libraryId) {
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
	console.log("DENYING");
    e = $(this).closest(".deny-book-confirm");
    senderId = e.parent().attr("booksuser");
    bookId = e.parent().attr("id");
    notificationId = e.parent().attr("notificationId");
    sessionId = readCookie("JSESSIONID");
    $(this).closest("li").remove();
    rejectBook(notificationId);
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

// DELETE BOOK FROM ME //
$(document).on("click", ".yay-delete-book", function (ev) {
    e = $(this).closest(".yay-delete-book");
    bookId = e.parent().parent().parent().attr("id");
    $(this).closest("li").remove();
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

// DELETE BOOK FROM LIBRARY BY LIRARY OWNER //
$(document).on("click", ".yay-delete-library-book", function (ev) {
    e = $(this).closest(".yay-delete-library-book");
    bookId = e.parent().parent().parent().attr("id");
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
    }
);

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
	    if ($vW < "1024") {
                $(".bookmark-list-wrapper").css("display", "none");
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
	    if (lib == "<ul id=\"subscription-list\">") {
                lib = "<ul id=\"subscription-list\"><div class=\"library-empty\"><a class=\"empty-subscriptions\">You have not subsribed to any libraries yet.</a></div></ul>";
            }
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
        $(this).closest("li").remove();
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

function getLastPublishedBookId() {
	$.ajax({
        url: "/api/users/getLastPublished",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
        	sessionId: sessionId,
		userId: user.userId
        },
        success: function (data) {
            lastPublished = data;
	    
            
        },
        error: function (q, status, err) {
            if (status == "timeout") {
                alert("Request timed out");
            } else {
                alert("Some issue happened with your request: " + err.message);
            }
        }
    });
	return lastPublished;
}


function getRecentlyPublished() {
	$.ajax({
        url: "/api/users/getLastPublished",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
        	sessionId: sessionId,
		userId: user.userId
        },
        success: function (data) {
            lastPublished = data;
	    if (lastPublished == null) {
		$("#recently-published").html("This user has not published anything yet.");
	    }
            else if(lastPublished.title != undefined) {
            	$("#recently-published").html("Recently published <a href=\"/read/"+lastPublished.bookId+"\">"+lastPublished.title+"</a>");
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

function getContributedTo() {
	$.ajax({
        url: "/api/users/getLibrariesContributedTo",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
        	sessionId: sessionId,
            userId: user.userId
        },
        success: function (data) {
            contributions = data;
            if(contributions.length >0) {
			toInsert = "Contributes to";
	            for(i in contributions) {
	            	toInsert+="<a href=\"/library/"+contributions[i].libraryId+"\">"+contributions[i].title+"</a>";
	            }
	            $("#contributes-to").html(toInsert);
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
            templateId = 6;
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
                    "video": page.videoUrl,
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
    
		case 6:
			baseLayout();
	}
	
	$("#add-page").click(function (e) {

		if (pagesCreated > 20) {
			alert("Your book is too big please remove a page!\n");
			return;
		}

		pagesCreated++;

		$(this).before($("<li id=\"" + pagesCreated + "\"draggable='true'></li>").html("<div class=\"delete-page\"><i class=\"ion-trash-a\"></i></div><a class=\"edit-page\"><i class=\"ion-gear-b\"></i></a><section><img src=\"/static/images/whiteBG.jpg\" id='page" + (pagesCreated) + "Image' alt=\"\"/><div id='page" + (pagesCreated) + "Title'><span class=\"page-thumb-number\">" + (pagesCreated) + "</span> &middot; <span class=\"page-thumb-title\">New Page</span></div></section>"));

		title = $(".page-title-elem").html();
		text = $(".page-desc").html();
		imageURL = $(".page-bg").attr("src");
		attribution = $(".image-attribution").html();

		// save to previous page
		if (pagesCreated == 0) {
			pages.page[0] = {
				"pageNumber": 0,
				"templateId": 0,
				"title": null,
				"text": null,
				"image": "/static/images/whiteBG.jpg",
				"video": "null",
				"attribution": null
			};
			createPage();
			templateId = 0;
			baseLayout();
		} else {
			pages.page[currentPage].templateId = templateId;
			pages.page[currentPage].title = title;
			pages.page[currentPage].text = text;
			pages.page[currentPage].image = imageURL;
			pages.page[currentPage].video = videoURL;
			pages.page[currentPage].attribution = attribution;
			createPage();
			currentPage = pagesCreated;
			templateId = 6;
			title = null;
			text = null;
			imageURL = null;
			videoURL = null;
			attribution = null;
			baseLayout();
		}
	    
	    // Page Sorter
	    $("#pages-scroller ul").sortable({
		items: ":not(.disable-sort)"
	    }).bind("sortupdate", function () {});
    
	    e.preventDefault();
    
	});
	
	    // Delete page
	    $(document).on("click", "#pages-scroller ul li .delete-page", function (e) {
    
		    $(this).closest("li").prepend("<div class=\"delete-page-confirm\"><h5>Confirm Delete</h5><div class=\"wrapper\"><a href=\"#\" class=\"button a red yay-delete-page\">Yes</a><a href=\"#\" class=\"button b white nay-delete-page\">No</a></div></div>");
    
		    e.preventDefault();
    
	    });
    
	    // Confirm page deletion
	    $(document).on("click", ".yay-delete-page", function (e) {
		    
		    pageToDeleteId = $(this).closest("li").attr("id");
		    pageToDelete = pages.page[pageToDeleteId].pageId;
		    deletePage(pageToDelete);
		    
		    $(this).closest("li").remove();
		    currentPage = $(this).closest("img").attr("id");
		    pages.page.splice(currentPage, 1);
		    
		    currentPage--;
		    pagesCreated--;
		    
		    e.preventDefault();
		    
	    });
		    
	    // Cancel page deletion
	    $(document).on("click", ".nay-delete-page", function (e) {
		    
		    $(this).closest(".delete-page-confirm").remove();
		    e.preventDefault();
		    
	    });
	    
	    // Image insertion
	    // var file = '<p><div class="inserted-img"><img src=' + file + '></div></p>';
		var file = '<p><a class="inserted-img" href=' + file + '><img src=' + file + '></a></p>';
	
		function handleFile(file) {
	
			// pasteHtmlAtCaret('<p><div class="inserted-img"><img src=' + file + '></div></p>');
			pasteHtmlAtCaret('<p><a class="inserted-img" href=' + file + '><img src=' + file + '></a></p>');
			console.log(file);
		}	

	}
