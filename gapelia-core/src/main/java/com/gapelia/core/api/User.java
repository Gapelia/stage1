package com.gapelia.core.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.SQLUtil;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;
import java.util.ArrayList;


public class User {
    public static Logger LOG = Logger.getLogger(User.class);

    @Path("getUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUser(@FormParam("sessionId") String sessionId) {
        try {
            getUserByValidateId
        } catch (Exception ex) {
			LOG.error("Failed to retrieve User", ex);
			return gson.toJson("Failed to retrieve User"+ ex);
        }
    }

    @Path("getUserPublic")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getUserPublic(@FormParam("sessionId") String sessionId,
                                @FormParam("userId") String userId ) {
        try {

        } catch (Exception ex) {
            LOG.error("Failed to retrieve User", ex);
            return gson.toJson("Failed to retrieve User"+ ex);
        }
    }

    @Path("updateUser")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String updateUser(@FormParam("sessionId") String sessionId,
                             @FormParam("email") String email,
                             @FormParam("fullName") String fullName,
                             @FormParam("dob") String dob,
                             @FormParam("gender") String gender,
                             @FormParam("location") String location,
                             @FormParam("avatarImage") String avatarImage,
                             @FormParam("coverImage") String coverImage,
                             @FormParam("userId") String userId
                             @FormParam("userId") String userId

                                @FormParam("userId") String userId ) {
        try {

        } catch (Exception ex) {
            LOG.error("Failed to retrieve User", ex);
            return gson.toJson("Failed to retrieve User"+ ex);
        }
    }

    public static boolean updateUserProfile(com.gapelia.core.model.User user) {
        PreparedStatement statement = null;
        try {
            statement = connection.prepareStatement(UPDATE_USER);
            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getFullName());
            statement.setDate(4, user.getDob());
            statement.setString(5, user.getGender());
            statement.setString(6, user.getLocation());
            statement.setString(7, user.getAvatarImage());
            statement.setString(8, user.getCoverImage());
            statement.setString(9, user.getDisplayName());
            statement.setString(10, user.getValidateId());
            statement.setString(11, user.getProviderId());
            statement.setTimestamp(12, user.getMemeberSince());
            statement.setTimestamp(13, user.getLastLogin());
            statement.setTimestamp(14, user.getLastUpdated());
            statement.setString(15, user.getPersonalWebsite());
            statement.setString(16, user.getBio());
            statement.setString(17, user.getTags());
            statement.setString(18, user.getFb());
            statement.setString(19, user.getGp());
            statement.setString(20, user.getTwt());
            statement.setBoolean(21, user.getIsPublic());
            statement.setInt(22, user.getUserId());
            return statement.execute();
        } catch (Exception ex) {
            LOG.error("Cannot update user profile:" + user, ex);
        }
        finally {
            try {
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + user + " " + ex.getMessage());
                return false;
            }
        }

        return false;
    }
    public static ArrayList<Book> getBookmarkedBooks(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Book> bookList = new ArrayList<Book>();
        try {
            statement = connection.prepareStatement(GET_BOOKMARKED_BOOKS);
            statement.setString(1, Integer.toString(userId));
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
            LOG.error("Cannot check user profile:" + userId, ex);
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

    public static ArrayList<Book> getCreatedBooks(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Book> bookList = new ArrayList<Book>();
        try {
            statement = connection.prepareStatement(GET_CREATED_BOOKS);
            statement.setString(1, Integer.toString(userId));
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
            LOG.error("Cannot check user profile: " + userId, ex);
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
                LOG.error("Error closing connection" + userId + " " + ex.getMessage());
            }
        }

        return null;
    }

    public static ArrayList<Library> getSubscribedLibraries(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Library> libraryList = new ArrayList<Library>();
        try {
            statement = connection.prepareStatement(GET_SUBSCRIBED_LIBRARIES);
            statement.setString(1, Integer.toString(userId));
            rs = statement.executeQuery();
            while (rs.next()) {
                Library library = new Library();
                library.setLibraryId(rs.getInt("id"));
                library.setUserId(rs.getInt("created_by"));
                library.setCoverPhoto(rs.getString("cover_photo"));
                library.setTitle(rs.getString("title"));
                library.setDescription(rs.getString("description"));
                library.setTags(rs.getString("tags"));
                library.setNumSubscribers(rs.getInt("num_subscriber"));
                library.setCreated(rs.getTimestamp("created"));
                library.setFeatutedBook(rs.getInt("featured_book"));
                libraryList.add(library);
            }
            return libraryList;
        } catch (Exception ex) {
            LOG.error("Cannot check user profile: " + userId, ex);
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
                LOG.error("Error closing connection" + userId + " " + ex.getMessage());
            }
        }

        return null;
    }
}
