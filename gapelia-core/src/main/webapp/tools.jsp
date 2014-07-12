<%@ page import="com.gapelia.core.auth.SessionManager" %>
<%@ page import="com.gapelia.core.model.User" %>
<%@ page import="com.gapelia.core.database.QueryUtils" %>
<%@ page import="com.gapelia.core.database.QueryDatabaseBook" %>
<%@ page import="com.gapelia.core.database.QueryDatabaseLibrary" %>

<%!
public Integer getUserIdFromCookie(HttpServletRequest request) {
    Integer userId = null;
    Cookie cookie = null;
    Cookie[] cookies = null;
    // Get an array of Cookies associated with this domain
    cookies = request.getCookies();
    if( cookies != null ){
      for (int i = 0; i < cookies.length; i++){
        cookie = cookies[i];

        //FIXME: probably ugly Javacode ... ?
        try {
            userId = SessionManager.getUserFromSessionId(cookie.getValue()).getUserId();
            throw new RuntimeException(cookie.getName());
        } catch(RuntimeException e) {}
      }
    }
    return userId;
}

public String getUrl(HttpServletRequest request) {
    String currentURL = null;
    if( request.getAttribute("javax.servlet.forward.request_uri") != null ){
        currentURL = (String)request.getAttribute("javax.servlet.forward.request_uri");
    }
    return currentURL;
}

public Integer getIdFromUrl(HttpServletRequest request) {

    String currentURL = getUrl(request);
    String urlBookId = currentURL.substring(currentURL.lastIndexOf('/')+1);
    Integer bookId = Integer.parseInt(urlBookId.split("\\?")[0]);

    return bookId;
}

public Boolean isValidBookId(Integer bookId) {
   return QueryDatabaseBook.isValidBookId(bookId);
}

public Boolean isValidLibraryId(Integer libraryId) {
   return QueryDatabaseLibrary.isValidLibraryId(libraryId);
}

%>