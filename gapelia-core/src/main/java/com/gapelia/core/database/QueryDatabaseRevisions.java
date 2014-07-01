package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Page;
import com.gapelia.core.model.Revision;
import org.apache.log4j.Logger;

import java.sql.*;
import java.util.ArrayList;

public class QueryDatabaseRevisions {
	private static Logger LOG = Logger.getLogger(QueryDatabaseRevisions.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	private static final String GET_REVISIONS_FOR_BOOKID= "select * from revisions where book_id = ? order by created desc";
	private static final String ADD_REVISION_FOR_BOOKID= "insert into revisions (book_id,revision_book_id,created) values (?,?,now())";
	private static final String UPDATE_BOOK = "UPDATE books set cover_photo = ?, title = ?, language = ?, tags = ?, last_updated = ?, is_published = ?, snippet = ?  WHERE id = ?";


	public static String revertToRevision(Book originalBook, Book revisionBook){
		LOG.info("revertToRevision");
		PreparedStatement insert = null;
		try {
			LOG.info("getting most recent revision");


			int originalBookId = originalBook.getBookId();
			int revisionBookId = revisionBook.getBookId();

			revisionBook.setIsPublished(false);

			insert = connection.prepareStatement(UPDATE_BOOK);
			insert.setString(1, revisionBook.getCoverPhoto());
			insert.setString(2, revisionBook.getTitle());
			insert.setString(3, revisionBook.getLanguague());
			insert.setString(4, revisionBook.getTags());
			insert.setTimestamp(5, revisionBook.getLastUpdated());
			insert.setBoolean(6, revisionBook.getIsPublished());
			insert.setString(7, revisionBook.getSnippet());
			insert.setInt(8, originalBook.getBookId());
			insert.executeUpdate();

			LOG.info("transplanted book");
			ArrayList<Page> revisionPageList = QueryDatabaseUser.getPages(revisionBookId);

			QueryDatabaseBook.deletePagesFromBook(originalBookId);
			LOG.info("deleted pages");


			for(Page p : revisionPageList){

				p.setBookId(originalBookId);
				QueryDatabaseBook.createPage(p);
				QueryDatabaseBook.updatePage(p);
			}


			return "Success";
		} catch (SQLException ex) {
			LOG.error("ERROR reverting to revision : " + ex.getMessage());
			return "ERROR reverting to revision";
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
