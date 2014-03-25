function readCookie(name){
     var nameEQ = name + "=";
     var ca = document.cookie.split(';');
     for(var i=0;i < ca.length;i++)
     {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);


          if (c.indexOf(nameEQ) == 0) {
          	return c.substring(nameEQ.length,c.length);
          }
     }
     return null;
}
function getLibraries() {
	sessionId=readCookie("JSESSIONID");
	$.ajax({
		url: "/api/libraries/getMainLibraries",
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		type: "POST",
		data: {
			sessionId: sessionId
		},
		success: function (data) {
			libraries=data;
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
function setUserMe() {
    getUser();
    $("#user-header").html(user.name);
}
function callUpdate() {
    sessionId=readCookie("JSESSIONID");
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
  		success: function (data) {
            console.log("onboarded");
  		},
  		error: function (q, status, err) {
  			if (status == "timeout") {
  				alert("Request timed out");
  			} else {
  				alert("Some issue happened with your request: "  +status + err);
  			}
  		}
  	});
}
function updateUserOnboard() {
  name = user.name
  email = null;
  current =  user.location; //if not redirect
  var bg = $('.account-avatar-wrapper').css('background-image');
  if(bg == null) {
    avatarImage = user.avatarImage;
  } else {
    bg = bg.replace('url(','').replace(')','');
    avatarImage = bg
  }
  bg = $('#onboard-photos-overlay').css('background-image');
  if(bg == null) {
    coverImage = null;
  } else {
        bg = bg.replace('url(','').replace(')','');
        coverImage = bg;
   }
  displayName = $('#user-name').html();
  personalWebsite = null;
  bio = $('#user-bio').html();
  tags = null;
  fb = null;
  gp = null;
  twt = null;
  isPublic = true;
  callUpdate();
};
function getUser() {
     sessionId=readCookie("JSESSIONID");
	$.ajax({
		url: "/api/users/getUser",
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		type: "POST",
		data: {
			sessionId: sessionId
		},
		success: function (data) {
			user=data;
			load();
		},
		error: function (q, status, err) {
			if (status == "timeout") {
				alert("Request timed out");
			} else {
				alert("Some issue happened with your request: " + err);
			}
		}
	});
	return null;
}

$(document).on("click" , ".library-list-wrapper ul li button", function (ev) {
	e = $(this).closest("button");
	library = e.parent().parent();
	libraryId = library.attr("id");
    libraryId =parseInt(libraryId);
	sessionId = readCookie("JSESSIONID");
	if (e.html() == "Subscribe") {
	    console.log("unsubscribe");
		$.ajax({
			url: "/api/actions/removeSubscriptionLibrary",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId,
				libraryId: libraryId
			},
			success: function (data) {
				console.log(data);
			},
			error: function (q, status, err) {
				if (status == "timeout") {
					alert("Request timed out");
				} else {
					alert("Some issue happened with your request: " + err);
				}
			}
		});
	} else if (e.html() == "Unsubscribe" ){
	    console.log("subscribe");
		$.ajax({
			url: "/api/actions/subscribeLibrary",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId,
				libraryId: libraryId
			},
			success: function (data) {
				console.log(data);
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
});
