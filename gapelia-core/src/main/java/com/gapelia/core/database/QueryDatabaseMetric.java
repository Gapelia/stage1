package com.gapelia.core.database;

import org.apache.log4j.Logger;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by frankie on 4/09/14.
 */
public class QueryDatabaseMetric {
	private static Logger LOG = Logger.getLogger(QueryDatabaseUser.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();

	//User Related Queries
	private static final String INITIALIZE_BOOK_VIEWS = "insert into metric_book_views VALUES (?,0)";
	private static final String INITIALIZE_PAGE_VIEWS = "insert into metric_page_views VALUES (?,?,0)";
	private static final String INITIALIZE_BOOK_SHARES = "insert into metric_book_shares VALUES (?,0,0,0)";
	private static final String REGISTER_USER_LOGIN = "insert into metric_user_num_logins values (?,?)";
	private static final String SET_USER_READ = "insert into metric_user_book values (?,?,?,?,?)";
	private static final String GET_NUM_LOGINS = "select count(*) from metric_user_num_logins where user_id=?";
	private static final String GET_NUM_BOOK_VIEWS = "select views from metric_book_views where book_id = ?";
	private static final String GET_NUM_VOTES = "select count(*) from user_votes where book_id = ?";
	private static final String GET_NUM_PAGE_VIEWS = "select views from metric_page_views where book_id = ? and page_num = ?";
	private static final String GET_BOOK_SHARES = "select fb,twitter,email from metric_book_shares where book_id = ?";
	private static final String INCREMENT_BOOK_VIEWS = "update metric_book_views set views = views + 1 where book_id = ?";
	private static final String INCREMENT_PAGE_VIEWS = "update metric_page_views set views = views + 1 where book_id = ? and page_num = ?";
	private static final String INCREMENT_BOOK_SHARES_FB = "update metric_book_shares set fb = fb + 1 where book_id = ?";
	private static final String INCREMENT_BOOK_SHARES_TWITTER = "update metric_book_shares set twitter = twitter + 1 where book_id = ?";
	private static final String INCREMENT_BOOK_SHARES_EMAIL = "update metric_book_shares set email = email + 1 where book_id = ?";


	public static int getNumVotes(int bookId) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		int numVotes = 0;
		try {
			statement = connection.prepareStatement(GET_NUM_VOTES);
			statement.setInt(1, bookId);
			rs = statement.executeQuery();
			if (rs.next()) {
				numVotes = rs.getInt(1);
			}

		} catch (Exception ex) {
			LOG.error("Cannot get num votes for book:" + bookId, ex);
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
		return numVotes;
	}

	public static Map<String,Integer> getBookShares(int bookId) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		Map<String, Integer> resultMap = new HashMap<String, Integer>();
		try {
			statement = connection.prepareStatement(GET_BOOK_SHARES);
			statement.setInt(1, bookId);
			rs = statement.executeQuery();
			if (rs.next()) {
				resultMap.put("fb",new Integer(rs.getInt(1)));
				resultMap.put("twitter",new Integer(rs.getInt(2)));
				resultMap.put("email",new Integer(rs.getInt(3)));
			}

		} catch (Exception ex) {
			LOG.error("Cannot check user u:" + bookId, ex);
			resultMap = null;
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
		return resultMap;
	}

	public static int getNumPageViews(int bookId, int pageNum) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		int numViews = -1;
		try {
			statement = connection.prepareStatement(GET_NUM_PAGE_VIEWS);
			statement.setInt(1, bookId);
			statement.setInt(2, pageNum);
			rs = statement.executeQuery();
			if (rs.next()) {
				numViews = rs.getInt(1);
			}

		} catch (Exception ex) {
			LOG.error("Cannot get num page views for book: " + bookId, ex);
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
		return numViews;
	}

	public static int getNumBookViews(int bookId) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		int numViews = -1;
		try {
			statement = connection.prepareStatement(GET_NUM_BOOK_VIEWS);
			statement.setInt(1, bookId);
			rs = statement.executeQuery();
			if (rs.next()) {
				numViews = rs.getInt(1);
			}

		} catch (Exception ex) {
			LOG.error("Cannot get num book views for book: " + bookId, ex);
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
		return numViews;
	}

	public static int getNumLogins(int userId) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		int numLogins = -1;
		try {
			statement = connection.prepareStatement(GET_NUM_LOGINS);
			statement.setInt(1, userId);
			rs = statement.executeQuery();
			if (rs.next()) {
				numLogins = rs.getInt(1);
			}

		} catch (Exception ex) {
			LOG.error("Cannot get num logins for user:" + userId, ex);
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
		return numLogins;
	}


	public static void setUserRead(int userId, int bookId, int pageNum, boolean completed, boolean voted) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(SET_USER_READ);
			insert.setInt(1, userId);
			insert.setInt(2, bookId);
			insert.setInt(3, pageNum);
			insert.setBoolean(4, completed);
			insert.setBoolean(5, voted);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot set user read:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	/**
	 * starts num logins at zero.
	 * should be implicitly every login
	 * @param userId
	 */
	public static void registerUserLogin(int userId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(REGISTER_USER_LOGIN);
			insert.setInt(1, userId);
			insert.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot initialize numlogins:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	public static void incrementBookSharesEmail(int bookId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INCREMENT_BOOK_SHARES_EMAIL);
			insert.setInt(1, bookId);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot increment twitter bookshares:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	public static void incrementBookSharesTwitter(int bookId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INCREMENT_BOOK_SHARES_TWITTER);
			insert.setInt(1, bookId);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot increment twitter bookshares:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	public static void incrementBookSharesFB(int bookId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INCREMENT_BOOK_SHARES_FB);
			insert.setInt(1, bookId);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot increment fb bookshares:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	/**
	 * starts book shares at zero.
	 * should be implicitly called during book creation, otherwise incrementing will fail.
	 * @param bookId
	 */
	public static void initializeBookShares(int bookId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INITIALIZE_BOOK_SHARES);
			insert.setInt(1, bookId);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot initialize bookshares:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	public static void incrementBookViews(int bookId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INCREMENT_BOOK_VIEWS);
			insert.setInt(1, bookId);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot increment bookviews:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	public static void incrementPageViews(int bookId, int pageNum) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INCREMENT_PAGE_VIEWS);
			insert.setInt(1, bookId);
			insert.setInt(2, pageNum);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot increment page views:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	/**
	 * starts book views at zero.
	 * should be implicitly called during book creation, otherwise incrementing will fail.
	 * @param bookId
	 */
	public static void initializeBookViews(int bookId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INITIALIZE_BOOK_VIEWS);
			insert.setInt(1, bookId);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot initialize bookviews:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

	/**
	 * starts page views at zero.
	 * should be implicitly called during page creation, otherwise incrementing will fail.
	 * @param bookId
	 */
	public static void initializePageViews(int bookId, int pageNum) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(INITIALIZE_PAGE_VIEWS);
			insert.setInt(1, bookId);
			insert.setInt(2, pageNum);
			insert.executeUpdate();

		} catch (Exception ex) {
			LOG.error("Cannot initialize page views:" + ex.getMessage());
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + ex.getMessage());
			}
		}
	}

}
