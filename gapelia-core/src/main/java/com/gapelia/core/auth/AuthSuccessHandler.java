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
			HttpSession session = null;
			for(Cookie c : request.getCookies()){
				LOG.info(c.getName() + c.getValue());
				if(c.getName().equals("JSESSIONID"))
					session = SessionManager.find(c.getValue());
			}

			SocialAuthManager manager = (SocialAuthManager)session.getAttribute("authManager");
			Profile profile = null;
			Map requestMap = SocialAuthUtil.getRequestParametersMap(request);
			AuthProvider provider;
			try{
				provider = manager.connect(requestMap);
			}catch(Exception e ){
				LOG.warn("user trying to log in with other social media account...redirecting." + e.getMessage());
				response.sendRedirect("/");
				return;
			}

			profile = provider.getUserProfile();
			session.setAttribute("login", "true");
			session.setAttribute("profile", profile);
			Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
            LOG.info("AUTH SUCCESS JSESSION:"+session.getId());
			sessionCookie.setMaxAge(31557600);
			response.addCookie(sessionCookie);
            String answer = QueryDatabaseUser.checkUser(profile, session.getId());
            LOG.info("Answer is :" + answer);
			if (answer =="Success") {
				response.sendRedirect("/me");
				return;
			} else if(answer == "New") {
				response.sendRedirect("/onboard");
			}
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}
}