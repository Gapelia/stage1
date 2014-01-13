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
							 @FormParam("library") String library,
							 @FormParam("tags") String tags,
							 @FormParam("dimension") String dimension,
							 @FormParam("createdBy") String createdBy,
							 @FormParam("isPublished") int isPublished,
							 @FormParam("coverPhoto")String coverPhoto
							 ) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			String json ;
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			if (null == bookId || bookId.trim().length() == 0)
			{
				bookId = UUID.randomUUID().toString();
				json = gson.toJson( bookId );
			}
			else{
				String status=QueryDatabase.saveBook(profile,bookId,title,language,library,tags,createdBy,isPublished,coverPhoto);
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
							 @FormParam("title") String title,
							 @FormParam("description") String description,
							 @FormParam("location") String location,
							 @FormParam("templateId") int templateId,
							 @FormParam("marginX") String marginX,
							 @FormParam("marginY") String marginY,
							 @FormParam("videoUrl") String videoUrl,
							 @FormParam("pageNumber") int pageNumber,
							 @FormParam("bookId") String bookId,
							 @FormParam("createdByUserId") String createdByUserId,
							 @FormParam("photoUrl") String photoUrl,
							 @FormParam("photoId") String photoId,
							 @FormParam("pageId") String pageId
	) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			String json ;
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			LOG.info("Trying to save page");
			if (null == pageId || pageId.trim().length() == 0)
			{
				pageId = UUID.randomUUID().toString();
				json = gson.toJson( pageId );
			}
			else {
				String status = QueryDatabase.savePage(profile, title, description, location, templateId, marginX,
				marginY, videoUrl, pageNumber, bookId, createdByUserId, photoUrl,photoId,pageId);
				json =gson.toJson(status);
			}
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
