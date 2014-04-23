function getSubmissionsResponse() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/notifications/getAllResponses",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            sessionId: sessionId,
        },
        success: function (data) {
            notifications = data;
            for(i in notifications) {
                notification = notifications[i]
                if(notification.accepted==true) {
                    addAcceptedNotification(notification.notificationId, notification.bookId, notification.libraryId);
                } else {
                    addRejectNotification(notification.notificationId, notification.bookId, notification.libraryId);
                }
            }
        }
    });
}

function getBookNotifications() {
$.ajax({
	url: "/api/notifications/getNotificationsBooks",
	contentType: "application/x-www-form-urlencoded;charset=utf-8",
	type: "POST",
	async: false,
	data: {
		sessionId: sessionId,
	},
	success: function (data) {
            notifications = data;
            for(i in notifications) {
                notification = notifications[i];
               	getUserFromUserId(notification.senderUserId);
               	getBookFromBookId(notification.bookId);
               	sender = userFrom.displayName;
               	bookTitle = bookFromBookId.title;
               	toInsert = "<li class=\"vote-notification\" id=\""+notification.notificationId+"\">"+sender + "Has thanked you for your book " + bookTitle;
               	toInsert += "<a class=\"remove-notification\">&#x2717;</a></li>";
               	$("#gpl-menu-notify ul").append(toInsert);
            }
        }
});
}
function getLibrarySubmissions() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/notifications/getAllSubmissions",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            notifications = data;
            for (i in notifications) {
                notification = notifications[i];
                addSubmission(notification.notificationId, notification.bookId, notification.libraryId);
            }
        }
    });
}
function addAcceptedNotification(notificationId, bookId, libraryId) {
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
                        library = data
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
                                toInsert = "<li class=\"library-notification\" id=\""+notificationId+"\"><a href=/read/\""+bookId+"\>Congrats! \"" + book.title + " \" was accepted to the library \"" + library.title + "\"</a><a class=\"remove-notification\">&#x2717;</a></li>";
                                $("#gpl-menu-notify ul").append(toInsert);
                            }
                        });
                    }
                });
}

function addRejectNotification(notificationId, bookId, libraryId) {
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
                        library = data
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
                                toInsert = "<li class=\"library-notification\"  id=\""+notificationId+"\"><a>Sorry, your book\"" + book.title + " \" was not accepted to the library \"" + library.title + "\" at this time</a><a class=\"remove-notification\">&#x2717;</a></li>";
                                $("#gpl-menu-notify ul").append(toInsert);
                            }
                        });
                    }
                });
}
function addSubmission(notificationId,bookId,libraryId) {
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
                        library = data
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
                                toInsert = "<li class=\"submision\" id=\""+notificationId+"\" bookId=\""+bookId+"\" libraryId=\""+libraryId+"\"><a href=\"/read/"+book.bookId+"\">\"" + book.title + " \" was submited to your library \"" + library.title + "\"</a>";
                                toInsert += "<a href=\"#\" class=\"respond-link\">&#x2717;</a>";
                                toInsert += "<span class=\"respond-submision\">";
                                toInsert += "Accept Book?";
                                toInsert += "<button class=\"a yay-respond-link red\">&#x2713;</button>";
                                toInsert += "<button class=\"b nay-respond-link white\">&#x2717;</button>";
                                toInsert += "</span></li>";
                                $("#gpl-menu-notify ul").append(toInsert);
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
                });
}

function getNotifications() {
    getLibrarySubmissions();
    getSubmissionsResponse();
    getBookNotifications();
    setTimeout(function () {
        $("#gpl-menu-notify .icon").html($("#gpl-menu-notify li").size());
        $("#notification-count").html($("#gpl-menu-notify li").size());
        loadDelete();
        $(".respond-submision").toggle();
    }, 1400);
}