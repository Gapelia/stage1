package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;

public class APIUtil {
    public static String INVALID_SESSION_ERROR_MSG = "SessionID is not valid/Associated with a user";
    public static boolean isValidSession(String sessionId) {
        if(SessionManager.getUserFromSessionId(sessionId)!=null) {
            return true;
        }
        return false;
    }
}


