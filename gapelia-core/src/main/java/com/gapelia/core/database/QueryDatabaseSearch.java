package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.Library;
import com.gapelia.core.model.Search;
import org.apache.log4j.Logger;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class QueryDatabaseSearch {
    private static Logger LOG = Logger.getLogger(QueryDatabaseSearch.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    private static final String SEARCH_LIBRARIES = "select id,title,cover_photo,doc,ts_rank(search.doc, to_tsquery('english', ?)) " +
			"from (select id, title, cover_photo, description, to_tsvector('english',title) || to_tsvector('english',tags) || to_tsvector('english',description) as doc " +
			"from libraries group by id) search where doc @@ to_tsquery('english',?) ORDER BY ts_rank(search.doc, to_tsquery('english', ?)) DESC limit 5";

    private static final String SEARCH_BOOKS = "select id,title,cover_photo,doc,ts_rank(search.doc, to_tsquery('english', ?)) " +
			"from (select id, title, cover_photo, snippet, to_tsvector('english',title) || to_tsvector('english',tags) || to_tsvector('english',snippet) as doc " +
			"from books where is_published = 't' group by id) search where doc @@ to_tsquery('english',?) ORDER BY ts_rank(search.doc, to_tsquery('english', ?)) DESC limit 5";


    public static void searchBooks(String query, Search s) {

        PreparedStatement insert = null;
		ResultSet rs = null;
        try {
            insert = connection.prepareStatement(SEARCH_BOOKS);
            insert.setString(1, query);
            insert.setString(2, query);
            insert.setString(3, query);
            rs = insert.executeQuery();

			while(rs.next()){
				Book b = new Book();
				b.setBookId(rs.getInt(1));
				b.setTitle(rs.getString(2));
				b.setCoverPhoto(rs.getString(3));
				//b.setSnippet(rs.getString(4));
				s.addBook(b);
			}

			insert = connection.prepareStatement(SEARCH_LIBRARIES);
			insert.setString(1, query);
			insert.setString(2, query);
			insert.setString(3, query);
			rs = insert.executeQuery();

			while(rs.next()){
				Library l = new Library();
				l.setLibraryId(rs.getInt(1));
				l.setTitle(rs.getString(2));
				l.setCoverPhoto(rs.getString(3));

				s.addLibrary(l);
			}

        } catch (SQLException ex) {
            LOG.error(ex.getMessage());
        } finally {
            try {
                if (insert != null) {
                    insert.close();
                }
				if (rs != null) {
					rs.close();
				}
            } catch (SQLException ex) {
				LOG.error(ex.getMessage());
			}
        }
    }

}
