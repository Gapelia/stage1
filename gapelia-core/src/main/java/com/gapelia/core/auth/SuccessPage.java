package com.gapelia.core.auth;

import org.apache.log4j.Logger;
import org.brickred.socialauth.*;
import org.brickred.socialauth.util.SocialAuthUtil;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

/**
 * User: Abhishek Tiwari
 * Date: 6/12/13
 * Time: 1:30 AM
 * Copyright Gapelia
 */
public class SuccessPage extends HttpServlet {
	public static Logger LOG = Logger.getLogger(SuccessPage.class);
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = request.getSession();

			// get the social auth manager from session
			SocialAuthManager manager = (SocialAuthManager)session.getAttribute("authManager");

			// call connect method of manager which returns the provider object.
			// Pass request parameter map while calling connect method.
			Map requestMap = SocialAuthUtil.getRequestParametersMap(request);
			AuthProvider provider = manager.connect(requestMap);

			// get profile
			Profile profile = provider.getUserProfile();

			// setup session
			session.setAttribute("login", "true");
			session.setAttribute("profile", profile);

			RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/me");
			dispatcher.forward(request, response);

		} catch (Exception e) {
			throw new ServletException(e);
		}
	}
}
