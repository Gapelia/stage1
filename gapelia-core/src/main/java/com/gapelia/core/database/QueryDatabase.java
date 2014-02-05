package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Page;
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
public class QueryDatabase {
	private static Logger LOG = Logger.getLogger(Book.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	//Page Relate Queries
	private static final String UPDATE_PAGE = "UPDATE pages set title = ?, description = ?, templateId = ?, bookId = ?, marginX = ?, marginY = ?, videoUrl = ?, pageNumber = ?, userId = ?, photoUrl = ?, photoId = ?, creativeCommons = ?, lastUpdated = ? WHERE pageId = ?";
	private static final String INSERT_PAGE = "INSERT INTO pages (title, description,templateId,bookId,marginX,marginY,videoUrl,pageNumber,userId,photoUrl,photoId,pageId) "+ "VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
	// Book Related Queries
	private static final String INSERT_BOOK = "INSERT INTO books (bookiD,title, language,library,tags,userId,isPublished,coverPhoto) " + "VALUES(?,?,?,?,?,?,?,?)";
	private static final String UPDATE_BOOK = "UPDATE books set coverPhoto = ?, title = ?, language = ?, library = ?, tags = ?, lastUpdated = ?, isPublished = ? WHERE bookId= ?";
	private static final String SELECT_BOOK_FROM_ID = "SELECT pageId,title,description,templateId,videoUrl,photoUrl FROM pages where bookId =  ?";//if not in quotations throws error
	private static final String SELECT_PUBLISHED_BOOKS = "SELECT coverPhoto, bookId,title,language,library,tags,userId,isPublished FROM books WHERE isPublished = true ORDER BY random() LIMIT 20";
	private static final String SELECT_PUBLISHED_BOOKS_FROM_USER = "SELECT coverPhoto, bookId,title,language,library,tags,userId,isPublished FROM books WHERE isPublished = true and userId = ? ORDER BY random() LIMIT 20";
	private static final String SELECT_BOOKS_FROM_LIBRARY="SELECT coverPhoto, bookId,title,language,library,tags,userId,isPublished FROM books where library = ? ORDER BY random() LIMIT 20";
	//User Related Queries
	private static final String SELECT_USER = "SELECT name, email,fullName,dob,gender,location,image,displayname,providerId,validateId,memberSince,lastLogin,lastUpdated,personalWebsite,bio,tags,fb,gp,twt FROM users WHERE id = ?";
	private static final String CHECK_USER = "SELECT * FROM users WHERE id= ?";
	private static final String INSERT_USER = "INSERT INTO users (name,email, fullName,dob,gender,location,image,displayname,validateId,providerId,personalWebsite,memberSince,lastLogin,lastUpdated,bio,tags,id)" +"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	private static final String UPDATE_USER = "UPDATE user SET name = ?, dob = ?, gender = ?, location = ?, image = ?, validateId = ?, providerId = ?, lastupdated = ?, personalWebsite = ?, bio = ?, tags = ?, fb = ?, gp = ?, twt = ? WHERE id = ?";
	/********************************/
	/* Methods to get User details  */
	/********************************/
	public static boolean checkProfile(Profile profile) {
		try {
			PreparedStatement statement = connection.prepareStatement(CHECK_USER);
			int id=Integer.parseInt(profile.getValidatedId());
			statement.setInt(1, id);
			
			ResultSet rs = statement.executeQuery();
			System.out.println(rs.getWarnings());
			if (rs == null || rs.getFetchSize()==0) {
				System.out.println("making new statment");
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
				insert.setInt(17, id);
				//insert.setBoolean(17,TRUE);//is public
				System.out.println(insert);
				rs = insert.executeQuery();
				System.out.println(rs);
				return false; // newly created
			}
			return true;
		} catch (Exception ex) {
			LOG.error("Cannot check user profile: " + profile, ex);
			System.out.println("Cannot check user profile: " + ex.toString());
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

	public static Book[] getBooksCreatedByUser(Profile profile) {
		Book [] books = new Book[20];
		int i=0;
		System.out.println("getting books created by user, pre try");
		try {
			PreparedStatement statement = connection.prepareStatement(SELECT_PUBLISHED_BOOKS_FROM_USER);
			statement.setString(1,profile.getValidatedId());
			System.out.println(statement);
			ResultSet rs = statement.executeQuery();
			System.out.println(rs.toString());
			while (rs.next()) {
				Book book = new Book();
				book.setBookId(rs.getString("bookid"));
				book.setTitle(rs.getString("title"));
				book.setCoverPhoto(rs.getString("coverphoto"));
				book.setLanguage(rs.getString("language"));
				book.setLibrary(rs.getString("library"));
				book.setTags(rs.getString("tags"));
				book.setUserId(rs.getString("userid"));//need to change database beacue is int:( will change when done with testing
				books[i]=book;
				i++;
			}
			return books; 
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			LOG.error("Cannot check user profile: " + profile, ex);
			return null;
		}
	}

	public static Book[] getBooksCollectedByUser(Profile profile) {
		Book [] books = new Book[20];
		int i=0;
		try {
			PreparedStatement statement = connection.prepareStatement(SELECT_PUBLISHED_BOOKS_FROM_USER);//Change to subscibed
			statement.setString(1,profile.getValidatedId());
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				Book book = new Book();
				book.setBookId(rs.getString("bookid"));
				book.setTitle(rs.getString("title"));
				book.setCoverPhoto(rs.getString("coverphoto"));
				book.setLanguage(rs.getString("language"));
				book.setLibrary(rs.getString("library"));
				book.setTags(rs.getString("tags"));
				book.setUserId(rs.getString("userid"));//need to change database beacue is int:( will change when done with testing
				books[i]=book;
				i++;
			}
			return books; 
		} catch (Exception ex) {
			LOG.error("Cannot check user profile: " + profile, ex);
			return null;
		}
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
											String location, String dob, String personalWebsite, String tags) {
		if (isDummy())
			return true;
		try {
			PreparedStatement statement = connection.prepareStatement(UPDATE_USER);
			statement.setString(1, name);
			statement.setString(2, email);
			statement.setString(3, profile.getFirstName() + " " + profile.getLastName());
			statement.setString(4, dob);
			statement.setString(5, gender);
			statement.setString(6, location);
			statement.setString(7, photoUrl);
			statement.setString(8, profile.getValidatedId());
			statement.setString(9, profile.getProviderId());
			statement.setDate(10, new Date(System.currentTimeMillis()) );
			statement.setString(11, personalWebsite);
			statement.setString(12, bio);
			statement.setString(13, tags);
			statement.setString(14, facebookUrl);
			statement.setString(15, googlePlusUrl);
			statement.setString(16, twitterUrl);
			statement.setInt(17, Integer.parseInt(profile.getValidatedId()));
			return statement.execute();
		} catch (Exception ex) {
			LOG.error("Cannot update user profile: " + profile, ex);
			return false;
		}
	}

	/********************************/
	/* Methods to manipulate Books  */
	/********************************/

	public static String saveBook(Profile profile,String bookId, String title, String language, String library,
								   String tags, String createdBy, int isPublished,String coverPhoto) {
		if (isDummy())
			return "success";
		LOG.info("Try to save book!");
		System.out.println("Saving book");
		boolean mybool = true;
		if(isPublished == 0){ mybool=false;}
		try {
			PreparedStatement statement = connection.prepareStatement(INSERT_BOOK);
			System.out.println(statement.toString());
			statement.setString(1, bookId);
			statement.setString(2, title);
			statement.setString(3, language);
			statement.setString(4, library);
			statement.setString(5, tags);
			statement.setString(6, profile.getValidatedId());
			statement.setBoolean(7, mybool);
			statement.setString(8,coverPhoto);
			statement.execute();
			System.out.println(statement.toString());
			return  statement.toString();
		} catch (Exception ex) {
			System.out.println(ex.toString());
			return ex.toString();
		}
	}

	public static String updateBook(Profile profile,String bookId, String title, String language, String library,
								   String tags, String createdBy, int isPublished,String coverPhoto) {
		if (isDummy())
			return "success";
		LOG.info("Try to save book!");
		try {
			PreparedStatement statement = connection.prepareStatement(UPDATE_BOOK);
			statement.setString(8, bookId);
			statement.setString(1, title);
			statement.setString(2, language);
			statement.setString(3, library);
			statement.setString(4, tags);
			statement.setString(5, profile.getProviderId());
			statement.setInt(6, isPublished);
			statement.setString(7,coverPhoto);
			statement.execute();
			return  statement.toString();
		} catch (Exception ex) {
			return ex.toString();
		}
	}
	public static String savePage(Profile profile, String title, String description, String location,
								   int templateId, String marginX, String marginY, String videoUrl, int pageNumber,
								   String bookId, String createdByUserId, String photoUrl, String photoId,String pageId) {
		if (isDummy())
			return "success";
		LOG.info("Try to save page!");
		try {
			PreparedStatement statement = connection.prepareStatement(INSERT_PAGE);
			statement.setString(1, title);
			statement.setString(2, description);
			statement.setInt(3, templateId);
			statement.setString(4, bookId);
			statement.setString(5, marginX);
			statement.setString(6, marginY);
			statement.setString(7, videoUrl);
			statement.setInt(8, pageNumber);
			statement.setInt(9, 1);
			statement.setString(10, photoUrl);
			statement.setString(11, photoId);
			statement.setString(12,pageId);
			statement.execute();
			return  statement.toString();
		} catch (Exception ex) {
			return ex.toString();
		}
	}


	public static Page[] getBookById(Profile profile, String bookId) {
		Page [] pages = new Page[20];
		int i=0;
		try {
			PreparedStatement statement = connection.prepareStatement(SELECT_BOOK_FROM_ID);
			statement.setString(1, bookId);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				Page page = new Page();
				page.setPageId(rs.getString("PageId"));
				page.setTitle(rs.getString("title"));
				page.setDescription(rs.getString("description"));
				page.setTemplateId(rs.getInt("templateId"));
				page.setPhoto(rs.getString("photoUrl"));
				page.setVideoUrl(rs.getString("videoUrl"));
				pages[i]=page;
				i++;
			}
			return pages;
		} catch (Exception ex) {
			System.out.println("Cannot load books "+ ex.getMessage());
			LOG.error("Cannot load books ", ex);
			return pages;
		}
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


	public static Book[] getAllBooks() {
		if (isDummy())
		{return TestHelper.getDummyBooks();}
		Book [] books = new Book[20];
		int i=0;
		try {
			PreparedStatement statement = connection.prepareStatement(SELECT_PUBLISHED_BOOKS);
			ResultSet rs = statement.executeQuery();
			while (rs.next()) {
				Book book = new Book();
				book.setBookId(rs.getString("bookid"));
				book.setTitle(rs.getString("title"));
				book.setCoverPhoto(rs.getString("coverphoto"));
				book.setLanguage(rs.getString("language"));
				book.setLibrary(rs.getString("library"));
				book.setTags(rs.getString("tags"));
				//book.setUserId(rs.getInt("userid"));//need to change database beacue is int:( will change when done with testing
				books[i]=book;
				i++;
			}
			return books;
		} catch (Exception ex) {
			LOG.error("Cannot load books ", ex);
			return null;
		}
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
		String dummy = null;
		try {
			dummy = System.getProperty("gapeliaDummy");
		} catch (Exception ex) {
			// Ignore mode is null
		}
		if (null != dummy && "true".equals(dummy))
			return true;
		return false;
	}
}
