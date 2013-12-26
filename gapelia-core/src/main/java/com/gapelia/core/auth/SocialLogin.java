package com.gapelia.core.auth;

import org.apache.log4j.Logger;
import org.brickred.socialauth.Permission;
import org.brickred.socialauth.SocialAuthConfig;
import org.brickred.socialauth.SocialAuthManager;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.net.InetAddress;

import static com.gapelia.core.auth.AuthHelper.APP_FACEBOOK;
import static com.gapelia.core.auth.AuthHelper.APP_GOOGLE;
import static com.gapelia.core.auth.AuthHelper.APP_TWITTER;

/**
 * User: Abhishek Tiwari
 * Date: 6/12/13
 * Time: 12:55 AM
 * Copyright Gapelia
 */
public class SocialLogin extends HttpServlet {
	public static Logger LOG = Logger.getLogger(SocialLogin.class);
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//Create an instance of SocialAuthConfig object
			SocialAuthConfig config = SocialAuthConfig.getDefault();
			LOG.info("Creating social auth config");

			//load configuration. By default load the configuration from oauth_consumer.properties.
			//You can also pass input stream, properties object or properties file name.
			config.load();

			//Create an instance of SocialAuthManager and set config
			SocialAuthManager manager = new SocialAuthManager();
			manager.setSocialAuthConfig(config);
			LOG.info("Creating social auth manager");

			// URL of YOUR application which will be called after authentication
			String hostName = InetAddress.getLocalHost().getHostName();
			String mode = null;
			try {
				mode = System.getProperty("gapeliaMode");
			} catch (Exception ex) {
				// Ignore mode is null
			}

			if (null != mode && "local".equals(mode)) {
				hostName = "http://localhost:8080";
			} else {
				hostName = "http://gapelia-dev.herokuapp.com";
			}
			String successUrl = hostName + "/success;jsessionid=" + request.getSession().getId();
			LOG.info("Social auth succesUrl: " + successUrl);

			String type = request.getParameter("type");
			LOG.info("Auth type: " + type);

			// get Provider URL to which you should redirect for authentication.
			// id can have values "facebook", "twitter", "yahoo" etc. or the OpenID URL
			String url = null;

			if (APP_FACEBOOK.equals(type)) {
				url = manager.getAuthenticationUrl(APP_FACEBOOK, successUrl, Permission.AUTHENTICATE_ONLY);
			} else if (APP_TWITTER.equals(type)) {
				url = manager.getAuthenticationUrl(APP_TWITTER, successUrl, Permission.AUTHENTICATE_ONLY);
			} else {
				url = manager.getAuthenticationUrl(APP_GOOGLE, successUrl, Permission.AUTHENTICATE_ONLY);
			}

			if (null != mode && "local".equals(mode)) {
				LOG.info("Local mode. Switching to dummy user.");
				response.sendRedirect(response.encodeRedirectURL(successUrl));
				return;
			}

			LOG.info("Redirecting to url: " + url);
			HttpSession session = request.getSession();
			session.setAttribute("authManager", manager);
			response.sendRedirect(response.encodeRedirectURL(url));
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

}
