package com.gapelia.core.auth;

import org.brickred.socialauth.Profile;
import org.brickred.socialauth.util.BirthDate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * User: Abhishek Tiwari
 * Date: 5/12/13
 * Time: 11:36 PM
 * Copyright Gapelia
 */
public class AuthHelper {
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
		String image = profile.getProfileImageURL();
		String displayName = profile.getDisplayName();
		String validatedId = profile.getValidatedId();
		String providerId = profile.getProviderId();

		if (null == fullName)
			fullName = firstName + " " + lastName;
		String dob = "";
		if (profile.getDob() != null) {
			BirthDate bd = profile.getDob();
			dob = bd.toString();
		}

		StringBuffer basicJs = new StringBuffer();
		basicJs.append("<script> \n");
		basicJs.append("\tvar _email = '").append(email).append("'; \n");
		basicJs.append("\tvar _fullName = '").append(fullName).append("'; \n");
		basicJs.append("\tvar _dob = '").append(dob).append("'; \n");
		basicJs.append("\tvar _gender = '").append(gender).append("'; \n");
		basicJs.append("\tvar _location = '").append(location).append("'; \n");
		basicJs.append("\tvar _image = '").append(image).append("'; \n");
		basicJs.append("\tvar _displayName = '").append(displayName).append("'; \n");
		basicJs.append("\tvar _validatedId = '").append(validatedId).append("'; \n");
		basicJs.append("\tvar _providerId = '").append(providerId).append("'; \n");
		basicJs.append("</script> \n");

		return basicJs.toString();
	}
	
	public static boolean isSessionAvailable(HttpServletRequest request) {
		if ("true".equals((String)request.getSession().getAttribute("login")))
			return true;
		Cookie[] cookies = request.getCookies();
		if (null == cookies) {
			return false;
		}
		for (Cookie cookie : cookies) {
			if ("JSESSIONID".equals(cookie.getName())) {
				String sessionId = cookie.getValue();
				HttpSession oldSession = SessionManager.find(sessionId);
				HttpSession newSession = request.getSession();
				boolean previousLogin = false;
				if (null != oldSession && null != oldSession.getAttribute("profile")) {
					newSession.setAttribute("profile", oldSession.getAttribute("profile"));
				}
				if (null != oldSession && null != oldSession.getAttribute("login")) {
					newSession.setAttribute("login", oldSession.getAttribute("login"));
					previousLogin = true;
				}
				if (previousLogin) {
					return true;
				}
				break;
			}
		}
		return false;
	}
}
