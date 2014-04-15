package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseBook;
import com.gapelia.core.database.QueryDatabaseLibrary;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Page;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import java.sql.Timestamp;

@Path("/books/")
public class Books {

    private static Logger LOG = Logger.getLogger(Books.class);

    @Path("createPage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createPage(@FormParam("sessionId") String sessionId,
                             @FormParam("bookId") int bookId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        Page page = new Page();
        page.setUserId(u.getUserId());
        java.util.Date date = new java.util.Date();
        page.setLastUpdated(new Timestamp(date.getTime()));
        page.setBookId(bookId);
        page.setCreated(new Timestamp(date.getTime()));
        return gson.toJson(QueryDatabaseBook.createPage(page));
    }

	@Path("getNumVotes")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getNumVotes(@FormParam("sessionId") String sessionId, @FormParam("bookId") int bookId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryDatabaseBook.getNumVotes(bookId));
	}

    @Path("updatePage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String updatePage(@FormParam("sessionId") String sessionId,
                             @FormParam("title") String title,
                             @FormParam("pageId") int pageId,
                             @FormParam("content") String content,
                             @FormParam("templateId") int templateId,
                             @FormParam("videoUrl") String videoUrl,
                             @FormParam("pageNumber") int pageNumber,
                             @FormParam("photoUrl") String photoUrl,
                             // @FormParam("photoId") String photoId,
                             @FormParam("creativeCommons") String creativeCommons) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;
        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        Page page = new Page();
        page.setPageId(pageId);
        page.setPageNumber(pageNumber);
        page.setTemplateId(templateId);
        page.setTitle(title);
        page.setContent(content);
        page.setVideoURl(videoUrl);
        page.setPhotoUrl(photoUrl);
        page.setPhotoId("null");
        page.setCreativeCommons(creativeCommons);
        java.util.Date date = new java.util.Date();
        page.setLastUpdated(new Timestamp(date.getTime()));
        return QueryDatabaseBook.updatePage(page);
    }

    @Path("deletePage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deletePage(@FormParam("sessionId") String sessionId,
                             @FormParam("pageId") int pageId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseBook.deletePage(pageId));
    }

    @Path("createBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createBook(@FormParam("sessionId") String sessionId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        Book book = new Book();
        java.util.Date date = new java.util.Date();
        book.setCreated(new Timestamp(date.getTime()));
        book.setLastUpdated(new Timestamp(date.getTime()));
        book.setIsPublished(false);
        book.setUserId(u.getUserId());
        return gson.toJson(QueryDatabaseBook.createBook(book));
    }

    @Path("updateBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String updateBook(@FormParam("sessionId") String sessionId,
                             @FormParam("coverPhoto") String coverPhoto,
                             @FormParam("title") String title,
                             @FormParam("language") String language,
                             @FormParam("tags") String tags,
                             @FormParam("isPublished") boolean isPublished,
                             @FormParam("snippet") String snippet,
                             @FormParam("bookId") int bookId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        Book book = new Book();
        book.setBookId(bookId);
        book.setCoverPhoto(coverPhoto);
        book.setTitle(title);
        book.setLanguague(language);
        book.setTags(tags);
        book.setUserId(u.getUserId());
        java.util.Date date = new java.util.Date();
        book.setLastUpdated(new Timestamp(date.getTime()));
        book.setIsPublished(isPublished);
        book.setSnippet(snippet);
        LOG.info(snippet);
        return gson.toJson(QueryDatabaseBook.updateBook(book));
    }

    @Path("deleteBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deleteBook(@FormParam("sessionId") String sessionId,
                             @FormParam("bookId") int bookId) {
        if (!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseBook.deleteBook(bookId));
    }
}
