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

function quickUpdateUser() {
  name = user.name
  email = user.email;
  current =  user.location; //if not redirect
  avatarImage = $(".avatar-wrapper").
  coverImage = user.coverImage
  displayName = user.displayName;
  personalWebsite = user.personalWebsite;
  bio = $('#splash-user-bio').html();
  tags = user.tags;
  fb = user.fb;
  gp = user.gp;
  twt = user.twt;
  isPublic = user.isPublic;
  callUpdate();
};
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
				alert("Some issue happened with your request: " + err.message);
			}
		}
	});
}
function callUpdate() {
    sessionId=readCookie("JSESSIONID");
    if (user.tags==undefined) {
      tags=null;
    } 
    if( user.email == null) {
      email =null;
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
  name = user.name
  email = null;
  current =  user.location; //if not redirect
  var bg = $('.account-avatar-wrapper').css('background-image');
  if(bg == null) {
    avatarImage = user.avatarImage;
  } else {
    bg = bg.replace('url(','').replace(')','');
    avatarImage = bg;
  }
  bg = $('#onboard-photos-overlay').css('background-image');
  if(bg == null) {
    coverImage = '/static/images/cover-bg.jpg';
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
				alert("Some issue happened with your request: " + err.message);
			}
		}
	});
	return null;
}
function quickUpdateUser() {
  name = user.name
  email = user.email;
  current =  user.location; //if not redirect
  image = $(".avatar-wrapper img").attr("src");
  if (image.substring(0,26) == 'http://graph.facebook.com/') {
    image = image+"?height=1000&width=1000"
  }
  avatarImage = image;
  image = $("#user-splash").css("background-image");
  image = image.replace('url(','').replace(')','');
  if (image.substring(0,26) == 'http://graph.facebook.com/') {
    image = image+"?height=1000&width=1000"
  }
  coverImage = image;
  displayName = user.displayName;
  personalWebsite = user.personalWebsite;
  bio = $('#splash-user-bio').html();
  tags = user.tags;
  fb = user.fb;
  gp = user.gp;
  twt = user.twt;
  isPublic = user.isPublic;
  callUpdate();
};

function getUserAccounts() {
    if(user.email!=undefined&&user.email!='') {
        document.getElementById('user-email').value=user.email;
    }
    if(user.displayName!=undefined&&user.displayName!='') {
        document.getElementById('user-name').value=user.displayName;
    }
    if(user.location!=undefined&&user.location!='') {
        document.getElementById('user-location').value=user.location;
    }
    if(user.personalWebsite!=undefined&&user.personalWebsite!='') {
       document.getElementById('user-personal-website').value=user.personalWebsite;
    }
    if(user.twt!=undefined&&user.twt!='') {
        document.getElementById('user-twt').value=user.twt;
    }
    if(user.fb!=undefined&&user.fb!='') {
        document.getElementById('user-fb').value=user.fb;
    }
    if(user.gp!=undefined&&user.gp!='') {
        document.getElementById('user-gp').value=user.gp;
    }
}
function updateUser() {
    name=user.name;
    inputBox = document.getElementById('user-name');
    displayName=inputBox.value;
    inputBox = document.getElementById('user-email');
    email=inputBox.value;
    inputBox = document.getElementById('user-location');
    current=inputBox.value;
    bg = $(".account-avatar-wrapper").css("background-image");
    image = bg.replace('url(','').replace(')','');
        if (image.substring(0,26) == 'http://graph.facebook.com/') {
            image = image+"?height=1000&width=1000"
        }
        avatarImage = image;
    avatarImage = image;
    coverImage = user.coverImage;
    bio = user.bio;
    tags = user.tags;
    inputBox = document.getElementById('user-personal-website');
    personalWebsite=inputBox.value;
    inputBox = document.getElementById('user-fb');
    fb=inputBox.value;
    inputBox = document.getElementById('user-gp');
    gp=inputBox.value;
    inputBox = document.getElementById('user-twt');
    twt=inputBox.value;
    isPublic = user.isPublic;
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
$(document).on("click" , ".library-list-wrapper ul li button", function (ev) {
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
	} else if (e.html() == "Subscribe" ) {
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

$(document).on("click", ".update-user", function () {
    updateUser();
});
