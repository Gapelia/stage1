package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseActions;
import com.gapelia.core.database.QueryDatabaseBook;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Page;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.UUID;

@Path("/books/")
public class Books {

    private static Logger LOG = Logger.getLogger(Books.class);

    @Path("createPage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createPage(@FormParam("sessionId") String sessionId,
                             @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        int pageId = UUID.randomUUID().toString().hashCode();//unique identified that is int
        Page page = new Page();
        page.setUserId(page.getUserId());
        java.util.Date date= new java.util.Date();
        page.setLastUpdated(new Timestamp(date.getTime()));
        page.setPageId(pageId);
        page.setBookId(bookId);
        page.setCreated(new Timestamp(date.getTime()));
        return QueryDatabaseBook.createPage(page);
    }

    @Path("updatePage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String updatePage(@FormParam("sessionId") String sessionId,
                                     @FormParam("title") String title,
                                     @FormParam("content") String content,
                                     @FormParam("templateId") int templateId,
                                     @FormParam("videoUrl") String videoUrl,
                                     @FormParam("bookId") int bookId,
                                     @FormParam("pageNumber") int pageNumber,
                                     @FormParam("photoUrl") String photoUrl,
                                     @FormParam("photoId") String photoId,
                                     @FormParam("creativeCommons") String creativeCommons) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        Page page = new Page();
        page.setBookId(bookId);
        page.setPageNumber(pageNumber);
        page.setTemplateId(templateId);
        page.setTitle(title);
        page.setContent(content);
        page.setVideoURl(videoUrl);
        page.setPhotoUrl(photoUrl);
        page.setPhotoId(photoId);
        page.setCreativeCommons(creativeCommons);
        java.util.Date date= new java.util.Date();
        page.setLastUpdated(new Timestamp(date.getTime()));
        return QueryDatabaseBook.updatePage(page);
    }

    @Path("deletePage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deletePage(@FormParam("sessionId") String sessionId,
                             @FormParam("pageId") int pageId) {
        if(!APIUtil.isValidSession(sessionId))
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
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        int bookId = UUID.randomUUID().toString().hashCode();//unique identified that is int
        Book book = new Book();
        java.util.Date date= new java.util.Date();
        book.setCreated(new Timestamp(date.getTime()));
        book.setLastUpdated(new Timestamp(date.getTime()));
        book.setIsPublished(false);
        book.setBookId(bookId);
        book.setUserId(u.getUserId());
        return QueryDatabaseBook.createBook(book);
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
                             @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
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
        java.util.Date date= new java.util.Date();
        book.setLastUpdated(new Timestamp(date.getTime()));
        book.setIsPublished(isPublished);
        return gson.toJson(QueryDatabaseBook.updateBook(book));
    }

    @Path("deleteBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deleteBook(@FormParam("sessionId") String sessionId,
                             @FormParam("bookId") int bookId) {
        if(!APIUtil.isValidSession(sessionId))
            return APIUtil.INVALID_SESSION_ERROR_MSG;

        Gson gson = new GsonBuilder().create();
        User u = SessionManager.getUserFromSessionId(sessionId);
        return gson.toJson(QueryDatabaseBook.deleteBook(bookId));
    }
}
