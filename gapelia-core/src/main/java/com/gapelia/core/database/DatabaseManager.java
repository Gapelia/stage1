package com.gapelia.core.database;

import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 * Author: Abhishek Tiwari (14/12/13)
 */
public class DatabaseManager {
	private static String DB_DRIVER = "org.postgresql.Driver";
	private static String DB_CONN_STRING = "jdbc:postgresql://";
	private static String DB_HOSTNAME = "ec2-54-204-37-92.compute-1.amazonaws.com";
	private static String DB_PORT = "5432";
	private static String DB_USER = "lmqyuqoyasrapq";
	private static String DB_PASS = "5ELsYmpiso4HWAyj0SR_iaBQH4";
	private static String DB_NAME = "d4fq8usu8kkech";

	private static Logger LOG = Logger.getLogger(DatabaseManager.class);
	private static DatabaseManager _instance;

	public synchronized static DatabaseManager getInstance() {
		if (_instance == null) {
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
			String mode = System.getProperty("gapeliaMode");
			if (null != mode && "local".equals(mode)) {
				connectionString = "jdbc:postgresql://localhost:5432/gapelia";
				userName = "postgres";
				password = "";
			}
			connection = DriverManager.getConnection(connectionString, userName, password);
			LOG.info("Got database connection");
		} catch (Exception ex) {
			LOG.error("Cannot get database connection", ex);
		}
	}

	public Connection getConnection() {
		return this.connection;
	}
}
