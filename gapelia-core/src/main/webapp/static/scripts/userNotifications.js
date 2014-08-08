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
						sender = userFrom.name;
						bookTitle = bookFromBookId.title;
						toInsert = "<li class=\"vote-notification\" id=\""+notification.notificationId+"\"><a href=/"+userFrom.displayName+"><img class=\"avatar-notif\" src=\""+userFrom.avatarImage + "\">"+sender + " liked <b>" + bookTitle +"<b></a>";
						toInsert += "<a class=\"remove-notification\">&#x2717;</a></li>";
						$("#gpl-menu-notify ul").append(toInsert);
					}
				});
			}
		}
	});
}

function getCommentNotifications() {
	$.ajax({
		url: "/api/notifications/getCommentNotifications",
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		async: false,
		type: "POST",
		data: {
			sessionId: sessionId
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
						userId: notification.commenterUserId
					},
					success: function (data) {
						userFrom = data;
						getBookFromBookId(notification.referencedBookId);

						sender = userFrom.name;
						bookTitle = bookFromBookId.title;
						switch (notification.type) {
							case "Inspiring":
							var typeString = "inspiring note"
							break;
							case "Idea":
							var typeString = "idea"
							break;
							case "Question":
							var typeString = "question"
							break;
							case "Review":
							var typeString = "review"
							break;
							case "response":
							var typeString = "response"
							break;
							default:
							var typeString = "comment"
							break;
						}

					//var time = Date.parse(notification.time);
					var time =  notification.time.split(",")[0];


					var text = notification.comment;
					if(text.length > 30) text = text.substr(0, 30) + "\u2026";

					var hash = notification.hash;
					var urlPage = "read";
					console.log(bookFromBookId);
					if(!bookFromBookId.isPublished) urlPage = "revision";
					
					if (notification.type == "response") toInsert = "<li class=\"comment-notification\" id=\""+notification.pendingId+"\"><a href=/"+urlPage+"/"+notification.responseId+"?commentLocation="+hash+"><img class=\"avatar-notif\" src=\""+userFrom.avatarImage + "\">On "+time+" , <b>"+sender+"</b> left a "+typeString+" on <b>"+ bookTitle + " &#8212; </b>"+"<i>'' "+text+"</i> ''</a>";
					else toInsert = "<li class=\"comment-notification\" id=\""+notification.pendingId+"\"><a href=/"+urlPage+"/"+notification.referencedBookId+"?commentLocation="+hash+"><img class=\"avatar-notif\" src=\""+userFrom.avatarImage + "\">On "+time+" , <b>"+sender+"</b> left a "+typeString+" on <b>"+ bookTitle + " &#8212; </b>"+"<i>'' "+text+"</i> ''</a>";
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
		async: false,
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

					toInsert += "<span class=\"respond-submission\">";
					toInsert += "Accept Submission?";
					toInsert += "<button class=\"a yay-respond-link green\" style=\"margin-left: 1rem !important;\">&#x2713;</button>";
					toInsert += "<button class=\"b nay-respond-link red\">&#x2717;</button>";
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
	getCommentNotifications();
	getUserDrafts();
	
	loadDelete();
	$("#gpl-menu-notify .icon").html($("#gpl-menu-notify li").size());
	$("#notification-count").css("display", "block").html($("#gpl-menu-notify li").size());
	$(".respond-submision").toggle();
	if ($("#gpl-menu-notify li").size() == 0) $(".notification-time span").css("display", "none");
}