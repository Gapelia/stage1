package com.gapelia.core.database;

import com.gapelia.core.api.Email;
import com.gapelia.core.model.*;
import org.apache.log4j.Logger;

import java.sql.*;
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

	private static final String GET_COMMENT_NOTIFICATION = "SELECT * FROM comment_notifications WHERE referenced_book = ?";
	private static final String GET_PENDING_NOTIFICATIONS = "select pending_comment_notifications.id as pending_id,comment_id,commenter,referenced_book,hash,type,comment," +
			"time from pending_comment_notifications join comment_notifications on comment_id = comment_notifications.id where recipient = ? and commenter != ? order by time desc";

	private static final String GET_OTHER_COMMENT_HASHES = "select * from comment_notifications where hash = ?";

	private static final String DELETE_PENDING_COMMENT_NOTIF = "DELETE FROM pending_comment_notifications where id = ?";
	private static final String INSERT_PENDING_NOTIFICATION = "insert into pending_comment_notifications (recipient,comment_id) values (?,?)";
	private static final String INSERT_COMMENT_NOTIFICATION = "insert into comment_notifications (commenter,referenced_book,hash,type,comment,time) values (?,?,?,?,?,now())";

	public static ArrayList<CommentNotification> getCommentNotifications(User u) {

		ArrayList<Book> ownedBooks = QueryDatabaseUser.getCreatedBooks(u.getUserId());


		PreparedStatement selectStatement = null;
		ResultSet rs = null;
		ArrayList<CommentNotification> commentNotifications = new ArrayList<CommentNotification>();
		try {
			selectStatement = connection.prepareStatement(GET_PENDING_NOTIFICATIONS);
			selectStatement.setInt(1, u.getUserId());
			selectStatement.setInt(2, u.getUserId());
			rs = selectStatement.executeQuery();

			while(rs.next()) {
				CommentNotification commentNotification = new CommentNotification();
				commentNotification.setPendingId(rs.getInt("pending_id"));
				commentNotification.setCommenterUserId(rs.getInt("commenter"));
				commentNotification.setReferencedBookId(rs.getInt("referenced_book"));
				commentNotification.setHash(rs.getString("hash"));
				commentNotification.setType(rs.getString("type"));
				commentNotification.setComment(rs.getString("comment"));
				commentNotification.setTime(rs.getTimestamp("time"));

				boolean ownedByMe = false;
				for(Book b : ownedBooks){
					if(b.getBookId() == commentNotification.getReferencedBookId())
						ownedByMe = true;
				}
				commentNotification.setBookOwnedByMe(ownedByMe);

				commentNotifications.add(commentNotification);

			}
		} catch (SQLException ex) {
			LOG.error("Cannot get comment notifications for user:" + u.getUserId() + " " + ex.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (selectStatement != null) {
					selectStatement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection while getting comment notifs for user:" +  u.getUserId() + " " + ex.getMessage());
			}
		}


		return commentNotifications;
	}


	public static String createCommentNotification(CommentNotification incomingNotification) {

		// this method will create notifications for all parties involved.
		//  you are a recipient of the notification in two cases:
		//   1.  You own the book
		//   2.  You have also commented on that hash id

		String result = "SUCCESS";
		PreparedStatement statement = null;
		ResultSet rs = null;
		try {
			User referencedBookOwner = QueryDatabaseUser.getUserById(QueryDatabaseUser.getBookByID(incomingNotification.getReferencedBookId()).getUserId());



			//insert comment 'archive'
			statement = connection.prepareStatement(INSERT_COMMENT_NOTIFICATION, Statement.RETURN_GENERATED_KEYS);
			statement.setInt(1, incomingNotification.getCommenterUserId());
			statement.setInt(2, incomingNotification.getReferencedBookId());
			statement.setString(3, incomingNotification.getHash());
			statement.setString(4, incomingNotification.getType());
			statement.setString(5, incomingNotification.getComment());
			statement.executeUpdate();

			rs = statement.getGeneratedKeys();

			int generatedCommentId = 0;

			if ( rs.next() ) {
				generatedCommentId = rs.getInt(1);
			}

			//begin inserting pending comments
			statement = connection.prepareStatement(GET_OTHER_COMMENT_HASHES);
			statement.setString(1, incomingNotification.getHash());
			rs = statement.executeQuery();

			while(rs.next()){    //for everybody that has commented on the same hash
				CommentNotification commentNotification = new CommentNotification();
				commentNotification.setCommentId(rs.getInt("id"));
				commentNotification.setCommenterUserId(rs.getInt("commenter"));
				commentNotification.setReferencedBookId(rs.getInt("referenced_book"));
				commentNotification.setHash(rs.getString("hash"));
				commentNotification.setType(rs.getString("type"));
				commentNotification.setComment(rs.getString("comment"));
				commentNotification.setTime(rs.getTimestamp("time"));



				if(commentNotification.getCommenterUserId() != incomingNotification.getCommenterUserId()){

					statement = connection.prepareStatement(INSERT_PENDING_NOTIFICATION);
					statement.setInt(1, commentNotification.getCommenterUserId());
					statement.setInt(2, generatedCommentId);

					statement.executeUpdate();

					Email.sendCommentEmail(QueryDatabaseUser.getUserById(commentNotification.getCommenterUserId()), incomingNotification);
				}
			}

			//insert comment notification to owner
			if(incomingNotification.getCommenterUserId() != referencedBookOwner.getUserId()){
				statement = connection.prepareStatement(INSERT_PENDING_NOTIFICATION);
				statement.setInt(1, referencedBookOwner.getUserId());
				statement.setInt(2,generatedCommentId);

				statement.executeUpdate();


				Email.sendCommentEmail(referencedBookOwner, incomingNotification);
			}




		} catch (SQLException ex) {
			LOG.error("Cannot create comment notifiction:"  + ex);
			result ="ERROR" + ex.getMessage();
		} finally {
			try {
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
		return result;
	}

	public static ArrayList<CommentNotification> getCommentNotificationsByBookId(int bookId){
		PreparedStatement selectStatement = null;
		ResultSet rs = null;
		ArrayList<CommentNotification> commentNotifications = new ArrayList<CommentNotification>();
		try {
			selectStatement = connection.prepareStatement(GET_COMMENT_NOTIFICATION);
			selectStatement.setInt(1, bookId);
			rs = selectStatement.executeQuery();
			while(rs.next()) {
				CommentNotification commentNotification = new CommentNotification();
				commentNotification.setPendingId(rs.getInt("id"));
				commentNotification.setCommenterUserId(rs.getInt("commenter"));
				commentNotification.setReferencedBookId(rs.getInt("referenced_book"));
				commentNotifications.add(commentNotification);
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
		return commentNotifications;
	}

	public  static String removeCommentNotification(int notificationId) {
		PreparedStatement insert = null;
		String result = "SUCCESS";
		try {
			insert = connection.prepareStatement(DELETE_PENDING_COMMENT_NOTIF);
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
