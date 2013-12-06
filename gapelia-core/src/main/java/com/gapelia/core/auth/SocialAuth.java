package com.gapelia.core.auth;

import org.brickred.socialauth.Profile;

import javax.servlet.http.HttpSession;

/**
 * User: Abhishek Tiwari
 * Date: 5/12/13
 * Time: 11:36 PM
 * Copyright Gapelia
 */
public class SocialAuth {
	public static final String APP_FACEBOOK = "facebook";
	public static final String APP_GOOGLE = "google";
	public static final String APP_TWITTER = "twitter";
	
	public static String getProfileDetails(HttpSession session) {
		Profile profile = (Profile) session.getAttribute("profile");
		if (profile == null)
			return "";
		String email = profile.getEmail();
		String fullName = profile.getFullName();
		String firstName = profile.getFirstName();
		String lastName = profile.getLastName();
		String location = profile.getLocation();
		String gender = profile.getGender();
		String dob = "";
		String image = profile.getProfileImageURL();
		String displayName = profile.getDisplayName();

		StringBuffer basicJs = new StringBuffer();
		basicJs.append("<script> \n");
		basicJs.append("\tvar _email = '").append(email).append("'; \n");
		basicJs.append("\tvar _fullName = '").append(fullName).append("'; \n");
		basicJs.append("\tvar _dob = '").append(dob).append("'; \n");
		basicJs.append("\tvar _gender = '").append(gender).append("'; \n");
		basicJs.append("\tvar _location = '").append(location).append("'; \n");
		basicJs.append("\tvar _image = '").append(image).append("'; \n");
		basicJs.append("\tvar _displayName = '").append(displayName).append("'; \n");
		basicJs.append("</script> \n");

		return basicJs.toString();
	}
}
