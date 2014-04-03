package com.gapelia.core.database;

import com.gapelia.core.model.*;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;
public class QueryDatabaseBook {
    private static Logger LOG = Logger.getLogger(QueryDatabaseBook.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    //Page Relate Queries
    private static final String DELETE_PAGES_FROM_BOOK = "DELETE FROM pages user_votes where book_id = ?";
    private static final String DELETE_FROM_BOOKS = "DELETE FROM books where id = ?";
    private static final String DELETE_FROM_LIBRARYBOOKS = "DELETE FROM library_books user_bookmarks where book_id = ?";
    private static final String CREATE_PAGE = "INSERT INTO pages (book_id, user_id, created, last_updated) VALUES(?,?,?,?)";
    private static final String UPDATE_PAGE = "UPDATE pages set title = ?, content = ?,template_id = ?,video_url = ?,page_number = ?,photo_url = ?,photo_id = ?,creative_commons = ?,last_updated = ? WHERE id = ?";
    private static final String DELETE_PAGE = "DELETE FROM pages WHERE id = ?";
    // Book Related Queries
    private static final String CREATE_BOOK = "INSERT INTO books (owned_by, created, last_updated, is_published) VALUES (?,?,?,?)";
    private static final String UPDATE_BOOK = "UPDATE books set cover_photo = ?, title = ?, language = ?, tags = ?, last_updated = ?, is_published = ? WHERE id = ?";
    private static final String DELETE_FROM_USER_VOTES2 = "DELETE FROM user_votes where book_id = ?";
    private static final String DELETE_FROM_USER_BOOKMARKS2 = "DELETE FROM user_bookmarks where book_id = ?";
    private static final String DELETE_FROM_LIBRARY_NOTIFICATION2 = "DELETE FROM library_notifications where book_id = ?";

    public static int createPage(Page page){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(CREATE_PAGE, Statement.RETURN_GENERATED_KEYS);
            insert.setInt(1, page.getBookId());
            insert.setInt(2, page.getUserId());
            insert.setTimestamp(3, page.getCreated());
            insert.setTimestamp(4, page.getLastUpdated());
            insert.executeUpdate();
            ResultSet rs = insert.getGeneratedKeys();
            if ( rs.next() ) {
                return rs.getInt(1);
            }
            return 0;
        } catch (SQLException ex) {
            LOG.error("ERROR creating page: : " + page.getPageId() + " "  + ex.getMessage());
            return -1;
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + page.getPageId() + " " + ex.getMessage());
                return -1;
            }
        }
    }

    public static String updatePage(Page page){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(UPDATE_PAGE);
            insert.setString(1, page.getTitle());
            insert.setString(2, page.getContent());
            insert.setInt(3, page.getTemplateId());
            insert.setString(4, page.getVideoUrl());
            insert.setInt(5, page.getPageNumber());
            insert.setString(6, page.getPhotoUrl());
            insert.setString(7, page.getPhotoId());
            insert.setString(8, page.getCreativeCommons());
            insert.setTimestamp(9, page.getLastUpdated());
            insert.setInt(10, page.getPageId());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR updating page: : " + page.getPageId() + " "  + ex.getMessage());
            return "ERROR updating page";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + page.getPageId() + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static String deletePage(int pageId){
        PreparedStatement delete = null;
        try {
            delete = connection.prepareStatement(DELETE_PAGE);
            delete.setInt(1, pageId);
            delete.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR deleting page: : " + pageId + " " + ex.getMessage());
            return "ERROR deleting page";
        } finally {
            try {
                if (delete != null) {
                    delete.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + pageId + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static int createBook(Book book){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(CREATE_BOOK, Statement.RETURN_GENERATED_KEYS);
            insert.setInt(1, book.getUserId());
            insert.setTimestamp(2, book.getCreated());
            insert.setTimestamp(3, book.getLastUpdated());
            insert.setBoolean(4, false);
            insert.executeUpdate();
            ResultSet rs = insert.getGeneratedKeys();
            if ( rs.next() ) {
                return rs.getInt(1);
            }
            return 0;
        } catch (SQLException ex) {
            LOG.error("ERROR creating book: : " + book.getBookId() + " "  + ex.getMessage());
            return -1;
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + book.getBookId() + " " + ex.getMessage());
                return -1;
            }
        }
    }

    public static String updateBook(Book book){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(UPDATE_BOOK);
            insert.setString(1, book.getCoverPhoto());
            insert.setString(2, book.getTitle());
            insert.setString(3, book.getLanguague());
            insert.setString(4, book.getTags());
            insert.setTimestamp(5, book.getLastUpdated());
            insert.setBoolean(6, book.getIsPublished());
            insert.setInt(7, book.getBookId());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR updating book: : " + book.getBookId() + " "  + ex.getMessage());
            return "ERROR updating book";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + book.getBookId() + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static String deleteBook(int bookId){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(DELETE_FROM_LIBRARY_NOTIFICATION2);
            insert.setInt(1, bookId);
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_USER_VOTES2);
            insert.setInt(1, bookId);
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_USER_BOOKMARKS2);
            insert.setInt(1, bookId);
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_PAGES_FROM_BOOK);
            insert.setInt(1, bookId);
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_LIBRARYBOOKS);
            insert.setInt(1, bookId);
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_BOOKS);
            insert.setInt(1, bookId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR deleting book: : " + bookId + " " + ex.getMessage());
            return "ERROR deleting book";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + bookId + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }
}