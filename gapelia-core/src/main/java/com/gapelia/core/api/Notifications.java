package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseActions;
import com.gapelia.core.database.QueryDatabaseNotifications;
import com.gapelia.core.model.BookNotifications;
import com.gapelia.core.model.LibraryNotifications;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Timestamp;

@Path("/notifications/")
public class Notifications {
    private static Logger LOG = Logger.getLogger(Notifications.class);

    @Path("getNotificationsUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNotificationsUser(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return QueryDatabaseNotifications.getUserNotifications(u);
    }

    @Path("getBooksSumbitedToLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBooksSumbitedToLibrary(@FormParam("sessionId") String sessionId,
                                            @FormParam("libraryId") int libraryId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return QueryDatabaseNotifications.getBooksSubmitted(u, libraryId);
    }



    @Path("createBookNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createBookNotification(@FormParam("sessionId") String sessionId,
                                         @FormParam("recipient") int recipient,
                                         @FormParam("referencedBook")int referencedBook,
                                         @FormParam("sender") int sender) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        BookNotifications bookNotifications = new BookNotifications();
        bookNotifications.setRecipientUserId(recipient);
        bookNotifications.setBookId(referencedBook);
        bookNotifications.setSenderUserID(sender);
        bookNotifications.setAccepted(false);
        java.util.Date date= new java.util.Date();
        bookNotifications.setDateSend(new Timestamp(date.getTime()));

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        //return QueryDatabaseActions.bookmarkBook(u, bookId);
        return null;
    }

    @Path("createLibraryNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createLibraryNotification(@FormParam("sessionId") String sessionId,
                                            @FormParam("recipient") int recipient,
                                            @FormParam("bookId") int bookId,
                                            @FormParam("referencedLibrary")int referencedLibrary,
                                            @FormParam("sender") int sender) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        LibraryNotifications libraryNotifications = new LibraryNotifications();
        libraryNotifications.setBookId(bookId);
        libraryNotifications.setRecipientUserId(recipient);
        libraryNotifications.setSenderUserID(sender);
        libraryNotifications.setAccepted(false);
        libraryNotifications.setLibraryId(referencedLibrary);
        java.util.Date date= new java.util.Date();
        libraryNotifications.setDateSend(new Timestamp(date.getTime()));
        libraryNotifications.setAccepted(false);
        //return QueryDatabaseActions.bookmarkBook(u, bookId);
        return null;
    }

    @Path("respondLibraryNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String respondLibraryNotification(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        //return QueryDatabaseActions.bookmarkBook(u, bookId);
        return null;
    }

    @Path("respondBookNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String respondBookNotification(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        //return QueryDatabaseActions.bookmarkBook(u, bookId);
        return null;
    }



}

