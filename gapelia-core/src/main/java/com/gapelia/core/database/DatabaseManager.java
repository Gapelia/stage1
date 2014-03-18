package com.gapelia.core.database;

import org.apache.log4j.Logger;
import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseManager {

	private static String DB_DRIVER = "org.postgresql.Driver";
	private static String DB_CONN_STRING = "jdbc:postgresql://";
	private static String DB_HOSTNAME = "stage1.chxnadlmqc14.us-east-1.rds.amazonaws.com";
	private static String DB_PORT = "5432";
	private static String DB_USER = "gapelia";
	private static String DB_PASS = "alphalaunch";
	private static String DB_NAME = "gapelia";

	private static Logger LOG = Logger.getLogger(DatabaseManager.class);
	private static DatabaseManager _instance;

	public synchronized static DatabaseManager getInstance() {
		if (_instance == null) {
			String dummy = null;
			try {
				dummy = System.getProperty("gapeliaDummy");
			} catch (Exception ex) {
				// Ignore mode is null
			}
			if (null != dummy && "true".equals(dummy))
				return null;
			_instance = new DatabaseManager();
		}
		return _instance;
	}

	private Connection connection = null;

	private DatabaseManager() {
		try {
			Class.forName(DB_DRIVER);
			String connectionString = DB_CONN_STRING + DB_HOSTNAME + ":" + DB_PORT + "/" + DB_NAME;
			String userName = DB_USER;
			String password = DB_PASS;
			connection = DriverManager.getConnection(connectionString, userName, password);
		} catch (Exception ex) {
			LOG.error(connection);
			LOG.error("Cannot get database connection", ex);
		}
	}

	public Connection getConnection() {
		return this.connection;
	}
}