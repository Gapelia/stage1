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
    			toInsert ="";
                for (i in books) {
                  book = books[i];
                  console.log("make helper function to get LibraryId");
                  console.log("make helper function for userId and avatr");
                  toInsert += "<li id=\'"+book.bookId+"\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url("+book.coverPhoto+"); height: 609px;";
                  toInsert += "background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\"><div class=\"bookmark-this\"><span class=\"top-bm\">";
                  toInsert += "</span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div><div class=\"library-location\">";
                  toInsert += "<a href=\"#\" style=\"display: block; width: 100%; height: 100%;\">Camp Awesome</a></div><div class=\"book-title\">";
                  toInsert +="<a href=\"/read/"+book.bookId+"\">Editors Pick:"+book.title+"</a></div><div class=\"book-info\">";
                  toInsert +="<img class=\"author-avatar\" src=\"/static/images/users/01.jpg\"><div class=\"author-name\"><a href=\"#\">Spaceman Fresh</a></div></div></li>";
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
    			toInsert ="";
                for (i in books) {
                  book = books[i];
                  console.log("make helper function to get LibraryId");
                  toInsert += "<li id=\'"+book.bookId+"\' class=\"book imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url("+book.coverPhoto+"); height: 609px; background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
                  toInsert += "<div class=\"book-buttons\"><a href=\"#\" class=\"delete-this-book\" style=\"display: block; width: 100%; height: 100%;\"></a>"
                  toInsert += "<a class=\"edit-this-book\" href=\"/editbook/"+book.bookId+"\"></a></div>";
                  toInsert += "<div class=\"book-title\"><a href=\"/read/"+book.bookId+"\">"+book.title+"</a></div>"
                  toInsert += "<div class=\"book-info\"><div class=\"library-location\"><a href=\"#\">Insane Asylum</a></div></div></li>";
                  }
                  $("#user-book-list").html(toInsert);
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
    			toInsert ="";
                for (i in drafts) {
                  draft = drafts[i]
                  toInsert+="<li><a href=\"/editbook/"+draft.bookId+"\">"+draft.title+"</a></li>";
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
    	})
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
			lib ='';authorname="NEED TO GET";
			for (i in books) {
				book = books[i];
				lib += "<li class=\"book\"><div class=\"bookmark-this\"><span class=\"top-bm\"></span><span class=\"bottom-bm\"></span><span class=\"right-bm\"></span></div>";
				lib += "<div class=\"book-title\"><a href=\"/read/"+book.id+"\">"+book.title+"</a></div><div class=\"book-info\">";
				lib += "<div class=\"author-name\"><a href=\"/user/"+book.userId+"\">"+ authorname+"</a></div></div><span class=\"image-overlay\"></span>";
				lib+="<img src=\""+book.coverPhoto+"\" alt=\" \"/></li>"}
			$("#book-list").html(lib);
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
	libraryId = document.URL.substring(30,document.URL.length)
	sessionId = readCookie("JSESSIONID");
	console.log("getIf user is already subscribed");
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
			userName = library.userId;console.log('get user from userid');
			featuredBookTitle = "STILL NEED TO GET";console.log("get featuredbookTitle from bookid");
			featuredBookId = library.featuredBook;
			toInsert = "<section id=\"library-splash\" class=\"imgLiquid_bgSize imgLiquid_ready\" style=\"background-image: url("+library.coverPhoto+"); background-size: cover; background-position: 50% 50%; background-repeat: no-repeat no-repeat;\">";
			toInsert += "<div id=\"library-info\"><button class=\"subscribe white\">Subscribe</button><h1>" + userName + " · 8,349 subscribers</h1><h2>"+library.title+"</h2><p>"+library.description+"</p><section><a id=\"featured-library\" href=\"/read/"+featuredBookId+"\" style=\"display: block; width: 100%; height: 100%;\">"+ featuredBookTitle;
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

				lib += "<div class=\"lib-blurb\">" + library.description + "</div></div><div class=\"wrapper\"><button class=\"subscribe white\">Subscribe</button></div>";

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

	if (user.email == null) {
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

	var element = $("#change-cover-photo");
	element = element[0];
	element.type = "filepicker";
	filepicker.constructWidget(element);
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
	bookId = e.parent().parent().parent().attr("id")
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
$(document).on("click", ".update-user", function () {
	updateUser();
});
