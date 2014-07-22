package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Response;
import org.apache.log4j.Logger;

import java.sql.*;
import java.util.ArrayList;

public class QueryDatabaseResponses {
	private static Logger LOG = Logger.getLogger(QueryDatabaseResponses.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	private static final String GET_RESPONSES_FOR_BOOKID= "SELECT response.id AS response_id,response.title AS response_title FROM books AS receiver, books AS response, responses AS r WHERE receiver.id = ? AND r.response_to = receiver.id AND r.book_id = response.id ORDER BY response.created DESC";
	private static final String ADD_RESPONSE_FOR_BOOKID= "INSERT INTO responses(book_id, response_to) VALUES (?, ?);";
    private static final String DELETE_RESPONSE= "DELETE FROM responses WHERE book_id = ? AND response_to = ?;";

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

	public static String addResponseForBookId(int bookId, int responseId){
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(ADD_RESPONSE_FOR_BOOKID);
            // in this logic the responseId is the id of the new book created as a response
            // bookId is the Book which gets a response to
            // don't be confused: the Database has an inverted view to this issue
			insert.setInt(1, responseId);
			insert.setInt(2, bookId);
			insert.executeUpdate();
			return "Success";
		} catch (SQLException ex) {
			LOG.error("error adding response:" +bookId + " responseId: " + responseId + ex);
			return "error adding response:" +bookId + " responseId: " + responseId + ex;
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

    public static String deleteResponse(int bookId, int responseId){
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(DELETE_RESPONSE);
            insert.setInt(1, responseId);
            insert.setInt(2, bookId);
            insert.executeUpdate();
            return "Success";
        } catch (SQLException ex) {
            LOG.error("error removing response:" +bookId + " responseId: " + responseId + ex);
            return "error removing response:" +bookId + " responseId: " + responseId + ex;
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
