package com.gapelia.core.database;

import com.gapelia.core.model.Page;
import com.gapelia.core.model.Revision;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class QueryDatabaseRevisions {
	private static Logger LOG = Logger.getLogger(QueryDatabaseRevisions.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	private static final String REMOVE_VOTE_BOOK= "select * from revisions where book_id = ? order by created desc limit 10";

	public static ArrayList<Revision> getRevisions(int bookId){
		return null;
	}

}
