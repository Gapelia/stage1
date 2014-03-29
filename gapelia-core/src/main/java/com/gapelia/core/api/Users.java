package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseActions;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.database.SQLUtil;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;
import java.util.ArrayList;

@Path("/users/")
public class Users {
    public static Logger LOG = Logger.getLogger(User.class);
    @Path("getUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUser(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getUserByValidatedId(u));
    }

    @Path("onboard")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String onboard(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.onboard(u));
    }
    @Path("getUserPublic")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUserPublic(@FormParam("sessionId") String sessionId,
                                @FormParam("userId") int userId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getUserById(userId));
    }

    @Path("updateUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String updateUser(@FormParam("sessionId") String sessionId,
                             @FormParam("fullName") String fullName,
                             @FormParam("email") String email,
                             @FormParam("location") String location,
                             @FormParam("avatarImage") String avatarImage,
                             @FormParam("coverImage") String coverImage,
                             @FormParam("displayName") String displayName,
                             @FormParam("personalWebsite") String personalWebsite,
                             @FormParam("bio") String bio,
                             @FormParam("tags") String tags,
                             @FormParam("fb") String fb,
                             @FormParam("gp") String gp,
                             @FormParam("twt") String twt,
                             @FormParam("isPublic") boolean isPublic) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        u.setFullName(fullName);
        u.setEmail(email);
        u.setLocation(location);
        u.setAvatarImage(avatarImage);
        u.setCoverImage(coverImage);
        u.setDisplayName(displayName);
        u.setPersonalWebsite(personalWebsite);
        u.setBio(bio);
        u.setTags(tags);
        u.setFb(fb);
        u.setGp(gp);
        u.setTwt(twt);
        u.setIsPublic(isPublic);
        return QueryDatabaseUser.updateUserProfile(u);
    }

    @Path("getBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBook(@FormParam("sessionId") String sessionId,
                          @FormParam("bookId")int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getBookByID(bookId));
    }

    @Path("getPages")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getPages(@FormParam("sessionId") String sessionId,
                           @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getPages(bookId));
    }

    @Path("getBookmarkedBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBookmarkedBooks(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getBookmarkedBooks(u.getUserId()));
    }
    @Path("getCreatedBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getCreatedBooks(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getCreatedBooks(u.getUserId()));
    }

    @Path("getFeaturedBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getFeaturedBooks(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getFeaturedBooks());
    }

    @Path("getDraftBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getDraftBooks(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getDraftBooks(u.getUserId()));
    }


    @Path("getSubscribedLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getSubscribedLibraries(@FormParam("sessionId") String sessionId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getSubscribedLibraries(u.getUserId()));
    }

}
