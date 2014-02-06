package com.gapelia.core.api;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.QueryDatabase;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 9:53 PM
 * Copyright Gapelia Inc
 */
@Path("/libraries")
public class Libraries {

	public static Logger LOG = Logger.getLogger(Libraries.class);

	@Path("getFeaturedBooks")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getFeaturedBooks(@FormParam("sessionId") String sessionId,
								   @FormParam("dimension") String dimension) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve featured top books for user");
			Book[] books = QueryDatabase.getFeaturedBooks(profile);
			String json = gson.toJson(books);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve top featured books", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("getAllBooks")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getAllBooks(@FormParam("sessionId") String sessionId,
							  @FormParam("dimension") String dimension,
							  @FormParam("pageNo") String page) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve all books for user");
			Book[] books = QueryDatabase.getAllBooks();
			String json = gson.toJson(books);
			//String json = gson.toJson("NOT HERE");
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve all books", ex);
			return gson.toJson("Failed"+ex.toString());
		}
	}

	@Path("getLibrary")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getLibrary(@FormParam("sessionId") String sessionId,
							  @FormParam("libraryId") String libraryId) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve library");
			Library library = QueryDatabase.getLibraryById(profile, libraryId);
			String json = gson.toJson(library);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve library", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("getAllLibraries")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getAllLibraries(@FormParam("sessionId") String sessionId,
								  @FormParam("pageNo") String page) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			Library [] libraries = QueryDatabase.getAllLibraries(profile, page);
			String json = gson.toJson(libraries);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve library", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("getLibrariesByPrefix")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getLibrariesByPrefix(@FormParam("sessionId") String sessionId,
									   @FormParam("prefix") String prefix) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			Library [] libraries = QueryDatabase.getLibraryByPrefix(profile, prefix);
			String json = gson.toJson(libraries);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve library", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("subscribe")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String subscribe(@FormParam("sessionId") String sessionId,
							@FormParam("libraryId") String libraryId
	) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to subscribe");
			boolean status = QueryDatabase.subscribeLibrary(profile, libraryId);
			return gson.toJson(status ? "Success" : "Failure");
		} catch (Exception ex) {
			LOG.error("Failed to subscribe", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("unsubscribe")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String unsubscribe(@FormParam("sessionId") String sessionId,
							@FormParam("libraryId") String libraryId
	) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to un-subscribe");
			boolean status = QueryDatabase.unSubscribeLibrary(profile, libraryId);
			return gson.toJson(status ? "Success" : "Failure");
		} catch (Exception ex) {
			LOG.error("Failed to unsubscribe", ex);
			return gson.toJson("Failed");
		}
	}
}
