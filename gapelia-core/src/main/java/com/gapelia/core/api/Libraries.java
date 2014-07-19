package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseLibrary;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Path("/libraries")
public class Libraries {

    public static Logger LOG = Logger.getLogger(Libraries.class);


	@Path("getNumSubscribers")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getNumSubscribers(@FormParam("libraryId") int libraryId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryDatabaseLibrary.getNumSubscribers(libraryId));
	}

	@Path("getLibraryContributors")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getLibraryContributors(@FormParam("libraryId") int libraryId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryDatabaseLibrary.getLibraryContributors(libraryId));
	}

	@Path("getMostVotedBookInLibrary")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getMostVotedBookInLibrary(@FormParam("libraryId") int libraryId) {
		Gson gson = new GsonBuilder().create();
		Book b = QueryDatabaseLibrary.getMostVotedBookInLibrary(libraryId);
		return gson.toJson(b);
	}

    @Path("getGodLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getGodLibraries(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.getGodLibraries());
    }

    @Path("getAllLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getAllLibraries(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.getAllLibraries());
    }

    @Path("getCreatedLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getCreatedLibraries(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getCreatedLibraries(u.getUserId()));
    }


    @Path("getBooksInLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBooksInLibrary(@FormParam("libraryId") int libraryId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.getBooksInLibrary(libraryId));
    }

    @Path("getLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getLibrary(@FormParam("libraryId") int libraryId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.getLibrary(libraryId));
    }

    @Path("addBookToLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String addBookToLibrary(@FormParam("sessionId") String sessionId,
                                   @FormParam("libraryId") int libraryId,
                                   @FormParam("bookId") int bookId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.addBookToLibrary(libraryId, bookId));
    }

    @Path("removeBookFromLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String removeBookFromLibrary(@FormParam("sessionId") String sessionId,
                                        @FormParam("libraryId") int libraryId,
                                        @FormParam("bookId") int bookId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.removeBookFromLibrary(libraryId, bookId));
    }

    @Path("deleteLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deleteLibrary(@FormParam("sessionId") String sessionId,
                                @FormParam("libraryId") int libraryId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.deleteLibrary(libraryId));
    }

    @Path("createLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createLibrary(@FormParam("sessionId") String sessionId,
                                @FormParam("title") String title,
                                @FormParam("description") String description,
                                @FormParam("coverPhoto") String coverPhoto,
                                @FormParam("tags") String tags) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        User u = SessionManager.getUserFromSessionId(sessionId);
        Gson gson = new GsonBuilder().create();
        Library library = new Library();
        Date date = new Date();
        LOG.info("CREATING LIBRARY");
        library.setUserId(u.getUserId());
        library.setTitle(title);
        library.setDescription(description);
        library.setTags(tags);
        library.setCoverPhoto(coverPhoto);
        library.setCreated(new Timestamp(date.getTime()));
        return gson.toJson(QueryDatabaseLibrary.createLibrary(library));
    }

    @Path("updateLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String updateLibrary(@FormParam("sessionId") String sessionId,
                                @FormParam("libraryId") int libraryId,
                                @FormParam("title") String title,
                                @FormParam("description") String description,
                                @FormParam("coverPhoto") String coverPhoto,
                                @FormParam("tags") String tags) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        User u = SessionManager.getUserFromSessionId(sessionId);
        Gson gson = new GsonBuilder().create();
        Library library = new Library();
        library.setLibraryId(libraryId);
        library.setTitle(title);
        library.setDescription(description);
        library.setTags(tags);
        library.setCoverPhoto(coverPhoto);
        return gson.toJson(QueryDatabaseLibrary.updateLibrary(library));
    }
}
