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

    @Path("getCreatedLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getCreatedLibraries(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getCreatedLibraries(u.getUserId()));
    }

    @Path("getMainLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getMainLibraries(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseLibrary.getMainLibraries());
    }

    @Path("getBooksInLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBooksInLibrary(@FormParam("sessionId") String sessionId,
                                    @FormParam("libraryId") int libraryId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseLibrary.getBooksInLibrary(libraryId));
    }

    @Path("addBookToLibrary")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String addBookToLibrary(@FormParam("sessionId") String sessionId,
                                   @FormParam("libraryId") int libraryId,
                                   @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
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
        if(!APIUtil.isValidSession(sessionId))
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
        if(!APIUtil.isValidSession(sessionId))
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
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        User u = SessionManager.getUserFromSessionId(sessionId);
        Gson gson = new GsonBuilder().create();
        int libraryId = Integer.parseInt(UUID.randomUUID().toString());
        Library library = new Library();
        Date date = new Date();
        library.setLibraryId(libraryId);
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
                                @FormParam("title") String title,
                                @FormParam("featuredBook") Integer featuredBook,
                                @FormParam("description") String description,
                                @FormParam("coverPhoto") String coverPhoto,
                                @FormParam("tags") String tags) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        User u = SessionManager.getUserFromSessionId(sessionId);
        Gson gson = new GsonBuilder().create();
        int libraryId = Integer.parseInt(UUID.randomUUID().toString());
        Library library = new Library();
        Date date = new Date();
        library.setLibraryId(libraryId);
        library.setUserId(u.getUserId());
        library.setTitle(title);
        library.setFeaturedBook(featuredBook);
        library.setDescription(description);
        library.setTags(tags);
        library.setCoverPhoto(coverPhoto);
        library.setCreated(new Timestamp(date.getTime()));
        return gson.toJson(QueryDatabaseLibrary.updateLibrary(library));
    }

//	@Path("getFeaturedBooks") //TODO with recommendations
}
