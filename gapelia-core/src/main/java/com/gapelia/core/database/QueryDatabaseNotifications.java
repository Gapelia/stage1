package com.gapelia.core.database;

import com.gapelia.core.model.*;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class QueryDatabaseNotifications {
    private static Logger LOG = Logger.getLogger(QueryDatabaseNotifications.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    private static final String GET_LIBRARY_AWAITING_RESPONSES = "SELECT * FROM library_notifications where sender = ? and referenced_library = ? and accepted IS NULL";
    private static final String GET_LIBRARY_SUBMISSIONS = "SELECT * FROM library_notifications where recipient = ? and referenced_library = ? and accepted IS NULL";
    private static final String GET_ALL_SUBMISSIONS = "SELECT * FROM library_notifications where recipient = ? and accepted IS NULL";
    private static final String GET_LIBRARY_SUBMISSION_RESPONSES = "SELECT * FROM library_notifications where sender = ? and accepted IS NOT NULL";
    private static final String ACCEPT_LIBRARY_NOTIFICATIONS = "UPDATE library_notifications set accepted = 't' where id = ?";
    private static final String REJECT_LIBRARY_NOTIFICATIONS = "UPDATE library_notifications set accepted = 'f' where id = ?";
    private static final String INSERT_LIBRARY_NOTIFICATION = "INSERT into library_notifications(recipient,referenced_library,book_id,sender,date_sent,message)VALUES(?,?,?,?,?,?)";
    private static final String DELETE_LIBRARY_NOTIFICATIONS = "DELETE FROM library_notifications where id = ?";

    public static ArrayList<LibraryNotifications> getAlreadySubmitted(User u,int libraryId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        ArrayList<LibraryNotifications> notificationList = null;
        try {
            notificationList = new ArrayList<LibraryNotifications>();
            insert = connection.prepareStatement(GET_LIBRARY_AWAITING_RESPONSES);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, libraryId);
            rs = insert.executeQuery();
            while (rs.next()) {
                LibraryNotifications libraryNotifications = new LibraryNotifications();
                libraryNotifications.setRecipientUserId(rs.getInt("recipient"));
                libraryNotifications.setLibraryId(rs.getInt("referenced_library"));
                libraryNotifications.setSenderUserId(rs.getInt("sender"));
                libraryNotifications.setBookId(rs.getInt("book_id"));
                libraryNotifications.setDateSend(rs.getTimestamp("date_sent"));
                libraryNotifications.setAccepted(rs.getBoolean("accepted"));
                libraryNotifications.setMessage(rs.getString("message"));
                libraryNotifications.setRead(rs.getBoolean("read"));
                libraryNotifications.setNotificationId(rs.getInt("id"));
                notificationList.add(libraryNotifications);
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

    public static ArrayList<LibraryNotifications> getLibraryNotifications(User u,int libraryId) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        ArrayList<LibraryNotifications> notificationList = null;
        try {
            notificationList = new ArrayList<LibraryNotifications>();
            insert = connection.prepareStatement(GET_LIBRARY_SUBMISSIONS);
            insert.setInt(1, u.getUserId());
            insert.setInt(2, libraryId);
            rs = insert.executeQuery();
            while (rs.next()) {
                LibraryNotifications libraryNotifications = new LibraryNotifications();
                libraryNotifications.setRecipientUserId(rs.getInt("recipient"));
                libraryNotifications.setLibraryId(rs.getInt("referenced_library"));
                libraryNotifications.setSenderUserId(rs.getInt("sender"));
                libraryNotifications.setBookId(rs.getInt("book_id"));
                libraryNotifications.setDateSend(rs.getTimestamp("date_sent"));
                libraryNotifications.setAccepted(rs.getBoolean("accepted"));
                libraryNotifications.setMessage(rs.getString("message"));
                libraryNotifications.setRead(rs.getBoolean("read"));
                libraryNotifications.setNotificationId(rs.getInt("id"));
                notificationList.add(libraryNotifications);
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

    public static ArrayList<LibraryNotifications> getAllSubmissions(User u) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        ArrayList<LibraryNotifications> notificationList = null;
        try {
            notificationList = new ArrayList<LibraryNotifications>();
            insert = connection.prepareStatement(GET_ALL_SUBMISSIONS);
            insert.setInt(1, u.getUserId());
            rs = insert.executeQuery();
            while (rs.next()) {
                LibraryNotifications libraryNotifications = new LibraryNotifications();
                libraryNotifications.setRecipientUserId(rs.getInt("recipient"));
                libraryNotifications.setLibraryId(rs.getInt("referenced_library"));
                libraryNotifications.setSenderUserId(rs.getInt("sender"));
                libraryNotifications.setBookId(rs.getInt("book_id"));
                libraryNotifications.setDateSend(rs.getTimestamp("date_sent"));
                libraryNotifications.setAccepted(rs.getBoolean("accepted"));
                libraryNotifications.setMessage(rs.getString("message"));
                libraryNotifications.setRead(rs.getBoolean("read"));
                libraryNotifications.setNotificationId(rs.getInt("id"));
                notificationList.add(libraryNotifications);
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

    public static ArrayList<LibraryNotifications> getAllResponses(User u) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        ArrayList<LibraryNotifications> notificationList = null;
        try {
            notificationList = new ArrayList<LibraryNotifications>();
            insert = connection.prepareStatement(GET_LIBRARY_SUBMISSION_RESPONSES);
            insert.setInt(1, u.getUserId());
            rs = insert.executeQuery();
            while (rs.next()) {
                LibraryNotifications libraryNotifications = new LibraryNotifications();
                libraryNotifications.setRecipientUserId(rs.getInt("recipient"));
                libraryNotifications.setLibraryId(rs.getInt("referenced_library"));
                libraryNotifications.setSenderUserId(rs.getInt("sender"));
                libraryNotifications.setBookId(rs.getInt("book_id"));
                libraryNotifications.setDateSend(rs.getTimestamp("date_sent"));
                libraryNotifications.setAccepted(rs.getBoolean("accepted"));
                libraryNotifications.setMessage(rs.getString("message"));
                libraryNotifications.setRead(rs.getBoolean("read"));
                libraryNotifications.setNotificationId(rs.getInt("id"));
                notificationList.add(libraryNotifications);
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

    public  static String acceptLibraryNotification(int notificationId) {
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

    public  static String rejectLibraryNotification(int notificationId) {
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


    public static String createLibraryNotification(LibraryNotifications l) {
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
    /*
    public static ArrayList<BookNotifications> getBookNotifications(User u) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        ArrayList<BookNotifications> notificationList = null;
        try {
            notificationList = new ArrayList<BookNotifications>();
            insert = connection.prepareStatement(GET_USER_BOOK_NOTIFICATIONS);
            insert.setInt(1, u.getUserId());
            rs = insert.executeQuery();
            while (rs.next()) {
                BookNotifications bookNotifications = new BookNotifications();
                bookNotifications.setRecipientUserId(rs.getInt("recipient"));
                bookNotifications.setBookId(rs.getInt("referenced_book "));
                bookNotifications.setSenderUserId(rs.getInt("sender"));
                bookNotifications.setDateSend(rs.getTimestamp("date_sent"));
                bookNotifications.setAccepted(rs.getBoolean("accepted"));
                notificationList.add(bookNotifications);
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
        return notificationList;
    }

    public static ArrayList<BookNotifications> getAcceptedBookNotifications(User u) {
        PreparedStatement insert = null;
        ResultSet rs = null;
        ArrayList<BookNotifications> notificationList = null;
        try {
            notificationList = new ArrayList<BookNotifications>();
            insert = connection.prepareStatement(GET_USER_ACCEPTED_BOOK_NOTIFICATIONS);
            insert.setInt(1, u.getUserId());
            rs = insert.executeQuery();
            while (rs.next()) {
                BookNotifications bookNotifications = new BookNotifications();
                bookNotifications.setRecipientUserId(rs.getInt("recipient"));
                bookNotifications.setBookId(rs.getInt("referenced_book "));
                bookNotifications.setSenderUserId(rs.getInt("sender"));
                bookNotifications.setDateSend(rs.getTimestamp("date_sent"));
                bookNotifications.setAccepted(rs.getBoolean("accepted"));
                notificationList.add(bookNotifications);
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
        return notificationList;
    }

    public static String createBookNotification(BookNotifications b) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(INSERT_BOOK_NOTIFICATION);
            insert.setInt(1, b.getRecipientUserId());
            insert.setInt(2, b.getBookId());
            insert.setInt(3, b.getSenderUserId());
            insert.setTimestamp(4, b.getDateSend());
            insert.setBoolean(5, false);
            insert.executeUpdate();
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:" + ex.getMessage());
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

    public  static String respondBookNotification(int senderId, int recipientId, int referenced) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(RESPOND_LIBRARY_NOTIFICATIONS);
            insert.setInt(1, recipientId);
            insert.setInt(2, senderId);
            insert.setInt(3, referenced);
            insert.executeUpdate();
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:"  + ex.getMessage());
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

    public  static String removeBookNotification(int senderId, int recipientId, int referenced) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(DELETE_BOOK_NOTIFICATIONS);
            insert.setInt(1, recipientId);
            insert.setInt(2, senderId);
            insert.setInt(3, referenced);
            insert.executeUpdate();
        } catch (SQLException ex) {
            LOG.error("Cannot bookmark book:"  + ex.getMessage());
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
    */
}
