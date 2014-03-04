package com.gapelia.core.api;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.DatabaseManager;
import com.gapelia.core.database.QueryDatabaseActions;
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


//TODO make all function consume json and make the related functions produce json, better logging
@Path("/actions/")
public class Actions {
    private static Logger LOG = Logger.getLogger(Actions.class);

    @Path("bookmarkBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean bookmarkBook(@FormParam("sessionId") String sessionId,
							 @FormParam("bookId") int bookId) {
 	     Gson gson = new GsonBuilder().setPrettyPrinting().create();
         try {
            org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
            return QueryDatabaseActions.bookmarkBook(profile, bookId);
         } catch (Exception ex) {
            LOG.error("Failed to bookmark book " +  ex.getMessage());
         }
        return false;
    }

    @Path("unbookmarkBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean unbookmarkBook(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
            return QueryDatabaseActions.unbookmarkBook(profile, bookId);
        } catch (Exception ex) {
            LOG.error("Failed to bookmark book " +  ex.getMessage());
        }
        return false;
    }

    @Path("subscribeLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean subscribeLibrary(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int libraryId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
            return QueryDatabaseActions.subscribeLibrary(profile, libraryId);
        } catch (Exception ex) {
            LOG.error("Failed to bookmark book " +  ex.getMessage());
        }
        return false;
    }

    @Path("unsubscribeLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean unsubscribeLibrary(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int libraryId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
            return QueryDatabaseActions.unsubscribeLibrary(profile, libraryId);
        } catch (Exception ex) {
            LOG.error("Failed to bookmark book " +  ex.getMessage());
        }
        return false;
    }

    @Path("voteBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean voteBook(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
            return QueryDatabaseActions.voteBook(profile, bookId);
        } catch (Exception ex) {
            LOG.error("Failed to bookmark book " +  ex.getMessage());
        }
        return false;
    }

    @Path("removeVoteBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean removeVoteBook(@FormParam("sessionId") String sessionId,
                                @FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
            return QueryDatabaseActions.removeVoteBook(profile, bookId);
        } catch (Exception ex) {
            LOG.error("Failed to bookmark book " +  ex.getMessage());
        }
        return false;
    }
}
