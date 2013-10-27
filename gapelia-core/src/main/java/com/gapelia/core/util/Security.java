package com.gapelia.core.util;

import org.apache.log4j.Logger;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 5:13 PM
 * Copyright Gapelia Inc
 */
public class Security {
	public static Logger LOG = Logger.getLogger(Security.class);
	
	public static String getUserIdFromSessionId(String sessionId) {
		LOG.info("Session Id received: " + sessionId);
		String id = "11011";
		LOG.info("User Id obtained: " + id);
		return id;
	}
}
