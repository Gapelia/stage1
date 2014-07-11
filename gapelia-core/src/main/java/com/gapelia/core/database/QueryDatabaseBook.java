package com.gapelia.core.database;

import com.gapelia.core.model.*;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.*;
import java.util.ArrayList;

public class QueryDatabaseBook {
	private static Logger LOG = Logger.getLogger(QueryDatabaseBook.class);
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	//Page Relate Queries
	private static final String DELETE_PAGES_FROM_BOOK = "DELETE FROM pages where book_id = ?";
	private static final String DELETE_FROM_BOOKS = "DELETE FROM books where id = ?";
	private static final String DELETE_FROM_LIBRARYBOOKS = "DELETE FROM library_books user_bookmarks where book_id = ?";
	private static final String CREATE_PAGE = "INSERT INTO pages (book_id, user_id, created, last_updated) VALUES(?,?,?,?)";
	private static final String UPDATE_PAGE = "UPDATE pages set title = ?, content = ?,template_id = ?,video_url = ?,page_number = ?,photo_url = ?,photo_id = ?,creative_commons = ?,last_updated = ? WHERE id = ?";
	private static final String DELETE_PAGE = "DELETE FROM pages WHERE id = ?";
	private static final String IS_BOOK_IN_LIBRARY = "select * from library_books where book_id = ? and library_id = ?";

	// Book Related Queries
    private static final String IS_VALID_BOOKID = "SELECT 1 FROM books WHERE id = ?";
	public static final String CREATE_BOOK = "INSERT INTO books (owned_by, created, last_updated, is_published) VALUES (?,?,?,?)";
	public static final String CREATE_REVISION_BOOK = "INSERT INTO books (owned_by, created, last_updated, is_published) VALUES (?,now(),?,null)";
	private static final String UPDATE_BOOK = "UPDATE books set cover_photo = ?, title = ?, language = ?, tags = ?, last_updated = ?, is_published = ?, snippet = ?  WHERE id = ?";
	private static final String UPDATE_REVISION_BOOK = "UPDATE books set cover_photo = ?, title = ?, language = ?, tags = ?, last_updated = ?,  snippet = ?  WHERE id = ?";
	private static final String DELETE_FROM_USER_VOTES2 = "DELETE FROM user_votes where book_id = ?";
	private static final String GET_NUM_VOTES = "select count(book_id) from user_votes where book_id = ? group by book_id";
	private static final String DELETE_FROM_USER_BOOKMARKS2 = "DELETE FROM user_bookmarks where book_id = ?";
	private static final String DELETE_FROM_LIBRARY_NOTIFICATION2 = "DELETE FROM library_notifications where book_id = ?";

	public static boolean isBookInLibrary(int bookId, int libraryId) {
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(IS_BOOK_IN_LIBRARY);
			insert.setInt(1, bookId);
			insert.setInt(2, libraryId);
			ResultSet rs = insert.executeQuery();

			boolean result = rs.isBeforeFirst();

			rs.close();
			insert.close();
			return result;

		} catch (SQLException ex) {
			LOG.error("Cannot get if book in library bookid:" + bookId + ex.getMessage());
			return false;
		}
	}

    public static boolean isValidBookId(int bookId) {
        PreparedStatement insert = null;
        try {
            insert = connection.prepareStatement(IS_VALID_BOOKID);
            insert.setInt(1, bookId);
            ResultSet rs = insert.executeQuery();

            boolean result = rs.next();

            rs.close();
            insert.close();
            return result;

        } catch (SQLException ex) {
            LOG.error("Cannot get if bookId is valid:" + bookId + ex.getMessage());
            return false;
        }
    }

	public static String getNumVotes(int bookId) {
		PreparedStatement statement = null;
		ResultSet rs = null;
		String num = null;
		try {
			statement = connection.prepareStatement(GET_NUM_VOTES);
			statement.setInt(1, bookId);
			rs = statement.executeQuery();
			if (rs.next()) {
				num = Integer.toString(rs.getInt(1));
			}
		} catch (Exception ex) {
			LOG.error("ERROR getting num votes for book:" + bookId, ex);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();
				}
			} catch (SQLException ex) {
				LOG.error("Error closing connection " + bookId + " " + ex.getMessage());
			}
		}
		return num;
	}


	public static int createPage(Page page){
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(CREATE_PAGE, Statement.RETURN_GENERATED_KEYS);
			insert.setInt(1, page.getBookId());
			insert.setInt(2, page.getUserId());
			insert.setTimestamp(3, page.getCreated());
			insert.setTimestamp(4, page.getLastUpdated());
			insert.executeUpdate();


			ResultSet rs = insert.getGeneratedKeys();
			if ( rs.next() ) {
				int pageNumSequence = rs.getInt(1);

				QueryDatabaseMetric.initializePageViews(page.getBookId(),pageNumSequence);
				return pageNumSequence;
			}
			return 0;
		} catch (SQLException ex) {
			LOG.error("ERROR creating page: : " + page.getPageId() + " "  + ex.getMessage());
			return -1;
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: "  + page.getPageId() + " " + ex.getMessage());
				return -1;
			}
		}
	}

	public static String updatePage(Page page){
		PreparedStatement insert = null;
		try {

			insert = connection.prepareStatement(UPDATE_PAGE);
			insert.setString(1, page.getTitle());
			insert.setString(2, page.getContent());
			insert.setInt(3, page.getTemplateId());
			insert.setString(4, page.getVideoUrl());
			insert.setInt(5, page.getPageNumber());
			insert.setString(6, page.getPhotoUrl());
			insert.setString(7, page.getPhotoId());
			insert.setString(8, page.getCreativeCommons());
			insert.setTimestamp(9, page.getLastUpdated());
			insert.setInt(10, page.getPageId());
			insert.executeUpdate();
			return "Success";
		} catch (SQLException ex) {
			LOG.error("ERROR updating page: : " + page.getPageId() + " "  + ex.getMessage());
			return "ERROR updating page";
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: "  + page.getPageId() + " " + ex.getMessage());
				return "Error closing connection";
			}
		}
	}

	public static String deletePage(int pageId){
		PreparedStatement delete = null;
		try {
			delete = connection.prepareStatement(DELETE_PAGE);
			delete.setInt(1, pageId);
			delete.executeUpdate();
			return "Success";
		} catch (SQLException ex) {
			LOG.error("ERROR deleting page: : " + pageId + " " + ex.getMessage());
			return "ERROR deleting page";
		} finally {
			try {
				if (delete != null) {
					delete.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: " + pageId + " " + ex.getMessage());
				return "Error closing connection";
			}
		}
	}


	public static ArrayList<Library> getLibrariesBookBelongsTo(int bookId) {
		ArrayList<Library> list = new ArrayList<Library>();
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(QueryDatabaseUser.IS_BOOK_IN_LIBRARY);
			insert.setInt(1, bookId);
			ResultSet rs = insert.executeQuery();

			while(rs.next()){
				list.add(QueryDatabaseLibrary.getLibrary(rs.getInt("library_id")));
			}

			rs.close();
			insert.close();

		} catch (SQLException ex) {
			LOG.error("Cannot get libraries of book:" + bookId + " " + ex.getMessage());
			return null;
		}

		return list;
	}

	public static int createBook(Book book){
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(CREATE_BOOK, Statement.RETURN_GENERATED_KEYS);
			insert.setInt(1, book.getUserId());
			insert.setTimestamp(2, book.getCreated());
			insert.setTimestamp(3, book.getLastUpdated());
			insert.setBoolean(4, false);
			insert.executeUpdate();



			ResultSet rs = insert.getGeneratedKeys();
			if ( rs.next() ) {
				int bookSequence =  rs.getInt(1);
				QueryDatabaseMetric.initializeBookViews(bookSequence);
				QueryDatabaseMetric.initializeBookShares(bookSequence);
				return bookSequence;
			}


			return 0;
		} catch (SQLException ex) {
			LOG.error("ERROR creating book: : " + book.getBookId() + " "  + ex.getMessage());
			return -1;
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: "  + book.getBookId() + " " + ex.getMessage());
				return -1;
			}
		}
	}

	public static String updateBook(Book book){
		LOG.info("updateBook");
		PreparedStatement insert = null;
		try {
			LOG.info("getting most recent revision");
			ArrayList<Revision> revisionList = QueryDatabaseRevisions.getRevisionsForBookId(book.getBookId());


			boolean revisionExistsForToday = false;
			if(revisionList.size() > 0){
				Revision mostRecentRevision= QueryDatabaseRevisions.getRevisionsForBookId(book.getBookId()).get(0);
				revisionExistsForToday = SQLUtil.isSameDay(mostRecentRevision.getCreated(),new java.util.Date());
			}

			LOG.info("revision exists for today:" + revisionExistsForToday);


			if(revisionExistsForToday){
				insert = connection.prepareStatement(UPDATE_BOOK);
				insert.setString(1, book.getCoverPhoto());
				insert.setString(2, book.getTitle());
				insert.setString(3, book.getLanguague());
				insert.setString(4, book.getTags());
				insert.setTimestamp(5, book.getLastUpdated());
				insert.setBoolean(6, book.getIsPublished());
				insert.setString(7, book.getSnippet());
				insert.setInt(8, book.getBookId());
				insert.executeUpdate();
			}
			else{  //we need to make a new revision.

				LOG.info("first revision of the day, making new revision");
				book.setIsPublished(null);

				int originalBookId = book.getBookId();
				LOG.info("original book id:" + originalBookId);

				ArrayList<Page> pageList = QueryDatabaseUser.getPages(originalBookId);

				insert = connection.prepareStatement(CREATE_REVISION_BOOK, Statement.RETURN_GENERATED_KEYS);
				insert.setInt(1, book.getUserId());
				insert.setTimestamp(2, book.getLastUpdated());
				insert.executeUpdate();

				int bookSequence = 0;
				ResultSet rs = insert.getGeneratedKeys();
				if ( rs.next() ) {
					bookSequence =  rs.getInt(1);
				}

				LOG.info("new book seq: " + bookSequence);

				if(bookSequence == 0){
					LOG.error("bookSequence is 0!");
				}
				else{

					LOG.info("updating book in db");

					book.setBookId(bookSequence);

					insert = connection.prepareStatement(UPDATE_REVISION_BOOK);
					insert.setString(1, book.getCoverPhoto());
					insert.setString(2, book.getTitle());
					insert.setString(3, book.getLanguague());
					insert.setString(4, book.getTags());
					insert.setTimestamp(5, book.getLastUpdated());
					insert.setString(6, book.getSnippet());
					insert.setInt(7, book.getBookId());
					insert.executeUpdate();

					LOG.info("adding revision for book id");

					QueryDatabaseRevisions.addRevisionForBookId(originalBookId,bookSequence);

					for(Page p : pageList){
						LOG.info("updating page id" + p.getPageId());

						p.setBookId(bookSequence);

						LOG.info(p.getTitle());

						int newPageNum = createPage(p);

						p.setPageId(newPageNum);

						updatePage(p);
					}

				}

			}


			return "Success";
		} catch (SQLException ex) {
			LOG.error("ERROR updating book: : " + book.getBookId() + " "  + ex.getMessage());
			return "ERROR updating book";
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: "  + book.getBookId() + " " + ex.getMessage());
				return "Error closing connection";
			}
		}
	}

	public static String deleteBook(int bookId){
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(DELETE_FROM_LIBRARY_NOTIFICATION2);
			insert.setInt(1, bookId);
			LOG.info(insert.toString());
			insert.executeUpdate();
			insert = connection.prepareStatement(DELETE_FROM_USER_VOTES2);
			insert.setInt(1, bookId);
			LOG.info(insert.toString());
			insert.executeUpdate();
			insert = connection.prepareStatement(DELETE_FROM_USER_BOOKMARKS2);
			insert.setInt(1, bookId);
			LOG.info(insert.toString());
			insert.executeUpdate();
			insert.executeUpdate();
			insert = connection.prepareStatement(DELETE_PAGES_FROM_BOOK);
			insert.setInt(1, bookId);
			insert.executeUpdate();
			insert = connection.prepareStatement(DELETE_FROM_LIBRARYBOOKS);
			insert.setInt(1, bookId);
			insert.executeUpdate();
			insert = connection.prepareStatement(DELETE_FROM_BOOKS);
			insert.setInt(1, bookId);
			insert.executeUpdate();
			return "Success";
		} catch (SQLException ex) {
			LOG.error("ERROR deleting book: : " + bookId + " " + ex.getMessage());
			return "ERROR deleting book";
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: " + bookId + " " + ex.getMessage());
				return "Error closing connection";
			}
		}
	}


	public static String deletePagesFromBook(int bookId){
		PreparedStatement insert = null;
		try {
			insert = connection.prepareStatement(DELETE_PAGES_FROM_BOOK);
			insert.setInt(1, bookId);
			insert.executeUpdate();

			return "Success";
		} catch (SQLException ex) {
			LOG.error("ERROR deleting pages from book: : " + bookId + " " + ex.getMessage());
			return "ERROR deleting pages";
		} finally {
			try {
				if (insert != null) {
					insert.close();
				}
			} catch (SQLException ex) {
				LOG.error("error closing connection: " + bookId + " " + ex.getMessage());
				return "Error closing connection";
			}
		}
	}

}