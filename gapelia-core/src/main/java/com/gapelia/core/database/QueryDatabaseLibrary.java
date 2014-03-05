package com.gapelia.core.database;

import com.gapelia.core.model.Library;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;
import com.gapelia.core.model.Book;

import java.sql.*;
import java.util.ArrayList;
//TODO make functions produce json
public class QueryDatabaseLibrary {
    private static Logger LOG = Logger.getLogger(QueryDatabaseLibrary.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    private static final String GET_CREATED_LIBRARIES = "SELECT * FROM libraries WHERE created_by = ?";
    private static final String GET_BOOKS_IN_LIBRARY = "SELECT * FROM library_books WHERE library_id = ?";
    private static final String ADD_BOOK_TO_LIBRARY = "INSERT INTO library_books (library_id,book_id) VALUES (? , ?)";
    private static final String REMOVE_BOOK_FROM_LIBRARY = "DELETE FROM library_books WHERE library_id = ? AND book_id = ?";
    private static final String DELETE_LIBRARY = "DELETE FROM libraries WHERE id = ?";
    private static final String CREATE_LIBRARY = "INSERT INTO libraries (id,created_by,title,tags,cover_photo,description,num_subscribers,featured_book,created) VALUES (?,?,?,?,?,?,?,?,?)";
    private static final String UPDATE_LIBRARY = "UPDATE libraries created_by = ?,title = ?,tags = ?,cover_photo = ?,description = ?,num_subscribers = ?,featured_book = ?,created = ? WHERE id = ?";

    //public static Library [] getLibraries
    public static ArrayList<Library> getCreatedLibraries(int userId){
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Library> libraryList = new ArrayList<Library>();
        try {
            statement = connection.prepareStatement(GET_CREATED_LIBRARIES);
            statement.setInt(1, userId);
            rs = statement.executeQuery();
            while (rs.next()) {
                Library library = new Library();
                library.setLibraryId(rs.getInt("id"));
                library.setUserId(rs.getInt("created_by"));
                library.setTitle(rs.getString("title"));
                library.setTags(rs.getString("tags"));
                library.setCoverPhoto(rs.getString("cover_photo"));
                library.setDescription(rs.getString("description"));
                library.setNumSubscribers(rs.getInt("num_subscribers"));
                library.setFeatutedBook(rs.getInt("featured_book"));
                library.setCreated(rs.getTimestamp("created"));
                libraryList.add(library);
            }
            return libraryList;
        } catch (Exception ex) {
            LOG.error("ERROR: :" + userId, ex);
        }
        finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + userId + " " + ex.getMessage());
            }
        }
        return null;
    }

    // getbooks in library
    public static ArrayList<Book> getBooksInLibrary(int libraryId){
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Book> bookList = new ArrayList<Book>();
        try {
            statement = connection.prepareStatement(GET_BOOKS_IN_LIBRARY);
            statement.setInt(1, libraryId);
            rs = statement.executeQuery();
            while (rs.next()) {
                Book book = new Book();
                book.setBookId(rs.getInt("id"));
                book.setUserId(rs.getInt("owned_by"));
                book.setCoverPhoto(rs.getString("cover_photo"));
                book.setTitle(rs.getString("title"));
                book.setLanguague(rs.getString("language"));
                book.setTags(rs.getString("tags"));
                book.setCreated(rs.getTimestamp("created"));
                book.setLastUpdated(rs.getTimestamp("last_updated"));
                book.setIsPublished(rs.getBoolean("is_published"));
                bookList.add(book);
            }
            return bookList;
        } catch (Exception ex) {
            LOG.error("ERROR: : " + libraryId, ex);
        }
        finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection" + libraryId + " " + ex.getMessage());
            }
        }
        return null;
    }

    //add book to library
    public static boolean addBookToLibrary(int libraryId, int bookId){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(ADD_BOOK_TO_LIBRARY);
            insert.setInt(1, libraryId);
            insert.setInt(2, bookId);
            insert.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + libraryId + " " + bookId + " " + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + libraryId + " " + bookId + " " + ex.getMessage());
            }
        }
        return false;
    }

    //delete book from lib
    public static boolean removeBookFromLibrary(int libraryId, int bookId){
        PreparedStatement delete = null;
        try {
            delete = connection.prepareStatement(REMOVE_BOOK_FROM_LIBRARY);
            delete.setInt(1, libraryId);
            delete.setInt(2, bookId);
            delete.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + libraryId + " " + bookId + " " + ex.getMessage());
        } finally {
            try {
                if (delete != null) {
                    delete.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + libraryId + " " + bookId + " " + ex.getMessage());
            }
        }
        return false;
    }


    //create lib
    public static boolean createLibrary(Library library){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(CREATE_LIBRARY);
            insert.setInt(1, library.getLibraryId());
            insert.setInt(2, library.getUserId());
            insert.setString(3, library.getTitle());
            insert.setString(4, library.getTags());
            insert.setString(5, library.getCoverPhoto());
            insert.setString(6, library.getDescription());
            insert.setInt(7, library.getNumSubscribers());
            insert.setInt(8, library.getFeatutedBook());
            insert.setTimestamp(9, library.getCreated());
            insert.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + library.getLibraryId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + library.getLibraryId() + " " + ex.getMessage());
            }
        }
        return false;
    }


    //update lib
    public static boolean updateLibrary(Library library){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(UPDATE_LIBRARY);
            insert.setInt(1, library.getUserId());
            insert.setString(2, library.getTitle());
            insert.setString(3, library.getTags());
            insert.setString(4, library.getCoverPhoto());
            insert.setString(5, library.getDescription());
            insert.setInt(6, library.getNumSubscribers());
            insert.setInt(7, library.getFeatutedBook());
            insert.setTimestamp(8, library.getCreated());
            insert.setInt(9, library.getLibraryId());
            insert.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + library.getLibraryId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + library.getLibraryId() + " " + ex.getMessage());
            }
        }
        return false;
    }


    //delete lib
    public static boolean deleteLibrary(int libraryId){
        PreparedStatement delete = null;
        try {
            delete = connection.prepareStatement(DELETE_LIBRARY);
            delete.setInt(1, libraryId);
            delete.executeUpdate();
            return true;
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + libraryId + " " + ex.getMessage());
        } finally {
            try {
                if (delete != null) {
                    delete.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + libraryId + " " + ex.getMessage());
            }
        }
        return false;
    }
}