package com.gapelia.core.auth;

import com.gapelia.core.database.QueryDatabaseUser;
import org.apache.log4j.Logger;
import org.brickred.socialauth.*;
import org.brickred.socialauth.util.BirthDate;
import org.brickred.socialauth.util.SocialAuthUtil;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Map;

public class AuthSuccessHandler extends HttpServlet {
	public static Logger LOG = Logger.getLogger(AuthSuccessHandler.class);
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = request.getSession();

			// get the social auth manager from session
			SocialAuthManager manager = (SocialAuthManager)session.getAttribute("authManager");
			Profile profile = null;

			
				// call connect method of manager which returns the provider object.
				// Pass request parameter map while calling connect method.
				Map requestMap = SocialAuthUtil.getRequestParametersMap(request);
				AuthProvider provider = manager.connect(requestMap);

				// get profile
			profile = provider.getUserProfile();
			// setup session
			session.setAttribute("login", "true");
			session.setAttribute("profile", profile);
			// session.setMaxInactiveInterval(-1);

			Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
			sessionCookie.setMaxAge(31557600);
			response.addCookie(sessionCookie);

			// RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/me");
			// dispatcher.forward(request, response);
			boolean isntFirstTime = QueryDatabaseUser.checkUser(profile);

			if (!isntFirstTime) {
				response.sendRedirect("/me");
				return;
			} else {
				response.sendRedirect("/onboard");
			}

		} catch (Exception e) {
			throw new ServletException(e);
		}
	}
}
