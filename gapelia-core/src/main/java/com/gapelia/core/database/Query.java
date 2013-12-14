package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Event;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.User;
import com.gapelia.core.util.TestHelper;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Author: Abhishek Tiwari (14/12/13)
 */
public class Query {
	private static Logger LOG = Logger.getLogger(Book.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();

	private static final String CREATE_TABLE_USER = "";
	private static final String CREATE_TABLE_BOOK = "";
	private static final String CREATE_TABLE_DIMENSION = "";
	private static final String CREATE_TABLE_LIBRARY = "";
	private static final String CREATE_TABLE_NOTIFICATION = "";
	private static final String CREATE_TABLE_PAGE = "";
	private static final String CREATE_TABLE_PHOTO = "";

	// All User related queries
	private static final String SELECT_USER = "SELECT name, email, bio, fb, gp, twt, pic, gender, location, dob, rep, created, updated, enabled FROM user WHERE id = ?";
	private static final String INSERT_USER = "INSERT INTO user (id, name, email, bio, fb, gp, twt, pic, gender, location, dob, auth, rep, created, updated, enabled) " +
												"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	private static final String UPDATE_USER = "UPDATE user SET name = ?, email = ?, bio = ?, fb = ?, gp = ?, " +
												"twt = ?, pic = ?, gender = ?, location = ?, dob = ?, updated = ? WHERE id = ?";

	/********************************/
	/* Methods to get User details  */
	/********************************/

	public static boolean checkProfile(Profile profile) {
		if (isDummy())
			return false;
		try {
			PreparedStatement statement = connection.prepareStatement(SELECT_USER);
			statement.setString(1, profile.getProviderId());
			ResultSet rs = statement.executeQuery();
			if (rs == null || rs.getFetchSize() == 0) {
				PreparedStatement insert = connection.prepareStatement(INSERT_USER);
				insert.setString(1, profile.getProviderId());
				insert.setString(2, profile.getFirstName() + " " + profile.getLastName());
				insert.setString(3, profile.getEmail());
				insert.setString(4, "A Gapelian Hero");
				insert.setString(5, null);
				insert.setString(6, null);
				insert.setString(7, null);
				insert.setString(8, profile.getProfileImageURL());
				insert.setString(9, profile.getGender());
				insert.setString(10, profile.getLocation());
				insert.setString(11, profile.getDob().toString());
				insert.setString(12, "");
				insert.setDouble(13, 50.0);
				insert.setDate(14, new Date(System.currentTimeMillis()));
				insert.setDate(15, new Date(System.currentTimeMillis()));
				insert.setBoolean(16, true);
				return false; // newly created
			}
			return true;
		} catch (Exception ex) {
			LOG.error("Cannot check user profile: " + profile, ex);
			return false;
		}
	}

	public static User getUser(Profile profile) {
		if (isDummy())
			return TestHelper.getDummyUser();
		User user = new User();
		try {
			PreparedStatement statement = connection.prepareStatement(SELECT_USER);
			statement.setString(1, profile.getProviderId());
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				user.setUserId(rs.getString("id"));
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
				user.setReputation(rs.getDouble("rep"));
				user.setLastLoggedIn(rs.getDate("updated"));
				break;
			}
			return user;
		} catch (Exception ex) {
			LOG.error("Cannot check user profile: " + profile, ex);
			return null;
		}
	}

	public static Book[] getBooksCreatedByUser(Profile profile) {
		if (isDummy())
			return TestHelper.getDummyBooks();
		return new Book[0];
	}

	public static Book[] getBooksCollectedByUser(Profile profile) {
		if (isDummy())
			return TestHelper.getDummyBooks();
		return new Book[0];
	}

	public static Library[] getLibrariesCollectedByUser(Profile profile) {
		if (isDummy())
			return TestHelper.getDummyUserLibraries();
		return new Library[0];
	}

	public static boolean deleteBookById(Profile profile, String bookId) {
		if (isDummy())
			return true;
		return false;
	}

	public static boolean updateUserProfile(Profile profile, String name, String email, String bio, String facebookUrl,
											String googlePlusUrl, String twitterUrl, String photoUrl, String gender,
											String location, String dob) {
		if (isDummy())
			return true;
		try {
			PreparedStatement statement = connection.prepareStatement(UPDATE_USER);
			statement.setString(1, name);
			statement.setString(2, email);
			statement.setString(3, bio);
			statement.setString(4, facebookUrl);
			statement.setString(5, googlePlusUrl);
			statement.setString(6, twitterUrl);
			statement.setString(7, photoUrl);
			statement.setString(8, gender);
			statement.setString(9, location);
			statement.setString(10, dob);
			statement.setDate(11, new Date(System.currentTimeMillis()));
			statement.setString(12, profile.getProviderId());
			return statement.execute();
		} catch (Exception ex) {
			LOG.error("Cannot update user profile: " + profile, ex);
			return false;
		}
	}

	/********************************/
	/* Methods to manipulate Books  */
	/********************************/

	public static boolean saveBook(Profile profile, String bookId, String title, String language, String libraryId,
								   String tags, String dimension, String createdBy, String isPublished) {
		if (isDummy())
			return true;
		return false;
	}


	public static boolean savePage(Profile profile, String pageId, String title, String description, String location,
								   String templateId, String marginX, String marginY, String videoUrl, String pageNumber,
								   String bookId, String createdByUserId, String photoUrl, String photoId) {
		if (isDummy())
			return true;
		return false;
	}


	public static Book getBookById(Profile profile, String bookId) {
		if (isDummy())
			return TestHelper.getDummyBooks()[0];
		return null;
	}

	public static boolean subscribeBook(Profile profile, String bookId) {
		if (isDummy())
			return true;
		return false;
	}

	public static boolean unSubscribeBook(Profile profile, String bookId) {
		if (isDummy())
			return true;
		return false;
	}

	/***********************************/
	/* Methods to check Notifications  */
	/***********************************/

	public static Event[] getNotifications(Profile profile) {
		return new Event[0];
	}

	/************************************/
	/* Methods to manipulate Libraries  */
	/************************************/

	public static Book[] getFeaturedBooks(Profile profile) {
		if (isDummy())
			return TestHelper.getDummyBooks();
		return null;
	}


	public static Book[] getAllBooks(Profile profile, String page) {
		if (isDummy())
			return TestHelper.getDummyBooks();
		return null;
	}

	public static Library getLibraryById(Profile profile, String libraryId) {
		if (isDummy())
			return TestHelper.getDummyUserLibraries()[0];
		return null;
	}

	public static Library[] getAllLibraries(Profile profile, String page) {
		if (isDummy())
			return TestHelper.getDummyUserLibraries();
		return null;
	}

	public static Library[] getLibraryByPrefix(Profile profile, String prefix) {
		if (isDummy())
			return TestHelper.getDummyUserLibraries();
		return null;
	}

	public static boolean subscribeLibrary(Profile profile, String libraryId) {
		if (isDummy())
			return true;
		return false;
	}

	public static boolean unSubscribeLibrary(Profile profile, String libraryId) {
		if (isDummy())
			return true;
		return false;
	}

	/************************************/
	/* Methods to manipulate Dimension  */
	/************************************/

	public static Book[] getTopBooksByDimension(Profile profile, String dimension) {
		if (isDummy())
			return TestHelper.getDummyBooks();
		return null;
	}

	public static Book[] getAllBooksByDimension(Profile profile, String dimension, String page) {
		if (isDummy())
			return TestHelper.getDummyBooks();
		return null;
	}

	private static boolean isDummy() {
		String dummy = System.getProperty("gapeliaDummy");
		if (null != dummy && "true".equals(dummy))
			return true;
		return false;
	}
}
