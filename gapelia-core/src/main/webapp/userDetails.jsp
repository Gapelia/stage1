<%@ page import="com.gapelia.core.auth.SocialAuth" %>
<%
    String js = SocialAuth.getProfileDetails(session);
%>
<%= js %>