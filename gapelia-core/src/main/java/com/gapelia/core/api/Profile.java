package com.gapelia.core.api;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.QueryDatabase;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("/me")
public class Profile {
	public static Logger LOG = Logger.getLogger(Profile.class);

	@Path("getUserInfo")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getUserInfo(@FormParam("sessionId") String sessionId) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to retrieve user details from id");
			User user = QueryDatabase.getUser(profile);
			String json = gson.toJson(user);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve user info", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("getUserBooks")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getUserBooks(@FormParam("sessionId") String sessionId) throws IOException {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve books user has created");
			Book[] books = QueryDatabase.getBooksCreatedByUser(profile);
			String json = gson.toJson(books);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve user books", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("getUserBookCollection")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getUserBookCollection(@FormParam("sessionId") String sessionId) throws IOException {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve books user has subscribed to");
			Book [] books = QueryDatabase.getBooksCollectedByUser(profile);
			String json = gson.toJson(books);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve user subscribed books", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("getUserLibraryCollection")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getUserLibraryCollection(@FormParam("sessionId") String sessionId) throws IOException {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve libraries user has subscribed to");
			Library [] libraries = QueryDatabase.getLibrariesCollectedByUser(profile);
			String json = gson.toJson(libraries);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve user subscribed libraries", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("deleteUserBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String deleteUserBook(@FormParam("sessionId") String sessionId, @FormParam("bookId") String bookId) throws IOException {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to delete book with id: " + bookId);
			boolean status = QueryDatabase.deleteBookById(profile, bookId);
			return gson.toJson(status ? "Success" : "Failure");
		} catch (Exception ex) {
			LOG.error("Failed to delete book", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("updateUserInfo")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String updateUserInfo(@FormParam("sessionId") String sessionId,
								 @FormParam("name") String name,
								 @FormParam("email") String email,
								 @FormParam("bio") String bio,
								 @FormParam("facebookUrl") String facebookUrl,
								 @FormParam("googlePlusUrl") String googlePlusUrl,
								 @FormParam("twitterUrl") String twitterUrl,
								 @FormParam("photoUrl") String photoUrl,
								 @FormParam("gender") String gender,
								 @FormParam("location") String location,
								 @FormParam("personalWebsite") String personalWebsite,
								 @FormParam("tags")String tags,
								 @FormParam("dob") String dob) throws IOException {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to update user info");
			boolean status = QueryDatabase.updateUserProfile(profile, name, email, bio, facebookUrl, googlePlusUrl, twitterUrl, photoUrl, gender, location, dob, personalWebsite, tags);
			return gson.toJson(status ? "Success" : "Failure");
		} catch (Exception ex) {
			LOG.error("Failed to update user profile", ex);
			return gson.toJson("Failed");
		}
	}
}
