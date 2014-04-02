package com.gapelia.core.database;


import com.gapelia.core.model.User;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class FlushUser {
    private static Logger LOG = Logger.getLogger(FlushUser.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    private static final String DELETE_FROM_USERS = "DELETE FROM users where id = ?";
    private static final String FIND_BOOK = "SELECT * FROM BOOKS where owned_by = ?";
    private static final String DELETE_FROM_BOOKS = "DELETE FROM books where id = ?";
    private static final String DELETE_FROM_LIBRARYBOOKS = "DELETE FROM library_books where book_id = ?";
    private static final String DELETE_FROM_CONTIBUTORS = "DELETE FROM contributors where user_id = ?";
    private static final String DELETE_FROM_USER_BOOKMARKS = "DELETE FROM user_bookmarks where user_id = ?";
    private static final String DELETE_FROM_PAGES = "DELETE FROM contributors user_bookmarks where user_id = ?";
    private static final String DELETE_FROM_USER_VOTES = "DELETE FROM user_votes where user_id = ?";
    private static final String DELETE_FROM_USER_SUBSCRIPTIONS = "DELETE FROM user_subscriptions where user_id = ?";
    private static final String DELETE_FROM_LIBRARY_NOTIFICATION = "DELETE FROM library_notifications where recipient = ?";
    private static final String DELETE_FROM_BOOK_NOTIFICATION = "DELETE FROM book_notifications where recipient = ?";
    private static final String DELETE_FROM_LIBRARIES = "DELETE FROM libraries where created_by = ?";
    private static final String DELETE_FROM_EDITORS = "DELETE FROM editors where editor_id = ?";

    public static String flushUser(User u) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            insert = connection.prepareStatement(DELETE_FROM_EDITORS);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_CONTIBUTORS);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_USER_BOOKMARKS);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_PAGES);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_USER_VOTES);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_USER_SUBSCRIPTIONS);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_LIBRARY_NOTIFICATION);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_BOOK_NOTIFICATION);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(FIND_BOOK);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            rs = insert.executeQuery();
            if (rs.isBeforeFirst()) {
                while (rs.next()) {
                    insert = connection.prepareStatement(DELETE_FROM_LIBRARYBOOKS);
                    insert.setInt(1, rs.getInt("id"));
                    LOG.info(insert.toString());
                    insert.executeUpdate();
                    insert = connection.prepareStatement(DELETE_FROM_BOOKS);
                    insert.setInt(1, rs.getInt("id"));
                    LOG.info(insert.toString());
                    insert.executeUpdate();
                }
            }
            insert = connection.prepareStatement(DELETE_FROM_LIBRARIES);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            insert = connection.prepareStatement(DELETE_FROM_USERS);
            insert.setInt(1, u.getUserId());
            LOG.info(insert.toString());
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("Cannot delete user :" + u + " "+ ex.getMessage());
            return "Could not delete user";
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
                return "Error closing connection";
            }
        }
    }
}
