package com.gapelia.core.database;

import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;
import com.gapelia.core.model.Book;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class QueryDatabaseLibrary {
	private static Logger LOG = Logger.getLogger(QueryDatabaseLibrary.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();

	//public static Library [] getLibraries
}
