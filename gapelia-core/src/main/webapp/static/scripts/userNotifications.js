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
            userFrom = '';
            for(i in notifications) {
                notification = notifications[i];
		
		
               	$.ajax({
                        url: "/api/users/getUserPublic",
                        contentType: "application/x-www-form-urlencoded;charset=utf-8",
                        type: "POST",
			async: false,
                        data: {
                            userId: notification.senderUserId
                        },
                        success: function (data) {
                            userFrom = data;
                            getBookFromBookId(notification.bookId);
			    
                            sender = userFrom.displayName;
                            bookTitle = bookFromBookId.title;
                            toInsert = "<li class=\"vote-notification\" id=\""+notification.notificationId+"\"><a href=/"+userFrom.displayName+"><img src=\""+userFrom.avatarImage+"\">"+sender + " liked " + bookTitle +"</a>";
                            toInsert += "<a class=\"remove-notification\">&#x2717;</a></li>";
                            $("#gpl-menu-notify ul").append(toInsert);
                        }
                    });
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
                                toInsert = "<li class=\"library-notification\" id=\""+notificationId+"\"><a href=/library/"+libraryId+"\><b>" + book.title + "</b> was accepted to the library <b>" + library.title + "</b></a><a class=\"remove-notification\">&#x2717;</a></li>";
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
                                toInsert = "<li class=\"library-notification\"  id=\""+notificationId+"\"><a><b>" + book.title + "</b> was not accepted to <b>" + library.title + "</b></a><a class=\"remove-notification\">&#x2717;</a></li>";
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
                                toInsert = "<li class=\"submission\" id=\""+notificationId+"\" bookId=\""+bookId+"\" libraryId=\""+libraryId+"\"><a href=\"/read/"+book.bookId+"\"><b>" + book.title + "</b>  was submitted for consideration in <b>" + library.title + "</b></a>";
                                //toInsert += "<a href=\"#\" class=\"respond-link\">&#x2717;</a>";
				//$(this).next(".respond-submision").toggle();
                                toInsert += "<span class=\"respond-submission\">";
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
    getUserDrafts();
    
    loadDelete();
    $("#gpl-menu-notify .icon").html($("#gpl-menu-notify li").size());
    $("#notification-count").css("display", "block").html($("#gpl-menu-notify li").size());
    $(".respond-submision").toggle();
    if ($("#gpl-menu-notify li").size() == 0) { $(".notification-time span").css("display", "none");}
    
    
}
