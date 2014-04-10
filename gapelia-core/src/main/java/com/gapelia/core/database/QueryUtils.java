package com.gapelia.core.database;


import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;


import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class QueryUtils {

    private static Logger LOG = Logger.getLogger(QueryUtils.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    private static final String BOOK_FROM_BOOKID = "SELECT * FROM books where id = ?";
    private static final String LIBRARY_FROM_BOOKID = "SELECT * FROM library_books  where book_id = ?";
    private static final String GET_LIBRARY = "SELECT * FROM libraries where id = ?";
    private static final String USER_FROM_USERID = "SELECT * from users where id = ?";

    public static User getUserFromLibraryId(int libraryId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(GET_LIBRARY);
            statement.setInt(1, libraryId);
            LOG.info(statement.toString());
            rs = statement.executeQuery();
            while (rs.next()) {
                int userId = rs.getInt("created_by");
                statement = connection.prepareStatement(USER_FROM_USERID);
                statement.setInt(1, userId);
                LOG.info(statement.toString());
                rs = statement.executeQuery();
                if (rs.next()) {
                    user.setUserId(rs.getInt("id"));
                    user.setName(rs.getString("name"));
                    user.setEmail(rs.getString("email"));
                    user.setDisplayName(rs.getString("display_name"));
                    user.setFullName(rs.getString("full_name"));
                    user.setCoverImage(rs.getString("cover_image"));
                    user.setProviderId(rs.getString("provider_id"));
                    user.setValidatedId(rs.getString("validated_id"));
                    user.setBio(rs.getString("bio"));
                    user.setFb(rs.getString("fb"));
                    user.setGp(rs.getString("gp"));
                    user.setTwt(rs.getString("twt"));
                    user.setAvatarImage(rs.getString("avatar_image"));
                    user.setGender(rs.getString("gender"));
                    user.setLocation(rs.getString("location"));
                    user.setDob(rs.getDate("dob"));
                    user.setLastUpdated(rs.getTimestamp("last_updated"));
                    user.setLastLogin(rs.getTimestamp("last_login"));
                    user.setMemeberSince(rs.getTimestamp("member_since"));
                    user.setPersonalWebsite(rs.getString("personal_website"));
                    user.setIsPublic(rs.getBoolean("is_public"));
                    user.setTags(rs.getString("tags"));
                    user.setIsOnboarded(rs.getBoolean("is_onboarded"));
                }
                return user;

            }

        } catch (Exception ex) {
            LOG.error("ERROR: :" + libraryId, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + libraryId + " " + ex.getMessage());
            }
        }
        return null;
    }

    public static User getUserFromBookId(int bookId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(BOOK_FROM_BOOKID);
            statement.setInt(1, bookId);
            rs = statement.executeQuery();
            while (rs.next()) {
                int userId = rs.getInt("owned_by");
                statement = connection.prepareStatement(USER_FROM_USERID);
                statement.setInt(1, userId);
                rs = statement.executeQuery();
                if (rs.next()) {
                    user.setUserId(rs.getInt("id"));
                    user.setName(rs.getString("name"));
                    user.setEmail(rs.getString("email"));
                    user.setDisplayName(rs.getString("display_name"));
                    user.setFullName(rs.getString("full_name"));
                    user.setCoverImage(rs.getString("cover_image"));
                    user.setProviderId(rs.getString("provider_id"));
                    user.setValidatedId(rs.getString("validated_id"));
                    user.setBio(rs.getString("bio"));
                    user.setFb(rs.getString("fb"));
                    user.setGp(rs.getString("gp"));
                    user.setTwt(rs.getString("twt"));
                    user.setAvatarImage(rs.getString("avatar_image"));
                    user.setGender(rs.getString("gender"));
                    user.setLocation(rs.getString("location"));
                    user.setDob(rs.getDate("dob"));
                    user.setLastUpdated(rs.getTimestamp("last_updated"));
                    user.setLastLogin(rs.getTimestamp("last_login"));
                    user.setMemeberSince(rs.getTimestamp("member_since"));
                    user.setPersonalWebsite(rs.getString("personal_website"));
                    user.setIsPublic(rs.getBoolean("is_public"));
                    user.setTags(rs.getString("tags"));
                    user.setIsOnboarded(rs.getBoolean("is_onboarded"));
                }
                return user;
            }
        } catch (Exception ex) {
            LOG.error("ERROR: :" + bookId, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + bookId + " " + ex.getMessage());
            }
        }
        return null;
    }

    public static boolean canModifyBook(int bookId, int userId) {

        return false;
    }

    public static boolean canModifyPage(int pageId, int userId) {

        return false;
    }

    public static boolean canModifyUser(int userId, int modifyUserId) {

        return false;
    }

    public static boolean canModifyLibrary(int libraryId, int userId) {

        return false;
    }

    public static Book getBookFromBookId(int bookId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        Book book = new Book();
        try {
            statement = connection.prepareStatement(BOOK_FROM_BOOKID);
            statement.setInt(1, bookId);
            rs = statement.executeQuery();
            while (rs.next()) {
                book.setBookId(rs.getInt("id"));
                book.setUserId(rs.getInt("owned_by"));
                book.setCoverPhoto(rs.getString("cover_photo"));
                book.setTitle(rs.getString("title"));
                book.setLanguague(rs.getString("language"));
                book.setTags(rs.getString("tags"));
                book.setCreated(rs.getTimestamp("created"));
                book.setLastUpdated(rs.getTimestamp("last_updated"));
                book.setIsPublished(rs.getBoolean("is_published"));
                book.setSnippet(rs.getString("snippet"));
            }
            return book;
        } catch (Exception ex) {
            LOG.error("ERROR: :" + bookId, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + bookId + " " + ex.getMessage());
            }
        }
        return null;
    }

    public static Library getLibraryFromBookId(int bookId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        Library library = new Library();
        try {
            statement = connection.prepareStatement(LIBRARY_FROM_BOOKID);
            statement.setInt(1, bookId);

            rs = statement.executeQuery();
            while (rs.next()) {
                int libraryId = rs.getInt("library_id");
                statement = connection.prepareStatement(GET_LIBRARY);
                statement.setInt(1, libraryId);
                LOG.info(statement.toString());
                rs = statement.executeQuery();
                while (rs.next()) {
                    library.setLibraryId(rs.getInt("id"));
                    library.setUserId(rs.getInt("created_by"));
                    library.setTitle(rs.getString("title"));
                    library.setTags(rs.getString("tags"));
                    library.setCoverPhoto(rs.getString("cover_photo"));
                    library.setDescription(rs.getString("description"));
                    library.setFeaturedBook(rs.getInt("featured_book"));
                    library.setCreated(rs.getTimestamp("created"));
                }
            }
            return library;
        } catch (Exception ex) {
            LOG.error("ERROR: :" + bookId, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + bookId + " " + ex.getMessage());
            }
        }
        return null;
    }
}