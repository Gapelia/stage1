package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.AuthHelper;
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

    @Path("checkUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean checkUser(@FormParam("sessionId") String sessionId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return QueryDatabaseUser.checkUser(profile);
        } catch (Exception ex) {
            LOG.error("Failed to check user " + profile + " " +   ex.getMessage());
        }
        return false;
    }

    @Path("signUp")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean signUp(@FormParam("sessionId") String sessionId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return QueryDatabaseUser.signUp(profile);
        } catch (Exception ex) {
            LOG.error("Failed to sign up user " + profile + " " +  ex.getMessage());
        }
        return false;
    }

    @Path("getUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUser(@FormParam("sessionId") String sessionId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return gson.toJson(QueryDatabaseUser.getUserByValidateId(profile));
        } catch (Exception ex) {
            LOG.error("Failed to get user " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("getUserPublic")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUserPublic(@FormParam("sessionId") String sessionId,
                                @FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return gson.toJson(QueryDatabaseUser.getUserById(userId));
        } catch (Exception ex) {
            LOG.error("Failed to get user " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("updateUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public boolean updateUser(@FormParam("sessionId") String sessionId,
                             @FormParam("name") String name,
                             @FormParam("email") String email,
                             @FormParam("dob") Date dob,
                             @FormParam("gender") String gender,
                             @FormParam("location") String location,
                             @FormParam("avatarImage") String avatarImage,
                             @FormParam("coverImage") String coverImage,
                             @FormParam("displayName") String displayName,
                             @FormParam("validateId") String validateId,
                             @FormParam("providerId") String providerId,
                             @FormParam("personalWebsite") String personalWebsite,
                             @FormParam("bio") String bio,
                             @FormParam("tags") String tags,
                             @FormParam("fb") String fb,
                             @FormParam("gp") String gp,
                             @FormParam("twt") String twt,
                             @FormParam("isPublic") boolean isPublic,
                             @FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setDob(dob);
        user.setGender(gender);
        user.setLocation(location);
        user.setAvatarImage(avatarImage);
        user.setCoverImage(coverImage);
        user.setDisplayName(displayName);
        user.setValidateId(validateId);
        user.setProviderId(providerId);
        user.setPersonalWebsite(personalWebsite);
        user.setBio(bio);
        user.setTags(tags);
        user.setFb(fb);
        user.setGp(gp);
        user.setTwt(twt);
        user.setIsPublic(isPublic);
        user.setUserId(userId);
        try {
            return QueryDatabaseUser.updateUserProfile(user);
        } catch (Exception ex) {
            LOG.error("Failed to update user user " + profile + " " +  ex.getMessage());
        }
        return false;
    }

    @Path("getBookmarkedBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBookmarkedBooks(@FormParam("sessionId") String sessionId,
                                @FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return gson.toJson(QueryDatabaseUser.getBookmarkedBooks(userId));
        } catch (Exception ex) {
            LOG.error("Failed to get user bookmarks " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("getCreatedBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getCreatedBooks(@FormParam("sessionId") String sessionId,
                                     @FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return gson.toJson(QueryDatabaseUser.getCreatedBooks(userId));
        } catch (Exception ex) {
            LOG.error("Failed to get user books " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("getSubscribedLibraries")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getSubscribedLibraries(@FormParam("sessionId") String sessionId,
                                  @FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return gson.toJson(QueryDatabaseUser.getSubscribedLibraries(userId));
        } catch (Exception ex) {
            LOG.error("Failed to get user libraries " + profile + " " +  ex.getMessage());
        }
        return null;
    }

}
