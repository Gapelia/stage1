<%@ page import="java.util.Enumeration" %>
<%
	String isLoggedIn = (String) session.getAttribute("login");
	if (null == isLoggedIn || "false".equals(isLoggedIn)) {
		response.sendRedirect("/");
	}
%>