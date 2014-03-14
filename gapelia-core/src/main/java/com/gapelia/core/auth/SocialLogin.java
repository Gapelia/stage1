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

public class SocialLogin extends HttpServlet {
	public static Logger LOG = Logger.getLogger(SocialLogin.class);
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			SocialAuthConfig config = SocialAuthConfig.getDefault();
			config.load();
			SocialAuthManager manager = new SocialAuthManager();
			manager.setSocialAuthConfig(config);
			String hostName = InetAddress.getLocalHost().getHostName();
			String mode = null;
			try {
				mode = System.getProperty("gapeliaMode");
			} catch (Exception ex) {
				// Ignore mode is null
				LOG.error(ex.getMessage());
            }
			if (null != mode && "local".equals(mode)) {
				hostName = "http://localhost:8080";
				response.sendRedirect("/me");
			} else {
				hostName = "http://gapss-609817464.us-west-2.elb.amazonaws.com";
			}
			String successUrl = hostName + "/success?jsessionid=" + request.getSession().getId();
			String type = request.getParameter("type");
			String url = null;
			if (APP_FACEBOOK.equals(type)) {
				url = manager.getAuthenticationUrl(APP_FACEBOOK, successUrl, Permission.AUTHENTICATE_ONLY);
				LOG.info("Facebook Login chosen: " + successUrl);
			} else {
				url = manager.getAuthenticationUrl(APP_GOOGLE, successUrl, Permission.AUTHENTICATE_ONLY);
				LOG.info("Google Login chosen: " + successUrl);
			}
			if (null != mode && "local".equals(mode)) {
				response.sendRedirect("/me");
				response.sendRedirect(response.encodeRedirectURL(successUrl));
				return;
			}
			HttpSession session = request.getSession();

			LOG.info("is manager null? " + (manager == null));

			session.setAttribute("authManager", manager);
			response.sendRedirect(response.encodeRedirectURL(url));
		} catch (Exception e) {
			LOG.error(e.getMessage());
			throw new ServletException(e);
		}
	}

}
