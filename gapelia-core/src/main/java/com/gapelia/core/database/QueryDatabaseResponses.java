package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Response;
import org.apache.log4j.Logger;

import java.sql.*;
import java.util.ArrayList;

public class QueryDatabaseResponses {
	private static Logger LOG = Logger.getLogger(QueryDatabaseResponses.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	private static final String GET_RESPONSES_FOR_BOOKID= "SELECT  response.id AS response_id,response.title AS response_title FROM books AS receiver, books AS response, responses AS r WHERE receiver.id = ? AND r.response_to = receiver.id AND r.book_id = response.id ORDER BY response.created DESC";
	private static final String ADD_REVISION_FOR_BOOKID= "insert into revisions (book_id,revision_book_id,created) values (?,?,now())";
	private static final String UPDATE_BOOK = "UPDATE books set cover_photo = ?, title = ?, language = ?, tags = ?, last_updated = ?, is_published = ?, snippet = ?  WHERE id = ?";
	private static final String GET_ORIGINAL_BOOKID_FROM_REVISION = "select * from revisions where revision_book_id = ?";
	public static final String UPDATE_PAGE = "UPDATE pages set title = ?, content = ?,template_id = ?,video_url = ?,page_number = ?,photo_url = ?,photo_id = ?,creative_commons = ?,last_updated = ?,book_id = ? WHERE id = ?";

    /*
	public static int getOriginalBookIdFromRevisionId(int revisionId) {
		PreparedStatement insert = null;
		int result = -1;
		try {
			insert = connection.prepareStatement(GET_ORIGINAL_BOOKID_FROM_REVISION);
			insert.setInt(1, revisionId);
			ResultSet rs = insert.executeQuery();

			if(rs.next()){
				result = rs.getInt("book_id");
			}

			rs.close();
			insert.close();

		} catch (SQLException ex) {
			LOG.error("Cannot get original book id from revisionid:" + revisionId + " " + ex.getMessage());
		}

		return result;
	}*/
    /*
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

				LOG.info(p.getTitle());
				LOG.info("pageid: " + p.getPageId());
				LOG.info("bookid: " + p.getBookId());

				p.setBookId(originalBookId);
				int newPageId = QueryDatabaseBook.createPage(p);

				insert = connection.prepareStatement(UPDATE_PAGE);
				insert.setString(1, p.getTitle());
				insert.setString(2, p.getContent());
				insert.setInt(3, p.getTemplateId());
				insert.setString(4, p.getVideoUrl());
				insert.setInt(5, p.getPageNumber());
				insert.setString(6, p.getPhotoUrl());
				insert.setString(7, p.getPhotoId());
				insert.setString(8, p.getCreativeCommons());
				insert.setTimestamp(9, p.getLastUpdated());
				insert.setInt(10, p.getBookId());
				insert.setInt(11, newPageId);
				insert.executeUpdate();
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
	}*/

	public static ArrayList<Response> getResponsesForBookId(int bookId) {
		ArrayList<Response> list = new ArrayList<Response>();
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(GET_RESPONSES_FOR_BOOKID);
			insert.setInt(1, bookId);
			ResultSet rs = insert.executeQuery();

			while(rs.next()){
				Response response = new Response();
				response.setId(rs.getInt("response_id"));
                response.setTitle(rs.getString("response_title"));
				list.add(response);
			}

			rs.close();
			insert.close();

		} catch (SQLException ex) {
			LOG.error("Cannot get responses of book:" + bookId + " " + ex.getMessage());
			return null;
		}

		return list;
	}
    /*
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
	*/

}
