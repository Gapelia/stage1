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
                             @FormParam("name") String name,
                             @FormParam("email") String email,
                             @FormParam("dob") Date dob,
                             @FormParam("gender") String gender,
                             @FormParam("location") String location,
                             @FormParam("avatarImage") String avatarImage,
                             @FormParam("coverImage") String coverImage,
                             @FormParam("displayName") String displayName,
                             @FormParam("validatedId") String validatedId,
                             @FormParam("providerId") String providerId,
                             @FormParam("personalWebsite") String personalWebsite,
                             @FormParam("bio") String bio,
                             @FormParam("tags") String tags,
                             @FormParam("fb") String fb,
                             @FormParam("gp") String gp,
                             @FormParam("twt") String twt,
                             @FormParam("isPublic") boolean isPublic) {
        LOG.info("CHECK");
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        LOG.info("CHECK");
        User u = SessionManager.getUserFromSessionId(sessionId);
        LOG.info("CHECK");
        u.setName(name);
        LOG.info("CHECK");
        u.setEmail(email);
        LOG.info("CHECK");
        u.setDob(dob);
        LOG.info("CHECK");
        u.setGender(gender);
        LOG.info("CHECK");
        u.setLocation(location);
        LOG.info("CHECK");
        u.setAvatarImage(avatarImage);
        LOG.info("CHECK");
        u.setCoverImage(coverImage);
        LOG.info("CHECK");
        u.setDisplayName(displayName);
        LOG.info("CHECK");
        u.setValidatedId(validatedId);
        LOG.info("CHECK");
        u.setProviderId(providerId);
        LOG.info("CHECK");
        u.setPersonalWebsite(personalWebsite);
        LOG.info("CHECK");
        u.setBio(bio);
        LOG.info("CHECK");
        u.setTags(tags);
        LOG.info("CHECK");
        u.setFb(fb);
        LOG.info("CHECK");
        u.setGp(gp);
        LOG.info("CHECK");
        u.setTwt(twt);
        LOG.info("CHECK");
        u.setIsPublic(isPublic);
        LOG.info("finished making user object");
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
