package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.QueryDatabaseBook;
import org.apache.log4j.Logger;

@Path("/book/")
public class Book {

    public static Logger LOG = Logger.getLogger(Book.class);
    @Path("createBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createBook(@FormParam('sessionId') String sessionId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        try {
            LOG.info("Retrieving userId from sessionId");
            org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
            String userId = profile.getValidatedId();
            bookId == UUID.randomUUID().toString();
            QueryDatabaseBook.createBook(bookId,userID)

        }

    }

//	@Path("createBook")
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//	public String createBook(@FormParam("sessionId") String sessionId,
//							 @FormParam("bookId") String bookId,
//							 @FormParam("title") String title,
//							 @FormParam("language") String language,
//							 @FormParam("library") String library,
//							 @FormParam("tags") String tags,
//							 @FormParam("dimension") String dimension,
//							 @FormParam("createdBy") String createdBy,
//							 @FormParam("isPublished") int isPublished,
//							 @FormParam("coverPhoto")String coverPhoto
//							 ) {
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		try {
//			// Get UserId from SessionId
//			String json ;
//			LOG.info("Trying to retrieve user from session id");
//			//String id = session.getId();
//			System.out.println(sessionId);
//			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
//			System.out.println(profile);
//			if (null == bookId || bookId.trim().length() == 0)
//			{
//				bookId = UUID.randomUUID().toString();
//				json = gson.toJson( bookId );
//			}
//			else{
//				String status=QueryDatabase.saveBook(profile,bookId,title,language,library,tags,createdBy,isPublished,coverPhoto);
//				json =gson.toJson(status);
//			}
//			return json;
//		} catch (Exception ex) {
//			LOG.error("Failed to create book", ex);
//			return gson.toJson("Failed to create book"+ ex);
//		}
//	}
//
//
//
//	@Path("createPage")
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//	public String createPage(@FormParam("sessionId") String sessionId,
//							 @FormParam("title") String title,
//							 @FormParam("description") String description,
//							 @FormParam("location") String location,
//							 @FormParam("templateId") int templateId,
//							 @FormParam("marginX") String marginX,
//							 @FormParam("marginY") String marginY,
//							 @FormParam("videoUrl") String videoUrl,
//							 @FormParam("pageNumber") int pageNumber,
//							 @FormParam("bookId") String bookId,
//							 @FormParam("createdByUserId") String createdByUserId,
//							 @FormParam("photoUrl") String photoUrl,
//							 @FormParam("photoId") String photoId,
//							 @FormParam("pageId") String pageId
//	) {
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		try {
//			// Get UserId from SessionId
//			String json ;
//			LOG.info("Trying to retrieve user from session id");
//			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
//			LOG.info("Trying to save page");
//			if (null == pageId || pageId.trim().length() == 0)
//			{
//				pageId = UUID.randomUUID().toString();
//				json = gson.toJson( pageId );
//			}
//			else {
//				String status = QueryDatabase.savePage(profile, title, description, location, templateId, marginX,
//				marginY, videoUrl, pageNumber, bookId, createdByUserId, photoUrl,photoId,pageId);
//				json =gson.toJson(status);
//			}
//			return json;
//		} catch (Exception ex) {
//			LOG.error("Failed to create page", ex);
//			return gson.toJson("Failed");
//		}
//	}
//	@Path("getBook")
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//	public String getBook(@FormParam("sessionId") String sessionId,
//							 @FormParam("bookId") String bookId
//	) {
//		com.gapelia.core.model.Page [] pages =new com.gapelia.core.model.Page [20];
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		String temp="";
//		String temp2="";
//		try {
//			// Get UserId from SessionId
//			LOG.info("Trying to retrieve user from session id");
//			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
//			LOG.info("Trying to retrieve book");
//			pages = QueryDatabase.getBookById(profile, bookId);
//			return gson.toJson(pages);
//		} catch (Exception ex) {
//			LOG.error("Failed to create page", ex);
//			System.out.println("Failed to call getBook" +ex.getMessage());
//			return gson.toJson("Failed"+ex.getMessage());
//		}
//	}
//
//	@Path("subscribe")
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//	public String subscribe(@FormParam("sessionId") String sessionId,
//							 @FormParam("bookId") String bookId
//	) {
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		try {
//			// Get UserId from SessionId
//			LOG.info("Trying to retrieve user from session id");
//			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
//			LOG.info("Trying to subscribe");
//			boolean status = QueryDatabase.subscribeBook(profile, bookId);
//			return gson.toJson(status ? "Success" : "Failure");
//		} catch (Exception ex) {
//			LOG.error("Failed to subscribe", ex);
//			return gson.toJson("Failed"+ex.getMessage());
//		}
//	}
//
//	@Path("unsubscribe")
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//	public String unsubscribe(@FormParam("sessionId") String sessionId,
//							@FormParam("bookId") String bookId
//	) {
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		try {
//			// Get UserId from SessionId
//			LOG.info("Trying to retrieve user from session id");
//			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
//			LOG.info("Trying to un-subscribe");
//			boolean status = QueryDatabase.unSubscribeBook(profile, bookId);
//			return gson.toJson(status ? "Success" : "Failure");
//		} catch (Exception ex) {
//			LOG.error("Failed to un-subscribe", ex);
//			return gson.toJson("Failed");
//		}
//	}
}
