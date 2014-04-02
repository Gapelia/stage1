package com.gapelia.core.api;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.DatabaseManager;
import com.gapelia.core.database.QueryDatabaseActions;
import com.gapelia.core.database.QueryDatabaseLibrary;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Path("/actions/")
public class Actions {
    private static Logger LOG = Logger.getLogger(Actions.class);

    @Path("bookmarkBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String bookmarkBook(@FormParam("sessionId") String sessionId,
							 @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return QueryDatabaseActions.bookmarkBook(u, bookId);
    }

    @Path("removeBookmarkBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String removeBookmarkBook(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return QueryDatabaseActions.removeBookmarkBook(u, bookId);
    }

    @Path("subscribeLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String subscribeLibrary(@FormParam("sessionId") String sessionId,
                                @FormParam("libraryId") int libraryId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        LOG.info("subscribing");
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        LOG.info("subscribing");
        return QueryDatabaseActions.subscribeLibrary(u, libraryId);
    }

    @Path("removeSubscriptionLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String removeSubscriptionLibrary(@FormParam("sessionId") String sessionId,
                                @FormParam("libraryId") int libraryId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return QueryDatabaseActions.removeSubscriptionLibrary(u, libraryId);
    }

    @Path("voteBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String voteBook(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return QueryDatabaseActions.voteBook(u, bookId);
    }

    @Path("removeVoteBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String removeVoteBook(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return QueryDatabaseActions.removeVoteBook(u, bookId);
    }

    @Path("flushUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String flushUSer(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        LOG.info("FLUSHING USER");
        return QueryDatabaseActions.flushUser(u);
    }
}
