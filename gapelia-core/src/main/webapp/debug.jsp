<%@ page import="com.gapelia.core.auth.SessionManager" %>
<% String sessionInfo = SessionManager.getSessionsString(); %>
<%= sessionInfo %>