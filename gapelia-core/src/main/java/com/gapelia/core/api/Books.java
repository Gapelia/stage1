package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.QueryDatabaseBook;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Page;
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
                                     @FormParam("userId") int userId,
                                     @FormParam("photoUrl") String photoUrl,
                                     @FormParam("photoId") String phtoId,
                                     @FormParam("creativeCommons") String creativeCommons,
                                     @FormParam("pageId") int pageId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        Page page = new Page();
        page.setTitle(title);
        page.setContent(content);
        page.setTemplateId(templateId);
        page.setVideoURl(videoUrl);
        page.setBookId(bookId);
        page.setPageNumber(pageNumber);
        page.setUserId(userId);
        page.setPhotoUrl(photoUrl);
        page.setPageId(pageId);
        page.setCreativeCommons(creativeCommons);
        java.util.Date date= new java.util.Date();
        page.setLastUpdated(new Timestamp(date.getTime()));
        page.setPageId(pageId);
        try {
            return gson.toJson(QueryDatabaseUser.getBookmarkedBooks(userId));
        } catch (Exception ex) {
            LOG.error("Failed to get user bookmarks " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("createPage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createPage(@FormParam("sessionId") String sessionId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        String pageId = UUID.randomUUID().toString();
        Page page = new Page();
        java.util.Date date= new java.util.Date();
        page.setLastUpdated(new Timestamp(date.getTime()));
        page.setPageId(Integer.parseInt(pageId));
        page.setCreated(new Timestamp(date.getTime()));
        try {
            boolean create = QueryDatabaseBook.createPage(page);
            if(create) {
                return pageId;
            } else {
                return null;
            }
        } catch (Exception ex) {
            LOG.error("Failed to create book " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("deletePage")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deletePage(@FormParam("sessionId") String sessionId,
                             @FormParam("pageId") int pageId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return gson.toJson(QueryDatabaseBook.deletePage(pageId));
        } catch (Exception ex) {
            LOG.error("Failed to delete page " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("createBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createBook(@FormParam("sessionId") String sessionId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        String bookId = UUID.randomUUID().toString();
        Book book = new Book();
        java.util.Date date= new java.util.Date();
        book.setCreated(new Timestamp(date.getTime()));
        book.setLastUpdated(new Timestamp(date.getTime()));
        book.setIsPublished(false);
        book.setBookId(Integer.parseInt(bookId));
        try {
            boolean create = QueryDatabaseBook.createBook(book);
            if(create) {
                return bookId;
            } else {
                return null;
            }
        } catch (Exception ex) {
            LOG.error("Failed to create book " + profile + " " +  ex.getMessage());
        }
        return null;
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
                             @FormParam("userId") int userId,
                             @FormParam("isPublished") boolean isPublished,
                             @FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        Book book = new Book();
        book.setCoverPhoto(coverPhoto);
        book.setTitle(title);
        book.setLanguague(language);
        book.setTags(tags);
        book.setUserId(userId);
        java.util.Date date= new java.util.Date();
        book.setLastUpdated(new Timestamp(date.getTime()));
        book.setIsPublished(isPublished);
        book.setBookId(bookId);
        try {
            return gson.toJson(QueryDatabaseBook.updateBook(book));
        } catch (Exception ex) {
            LOG.error("Failed to update book " + profile + " " +  ex.getMessage());
        }
        return null;
    }

    @Path("deleteBook")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String deleteBook(@FormParam("sessionId") String sessionId,
                             @FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
        try {
            return gson.toJson(QueryDatabaseBook.deleteBook(bookId));
        } catch (Exception ex) {
            LOG.error("Failed to get user bookmarks " + profile + " " +  ex.getMessage());
        }
        return null;
    }
}
