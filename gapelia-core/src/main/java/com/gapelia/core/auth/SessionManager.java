package com.gapelia.core.auth;

import com.gapelia.core.model.User;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.HashMap;
import java.util.Map;

public class SessionManager implements HttpSessionListener {
    public static Logger LOG = Logger.getLogger(SessionManager.class);
	private static final Map<String, HttpSession> sessions = new HashMap<String, HttpSession>();
    private static final Map<String, User> sessionIdToUser = new HashMap<String, User>();
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		sessions.put(session.getId(), session);
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		LOG.info("session destroyed :"  + event.getSession().getId());
		sessions.remove(event.getSession().getId());
        sessionIdToUser.remove(event.getSession().getId());
	}

	public static HttpSession find(String sessionId) {
        return sessions.get(sessionId);
	}

    public static void addSessionIdToUser(User user, HttpSession sessionId) {
        sessionIdToUser.put(sessionId.getId(), user);
		sessionId.setMaxInactiveInterval(604800);   //set the session to expire in one week (604800 seconds)
    }

    public static User getUserFromSessionId(String sessionId) {
        return sessionIdToUser.get(sessionId);
    }

	public static String getSessionsString() {
		StringBuffer sb = new StringBuffer();
		for (Map.Entry entry : sessions.entrySet()) {
			String sessionId = (String) entry.getKey();
			HttpSession session = (HttpSession) entry.getValue();
			sb.append("SessionId: " + sessionId).append("\n");
			sb.append("Session: " + session.toString()).append("\n\n");
		}
		return sb.toString();
	}
}
