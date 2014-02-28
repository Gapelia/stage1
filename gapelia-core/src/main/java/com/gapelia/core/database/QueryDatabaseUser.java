package com.gapelia.core.database;

import com.gapelia.core.model.User;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;

public class QueryDatabaseUser {
    private static Logger LOG = Logger.getLogger(QueryDatabaseUser.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    //User Related Queries
    private static final String CHECK_USER = "SELECT * FROM users WHERE validate_id= ?";
    private static final String INSERT_USER = "INSERT INTO users (name, email, full_name, dob, gender, location, avatar_image, display_name, validate_id, provider_id, member_since, last_login, last_updated)" + "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String SELECT_VALIDATE = "SELECT * FROM users WHERE validate_id = ?";
    private static final String SELECT_USER = "SELECT * FROM users WHERE id = ?";
    private static final String UPDATE_USER = "UPDATE user SET name = ?, email = ?, full_name = ?, dob = ?, gender = ?, location = ?, avatar_image = ?, cover_image = ?, display_name = ?, validate_id = ?, provider_id = ?, member_since = ?, last_login = ?, last_updated = ?, personal_website = ?, bio = ?, tags = ?, fb = ?, gp = ?, twt = ?, is_public = ? WHERE id = ?";
    public static boolean checkUser(Profile profile) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        try {
            statement = connection.prepareStatement(CHECK_USER);
            statement.setString(1, profile.getValidatedId());
            rs = statement.executeQuery();
            if (rs == null || rs.getFetchSize()==0) {
                return signUp(profile);
            }
        } catch (SQLException ex) {
            LOG.error("Cannot check user profile: " + profile + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection" + profile + " " + ex.getMessage());
            }
        }
        return true;
    }

    public static boolean signUp(Profile profile) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(INSERT_USER);
            insert.setString(1, profile.getFirstName());
            insert.setString(2, profile.getEmail());
            insert.setString(3, profile.getFirstName() + " " + profile.getLastName());
            insert.setDate(4, SQLUtil.convertBirthDate(profile.getDob()));
            if("male".equals(profile.getGender())) {//write tool
                insert.setString(5, "M");
            } else {
                insert.setString(5, "F");
            }
            insert.setString(6, profile.getLocation());
            insert.setString(7, profile.getProfileImageURL());
            insert.setString(8, profile.getFirstName());
            insert.setString(9, profile.getValidatedId());
            insert.setString(10, profile.getProviderId());
            insert.setDate(11, new Date(System.currentTimeMillis()));
            insert.setDate(12, new Date(System.currentTimeMillis()));
            insert.setDate(13, new Date(System.currentTimeMillis()));
            LOG.info("Gapelia pre execute" + insert.toString());
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot check user profile: " + profile + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection" + profile + " " + ex.getMessage());
                return false;
            }
        }
        return true;
    }

    public static User getUserByValidateId(Profile profile) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(SELECT_VALIDATE);
            statement.setString(1, profile.getValidatedId());
            rs = statement.executeQuery();
            if (rs.next()) {
                user.setUserId(rs.getInt("id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setDisplayName(rs.getString("display_name"));
                user.setFullName(rs.getString("full_name"));
                user.setCoverImage(rs.getString("cover_image"));
                user.setProviderId(rs.getString("provider_id"));
                user.setValidateId(rs.getString("validate_id"));
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
                return user;
            }
        } catch (Exception ex) {
            LOG.error("Cannot check user profile: " + profile, ex);
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
                LOG.error("Error closing connection" + profile + " " + ex.getMessage());
            }
        }

        return null;
    }

    public static User getUserById(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(SELECT_USER);
            statement.setString(1, Integer.toString(userId));
            rs = statement.executeQuery();
            if (rs.next()) {
                user.setUserId(rs.getInt("id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setDisplayName(rs.getString("display_name"));
                user.setFullName(rs.getString("full_name"));
                user.setCoverImage(rs.getString("cover_image"));
                user.setProviderId(rs.getString("provider_id"));
                user.setValidateId(rs.getString("validate_id"));
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
                return user;
            }
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


    public static boolean updateUserProfile(User user) {
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
            LOG.error("Cannot update user profile: " + user, ex);
        }
        finally {
            try {
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection" + user + " " + ex.getMessage());
                return false;
            }
        }

        return false;
    }
/*
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
    /*
    //public looking into profile
    public static User getUser(String userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(GET_USER);
            statement.setString(1, userId);
            rs = statement.executeQuery();
            while (rs.next()) {
                user.setUserId(rs.getString("validate_id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setFullName(rs.getString("fullname"));
                user.setDob(rs.getDate("dob"));
                user.setGender(rs.getString("gender"));
                user.setLocation(rs.getString("location"));
                user.setAvatarImage(rs.getString("avatar_image"));
                user.setCoverImage(rs.getString("cover_image"));
                user.setValidateId(rs.getString("validate_id"));
                user.setProviderId(rs.getString("provider_id"));
                user.setPersonalWebsite(rs.getString("personal_website"));
                user.setBio(rs.getString("bio"));
                Array a = rs.getArray("tags");
                user.setTags((String[])a.getArray());
                user.setFb(rs.getString("fb"));
                user.setGp(rs.getString("gp"));
                user.setTwt(rs.getString("twt"));
                user.setMemeberSince(rs.getDate("member_since"));
                user.setLastLogin(rs.getDate("last_login"));
                user.setLastUpdated(rs.getDate("last_updated"));
                user.setIsPublic(rs.getBoolean("is_public"));
            }
            return user;
        } catch (SQLException ex) {
            LOG.info("Cannot check user profile: " + profile + " " + ex.getMessage());
            LOG.error("Cannot check user profile: " + profile + " " + ex.getMessage());
            return null;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.info("Error closing connection" + profile + " " + ex.getMessage());
                LOG.error("Error closing connection" + profile + " " + ex.getMessage());
                return null;
            }
        }
    }

    public static User getUser(Profile profile) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(GET_USER);
            statement.setString(1, profile.getValidatedId());
            rs = statement.executeQuery();
            while (rs.next()) {
                user.setUserId(rs.getString("validate_id"));
                user.setName(rs.getString("name"));
                user.setEmail(rs.getString("email"));
                user.setFullName(rs.getString("fullname"));
                user.setDob(rs.getDate("dob"));
                user.setGender(rs.getString("gender"));
                user.setLocation(rs.getString("location"));
                user.setAvatarImage(rs.getString("avatar_image"));
                user.setCoverImage(rs.getString("cover_image"));
                user.setValidateId(rs.getString("validate_id"));
                user.setProviderId(rs.getString("provider_id"));
                user.setPersonalWebsite(rs.getString("personal_website"));
                user.setBio(rs.getString("bio"));
                Array a = rs.getArray("tags");
                user.setTags((String[])a.getArray());
                user.setFb(rs.getString("fb"));
                user.setGp(rs.getString("gp"));
                user.setTwt(rs.getString("twt"));
                user.setMemeberSince(rs.getDate("member_since"));
                user.setLastLogin(rs.getDate("last_login"));
                user.setLastUpdated(rs.getDate("last_updated"));
                user.setIsPublic(rs.getBoolean("is_public"));
            }
            return user;
        } catch (SQLException ex) {
            LOG.info("Cannot check user profile: " + profile + " " + ex.getMessage());
            LOG.error("Cannot check user profile: " + profile + " " + ex.getMessage());
            return null;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.info("Error closing connection" + profile + " " + ex.getMessage());
                LOG.error("Error closing connection" + profile + " " + ex.getMessage());
                return null;
            }
        }
    }*/
}
