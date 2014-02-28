package com.gapelia.core.database;

import org.apache.log4j.Logger;

import java.sql.Connection;

public class QueryDatabaseActions {
    private static Logger LOG = Logger.getLogger(QueryDatabaseActions.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();

    /*
    public static boolean bookmarkBook(Profile profile, int bookId) {

        return true;
    }

    public static boolean unbookmarkBook(Profile profile, int bookId) {
        return true;
    }

    public static boolean subscribeLibrary(Profile profile, int libraryId) {
        return true;
    }

    public static boolean unsubscribeLibrary(Profile profile, int libraryId) {
        return true;
    }

    public static boolean voteBook(Profile profile, int bookId) {
        return true;
    }

    public static boolean removeVoteBook(Profile profile, int bookId) {
        return true;
    }*/
}
