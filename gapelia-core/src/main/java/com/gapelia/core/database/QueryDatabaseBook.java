package com.gapelia.core.database;

import com.gapelia.core.model.*;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;
//TODO make functions produce json
public class QueryDatabaseBook {
    private static Logger LOG = Logger.getLogger(QueryDatabaseBook.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    //Page Relate Queries
    private static final String CREATE_PAGE = "INSERT INTO pages (id, title,content,template_id,video_url,book_id,page_number,user_id,photo_url,photo_id,creative_commons,created,last_updated) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    private static final String UPDATE_PAGE = "UPDATE pages set title = ?, content = ?,template_id = ?,video_url = ?,book_id = ?,page_number = ?,user_id = ?,photo_url = ?,photo_id = ?,creative_commons = ?,last_updated = ? WHERE id = ?";
    private static final String DELETE_PAGE = "DELETE FROM pages WHERE id = ?";
    // Book Related Queries
    private static final String CREATE_BOOK = "INSERT INTO books (id,cover_photo, title,language,tags,owned_by,created,last_updated,is_published) VALUES (?,?,?,?,?,?,?,?)";
    private static final String UPDATE_BOOK = "UPDATE books set cover_photo = ?, title = ?, language = ?, tags = ?, owned_by = ?, last_updated = ?, is_published = ? WHERE id = ?";
    private static final String DELETE_BOOK = "DELETE FROM books WHERE id = ?";

    public static boolean updatePage(Page page){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(UPDATE_PAGE);
            insert.setString(1, page.getTitle());
            insert.setString(2, page.getContent());
            insert.setInt(3, page.getTemplateId());
            insert.setString(4, page.getVideoUrl());
            insert.setInt(5, page.getBookId());
            insert.setInt(6, page.getPageNumber());
            insert.setInt(7, page.getUserId());
            insert.setString(8, page.getPhotoUrl());
            insert.setString(9, page.getPhotoId());
            insert.setString(10, page.getCreativeCommons());
            insert.setTimestamp(11, page.getLastUpdated());
            insert.setInt(12, page.getPageId());

            insert.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + page.getPageId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + page.getPageId() + " " + ex.getMessage());
            }
        }
        return false;
    }

    public static boolean createPage(Page page){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(CREATE_PAGE);
            insert.setInt(1, page.getPageId());
            insert.setString(2, page.getTitle());
            insert.setString(3, page.getContent());
            insert.setInt(4, page.getTemplateId());
            insert.setString(5, page.getVideoUrl());
            insert.setInt(6, page.getBookId());
            insert.setInt(7, page.getPageNumber());
            insert.setInt(8, page.getUserId());
            insert.setString(9, page.getPhotoUrl());
            insert.setString(10, page.getPhotoId());
            insert.setString(11, page.getCreativeCommons());
            insert.setTimestamp(12, page.getCreated());
            insert.setTimestamp(13, page.getLastUpdated());
            insert.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + page.getPageId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + page.getPageId() + " " + ex.getMessage());
            }
        }
        return false;
    }

    public static boolean deletePage(int pageId){
        PreparedStatement delete = null;
        try {
            delete = connection.prepareStatement(DELETE_PAGE);
            delete.setInt(1, pageId);
            delete.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + pageId + " " + ex.getMessage());
        } finally {
            try {
                if (delete != null) {
                    delete.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + pageId + " " + ex.getMessage());
            }
        }
        return false;
    }

    public static boolean createBook(Book book){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(CREATE_BOOK);
            insert.setInt(1, book.getBookId());
            insert.setString(2, book.getCoverPhoto());
            insert.setString(3, book.getTitle());
            insert.setString(4, book.getLanguague());
            insert.setString(5, book.getTags());
            insert.setInt(6, book.getUserId());
            insert.setTimestamp(7, book.getCreated());
            insert.setTimestamp(8, book.getLastUpdated());
            insert.setBoolean(9, book.getIsPublished());
            insert.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + book.getBookId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + book.getBookId() + " " + ex.getMessage());
            }
        }
        return false;
    }

    public static boolean updateBook(Book book){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(UPDATE_BOOK);
            insert.setString(1, book.getCoverPhoto());
            insert.setString(2, book.getTitle());
            insert.setString(3, book.getLanguague());
            insert.setString(4, book.getTags());
            insert.setInt(5, book.getUserId());
            insert.setTimestamp(6, book.getLastUpdated());
            insert.setBoolean(7, book.getIsPublished());
            insert.setInt(8, book.getBookId());
            insert.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + book.getBookId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + book.getBookId() + " " + ex.getMessage());
            }
        }
        return false;
    }

    public static boolean deleteBook(int bookId){
        PreparedStatement delete = null;
        try {
            delete = connection.prepareStatement(DELETE_BOOK);
            delete.setInt(1, bookId);
            delete.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + bookId + " " + ex.getMessage());
        } finally {
            try {
                if (delete != null) {
                    delete.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + bookId + " " + ex.getMessage());
            }
        }
        return false;
    }

}