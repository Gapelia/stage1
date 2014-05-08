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
//    private static final String GET_GOD_LIBRARIES = "SELECT * FROM libraries where created_by=1 order by random()";

	private static final String GET_ALL_LIBRARIES = "select * from libraries left join (select count(library_id) as num_subscribers, " +
			"library_id from library_books group by library_id order by num_subscribers limit 20) as t2 on libraries.id = t2.library_id " +
			"order by num_subscribers desc nulls last limit 20";

	private static final String GET_LIBRARY = "SELECT * FROM libraries WHERE id = ?";
	private static final String GET_BOOKS_IN_LIBRARY = "SELECT * FROM library_books WHERE library_id = ?";
	private static final String ADD_BOOK_TO_LIBRARY = "INSERT INTO library_books (library_id,book_id) VALUES (? , ?)";
	private static final String GET_BOOK = "SELECT * FROM books where id=?";
	private static final String GET_NUM_SUBSCRIBERS = "select count(library_id) from user_subscriptions where library_id = ? group by library_id";
	private static final String REMOVE_BOOK_FROM_LIBRARY = "DELETE FROM library_books WHERE library_id = ? AND book_id = ?";
	private static final String DELETE_LIBRARY = "DELETE FROM libraries WHERE id = ?";
	private static final String CREATE_LIBRARY = "INSERT INTO libraries (created_by,title,tags,cover_photo,description,created) VALUES (?,?,?,?,?,?)";
	private static final String UPDATE_LIBRARY = "UPDATE libraries set title = ?,tags = ?,cover_photo = ?,description = ? WHERE id = ?";

	private static final String MOST_VOTED_BOOK = "select library_books.book_id from library_books left join (select count(book_id) " +
			"as num_votes,book_id from user_votes group by book_id order by num_votes desc) as t2 on library_books.book_id = t2.book_id " +
			"where library_id = ? limit 1";


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

	/**
	 *
	 * returns the most voted book in the library -- if it returns null it means there are none that fit that criteria!
	 *
	 * @param library_id
	 * @return
	 */
	public static Book getMostVotedBookInLibrary(int library_id) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		Book book = null;
		try {
			statement = connection.prepareStatement(MOST_VOTED_BOOK);
			statement.setInt(1, library_id);
			rs = statement.executeQuery();
			if (rs.next()) {
				int book_id = rs.getInt(1);
				book = QueryDatabaseUser.getBookByID(book_id);
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
		return book;
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