package com.gapelia.core.database;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.Page;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;
import java.util.ArrayList;

public class QueryDatabaseUser {
    private static Logger LOG = Logger.getLogger(QueryDatabaseUser.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    //User Related Queries
    private static final String CHECK_USER = "SELECT * FROM users WHERE validated_id = ?";
    private static final String INSERT_USER = "INSERT INTO users (name, email, full_name, dob, gender, location, " +
            "avatar_image, display_name, validated_id, provider_id, member_since, last_login, last_updated,is_public, is_onboarded, tags)" +
            "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'f', 'f','NULL')";
    private static final String SELECT_VALIDATE = "SELECT * FROM users WHERE validated_id = ?";
    private static final String SELECT_USER = "SELECT * FROM users WHERE id = ?";
    private static final String DELETE_USER = "DELETE FROM users WHERE id = ?";
    private static final String SET_ONBOARD = "UPDATE users set is_onboarded = 't' where id = ?";
    private static final String UPDATE_USER = "UPDATE users set email = ?, full_name = ?, " +
            "location = ?, avatar_image = ?, cover_image = ?, display_name = ?, " +
            "last_login = ?, last_updated = ?, personal_website = ?, bio = ?, tags = ?, fb = ?, " +
            "gp = ?, twt = ?, is_public = ? WHERE id = ?";
    private static final String GET_FEATURED_BOOKS = "SELECT * FROM books where is_published = 't' order by random() LIMIT  20";
    private static final String GET_BOOKMARKED_BOOKS = "SELECT * FROM user_bookmarks where user_id = ?";
    private static final String GET_BOOK = "SELECT * FROM books where id = ?";
    private static final String GET_OWNED_BOOKS = "SELECT * FROM books where owned_by = ? and is_published = 't'";
    private static final String GET_DRAFT_BOOKS = "SELECT * FROM books where owned_by = ? and is_published = 'f'";
    private static final String GET_SUBSCRIBED_LIBRARIES = "SELECT * FROM user_subscriptions where user_id = ?";
    private static final String GET_OWNED_LIBRARIES = "SELECT * FROM libraries WHERE created_by = ?";
    private static final String GET_PAGES = "SELECT * FROM pages where book_id = ?";
    private static final String GET_LIBRARY = "SELECT * FROM libraries where id = ?";
    public static String onboard(User u) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(SET_ONBOARD);
            insert.setInt(1, u.getUserId());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot onboard:" + u + ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
            }
        }
        return null;
    }
    public static String checkUser(Profile p, String sessionId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        try {
            statement = connection.prepareStatement(CHECK_USER);
            statement.setString(1, p.getValidatedId());
            rs = statement.executeQuery();
            if (!rs.isBeforeFirst()) {
                return signUp(p, sessionId);
            } else {
                User u = getUserByValidatedId(p.getValidatedId());
                SessionManager.addSessionIdToUser(u, sessionId);
                return "Success";
            }
        } catch (SQLException ex) {
            LOG.error("Cannot check user u:" + p + " " + ex.getMessage());
            return "Cannot check user u:";
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + p + " " + ex.getMessage());
                return "Error closing connection ";
            }
        }
    }

    public static String signUp(Profile p, String sessionId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(INSERT_USER);
            insert.setString(1, p.getFirstName());
            insert.setString(2, p.getEmail());
            insert.setString(3, p.getFirstName() + " " + p.getLastName());
            if (p.getDob() != null) {
                insert.setDate(4, SQLUtil.convertBirthDate(p.getDob()));
            } else {
                insert.setDate(4, null);
            }
            if ("male".equals(p.getGender())) {//write tool
                insert.setString(5, "M");
            } else if ("female".equals(p.getGender())) {
                insert.setString(5, "F");
            } else {
                insert.setString(5, null);
            }

            insert.setString(6, p.getLocation());

            String profileImage = p.getProfileImageURL();
            if (profileImage.contains("graph.facebook"))
                profileImage = profileImage + "?width=1000&height=1000";

            insert.setString(7, profileImage);
            insert.setString(8, p.getFirstName());
            insert.setString(9, p.getValidatedId());
            insert.setString(10, p.getProviderId());
            insert.setTimestamp(11, new Timestamp(System.currentTimeMillis()));
            insert.setTimestamp(12, new Timestamp(System.currentTimeMillis()));
            insert.setTimestamp(13, new Timestamp(System.currentTimeMillis()));
            insert.executeUpdate();
            User u = getUserByValidatedId(p.getValidatedId());
            SessionManager.addSessionIdToUser(u, sessionId);
            return "New";
        } catch (SQLException ex) {
            return "Cannot sign up user u:" + p + " " + ex.getMessage();
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + p + " " + ex.getMessage());
                return "Error closing connection ";
            }
        }
    }

    public static User getUserByValidatedId(String validatedId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(SELECT_VALIDATE);
            statement.setString(1, validatedId);
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
                return user;
            }
        } catch (Exception ex) {
            LOG.error("Cannot get user by validate Id u:" + user, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + user + " " + ex.getMessage());
            }
        }

        return null;
    }

    public static User getUserByValidatedId(User u) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        User user = new User();
        try {
            statement = connection.prepareStatement(SELECT_VALIDATE);
            statement.setString(1, u.getValidatedId());
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
                user.setIsOnboarded(rs.getBoolean("is_onboarded"));
                user.setTags(rs.getString("tags"));
                return user;
            }
        } catch (Exception ex) {
            LOG.error("Cannot get user u:" + u, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
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
                return user;
            }
        } catch (Exception ex) {
            LOG.error("Cannot get user u:" + userId, ex);
        } finally {
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

	public static String deleteUser(int userId) {
		PreparedStatement statement = null;
		try {
			statement = connection.prepareStatement(DELETE_USER);
			statement.setInt(1, userId);
			statement.executeUpdate();
			return "Success";
		} catch (Exception ex) {
			LOG.error("Cannot delete user:" + userId, ex);
			return "Cannot delete user:"+userId;
		} finally {
			try {
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection on deleteuser: " + userId + " " + ex.getMessage());
				return "Error closing connection ";
			}
		}
	}

    public static String updateUserProfile(User user) {
        PreparedStatement statement = null;
        try {
            statement = connection.prepareStatement(UPDATE_USER);
            statement.setString(1, user.getEmail());
            statement.setString(2, user.getFullName());
            statement.setString(3, user.getLocation());
            statement.setString(4, user.getAvatarImage());
            statement.setString(5, user.getCoverImage());
            statement.setString(6, user.getDisplayName());
            statement.setTimestamp(7, new Timestamp(System.currentTimeMillis()));
            statement.setTimestamp(8, new Timestamp(System.currentTimeMillis()));
            statement.setString(9, user.getPersonalWebsite());
            statement.setString(10, user.getBio());
            statement.setString(11, user.getTags());
            statement.setString(12, user.getFb());
            statement.setString(13, user.getGp());
            statement.setString(14, user.getTwt());
            statement.setBoolean(15, user.getIsPublic());
            statement.setInt(16, user.getUserId());
            statement.executeUpdate();
            return "Success";
        } catch (Exception ex) {
            LOG.error("Cannot update user u:" + user, ex);
            return "Cannot update user u:";
        } finally {
            try {
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + user + " " + ex.getMessage());
                return "Error closing connection ";
            }
        }
    }

    public static ArrayList<Book> getBookmarkedBooks(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Book> bookList = new ArrayList<Book>();
        try {
            statement = connection.prepareStatement(GET_BOOKMARKED_BOOKS);
            statement.setInt(1, userId);
            rs = statement.executeQuery();
            while (rs.next()) {
                int bookId = rs.getInt("book_id");
                Book book = getBookByID(bookId);
                bookList.add(book);
            }
            return bookList;
        } catch (Exception ex) {
            LOG.error("Cannot check user u:" + userId, ex);
        } finally {
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

    public static ArrayList<Book> getDraftBooks(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Book> bookList = new ArrayList<Book>();
        try {
            statement = connection.prepareStatement(GET_DRAFT_BOOKS);
            statement.setInt(1, userId);
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
            LOG.error("Cannot get users book u: " + userId, ex);
        } finally {
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

    public static ArrayList<Book> getCreatedBooks(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Book> bookList = new ArrayList<Book>();
        try {
            statement = connection.prepareStatement(GET_OWNED_BOOKS);
            statement.setInt(1, userId);
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
            LOG.error("Cannot get users book u: " + userId, ex);
        } finally {
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

    public static ArrayList<Book> getFeaturedBooks() {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Book> bookList = new ArrayList<Book>();
        try {
            statement = connection.prepareStatement(GET_FEATURED_BOOKS);
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
            LOG.error("Cannot get featured books ", ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection" + ex.getMessage());
            }
        }

        return null;
    }

    public static Book getBookByID(int id) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        Book book = new Book();
        try {
            statement = connection.prepareStatement(GET_BOOK);
            statement.setInt(1, id);
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
            }
            return book;
        } catch (Exception ex) {
            LOG.error("ERROR: :" + id, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + id + " " + ex.getMessage());
            }
        }
        return null;
    }


    public static ArrayList<Page> getPages(int bookId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Page> pageList = new ArrayList<Page>();
        try {
            statement = connection.prepareStatement(GET_PAGES);
            statement.setInt(1, bookId);
            rs = statement.executeQuery();
            while (rs.next()) {
                Page page = new Page();
                page.setBookId(rs.getInt("book_id"));
                page.setPageId(rs.getInt("id"));
                page.setUserId(rs.getInt("user_id"));
                page.setPageNumber(rs.getInt("page_number"));
                page.setTemplateId(rs.getInt("template_id"));
                page.setTitle(rs.getString("title"));
                page.setContent(rs.getString("content"));
                page.setVideoURl(rs.getString("video_url"));
                page.setPhotoUrl(rs.getString("photo_url"));
                page.setPhotoId(rs.getString("photo_id"));
                page.setCreativeCommons(rs.getString("creative_commons"));
                page.setCreated(rs.getTimestamp("created"));
                page.setLastUpdated(rs.getTimestamp("last_updated"));
                pageList.add(page);
            }
            return pageList;
        } catch (SQLException e) {
            e.printStackTrace();
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

    public static Library getLibraryByID(int id) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        Library library = new Library();
        try {
            statement = connection.prepareStatement(GET_LIBRARY);
            statement.setInt(1, id);
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
            return library;
        } catch (Exception ex) {
            LOG.error("ERROR: :" + id, ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + id + " " + ex.getMessage());
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
            statement.setInt(1, userId);
            rs = statement.executeQuery();
            while (rs.next()) {
                int libraryId = rs.getInt("library_id");
                Library library = getLibraryByID(libraryId);
                libraryList.add(library);
            }
            return libraryList;
        } catch (Exception ex) {
            LOG.error("Cannot check user u: " + userId, ex);
        } finally {
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
    public static ArrayList<Library> getCreatedLibraries(User u) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Library> libraryList = new ArrayList<Library>();
        try {
            statement = connection.prepareStatement(GET_OWNED_LIBRARIES);
            statement.setInt(1, u.getUserId());
            rs = statement.executeQuery();
            while (rs.next()) {
                int libraryId = rs.getInt("id");
                Library library = getLibraryByID(libraryId);
                libraryList.add(library);
            }
            return libraryList;
        } catch (Exception ex) {
            LOG.error("ERROR: :" + u.getUserId(), ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u.getUserId() + " " + ex.getMessage());
            }
        }
        return null;
    }
    //public static Library [] getLibraries
    public static ArrayList<Library> getCreatedLibraries(int userId) {
        PreparedStatement statement = null;
        ResultSet rs = null;
        ArrayList<Library> libraryList = new ArrayList<Library>();
        try {
            statement = connection.prepareStatement(GET_OWNED_LIBRARIES);
            statement.setInt(1, userId);
            rs = statement.executeQuery();
            while (rs.next()) {
                int libraryId = rs.getInt("id");
                Library library = getLibraryByID(libraryId);
                libraryList.add(library);
            }
            return libraryList;
        } catch (Exception ex) {
            LOG.error("ERROR: :" + userId, ex);
        } finally {
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

}