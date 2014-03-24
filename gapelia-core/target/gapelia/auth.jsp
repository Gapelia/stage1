<%@ page import="com.gapelia.core.auth.AuthHelper" %>
<%
if (!AuthHelper.isSessionAvailable(request)) {
response.sendRedirect("/");
}
%>