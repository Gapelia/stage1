package com.gapelia.core.api;

import com.gapelia.core.model.Event;
import com.gapelia.core.model.Page;
import com.gapelia.core.model.Photo;
import com.gapelia.core.model.PhotoTag;
import com.gapelia.core.util.Security;
import com.gapelia.core.util.TestHelper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Date;
import java.util.List;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 9:56 PM
 * Copyright Gapelia Inc
 */
@Path("/book/")
public class Book {
	public static Logger LOG = Logger.getLogger(Book.class);

	@Path("createBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String createBook(@FormParam("sessionId") String sessionId,
							 @FormParam("bookId") String bookId,
							 @FormParam("title") String title,
							 @FormParam("language") String language,
							 @FormParam("libraryId") String libraryId,
							 @FormParam("tags") String tags,
							 @FormParam("dimension") String dimension,
							 @FormParam("createdBy") String createdBy,
							 @FormParam("isPublished") String isPublished
							 ) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			LOG.info("Trying to save book");
			String json = gson.toJson("Success");
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to create book", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("createPage")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String createPage(@FormParam("sessionId") String sessionId,
							 @FormParam("pageId") String pageId,
							 @FormParam("title") String title,
							 @FormParam("description") String description,
							 @FormParam("location") String location,
							 @FormParam("templateId") String templateId,
							 @FormParam("marginX") String marginX,
							 @FormParam("marginY") String marginY,
							 @FormParam("videoUrl") String videoUrl,
							 @FormParam("pageNumber") String pageNumber,
							 @FormParam("bookId") String bookId,
							 @FormParam("createdByUserId") String createdByUserId,
							 @FormParam("photoUrl") String photoUrl,
							 @FormParam("photoId") String photoId
	) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			LOG.info("Trying to save page");
			return gson.toJson("Success");
		} catch (Exception ex) {
			LOG.error("Failed to create page", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("getBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String createPage(@FormParam("sessionId") String sessionId,
							 @FormParam("bookId") String bookId
	) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user id from session id");
			String id = Security.getUserIdFromSessionId(sessionId);
			LOG.info("Trying to retrieve book");
			com.gapelia.core.model.Book book = new com.gapelia.core.model.Book();
			return gson.toJson(book);
		} catch (Exception ex) {
			LOG.error("Failed to create page", ex);
			return gson.toJson("Failed");
		}
	}

	@Path("subscribe")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String subscribe(@FormParam("sessionId") String sessionId,
							 @FormParam("bookId") String bookId
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
							@FormParam("bookId") String bookId
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
