package com.gapelia.core.database;

import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class QueryDatabaseUser {
	private static Logger LOG = Logger.getLogger(Book.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();

	//User Related Queries
	private static final String SELECT_USER = "SELECT name, email,fullName,dob,gender,location,image,displayname,providerId,validateId,memberSince,lastLogin,lastUpdated,personalWebsite,bio,tags,fb,gp,twt FROM users WHERE id = ?";
	private static final String CHECK_USER = "SELECT * FROM users WHERE validateId= ?";
	private static final String INSERT_USER = "INSERT INTO users (name,email, fullName,dob,gender,location,image,displayname,validateId,providerId,personalWebsite,memberSince,lastLogin,lastUpdated,bio,tags,id)" +"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	private static final String UPDATE_USER = "UPDATE user SET name = ?, dob = ?, gender = ?, location = ?, image = ?, validateId = ?, providerId = ?, lastupdated = ?, personalWebsite = ?, bio = ?, tags = ?, fb = ?, gp = ?, twt = ? WHERE id = ?";	/********************************/
	/* Methods to get User details  */
	/********************************/
	public static boolean checkUser(Profile profile) {
		try {
			PreparedStatement statement = connection.prepareStatement(CHECK_USER);
			statement.setInt(1,profile.getValidatedId());
			ResultSet rs = statement.executeQuery();
			if (rs == null || rs.getFetchSize()==0) {
				signUp(profile)
				return false; // newly created
			}
			return true;
		} catch (Exception ex) {
			LOG.error("Cannot check user profile: " + profile, ex);
			System.out.println("Cannot check user profile: " + ex.toString());
			return false;
		}
	}

	public static void signUp(Profile profile) {
		try {
			System.out.println("making new user");
				PreparedStatement insert = connection.prepareStatement(INSERT_USER);
				insert.setString(1, profile.getFirstName());
				insert.setString(2, profile.getEmail());
				insert.setString(3, profile.getFirstName() + " " + profile.getLastName());
				insert.setString(4, profile.getDob().toString());
				insert.setString(5, profile.getGender());
				insert.setString(6, profile.getLocation());
				insert.setString(7, profile.getProfileImageURL());
				insert.setString(8, profile.getFirstName());
				insert.setString(9, profile.getProviderId());//Type of accont connected
				insert.setString(10, profile.getValidatedId());
				insert.setString(11,null);
				insert.setDate(12, new Date(System.currentTimeMillis()));
				insert.setDate(13, new Date(System.currentTimeMillis()));
				insert.setDate(14, new Date(System.currentTimeMillis()));
				insert.setString(15, "I Just Joined and I Love To Explore!!!!! ");
				insert.setString(16, "Fun");
				insert.setInt(17, 1);
				//insert.setBoolean(17,TRUE);//is public
				System.out.println(insert);
				rs = insert.executeQuery();
				System.out.println(rs);
			return;
		} catch (Exception ex) {
			LOG.error("Could not Sign User Up " + profile, ex);
			return;
		}
	}

	public static User getUser(Profile profile, int userId) {
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

    public static boolean bookmarkBook(Profile profile, int bookId) {
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
    	
    }
}
