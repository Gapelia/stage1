package com.gapelia.core.database;

import com.gapelia.core.model.Library;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;
import com.gapelia.core.model.Book;

import java.sql.*;
import java.util.ArrayList;
public class QueryDatabaseLibrary {
    private static Logger LOG = Logger.getLogger(QueryDatabaseLibrary.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    private static final String GET_GOD_LIBRARIES = "SELECT * FROM libraries where created_by=1 order by random()";
    private static final String GET_BOOKS_IN_LIBRARY = "SELECT * FROM library_books WHERE library_id = ?";
    private static final String ADD_BOOK_TO_LIBRARY = "INSERT INTO library_books (library_id,book_id) VALUES (? , ?)";
    private static final String REMOVE_BOOK_FROM_LIBRARY = "DELETE FROM library_books WHERE library_id = ? AND book_id = ?";
    private static final String DELETE_LIBRARY = "DELETE FROM libraries WHERE id = ?";
    private static final String CREATE_LIBRARY = "INSERT INTO libraries (id,created_by,title,tags,cover_photo,description,num_subscribers,featured_book,created) VALUES (?,?,?,?,?,?,?,?,?)";
    private static final String UPDATE_LIBRARY = "UPDATE libraries created_by = ?,title = ?,tags = ?,cover_photo = ?,description = ?,num_subscribers = ?,featured_book = ?,created = ? WHERE id = ?";

    public static ArrayList<Library> getGodLibraries() {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Library> libraryList = new ArrayList<Library>();
        try {
            statement = connection.prepareStatement(GET_GOD_LIBRARIES);
            rs = statement.executeQuery();
            while (rs.next()) {
                int libraryId = rs.getInt("id");
                Library library = QueryDatabaseUser.getLibraryByID(libraryId);
                libraryList.add(library);
            }
            return libraryList;
        } catch (Exception ex) {
            LOG.error("ERROR: loading god libraryes:", ex);
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
                LOG.error("Error closing connection " + ex.getMessage());
            }
        }
        return null;
    }

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

    public static String addBookToLibrary(int libraryId, int bookId){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(ADD_BOOK_TO_LIBRARY);
            insert.setInt(1, libraryId);
            insert.setInt(2, bookId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + libraryId + " " + bookId + " " + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + libraryId + " " + bookId + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
        return "Failure";
    }

    public static String removeBookFromLibrary(int libraryId, int bookId){
        PreparedStatement delete = null;
        try {
            delete = connection.prepareStatement(REMOVE_BOOK_FROM_LIBRARY);
            delete.setInt(1, libraryId);
            delete.setInt(2, bookId);
            delete.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + libraryId + " " + bookId + " " + ex.getMessage());
        } finally {
            try {
                if (delete != null) {
                    delete.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + libraryId + " " + bookId + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
        return "Success";
    }

    public static String createLibrary(Library library){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(CREATE_LIBRARY);
            insert.setInt(1, library.getLibraryId());
            insert.setInt(2, library.getUserId());
            insert.setString(3, library.getTitle());
            insert.setString(4, library.getTags());
            insert.setString(5, library.getCoverPhoto());
            insert.setString(6, library.getDescription());
            insert.setInt(8, library.getFeaturedBook());
            insert.setTimestamp(9, library.getCreated());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + library.getLibraryId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + library.getLibraryId() + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
        return "Failure";
    }

    public static String updateLibrary(Library library){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(UPDATE_LIBRARY);
            insert.setInt(1, library.getUserId());
            insert.setString(2, library.getTitle());
            insert.setString(3, library.getTags());
            insert.setString(4, library.getCoverPhoto());
            insert.setString(5, library.getDescription());
            insert.setInt(7, library.getFeaturedBook());
            insert.setTimestamp(8, library.getCreated());
            insert.setInt(9, library.getLibraryId());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + library.getLibraryId() + " "  + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: "  + library.getLibraryId() + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
        return "Failure";
    }

    public static String deleteLibrary(int libraryId){
        PreparedStatement delete = null;
        try {
            delete = connection.prepareStatement(DELETE_LIBRARY);
            delete.setInt(1, libraryId);
            delete.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("ERROR: : " + libraryId + " " + ex.getMessage());
        } finally {
            try {
                if (delete != null) {
                    delete.close();
                }
            } catch (SQLException ex) {
                LOG.error("error closing connection: " + libraryId + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
        return "Failure";
    }
}