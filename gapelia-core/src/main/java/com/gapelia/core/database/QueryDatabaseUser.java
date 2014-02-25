package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;

public class QueryDatabaseUser {
    private static Logger LOG = Logger.getLogger(QueryDatabaseUser.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    //User Related Queries
    private static final String CHECK_USER = "SELECT * FROM users WHERE validateId= ?";
    private static final String INSERT_USER = "INSERT INTO users (name, email, fullname, dob, gender, location, avatar_image, displayname, validate_id, provider_id, member_since, last_login, last_updated)" + "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String SELECT_USER = "SELECT name, email,fullName,dob,gender,location,image,displayname,providerId,validateId,memberSince,lastLogin,lastUpdated,personalWebsite,bio,tags,fb,gp,twt FROM users WHERE id = ?";
    private static final String UPDATE_USER = "UPDATE user SET name = ?, dob = ?, gender = ?, location = ?, image = ?, validateId = ?, providerId = ?, lastupdated = ?, personalWebsite = ?, bio = ?, tags = ?, fb = ?, gp = ?, twt = ? WHERE id = ?";
    public static boolean checkUser(Profile profile) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        try {
            statement = connection.prepareStatement(CHECK_USER);
            statement.setInt(1, Integer.parseInt(profile.getValidatedId()));
            rs = statement.executeQuery();
            if (rs == null || rs.getFetchSize()==0) {
                signUp(profile);
                return false; // newly created
            }
            return true;
        } catch (SQLException ex) {
            LOG.error("Cannot check user profile: " + profile + " " + ex.getMessage());
            return false;
        } finally {
            try {
                rs.close();
                statement.close();
            } catch (SQLException ex) {
                LOG.error("Error closing connection" + profile + " " + ex.getMessage());
            }
        }
    }

    public static void signUp(Profile profile) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(INSERT_USER);
            insert.setString(1, profile.getFirstName());
            insert.setString(2, profile.getEmail());
            insert.setString(3, profile.getFirstName() + " " + profile.getLastName());
            insert.setDate(4, SQLUtil.convertBirthDate(profile.getDob()));
            insert.setString(5, profile.getGender());
            insert.setString(6, profile.getLocation());
            insert.setString(7, profile.getProfileImageURL());
            insert.setString(8, profile.getFirstName());
            insert.setString(9, profile.getValidatedId());//Type of accont connected
            insert.setString(10, profile.getProviderId());
            insert.setDate(11, new Date(System.currentTimeMillis()));
            insert.setDate(12, new Date(System.currentTimeMillis()));
            insert.setDate(13, new Date(System.currentTimeMillis()));
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot check user profile: " + profile + " " + ex.getMessage());
        } finally {
            try {
                rs.close();
                insert.close();
            } catch (SQLException ex) {
                LOG.error("Error closing connection" + profile + " " + ex.getMessage());
            }
        }
    }
/*
    public static User getUser(Profile profile, int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            PreparedStatement statement = connection.prepareStatement(SELECT_USER);
            statement.setString(1, profile.getProviderId());
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                user.setUserId(rs.getString("proverId"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setBio(rs.getString("bio"));
                user.setFacebookUrl(rs.getString("fb"));
                user.setGooglePlusUrl(rs.getString("gp"));
                user.setTwitterUrl(rs.getString("twt"));
                user.setPhotoUrl(rs.getString("poc"));
                user.setGender(rs.getString("gender"));
                user.setLocation(rs.getString("location"));
                user.setDob(rs.getString("dob"));
                //user.setReputation(rs.getDouble("rep"));
                user.setLastUpdated(rs.getDate("lastUpdated"));
                user.setLastLoggedIn(rs.getDate("lastLogin"));
                user.setMemberSince(rs.getDate("memberSince"));
                user.setPersonalWebsite(rs.getString("personalWebsite"));
                user.setTags(rs.getString("tags"));
                break;
            }
            return user;
        } catch (Exception ex) {
            LOG.error("Cannot check user profile: " + profile, ex);
            return null;
        }
    }

    public static boolean updateUser(String name, String email. String fullname,
                                     Date dob, String gender, String location, String avatarImage,
                                     String coverImage, String displayName, String personalWebsite,
                                     String bio, String [] tags, Date lastUpdated, boolean isPublic) {
        return true;
    }

    public static boolean bookmarkBook(Profile profile, int bookId) {

        return true;
    }

    public static boolean unbookmarkBook(Profile profile, int bookId) {
        return true;
    }

    public static boolean subscribeLibrary(Profile profile, int libraryId) {
        return true;
    }

    public static boolean unsubscribeLibrary(Profile profile, int libraryId) {
        return true;
    }

    public static boolean voteBook(Profile profile, int bookId) {
        return true;
    }

    public static boolean removeVoteBook(Profile profile, int bookId) {
        return true;
    }

    public static Book [] getBookmarkedBooks(Profile profile) {
        return null;
    }

    public static Book [] getBooksCreated(Profile profile) {
        return null;
    }

    public static Library [] getLibrariesSubscribed(Profile profile) {
        return null;
    }
    */
}
