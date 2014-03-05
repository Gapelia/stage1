package com.gapelia.core.auth;

import com.gapelia.core.database.QueryDatabaseUser;
import org.apache.log4j.Logger;
import org.brickred.socialauth.*;
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
			SocialAuthManager manager = (SocialAuthManager)session.getAttribute("authManager");
			Profile profile = null;
			Map requestMap = SocialAuthUtil.getRequestParametersMap(request);
			AuthProvider provider = manager.connect(requestMap);
			profile = provider.getUserProfile();
			session.setAttribute("login", "true");
			session.setAttribute("profile", profile);
			Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
			sessionCookie.setMaxAge(31557600);
			response.addCookie(sessionCookie);
			if (QueryDatabaseUser.checkUser(profile)) {
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
