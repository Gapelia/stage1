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
	var sessionId=readCookie("JSESSIONID");
	$.ajax({
		url: "http://localhost:8080/api/libraries/getMainLibraries",
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
function month(month) {
    if(month=='Jan') {
        return 0;
    } else if(month=='Feb') {
        return 1;
    } else if(month=='Mar') {
        return 2;
    }
}

function dateHelper(dob) {
    if (dob== null) {
        return null;
    }
    var todate = user.dob.split(" ");
    return d = todate[2] + "-" + month(todate[0]) + "-" + todate[1].replace(',','') + " 00:00:00";
}
function callUpdate() {
    var sessionId=readCookie("JSESSIONID");
  	$.ajax({
  		url: "http://localhost:8080/api/users/updateUser",
  		contentType: "application/x-www-form-urlencoded;charset=utf-8",
  		type: "POST",
  		data: {
  			sessionId: sessionId,
  			name: name,
  			email: email,
  			dob: dob,
  			gender: gender,
  			location: currentlocation,
  		    avatarImage: avatarImage,
  			coverImage: coverImage,
  			displayName: displayName,
  			validatedId: validatedId,
  			providerId: providerId,
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
  dob = dateHelper(user.dob);
  gender = user.gender;
  currentlocation =  user.location; //if not redirect
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
  validatedId = user.validatedId;
  providerId = user.providerId;
  personalWebsite = null;
  bio = $('#user-bio').html();
  tags = null;
  fb = null;
  gp = null;
  twt = null;
  isPublic = true;
};
function getUser() {
	var sessionId=readCookie("JSESSIONID");
	$.ajax({
		url: "http://localhost:8080/api/users/getUser",
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
	var e = $(this).closest("button");
	var library = e.parent().parent();
	var libraryId = library.attr("id");
	var sessionId = readCookie("JSESSIONID");
	console.log(libraryId+sessionId);
	if (e.html() == "Subscribe") {
		$.ajax({
			url: "http://localhost:8080/api/actions/removeSubscriptionLibrary",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId,
				bookId: libraryId
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
		$.ajax({
			url: "http://localhost:8080/api/actions/subscribeLibrary",
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			type: "POST",
			data: {
				sessionId: sessionId,
				bookId: libraryId
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
