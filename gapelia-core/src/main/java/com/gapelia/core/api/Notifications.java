package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseMetric;
import com.gapelia.core.database.QueryDatabaseNotifications;
import com.gapelia.core.model.BookNotification;
import com.gapelia.core.model.LibraryNotification;
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
    @Path("getAlreadySubmitted")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getAlreadySubmitted(@FormParam("sessionId") String sessionId,
                                      @FormParam("libraryId") int libraryId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getAlreadySubmitted(u, libraryId));
    }

    @Path("getNotificationsLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNotificationsLibraries(@FormParam("sessionId") String sessionId,
                                            @FormParam("libraryId") int libraryId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getLibraryNotifications(u, libraryId));
    }

    @Path("getAllSubmissions")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getAllSubmissions(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getAllSubmissions(u));
    }

    @Path("getAllResponses")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getAllResponses(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getAllResponses(u));
    }

    @Path("createLibraryNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createLibraryNotification(@FormParam("sessionId") String sessionId,
                                            @FormParam("recipient") int recipient,
                                            @FormParam("bookId") int bookId,
                                            @FormParam("referencedLibrary") int referencedLibrary,
                                            @FormParam("sender") int sender,
                                            @FormParam("message") String message) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        LibraryNotification libraryNotification = new LibraryNotification();
        libraryNotification.setBookId(bookId);
        libraryNotification.setRecipientUserId(recipient);
        libraryNotification.setSenderUserId(sender);
        libraryNotification.setAccepted(false);
        libraryNotification.setLibraryId(referencedLibrary);
        libraryNotification.setMessage(message);
        java.util.Date date = new java.util.Date();
        libraryNotification.setDateSend(new Timestamp(date.getTime()));
        libraryNotification.setAccepted(false);
        return gson.toJson(QueryDatabaseNotifications.createLibraryNotification(libraryNotification));
    }

    @Path("acceptLibraryNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String acceptLibraryNotification(@FormParam("sessionId") String sessionId,
                                             @FormParam("notificationId") int notificationId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);

		LibraryNotification n = QueryDatabaseNotifications.getLibraryNotification(notificationId);
		Email.sendAcceptanceToLibraryEmail(u,n);
        return gson.toJson(QueryDatabaseNotifications.acceptLibraryNotification(notificationId,u));
    }

    @Path("rejectLibraryNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String rejectLibraryNotification(@FormParam("sessionId") String sessionId,
                                             @FormParam("notificationId") int notificationId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.rejectLibraryNotification(notificationId,u));
    }

    @Path("removeLibraryNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String removeLibraryNotification(@FormParam("sessionId") String sessionId,
                                            @FormParam("notificationId") int notificationId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.removeLibraryNotification(notificationId));
    }

    @Path("getNotificationsBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNotificationsBooks(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getBookNotification(u));
    }

    @Path("getAllreadySubmitted")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getAllreadySubmitted(@FormParam("sessionId") String sessionId,
                                       @FormParam("libraryId") int libraryId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getSubmitted(u, libraryId));
    }

    @Path("createBookNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createBookNotification(@FormParam("sessionId") String sessionId,
                                         @FormParam("recipient") int recipient,
                                         @FormParam("referencedBook") int referencedBook,
                                         @FormParam("sender") int sender) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        BookNotification bookNotifications = new BookNotification();
        bookNotifications.setRecipientUserId(recipient);
        bookNotifications.setBookId(referencedBook);
        bookNotifications.setSenderUserId(sender);
        bookNotifications.setAccepted(false);
        java.util.Date date = new java.util.Date();
        bookNotifications.setDateSend(new Timestamp(date.getTime()));
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.createBookNotification(bookNotifications));
    }

    @Path("removeBookNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String removeBookNotification(@FormParam("sessionId") String sessionId,
                                          @FormParam("notificationId") int notificationId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.removeBookNotification(notificationId));
    }
}

