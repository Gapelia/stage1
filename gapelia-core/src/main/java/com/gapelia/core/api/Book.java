package com.gapelia.core.api;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.QueryDatabase;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;
import com.gapelia.core.database.DatabaseManager;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.UUID;

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
							 @FormParam("libraryId") int libraryId,
							 @FormParam("tags") String tags,
							 @FormParam("dimension") String dimension,
							 @FormParam("createdBy") String createdBy,
							 @FormParam("isPublished") int isPublished
							 ) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			String json ;
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to save book");
			LOG.info("Session ID:"+sessionId);
			LOG.info("bookId"+bookId);
			LOG.info("title"+title);
			LOG.info("languague"+language);
			LOG.info("libraryId" +libraryId);
			LOG.info("tags"+tags);
			LOG.info("dimension"+dimension);
			LOG.info("createdBy"+createdBy);
			LOG.info("isPublished"+isPublished);
			if (null == bookId || bookId.trim().length() == 0)
			{
				bookId = UUID.randomUUID().toString();
				json = gson.toJson( bookId );
			}
			else{
				LOG.info("Begin to Save book");
				String status=QueryDatabase.saveBook(bookId,title,language,libraryId,tags,dimension,createdBy,isPublished);
				LOG.info("status is!: "+status);
				json =gson.toJson(status);
			}	
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to create book", ex);
			return gson.toJson("Failed to create book"+ ex);
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
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to save page");
			if (null == pageId || pageId.trim().length() == 0)
			{pageId = UUID.randomUUID().toString();}
			boolean status = QueryDatabase.savePage(profile, pageId, title, description, location, templateId, marginX,
				marginY, videoUrl, pageNumber, bookId, createdByUserId, photoUrl, photoId);
			String json = gson.toJson(status ? pageId : "Failure");
			return json;
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
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to retrieve book");
			com.gapelia.core.model.Book book = QueryDatabase.getBookById(profile, bookId);
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
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to subscribe");
			boolean status = QueryDatabase.subscribeBook(profile, bookId);
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
							@FormParam("bookId") String bookId
	) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to un-subscribe");
			boolean status = QueryDatabase.unSubscribeBook(profile, bookId);
			return gson.toJson(status ? "Success" : "Failure");
		} catch (Exception ex) {
			LOG.error("Failed to un-subscribe", ex);
			return gson.toJson("Failed");
		}
	}
}
