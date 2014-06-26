package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

@Path("/users/")
public class Users {
    public static Logger LOG = Logger.getLogger(User.class);

    @Path("getUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUser(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getUserByValidatedId(u));
    }

	@Path("getNextReadRecommendation")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getNextReadRecommendation(@FormParam("sessionId") String sessionId,@FormParam("userId") int userId, @FormParam("bookId") int bookId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryDatabaseUser.getNextReadRecommendation(userId,bookId));
	}

	@Path("getNextLibraryRead")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getNextLibraryRead(@FormParam("sessionId") String sessionId,@FormParam("userId") int userId,
									 @FormParam("bookId") int bookId, @FormParam("libraryId") int libraryId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryDatabaseUser.getNextLibraryRead(userId,bookId,libraryId));
	}

    @Path("onboard")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String onboard(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.onboard(u));
    }

    @Path("getUserPublic")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUserPublic(@FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseUser.getUserById(userId));
    }


    @Path("deleteUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deleteUser(@FormParam("sessionId") String sessionId,
                             @FormParam("userId") int userId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        return QueryDatabaseUser.deleteUser(userId);
    }

    @Path("updateUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String updateUser(@FormParam("sessionId") String sessionId,
                             @FormParam("name") String name,
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
                             @FormParam("isPublic") boolean isPublic,
							 @FormParam("emailOptOut") boolean emailOptOut,
							 @FormParam("university") String university,
							 @FormParam("department") String department) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        User u = SessionManager.getUserFromSessionId(sessionId);
        u.setName(name);
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
		u.setEmailOptOut(emailOptOut);
		u.setUniversity(university);
		u.setDepartment(department);
        return QueryDatabaseUser.updateUserProfile(u);
    }

    @Path("getBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBook(@FormParam("sessionId") String sessionId,
                          @FormParam("bookId") int bookId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseUser.getBookByID(bookId));
    }



    @Path("getPages")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getPages(@FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseUser.getPages(bookId));
    }

    @Path("getBookmarkedBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getBookmarkedBooks(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
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
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getCreatedBooks(u.getUserId()));
    }

	@Path("isFollowingUser")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String isFollowingUser(@FormParam("userId") int userId,
								  @FormParam("isFollowingId") int isFollowingId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryDatabaseUser.isFollowingUser(userId,isFollowingId));
	}

    @Path("getCreatedBooksPublic")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getCreatedBooksPublic(@FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseUser.getCreatedBooks(userId));
    }

	@Path("getFollowedUsers")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getFollowedUsers(@FormParam("userId") int userId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryDatabaseUser.getFollowedUsers(userId));
	}

	@Path("unFollowUser")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String unFollowUser(@FormParam("sessionId") String sessionId,
							 @FormParam("followerId") int followerId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		User u = SessionManager.getUserFromSessionId(sessionId);

		return QueryDatabaseUser.unFollowUser(u.getUserId(),followerId);
	}

	@Path("followUser")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String followUser(@FormParam("sessionId") String sessionId,
							   @FormParam("followerId") int followerId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		User u = SessionManager.getUserFromSessionId(sessionId);

		return QueryDatabaseUser.followUser(u.getUserId(), followerId);
	}

    @Path("getFeaturedBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getFeaturedBooks(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;


		User u = SessionManager.getUserFromSessionId(sessionId);

        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseUser.getFeaturedBooks(u.getUserId()));
    }
//
//	@Path("getFeaturedBooksForUser")
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//	public String getFeaturedBooksForUser(@FormParam("sessionId") String sessionId) {
//		if (!APIUtil.isValidSession(sessionId))
//			return APIUtil.INVALID_SESSION_ERROR_MSG;
//
//		User u = SessionManager.getUserFromSessionId(sessionId);
//
//		Gson gson = new GsonBuilder().create();
//		return gson.toJson(QueryDatabaseUser.getFeaturedBooks(userId));
//	}

    @Path("getLastPublished")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getLastPublished(@FormParam("userId") int userId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseUser.getLastPublished(userId));
    }

    @Path("getLibrariesContributedTo")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getLibrariesContributedTo(@FormParam("userId") int userId) {

        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseUser.getLibrariesContributedTo(userId));
    }

    @Path("getDraftBooks")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getDraftBooks(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
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
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseUser.getSubscribedLibraries(u.getUserId()));
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


}
