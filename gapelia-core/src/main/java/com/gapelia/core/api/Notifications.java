package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
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
        LibraryNotifications libraryNotifications = new LibraryNotifications();
        libraryNotifications.setBookId(bookId);
        libraryNotifications.setRecipientUserId(recipient);
        libraryNotifications.setSenderUserId(sender);
        libraryNotifications.setAccepted(false);
        libraryNotifications.setLibraryId(referencedLibrary);
        libraryNotifications.setMessage(message);
        java.util.Date date = new java.util.Date();
        libraryNotifications.setDateSend(new Timestamp(date.getTime()));
        libraryNotifications.setAccepted(false);
        return gson.toJson(QueryDatabaseNotifications.createLibraryNotification(libraryNotifications));
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
        return gson.toJson(QueryDatabaseNotifications.acceptLibraryNotification(notificationId));
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
        return gson.toJson(QueryDatabaseNotifications.rejectLibraryNotification(notificationId));
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

    /*
    @Path("getNotificationsBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNotificationsBooks(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getBookNotifications(u));
    }

    @Path("getAcceptedBookNotifications")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getAccpetedNotificationsBooks(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.getAcceptedBookNotifications(u));
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
        BookNotifications bookNotifications = new BookNotifications();
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

    @Path("respondBookNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String respondBookNotification(@FormParam("sessionId") String sessionId,
                                          @FormParam("recipient") int recipient,
                                          @FormParam("sender") int sender,
                                          @FormParam("referencedLibrary") int referenced) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.respondLibraryNotification(sender, recipient, referenced));
    }

    @Path("removeBookNotification")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String removeBookNotification(@FormParam("sessionId") String sessionId,
                                         @FormParam("recipient") int recipient,
                                         @FormParam("sender") int sender,
                                         @FormParam("referencedLibrary") int referenced) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseNotifications.removeBookNotification(sender, recipient, referenced));
    } */
}

