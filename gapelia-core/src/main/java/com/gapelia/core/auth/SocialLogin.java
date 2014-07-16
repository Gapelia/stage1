package com.gapelia.core.auth;

import org.apache.log4j.Logger;
import org.brickred.socialauth.Permission;
import org.brickred.socialauth.SocialAuthConfig;
import org.brickred.socialauth.SocialAuthManager;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;

import static com.gapelia.core.auth.AuthHelper.APP_FACEBOOK;
import static com.gapelia.core.auth.AuthHelper.APP_GOOGLE;

public class SocialLogin extends HttpServlet {
	public static Logger LOG = Logger.getLogger(SocialLogin.class);
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			SocialAuthConfig config = SocialAuthConfig.getDefault();
			SocialAuthManager manager = new SocialAuthManager();

			String mode = null;
			String hostName;
			try {
				mode = System.getProperty("gapeliaMode");
			} catch (Exception ex) {
				// Ignore mode is null
			}
			if (null != mode && "local".equals(mode)) {
				hostName = "http://localhost:8080";
				config.load("oauth_consumer_local.properties");
			}
			else if (null != mode && "dev".equals(mode)) {
				config.load("oauth_consumer_dev.properties");
				hostName = "http://ec2-54-237-41-229.compute-1.amazonaws.com";
			}
			else {
				config.load();
				hostName = "http://folio.is";
			}

			manager.setSocialAuthConfig(config);

			String successUrl = hostName + "/success;jsessionid=" + request.getSession().getId();
			String type = request.getParameter("type");

			String url = null;
			if (APP_FACEBOOK.equals(type)) {
				url = manager.getAuthenticationUrl(APP_FACEBOOK, successUrl, Permission.AUTHENTICATE_ONLY);
			} else {
				successUrl = hostName + "/success";
				url = manager.getAuthenticationUrl(APP_GOOGLE, successUrl, Permission.AUTHENTICATE_ONLY);
			}

			Cookie sessionCookie = new Cookie("JSESSIONID", request.getSession().getId());
			LOG.info("social login making cookie for jsessionid:"+request.getSession().getId());
			sessionCookie.setMaxAge(30000000);
			response.addCookie(sessionCookie);

			HttpSession session = request.getSession();
			session.setAttribute("authManager", manager);
			response.sendRedirect(response.encodeRedirectURL(url));
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

}