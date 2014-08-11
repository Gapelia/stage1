package com.gapelia.core.database;

import com.gapelia.core.api.Email;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;
import com.gapelia.core.model.Book;

import java.sql.*;
import java.util.ArrayList;

public class QueryDatabaseLibrary {
	private static Logger LOG = Logger.getLogger(QueryDatabaseLibrary.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
//    private static final String GET_GOD_LIBRARIES = "SELECT * FROM libraries where created_by=1 order by random()";

	private static final String GET_ALL_LIBRARIES = "select * from libraries left join (select count(library_id) as num_subscribers, " +
			"library_id from user_subscriptions group by library_id order by num_subscribers limit 20) as t2 on libraries.id = t2.library_id " +
			"where num_subscribers > 4 order by num_subscribers desc nulls last limit 20";

	private static final String GET_LIBRARY = "SELECT * FROM libraries WHERE id = ?";
	private static final String GET_EMAILS_FOR_LIBRARY_SUBSCRIBERS = "select users.id from user_subscriptions join users on user_subscriptions.user_id = users.id where library_id = ? and not email = ''";
	private static final String GET_BOOKS_IN_LIBRARY = "SELECT * FROM library_books WHERE library_id = ?";
	private static final String ADD_BOOK_TO_LIBRARY = "INSERT INTO library_books (library_id,book_id) VALUES (? , ?)";
	private static final String GET_BOOK = "SELECT * FROM books where id=?";
	private static final String GET_NUM_SUBSCRIBERS = "select count(library_id) from user_subscriptions where library_id = ? group by library_id";
	private static final String REMOVE_BOOK_FROM_LIBRARY = "DELETE FROM library_books WHERE library_id = ? AND book_id = ?";
	private static final String DELETE_LIBRARY = "DELETE FROM libraries WHERE id = ?";
	private static final String CREATE_LIBRARY = "INSERT INTO libraries (created_by,title,tags,cover_photo,description,created) VALUES (?,?,?,?,?,?)";
	private static final String UPDATE_LIBRARY = "UPDATE libraries set title = ?,tags = ?,cover_photo = ?,description = ? WHERE id = ?";
    private static final String IS_VALID_LIBRARYID = "SELECT 1 FROM libraries WHERE id = ?";
    private static final String GET_LIBRARY_CONTRIBUTORS = "select distinct users.* from users join books on users.id = books.owned_by join library_books on books.id = library_books.book_id where library_books.library_id = ?";
	private static final String GET_MOST_VOTED_BOOKS = "select library_books.book_id from library_books join (select count(book_id) as num_votes,book_id from user_votes group by book_id) as t2 on library_books.book_id = t2.book_id where library_id = ? ORDER BY num_votes DESC limit ?";

    public static boolean isValidLibraryId(int libraryId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(IS_VALID_LIBRARYID);
            insert.setInt(1, libraryId);
            ResultSet rs = insert.executeQuery();

            boolean result = rs.next();

            rs.close();
            insert.close();
            return result;

        } catch (SQLException ex) {
            LOG.error("Cannot get if libraryId is valid:" + libraryId + ex.getMessage());
            return false;
        }
    }


	public static ArrayList<User> getEmailsForLibrarySubscribers(int library_id) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		String num = null;
		ArrayList<User> list = new ArrayList<User>();
		User user = null;
		try {
			statement = connection.prepareStatement(GET_EMAILS_FOR_LIBRARY_SUBSCRIBERS);
			statement.setInt(1, library_id);
			rs = statement.executeQuery();
			while (rs.next()) {
				list.add(QueryDatabaseUser.getUserById(rs.getInt(1)));
			}
		} catch (Exception ex) {
			LOG.error("ERROR getting library subscriber emails:" + library_id, ex);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection libraryGetContribs lib id" + library_id + " " + ex.getMessage());
			}
		}
		return list;
	}

	public static ArrayList<User> getLibraryContributors(int library_id) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		String num = null;
		ArrayList<User> list = new ArrayList<User>();
		User user = null;
		try {
			statement = connection.prepareStatement(GET_LIBRARY_CONTRIBUTORS);
			statement.setInt(1, library_id);
			rs = statement.executeQuery();
			while (rs.next()) {
				user = new User();
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
				user.setEmailOptOut(rs.getBoolean("opt_out"));
				user.setUniversity(rs.getString("university"));
				user.setDepartment(rs.getString("department"));

				list.add(user);
			}
		} catch (Exception ex) {
			LOG.error("ERROR library contributors for lib id:" + library_id, ex);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection libraryGetContribs lib id" + library_id + " " + ex.getMessage());
			}
		}
		return list;
	}

	public static String getNumSubscribers(int library_id) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		String num = null;
		try {
			statement = connection.prepareStatement(GET_NUM_SUBSCRIBERS);
			statement.setInt(1, library_id);
			rs = statement.executeQuery();
			if (rs.next()) {
				num = Integer.toString(rs.getInt(1));
			}
		} catch (Exception ex) {
			LOG.error("ERROR getting num subscriptions for library:" + library_id, ex);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + library_id + " " + ex.getMessage());
			}
		}
		return num;
	}

	public static ArrayList<Book> getMostVotedBooksInLibrary(int library_id, int limit) {
		PreparedStatement statement = null;
		ResultSet rs = null;
        ArrayList<Book> bookList = null;
		try {
			statement = connection.prepareStatement(GET_MOST_VOTED_BOOKS);
			statement.setInt(1, library_id);
            statement.setInt(2, limit);
			rs = statement.executeQuery();

            bookList = new ArrayList<Book>();

            while (rs.next()) {
				int book_id = rs.getInt("book_id");
				Book book = QueryDatabaseUser.getBookByID(book_id);
                bookList.add(book);
			}

		} catch (Exception ex) {
			LOG.error("ERROR getting most voted book in library:" + library_id, ex);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + library_id + " " + ex.getMessage());
			}
		}
        return bookList;
	}

	public static ArrayList<Library> getAllLibraries() {
		PreparedStatement statement = null;
		ResultSet rs = null;
		ArrayList<Library> libraryList = new ArrayList<Library>();
		try {
			statement = connection.prepareStatement(GET_ALL_LIBRARIES);
			rs = statement.executeQuery();
			while (rs.next()) {
				int libraryId = rs.getInt("id");
				Library library = QueryDatabaseUser.getLibraryByID(libraryId);
				libraryList.add(library);
			}
			return libraryList;
		} catch (Exception ex) {
			LOG.error("ERROR: loading all libraryes:", ex);
		} finally {
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

	public static ArrayList<Library> getGodLibraries() {
		PreparedStatement statement = null;
		ResultSet rs = null;
		ArrayList<Library> libraryList = new ArrayList<Library>();
		try {
			statement = connection.prepareStatement(GET_ALL_LIBRARIES);
			rs = statement.executeQuery();
			while (rs.next()) {
				int libraryId = rs.getInt("id");
				Library library = QueryDatabaseUser.getLibraryByID(libraryId);
				libraryList.add(library);
			}
			return libraryList;
		} catch (Exception ex) {
			LOG.error("ERROR: loading god libraryes:", ex);
		} finally {
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

	public static Library getLibrary(int id) {
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

	public static ArrayList<Book> getBooksInLibrary(int libraryId) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		ResultSet rs1 = null;
		ArrayList<Book> bookList = new ArrayList<Book>();
		try {
			statement = connection.prepareStatement(GET_BOOKS_IN_LIBRARY);
			statement.setInt(1, libraryId);
			rs = statement.executeQuery();
			while (rs.next()) {
				statement = connection.prepareStatement(GET_BOOK);
				statement.setInt(1, rs.getInt("book_id"));
				rs1 = statement.executeQuery();
				while (rs1.next()) {
					Book book = new Book();
					book.setBookId(rs1.getInt("id"));
					book.setUserId(rs1.getInt("owned_by"));
					book.setCoverPhoto(rs1.getString("cover_photo"));
					book.setTitle(rs1.getString("title"));
					book.setLanguague(rs1.getString("language"));
					book.setTags(rs1.getString("tags"));
					book.setCreated(rs1.getTimestamp("created"));
					book.setLastUpdated(rs1.getTimestamp("last_updated"));
					book.setIsPublished(rs1.getBoolean("is_published"));
					book.setSnippet(rs1.getString("snippet"));
					bookList.add(book);
				}
			}
			return bookList;
		} catch (Exception ex) {
			LOG.error("ERROR: : " + libraryId, ex);
		} finally {
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

	public static String addBookToLibrary(int libraryId, int bookId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(ADD_BOOK_TO_LIBRARY);
			insert.setInt(1, libraryId);
			insert.setInt(2, bookId);
			insert.executeUpdate();


			// now notify all subscribers there has been a new addition
			Library l = QueryDatabaseLibrary.getLibrary(libraryId);
			Book b = QueryDatabaseUser.getBookByID(bookId);
			ArrayList<User> users = getEmailsForLibrarySubscribers(libraryId);

			int count = 0;
			for(User u : users){
				Email.sendLibrarySubscriberEmail(u,b,l);
				count++;
			}
			LOG.info("emailed subscriber email out to " + count + " users.");
			//---------------------------------------------------------


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

	public static String removeBookFromLibrary(int libraryId, int bookId) {
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

	public static String createLibrary(Library library) {
		PreparedStatement insert = null;
		String generated = "Failure";
		try {
			insert = connection.prepareStatement(CREATE_LIBRARY);
			insert.setInt(1, library.getUserId());
			insert.setString(2, library.getTitle());
			insert.setString(3, library.getTags());
			insert.setString(4, library.getCoverPhoto());
			insert.setString(5, library.getDescription());
			insert.setTimestamp(6, library.getCreated());
			insert.executeUpdate();

			ResultSet generatedKeys = insert.getGeneratedKeys();
			if (generatedKeys.next()) {
				generated = Integer.toString(generatedKeys.getInt(1));
			}

		} catch (SQLException ex) {
			LOG.error("ERROR: : " + library.getLibraryId() + " " + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: " + library.getLibraryId() + " " + ex.getMessage());
				generated = "Failure";
			}
		}
		return generated;
	}

	public static String updateLibrary(Library library) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(UPDATE_LIBRARY);
			insert.setString(1, library.getTitle());
			insert.setString(2, library.getTags());
			insert.setString(3, library.getCoverPhoto());
			insert.setString(4, library.getDescription());
			insert.setInt(5, library.getLibraryId());
			insert.executeUpdate();
			return "Success";
		} catch (SQLException ex) {
			LOG.error("ERROR: : " + library.getLibraryId() + " " + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: " + library.getLibraryId() + " " + ex.getMessage());
				return "Error closing connection";
			}
		}
		return "Failure";
	}

	public static String deleteLibrary(int libraryId) {
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