package com.gapelia.core.auth;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.HashMap;
import java.util.Map;

/**
 * User: Abhishek Tiwari
 * Date: 6/12/13
 * Time: 9:55 PM
 * Copyright Nuance Communications
 */
public class SessionManager implements HttpSessionListener {
	private static final Map<String, HttpSession> sessions = new HashMap<String, HttpSession>();

	@Override
	public void sessionCreated(HttpSessionEvent event) {
		HttpSession session = event.getSession();
		sessions.put(session.getId(), session);
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		sessions.remove(event.getSession().getId());
	}

	public static HttpSession find(String sessionId) {
		return sessions.get(sessionId);
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
