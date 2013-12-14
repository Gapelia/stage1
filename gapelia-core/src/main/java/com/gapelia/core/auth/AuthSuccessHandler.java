package com.gapelia.core.auth;

import com.gapelia.core.database.Query;
import org.apache.log4j.Logger;
import org.brickred.socialauth.*;
import org.brickred.socialauth.util.BirthDate;
import org.brickred.socialauth.util.SocialAuthUtil;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Map;

/**
 * User: Abhishek Tiwari
 * Date: 6/12/13
 * Time: 1:30 AM
 * Copyright Gapelia
 */
public class AuthSuccessHandler extends HttpServlet {
	public static Logger LOG = Logger.getLogger(AuthSuccessHandler.class);
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = request.getSession();

			// get the social auth manager from session
			SocialAuthManager manager = (SocialAuthManager)session.getAttribute("authManager");
			Profile profile = null;

			String mode = System.getProperty("gapeliaMode");

			if (null != mode && "local".equals(mode)) {
				// get profile
				profile = getDummyProfile();
			} else {
				// call connect method of manager which returns the provider object.
				// Pass request parameter map while calling connect method.
				Map requestMap = SocialAuthUtil.getRequestParametersMap(request);
				AuthProvider provider = manager.connect(requestMap);

				// get profile
				profile = provider.getUserProfile();
			}
			// setup session
			session.setAttribute("login", "true");
			session.setAttribute("profile", profile);
			//session.setMaxInactiveInterval(-1);

			Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
			sessionCookie.setMaxAge(31557600);
			response.addCookie(sessionCookie);

//			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/me");
//			dispatcher.forward(request, response);

			boolean isFirstTime = Query.checkProfile(profile);

			if (isFirstTime) {
				response.sendRedirect("/onboard");
				return;
			}
			response.sendRedirect("/me");

		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

	private Profile getDummyProfile() {
		Profile profile = new Profile();
		profile.setCountry("Japan");
		profile.setDisplayName("Tom Hanks");
		profile.setDob(new BirthDate());
		profile.setEmail("atiwari@gapelia.com");
		profile.setGender("Male");
		profile.setFirstName("Tom");
		profile.setLastName("Hanks");
		profile.setLanguage("en-us");
		profile.setLocation("Boston");
		profile.setProviderId("1234567");
		profile.setProfileImageURL("https://scontent-a-iad.xx.fbcdn.net/hphotos-ash2/180323_10150140302526321_780884_n.jpg");
		profile.setValidatedId("1234567");
		return profile;
	}
}
