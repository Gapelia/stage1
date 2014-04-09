package com.gapelia.core.database;

import com.gapelia.core.model.User;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class QueryDatabaseNotifications {
    private static Logger LOG = Logger.getLogger(QueryDatabaseNotifications.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    private static final String BOOKMARK_BOOK = "INSERT INTO user_bookmarks (user_id, book_id)" + "VALUES (?,?)";

    public static String getUserNotifications(User u) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(BOOKMARK_BOOK);
            insert.setInt(1, u.getUserId());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:" + u + " " + ex.getMessage());
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

    public static String getBooksSubmitted(User u, int libraryId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(BOOKMARK_BOOK);
            insert.setInt(1, u.getUserId());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:" + u + " " + ex.getMessage());
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
}