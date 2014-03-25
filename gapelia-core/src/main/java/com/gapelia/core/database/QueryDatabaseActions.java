package com.gapelia.core.database;

import com.gapelia.core.model.User;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;

public class QueryDatabaseActions {
    private static Logger LOG = Logger.getLogger(QueryDatabaseActions.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    private static final String BOOKMARK_BOOK = "INSERT INTO user_bookmarks (user_id, book_id)" + "VALUES (?,?)";
    private static final String REMOVE_BOOKMARK_BOOK = "DELETE FROM user_bookmarks where user_id = ? and book_id = ?";
    private static final String SUBSCRIBE_LIBRARY = "INSERT INTO user_subscriptions (user_id, library_id)" + "VALUES(?,?)";
    private static final String REMOVE_SUBCRIPTION_LIBRARY = "DELETE FROM user_subscriptions where user_id = ? and library_id = ?";
    private static final String VOTE_BOOK = "INSERT INTO user_votes (user_id, book_id)" + "VALUES (?,?)";
    private static final String REMOVE_VOTE_BOOK= "DELETE FROM user_votes where user_id =? and book_id = ?";

    public static String bookmarkBook(User u, int bookId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(BOOKMARK_BOOK);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, bookId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:" + u + " " + bookId + " " + ex.getMessage());
            return "Could not bookmark book";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static String removeBookmarkBook(User u, int bookId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(REMOVE_BOOKMARK_BOOK);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, bookId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot remove bookmark book:" + u + " " + bookId + " " + ex.getMessage());
            return "Could not remove bookmark";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static String subscribeLibrary(User u, int libraryId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(SUBSCRIBE_LIBRARY);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, libraryId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot subscribe to library:" + u + " " + libraryId + " " + ex.getMessage());
            return "Could not subscribe to library";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static String removeSubscriptionLibrary(User u, int libraryId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(REMOVE_SUBCRIPTION_LIBRARY);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, libraryId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot remove bookmark book:" + u + " " + libraryId + " " + ex.getMessage());
            return "Could remove bookmark";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static String voteBook(User u, int bookId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(VOTE_BOOK);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, bookId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot vote for book:" + u + " " + bookId + " " + ex.getMessage());
            return "Could not vote for book";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }

    public static String removeVoteBook(User u, int bookId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(REMOVE_VOTE_BOOK);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, bookId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot remove vote:" + u + " " + bookId + " " + ex.getMessage());
            return "Could not remove vote";
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + u + " " + ex.getMessage());
                return "Error closing connection";
            }
        }
    }
}
