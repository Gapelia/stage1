<% page import="com.gapelia.core.auth.AuthHelper" %>
<% 
	String js = AuthHelper.getProfileDetails(session);
%>
<% = js %>