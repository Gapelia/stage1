package com.gapelia.core.database;

import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;

public class QueryDatabaseActions {
    private static Logger LOG = Logger.getLogger(QueryDatabaseActions.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    private static final String BOOKMARK_BOOK = "INSERT INTO user_bookmarks (user_id, book_id)" + "VALUES (?,?)";
    private static final String UNBOOKMARK_BOOK = "DELETE FROM user_bookmarks where user_id = ? and book_id = ?";
    private static final String SUBSCRIBE_LIBRARY = "INSERT INTO user_subscriptions (user_id, library_id)" + "VALUES(?,?)";
    private static final String UNSUBSCRIBE_BOOKS = "DELETE FROM user_subscriptions where user_id = ? and library_id = ?";
    private static final String VOTE_BOOK = "INSERT INTO user_votes (user_id, book_id)" + "VALUES (?,?)";
    private static final String UNVOTE_BOOK = "DELETE FROM user_votes where user_id =? and book_id = ?";

    public static boolean bookmarkBook(Profile profile, int bookId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(BOOKMARK_BOOK);
            insert.setInt(1, Integer.parseInt(profile.getValidatedId()));
            insert.setInt(2, bookId);
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:" + profile + " " + bookId + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + profile + " " + ex.getMessage());
                return false;
            }
        }
        return true;
    }

    public static boolean unbookmarkBook(Profile profile, int bookId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(UNBOOKMARK_BOOK);
            insert.setInt(1, Integer.parseInt(profile.getValidatedId()));
            insert.setInt(2, bookId);
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot unbookmark book:" + profile + " " + bookId + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + profile + " " + ex.getMessage());
                return false;
            }
        }
        return true;
    }

    public static boolean subscribeLibrary(Profile profile, int libraryId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(SUBSCRIBE_LIBRARY);
            insert.setInt(1, Integer.parseInt(profile.getValidatedId()));
            insert.setInt(2, libraryId);
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot subscribe to library:" + profile + " " + libraryId + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + profile + " " + ex.getMessage());
                return false;
            }
        }
        return true;
    }

    public static boolean unsubscribeLibrary(Profile profile, int libraryId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(UNSUBSCRIBE_BOOKS);
            insert.setInt(1, Integer.parseInt(profile.getValidatedId()));
            insert.setInt(2, libraryId);
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot unbookmark book:" + profile + " " + libraryId + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + profile + " " + ex.getMessage());
                return false;
            }
        }
        return true;
    }

    public static boolean voteBook(Profile profile, int bookId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(VOTE_BOOK);
            insert.setInt(1, Integer.parseInt(profile.getValidatedId()));
            insert.setInt(2, bookId);
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot vote for book:" + profile + " " + bookId + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + profile + " " + ex.getMessage());
                return false;
            }
        }
        return true;
    }

    public static boolean removeVoteBook(Profile profile, int bookId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(UNVOTE_BOOK);
            insert.setInt(1, Integer.parseInt(profile.getValidatedId()));
            insert.setInt(2, bookId);
            rs = insert.executeQuery();
        } catch (SQLException ex) {
            LOG.error("Cannot remove vote:" + profile + " " + bookId + " " + ex.getMessage());
            return false;
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (insert != null) {
                    insert.close();
                }
            } catch (SQLException ex) {
                LOG.error("Error closing connection " + profile + " " + ex.getMessage());
                return false;
            }
        }
        return true;
    }
}
