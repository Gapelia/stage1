package com.gapelia.core.api;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.User;
import com.gapelia.core.util.Security;
import com.gapelia.core.util.TestHelper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 3:50 PM
 * Copyright Gapelia
 */
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
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve user details from id");
			User user = TestHelper.getDummyUser();
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
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve books user has created");
			Book[] books = TestHelper.getDummyBooks();
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
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve books user has subscribed to");
			Book [] books = TestHelper.getDummyBooks();
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
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve libraries user has subscribed to");
			Library [] libraries = TestHelper.getDummyUserLibraries();
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
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to delete book with id: " + id);
			return "Success";
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
								 @FormParam("bookId") String name,
								 @FormParam("bookId") String email,
								 @FormParam("bookId") String bio,
								 @FormParam("bookId") String facebookUrl,
								 @FormParam("bookId") String googlePlusUrl,
								 @FormParam("bookId") String photoUrl
								 ) throws IOException {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to update user info");
			return "Success";
		} catch (Exception ex) {
			LOG.error("Failed to update user profile", ex);
			return gson.toJson("Failed");
		}
	}
}
