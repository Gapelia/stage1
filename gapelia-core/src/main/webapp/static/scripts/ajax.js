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

function getBookmarkedBooks() {
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
			toInsert = '';
			for (i in bookmarks) {
				bookmark = bookmarks[i];
				toInsert += "<li id=\"" + bookmark.bookId + "\" class=\"collection book imgLiquid_bgSize imgLiquid_ready bookmarked\" style=\"background-image: url(" + bookmark.coverPhoto + "); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
				toInsert += "<div class=\"bookmark-this\"><span class=\"top-bm\"></span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div>";
				toInsert += "<div class=\"library-location\"><a href=\"#\" style=\"display: block; width: 100%; height: 100%;\">Camp Awesome</a></div>";
				toInsert += "<div class=\"book-title\"><a href=\"/read/" + bookmark.bookId + "\">" + bookmark.title + "</a></div>";
				toInsert += "<div class=\"book-info\"><img class=\"author-avatar\" src=\"/static/images/users/01.jpg\"><div class=\"author-name\"><a href=\"#\">" + bookmark.userId + "</a></div></div></li>";
			}
			$("#bookmark-list").html(toInsert);
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
				toInsert += "<a href=\"#\" style=\"display: block; width: 100%; height: 100%;\">Camp Awesome</a></div><div class=\"book-title\">";
				toInsert += "<a href=\"/read/" + book.bookId + "\">Editors Pick:" + book.title + "</a></div><div class=\"book-info\">";
				toInsert += "<img class=\"author-avatar\" src=\"/static/images/users/01.jpg\"><div class=\"author-name\"><a href=\"#\">Spaceman Fresh</a></div></div></li>";
			}
			$("#book-list").html(toInsert);
			h = $(this).outerHeight() - 92;
			$(".book").css("height", h);
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
				toInsert += "<a class=\"edit-this-book\" href=\"/editbook/" + book.bookId + "\">&#xf13d;</a></div>";
				toInsert += "<div class=\"book-title\"><a href=\"/read/" + book.bookId + "\">" + book.title + "</a></div>"
				toInsert += "<div class=\"book-info\"><div class=\"library-location\"><a href=\"#\">Insane Asylum</a></div></div></li>";
			}
			$("#user-book-list").html(toInsert);
			h = $(this).outerHeight() - 92;
			$(".book").css("height", h);
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
				toInsert += "<li><a href=\"/editbook/" + draft.bookId + "\">" + draft.title + "</a></li>";
			}
			$("#draft-menu").html(toInsert);
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
			authorname = "NEED TO GET";
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
				toInsert += "<a href=\"/read/" + book.bookId + "\">Editors Pick:" + book.title + "</a></div><div class=\"book-info\">";
				toInsert += "<img class=\"author-avatar\" src=\"/static/images/users/01.jpg\"><div class=\"author-name\"><a href=\"#\">Spaceman Fresh</a></div></div></li>";
			}
			$("#book-list").html(toInsert);
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
				toInsert += "<div class=\"library-info\"><div class=\"title\"><a href=\"/library/" + library.libraryId + "\">" + library.title + "</a></div>";
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

function getLibrary() {
	libraryId = document.URL.substring(30, document.URL.length)
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
			toInsert += "<div id=\"library-info\"><button class=\"subscribe white\">Subscribe</button><h1>" + userName + " · 8,349 subscribers</h1><h2>" + library.title + "</h2><p>" + library.description + "</p><section><a id=\"featured-library\" href=\"/read/" + featuredBookId + "\" style=\"display: block; width: 100%; height: 100%;\">" + featuredBookTitle;
			toInsert += "</a></section></div><div id=\"close-splash\"><i class=\"ion-ios7-arrow-right\"></i></div>";
			$("#mp-pusher").prepend(toInsert);
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

function quickUpdateUser() {

	name = user.name;
	email = user.email;
	current = user.location; // if not, redirect
	avatarImage = $(".avatar-wrapper").
	coverImage = user.coverImage;
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

	displayName = $("#user-name").html();
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
		url: "/api/actions/flushUser",
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

function quickUpdateUser() {
	name = user.name;
	email = user.email;
	current = user.location; // if not, redirect
	image = $(".avatar-wrapper img").attr("src");
	avatarImage = image;
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

$(document).on("click", ".quick-edit-profile", function () {
	quickUpdateUser();
});

$(document).on("click", ".library-list-wrapper ul li button", function (ev) {

	e = $(this).closest("button");
	library = e.parent().parent();
	libraryId = library.attr("id");
	a = parseInt(libraryId);
	sessionId = readCookie("JSESSIONID");

	if (e.html() == "Unsubscribe") {
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
	} else if (e.html() == "Subscribe") {
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
	}

});

$(document).on("click", ".yay-delete-book", function (ev) {
	e = $(this).closest(".yay-delete-book");
	bookId = e.parent().parent().parent().attr("id");
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
			} else {
				alert("Some issue happened with your request: " + err.message);
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
			getLibraries();

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
	console.log("deleting page");
	$.ajax({
		url: "/api/books/deletePage",
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		type: "POST",
		data: {
			sessionId: sessionId,
			pageId: deletePageId
		},
		success: function (data) {
			console.log('deleted page');
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

function updateBookAndPages(isPublished) {
	tags = null;
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
			isPublished: isPublished
		},
		success: function (data) {
			console.log("Succes Publishing your book");
		},
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
