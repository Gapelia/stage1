package com.gapelia.core.database;

import com.gapelia.core.model.*;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class QueryDatabaseNotifications {
	private static Logger LOG = Logger.getLogger(QueryDatabaseNotifications.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();

	private static final String GET_BOOK_NOTIFICATIONS = "SELECT * FROM book_notifications where recipient = ?";
	private static final String GET_BOOKS_IN_LIBRARY = "SELECT * FROM library_books WHERE library_id = ?";
	private static final String GET_LIBRARY_AWAITING_RESPONSES = "SELECT * FROM library_notifications where sender = ? and referenced_library = ? and accepted IS NULL";
	private static final String GET_LIBRARY_SUBMISSIONS = "SELECT * FROM library_notifications where recipient = ? and referenced_library = ? and accepted IS NULL";
	private static final String GET_LIBRARY_ALREADY_SUBMISSIONS = "SELECT * FROM library_notifications where sender = ? and referenced_library = ? ";
	private static final String GET_ALL_SUBMISSIONS = "SELECT * FROM library_notifications where recipient = ? and accepted IS NULL";
	private static final String GET_LIBRARY_SUBMISSION_RESPONSES = "SELECT * FROM library_notifications where sender = ? and accepted IS NOT NULL";
	private static final String GET_LIBRARY_NOTIFICATION = "SELECT * FROM library_notifications WHERE id = ?";
	private static final String GET_BOOK_NOTIFICATION = "SELECT * FROM book_notifications WHERE id = ?";
	private static final String ACCEPT_LIBRARY_NOTIFICATIONS = "UPDATE library_notifications set accepted = 't' where id = ?";
	private static final String REJECT_LIBRARY_NOTIFICATIONS = "UPDATE library_notifications set accepted = 'f' where id = ?";
	private static final String INSERT_LIBRARY_NOTIFICATION = "INSERT into library_notifications(recipient,referenced_library,book_id,sender,date_sent,message)VALUES(?,?,?,?,?,?)";
	private static final String DELETE_LIBRARY_NOTIFICATIONS = "DELETE FROM library_notifications where id = ?";
	private static final String INSERT_BOOK_NOTIFICATION = "INSERT into book_notifications(recipient,referenced_book,sender,date_sent) VALUES(?,?,?,?)";
	private static final String DELETE_BOOK_NOTIFICATIONS = "DELETE FROM book_notifications where id = ?";

	private static final String INSERT_COMMENT_NOTIFICATION = "INSERT into comment_notifications(commenter,referenced_book) VALUES (?,?)";
	private static final String GET_COMMENT_NOTIFICATION = "SELECT * FROM comment_notifications WHERE referenced_book = ?";
	private static final String DELETE_COMMENT_NOTIFICATIONS = "DELETE FROM comment_notifications where id = ?";


	public static ArrayList<CommentNotification> getCommentNotifications(User u) {

		ArrayList<Book> ownedBooks = QueryDatabaseUser.getCreatedBooks(u.getUserId());
		ArrayList<CommentNotification> commentNotifications = new ArrayList<CommentNotification>();

		for(Book b : ownedBooks){
				CommentNotification c = getCommentNotificationByBookId(b.getBookId());
				if(c != null){
					commentNotifications.add(c);
				}
		}

		return commentNotifications;
	}


	public static String createCommentNotification(CommentNotification b) {
		String result = "SUCCESS";
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INSERT_COMMENT_NOTIFICATION);
			insert.setInt(1, b.getCommenterUserId());
			insert.setInt(2, b.getReferencedBookId());
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot create comment notifiction:"  + ex);
			result ="ERROR" + ex.getMessage();
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return result;
	}

	public static CommentNotification getCommentNotificationByBookId(int bookId){
		PreparedStatement selectStatement = null;
		ResultSet rs = null;
		CommentNotification commentNotification = null;
		try {
			selectStatement = connection.prepareStatement(GET_COMMENT_NOTIFICATION);
			selectStatement.setInt(1, bookId);
			rs = selectStatement.executeQuery();
			if(rs.next()) {
				commentNotification = new CommentNotification();
				commentNotification.setNotificationId(rs.getInt("id"));
				commentNotification.setCommenterUserId(rs.getInt("commenter"));
				commentNotification.setReferencedBookId(rs.getInt("referenced_book"));
			}
		} catch (SQLException ex) {
			LOG.error("Cannot get comment notifications for bookid:" + bookId + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (selectStatement != null) {
					selectStatement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection while getting comment notifs for bookid:" + bookId + " " + ex.getMessage());
			}
		}
		return commentNotification;
	}

	public  static String removeCommentNotification(int notificationId) {
		PreparedStatement insert = null;
		String result = "SUCCESS";
		try {
			insert = connection.prepareStatement(DELETE_COMMENT_NOTIFICATIONS);
			insert.setInt(1, notificationId);
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot remove comment Notification:"  + ex.getMessage());
			result ="ERROR" + ex.getMessage();
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection while removing comment notif. " + ex.getMessage());
			}
		}
		return result;
	}

	public static BookNotification getBookNotification(int notificationId){
		PreparedStatement selectStatement = null;
		ResultSet rs = null;
		BookNotification bookNotification = null;
		try {
			selectStatement = connection.prepareStatement(GET_BOOK_NOTIFICATION);
			selectStatement.setInt(1, notificationId);
			rs = selectStatement.executeQuery();
			if(rs.next()) {
				bookNotification = new BookNotification();
				bookNotification.setRecipientUserId(rs.getInt("recipient"));
				bookNotification.setSenderUserId(rs.getInt("sender"));
				bookNotification.setBookId(rs.getInt("referenced_book"));
				bookNotification.setDateSend(rs.getTimestamp("date_sent"));
				bookNotification.setAccepted(rs.getBoolean("accepted"));
				bookNotification.setNotificationId(rs.getInt("id"));
			}
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + notificationId + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (selectStatement != null) {
					selectStatement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + notificationId + " " + ex.getMessage());
			}
		}
		return bookNotification;
	}

	public static LibraryNotification getLibraryNotification(int notificationId){
		PreparedStatement selectStatement = null;
		ResultSet rs = null;
		LibraryNotification libraryNotification = null;
		try {
			selectStatement = connection.prepareStatement(GET_LIBRARY_NOTIFICATION);
			selectStatement.setInt(1, notificationId);
			rs = selectStatement.executeQuery();
			if(rs.next()) {
				libraryNotification = new LibraryNotification();
				libraryNotification.setRecipientUserId(rs.getInt("recipient"));
				libraryNotification.setLibraryId(rs.getInt("referenced_library"));
				libraryNotification.setSenderUserId(rs.getInt("sender"));
				libraryNotification.setBookId(rs.getInt("book_id"));
				libraryNotification.setDateSend(rs.getTimestamp("date_sent"));
				libraryNotification.setAccepted(rs.getBoolean("accepted"));
				libraryNotification.setMessage(rs.getString("message"));
				libraryNotification.setRead(rs.getBoolean("read"));
				libraryNotification.setNotificationId(rs.getInt("id"));
			}
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + notificationId + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (selectStatement != null) {
					selectStatement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + notificationId + " " + ex.getMessage());
			}
		}
		return libraryNotification;
	}

	public static ArrayList<LibraryNotification> getAlreadySubmitted(User u,int libraryId) {
		PreparedStatement insert = null;
		ResultSet rs = null;
		ArrayList<LibraryNotification> notificationList = null;
		try {
			notificationList = new ArrayList<LibraryNotification>();
			insert = connection.prepareStatement(GET_LIBRARY_AWAITING_RESPONSES);
			insert.setInt(1, u.getUserId());
			insert.setInt(2, libraryId);
			rs = insert.executeQuery();
			while (rs.next()) {
				LibraryNotification libraryNotification = new LibraryNotification();
				libraryNotification.setRecipientUserId(rs.getInt("recipient"));
				libraryNotification.setLibraryId(rs.getInt("referenced_library"));
				libraryNotification.setSenderUserId(rs.getInt("sender"));
				libraryNotification.setBookId(rs.getInt("book_id"));
				libraryNotification.setDateSend(rs.getTimestamp("date_sent"));
				libraryNotification.setAccepted(rs.getBoolean("accepted"));
				libraryNotification.setMessage(rs.getString("message"));
				libraryNotification.setRead(rs.getBoolean("read"));
				libraryNotification.setNotificationId(rs.getInt("id"));
				notificationList.add(libraryNotification);
			}
			return notificationList;
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + u + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + u + " " + ex.getMessage());
			}
		}
		return notificationList;
	}
	public static List<Integer> getSubmitted(User u,int libraryId) {
		PreparedStatement insert = null;
		ResultSet rs = null;
		ArrayList<Integer> alreadySubmitted = null;
		try {
			alreadySubmitted = new ArrayList<Integer>();
			insert = connection.prepareStatement(GET_LIBRARY_ALREADY_SUBMISSIONS);
			insert.setInt(1, u.getUserId());
			insert.setInt(2, libraryId);
			rs = insert.executeQuery();
			while (rs.next()) {
				alreadySubmitted.add(rs.getInt("book_id"));
			}
			insert = connection.prepareStatement(GET_BOOKS_IN_LIBRARY);
			insert.setInt(1, libraryId);
			rs = insert.executeQuery();
			while (rs.next()) {
				alreadySubmitted.add(rs.getInt("book_id"));
			}
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + u + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + u + " " + ex.getMessage());
			}
		}
		return alreadySubmitted;
	}

	public static ArrayList<LibraryNotification> getLibraryNotifications(User u,int libraryId) {
		PreparedStatement insert = null;
		ResultSet rs = null;
		ArrayList<LibraryNotification> notificationList = null;
		try {
			notificationList = new ArrayList<LibraryNotification>();
			insert = connection.prepareStatement(GET_LIBRARY_SUBMISSIONS);
			insert.setInt(1, u.getUserId());
			insert.setInt(2, libraryId);
			rs = insert.executeQuery();
			while (rs.next()) {
				LibraryNotification libraryNotification = new LibraryNotification();
				libraryNotification.setRecipientUserId(rs.getInt("recipient"));
				libraryNotification.setLibraryId(rs.getInt("referenced_library"));
				libraryNotification.setSenderUserId(rs.getInt("sender"));
				libraryNotification.setBookId(rs.getInt("book_id"));
				libraryNotification.setDateSend(rs.getTimestamp("date_sent"));
				libraryNotification.setAccepted(rs.getBoolean("accepted"));
				libraryNotification.setMessage(rs.getString("message"));
				libraryNotification.setRead(rs.getBoolean("read"));
				libraryNotification.setNotificationId(rs.getInt("id"));
				notificationList.add(libraryNotification);
			}
			return notificationList;
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + u + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + u + " " + ex.getMessage());
			}
		}
		return notificationList;
	}

	public static ArrayList<LibraryNotification> getAllSubmissions(User u) {
		PreparedStatement insert = null;
		ResultSet rs = null;
		ArrayList<LibraryNotification> notificationList = null;
		try {
			notificationList = new ArrayList<LibraryNotification>();
			insert = connection.prepareStatement(GET_ALL_SUBMISSIONS);
			insert.setInt(1, u.getUserId());
			rs = insert.executeQuery();
			while (rs.next()) {
				LibraryNotification libraryNotification = new LibraryNotification();
				libraryNotification.setRecipientUserId(rs.getInt("recipient"));
				libraryNotification.setLibraryId(rs.getInt("referenced_library"));
				libraryNotification.setSenderUserId(rs.getInt("sender"));
				libraryNotification.setBookId(rs.getInt("book_id"));
				libraryNotification.setDateSend(rs.getTimestamp("date_sent"));
				libraryNotification.setAccepted(rs.getBoolean("accepted"));
				libraryNotification.setMessage(rs.getString("message"));
				libraryNotification.setRead(rs.getBoolean("read"));
				libraryNotification.setNotificationId(rs.getInt("id"));
				notificationList.add(libraryNotification);
			}
			return notificationList;
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + u + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + u + " " + ex.getMessage());
			}
		}
		return notificationList;
	}

	public static ArrayList<LibraryNotification> getAllResponses(User u) {
		PreparedStatement insert = null;
		ResultSet rs = null;
		ArrayList<LibraryNotification> notificationList = null;
		try {
			notificationList = new ArrayList<LibraryNotification>();
			insert = connection.prepareStatement(GET_LIBRARY_SUBMISSION_RESPONSES);
			insert.setInt(1, u.getUserId());
			rs = insert.executeQuery();
			while (rs.next()) {
				LibraryNotification libraryNotification = new LibraryNotification();
				libraryNotification.setRecipientUserId(rs.getInt("recipient"));
				libraryNotification.setLibraryId(rs.getInt("referenced_library"));
				libraryNotification.setSenderUserId(rs.getInt("sender"));
				libraryNotification.setBookId(rs.getInt("book_id"));
				libraryNotification.setDateSend(rs.getTimestamp("date_sent"));
				libraryNotification.setAccepted(rs.getBoolean("accepted"));
				libraryNotification.setMessage(rs.getString("message"));
				libraryNotification.setRead(rs.getBoolean("read"));
				libraryNotification.setNotificationId(rs.getInt("id"));
				notificationList.add(libraryNotification);
			}
			return notificationList;
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + u + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + u + " " + ex.getMessage());
			}
		}
		return notificationList;
	}

	public  static String acceptLibraryNotification(int notificationId, User u) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(ACCEPT_LIBRARY_NOTIFICATIONS);
			insert.setInt(1, notificationId);
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot acceptBook:"  + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return "SUCCESS";
	}

	public  static String rejectLibraryNotification(int notificationId, User u) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(REJECT_LIBRARY_NOTIFICATIONS);
			insert.setInt(1, notificationId);
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot rejectBook:"  + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return "SUCCESS";
	}


	public static String createLibraryNotification(LibraryNotification l) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INSERT_LIBRARY_NOTIFICATION);
			insert.setInt(1, l.getRecipientUserId());
			insert.setInt(2, l.getLibraryId());
			insert.setInt(3, l.getBookId());
			insert.setInt(4, l.getSenderUserId());
			insert.setTimestamp(5, l.getDateSend());
			insert.setString(6, l.getMessage());
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot createnotifiction:"  + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return "SUCCESS";
	}

	public  static String removeLibraryNotification(int notificationId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(DELETE_LIBRARY_NOTIFICATIONS);
			insert.setInt(1, notificationId);
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot remove Notification:"  + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return "SUCCESS";
	}

	public static String createBookNotification(BookNotification b) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INSERT_BOOK_NOTIFICATION);
			insert.setInt(1, b.getRecipientUserId());
			insert.setInt(2, b.getBookId());
			insert.setInt(3, b.getSenderUserId());
			insert.setTimestamp(4, b.getDateSend());
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot createnotifiction:"  + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return "SUCCESS";
	}

	public  static String removeBookNotification(int notificationId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(DELETE_BOOK_NOTIFICATIONS);
			insert.setInt(1, notificationId);
			insert.executeUpdate();
		} catch (SQLException ex) {
			LOG.error("Cannot remove Notification:"  + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return "SUCCESS";
	}

	public static ArrayList<BookNotification> getBookNotification(User u) {
		PreparedStatement insert = null;
		ResultSet rs = null;
		ArrayList<BookNotification> notificationList = null;
		try {
			notificationList = new ArrayList<BookNotification>();
			insert = connection.prepareStatement(GET_BOOK_NOTIFICATIONS);
			insert.setInt(1, u.getUserId());
			LOG.info(insert.toString());
			rs = insert.executeQuery();
			while (rs.next()) {
				BookNotification bookNotification = new BookNotification();
				bookNotification.setRecipientUserId(rs.getInt("recipient"));
				bookNotification.setSenderUserId(rs.getInt("sender"));
				bookNotification.setBookId(rs.getInt("referenced_book"));
				bookNotification.setDateSend(rs.getTimestamp("date_sent"));
				bookNotification.setAccepted(rs.getBoolean("accepted"));
				bookNotification.setNotificationId(rs.getInt("id"));
				notificationList.add(bookNotification);
			}
			return notificationList;
		} catch (SQLException ex) {
			LOG.error("Cannot get notifications:" + u + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + u + " " + ex.getMessage());
			}
		}
		return notificationList;
	}

}
