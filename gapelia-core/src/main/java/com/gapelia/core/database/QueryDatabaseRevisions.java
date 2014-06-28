package com.gapelia.core.database;

import com.gapelia.core.model.Revision;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class QueryDatabaseRevisions {
	private static Logger LOG = Logger.getLogger(QueryDatabaseRevisions.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	private static final String GET_REVISIONS_FOR_BOOKID= "select * from revisions where book_id = ? order by created desc";
	private static final String ADD_REVISION_FOR_BOOKID= "insert into revisions (book_id,revision_book_id,created) values (?,?,now())";


	public static ArrayList<Revision> getRevisionsForBookId(int bookId) {
		ArrayList<Revision> list = new ArrayList<Revision>();
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(GET_REVISIONS_FOR_BOOKID);
			insert.setInt(1, bookId);
			ResultSet rs = insert.executeQuery();

			while(rs.next()){
				Revision r = new Revision();
				r.setId(rs.getInt("id"));
				r.setBookId(rs.getInt("book_id"));
				r.setRevisionBookId(rs.getInt("revision_book_id"));
				r.setCreated(rs.getDate("created"));

				list.add(r);
			}

			rs.close();
			insert.close();

		} catch (SQLException ex) {
			LOG.error("Cannot get libraries of book:" + bookId + " " + ex.getMessage());
			return null;
		}

		return list;
	}

	public static String addRevisionForBookId(int bookId,int revisionBookId){
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(ADD_REVISION_FOR_BOOKID);
			insert.setInt(1, bookId);
			insert.setInt(2, revisionBookId);
			insert.executeUpdate();
			return "Success";
		} catch (SQLException ex) {
			LOG.error("error adding revision:" +bookId + " revid: " + revisionBookId + ex);
			return "ERROR updating page";
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: "  + ex.getMessage());
				return "Error closing connection";
			}
		}
	}

}
