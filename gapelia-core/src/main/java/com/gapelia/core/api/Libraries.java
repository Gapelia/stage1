package com.gapelia.core.api;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.util.Security;
import com.gapelia.core.util.TestHelper;
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
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve featured top books for user");
			Book[] books = TestHelper.getDummyBooks();
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
							  @FormParam("dimension") String dimension) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve all books for user");
			Book[] books = TestHelper.getDummyBooks();
			String json = gson.toJson(books);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to retrieve all books", ex);
			return gson.toJson("Failed");
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
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve library");
			Library library = TestHelper.getDummyUserLibraries()[0];
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
	public String getAllLibraries(@FormParam("sessionId") String sessionId) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			Library [] libraries = TestHelper.getDummyUserLibraries();
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
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			// Retrieving user details
			Library [] libraries = TestHelper.getDummyUserLibraries();
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
			String id = Security.getUserIdFromSessionId(sessionId);
			LOG.info("Trying to subscribe");
			return gson.toJson("Success");
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
			String id = Security.getUserIdFromSessionId(sessionId);
			LOG.info("Trying to unsubscribe");
			return gson.toJson("Success");
		} catch (Exception ex) {
			LOG.error("Failed to unsubscribe", ex);
			return gson.toJson("Failed");
		}
	}
}
