package com.gapelia.core.database;

import org.apache.log4j.Logger;
import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseManager {

	private static String DB_DRIVER = "org.postgresql.Driver";
	private static String DB_CONN_STRING = "jdbc:postgresql://";
	private static String DB_HOSTNAME = "stage1.cxphkpoppwcv.us-west-2.rds.amazonaws.com";
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
			String mode = null;
			try {
				mode = System.getProperty("gapeliaMode");
			} catch (Exception ex) {
				// Ignore mode is null
			}
			if (null != mode && "local".equals(mode)) {
				LOG.error("we are in local mode:");
				connectionString = "jdbc:postgresql://lmqyuqoyasrapq:5ELsYmpiso4HWAyj0SR_iaBQH4@ec2-54-204-37-92.compute-1.amazonaws.com:5432/d4fq8usu8kkech?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";
			}
			connection = DriverManager.getConnection(connectionString, userName, password);
			LOG.info("Got database connection");
		} catch (Exception ex) {
			LOG.error(connection);
			LOG.error("Cannot get database connection", ex);
		}
	}

	public Connection getConnection() {
		return this.connection;
	}
}
