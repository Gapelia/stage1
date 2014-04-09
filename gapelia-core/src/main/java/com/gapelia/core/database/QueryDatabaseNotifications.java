package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.LibraryNotifications;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class QueryDatabaseNotifications {
    private static Logger LOG = Logger.getLogger(QueryDatabaseNotifications.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    private static final String BOOKMARK_BOOK = "INSERT INTO user_bookmarks (user_id, book_id)" + "VALUES (?,?)";
    private static final String GET_USER_LIBRARY_NOTIFICATIONS = "SELECT * FROM library_notifications where recipient = ?";
    private static final String GET_USER_BOOK_NOTIFICATIONS = "SELECT * FROM book_notifications where recipient = ?";

    public static ArrayList<LibraryNotifications> getUserLibraryNotifications(User u) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            ArrayList<LibraryNotifications> notificationList= new ArrayList<LibraryNotifications>();
            insert = connection.prepareStatement(GET_USER_LIBRARY_NOTIFICATIONS);
            insert.setInt(1, u.getUserId());
            rs = insert.executeQuery();
            while (rs.next()) {
                LibraryNotifications libraryNotifications = new LibraryNotifications();
                libraryNotifications.setRecipientUserId(rs.getInt("recipient"));
                libraryNotifications.setLibraryId(rs.getInt("referenced_library"));
                libraryNotifications.setSenderUserID(rs.getInt("sender"));
                libraryNotifications.setDateSend(rs.getTimestamp("date_sent"));
                libraryNotifications.setAccepted(rs.getBoolean("accepted"));
                notificationList.add(libraryNotifications);
            }
            return notificationList;
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:" + u + " " + ex.getMessage());
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
        return null;
    }

    public static ArrayList<LibraryNotifications> getUserBookNotifications(User u) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        try {
            ArrayList<LibraryNotifications> notificationList = new ArrayList<LibraryNotifications>();
            insert = connection.prepareStatement(GET_USER_BOOK_NOTIFICATIONS);
            insert.setInt(1, u.getUserId());
            rs = insert.executeQuery();
            while (rs.next()) {
                LibraryNotifications libraryNotifications = new LibraryNotifications();
                libraryNotifications.setRecipientUserId(rs.getInt("recipient"));
                libraryNotifications.setLibraryId(rs.getInt("referenced_library"));
                libraryNotifications.setSenderUserID(rs.getInt("sender"));
                libraryNotifications.setDateSend(rs.getTimestamp("date_sent"));
                libraryNotifications.setAccepted(rs.getBoolean("accepted"));
                notificationList.add(libraryNotifications);
            }
            return notificationList;
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:" + u + " " + ex.getMessage());
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
        return null;
    }
}
