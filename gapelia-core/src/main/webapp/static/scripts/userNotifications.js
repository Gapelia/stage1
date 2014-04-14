function getAcceptedSubmissionNotifications() {
    sessionId = readCookie("JSESSIONID");
    $.ajax({
        url: "/api/notifications/getAcceptedLibraryNotifications",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        type: "POST",
        data: {
            sessionId: sessionId,
        },
        success: function (data) {
            notifications = data;
            for (i in notifications) {
                notification = notifications[i];
                $.ajax({
                    url: "/api/libraries/getLibrary",
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    type: "POST",
                    async: false,
                    data: {
                        sessionId: sessionId,
                        libraryId: notification.libraryId
                    },
                    success: function (data) {
                        library = data
                        $.ajax({
                            url: "/api/utils/getBookFromBookId",
                            contentType: "application/x-www-form-urlencoded;charset=utf-8",
                            async: false,
                            type: "POST",
                            data: {
                                bookId: notification.bookId
                            },
                            success: function (data) {
                                book = data;
                                toInsert = "<li><a>Congrats! \"" + book.title + "\" has been accepted into \"" + library.title + "\"!</a></li>";
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
        }
    });
}

function getRejectedSubmissionNotifications() {
    return;
}

function getVotesOnBooks() {
    return;
}

function getLibrarySubmissions() {
    $.ajax({
        url: "/api/notifications/getLibraryNotificationsAll",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        type: "POST",
        data: {
            sessionId: sessionId
        },
        success: function (data) {
            notifications = data;
            for (i in notifications) {
                notification = notifications[i];
                $.ajax({
                    url: "/api/libraries/getLibrary",
                    contentType: "application/x-www-form-urlencoded;charset=utf-8",
                    type: "POST",
                    async: false,
                    data: {
                        sessionId: sessionId,
                        libraryId: notification.libraryId
                    },
                    success: function (data) {
                        library = data
                        $.ajax({
                            url: "/api/utils/getBookFromBookId",
                            contentType: "application/x-www-form-urlencoded;charset=utf-8",
                            async: false,
                            type: "POST",
                            data: {
                                bookId: notification.bookId
                            },
                            success: function (data) {
                                book = data;
                                toInsert = "<li><a>\"" + book.title + " \" was submited to your library \"" + library.title + "\"</a></li>";
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
        }
    });
}

function getNotifications() {
    var accepted = getAcceptedSubmissionNotifications();
    var rejected = getRejectedSubmissionNotifications();
    var voted = getVotesOnBooks();
    var submitted = getLibrarySubmissions();
    setTimeout(function () {
        $("#gpl-menu-notify .icon").html($("#gpl-menu-notify li").size());
        $("#notification-count").html($("#gpl-menu-notify li").size());
    }, 1400);
}