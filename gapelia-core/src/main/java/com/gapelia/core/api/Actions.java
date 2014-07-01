package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseActions;
import com.gapelia.core.database.QueryDatabaseBook;
import com.gapelia.core.database.QueryDatabaseRevisions;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/actions/")
public class Actions {
	private static Logger LOG = Logger.getLogger(Actions.class);



	@Path("revertToRevision")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String revertToBook(@FormParam("sessionId") String sessionId,
							   @FormParam("revisionBookId") int revisionBookId) {

		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		User u = SessionManager.getUserFromSessionId(sessionId);

		Book originalBook = QueryDatabaseUser.getBookByID(QueryDatabaseRevisions.getOriginalBookIdFromRevisionId(revisionBookId));
		Book revisionBook = QueryDatabaseUser.getBookByID(revisionBookId);

		if(originalBook.getUserId() != u.getUserId() ||
				revisionBook.getUserId() != u.getUserId()) return "permission denied";

		Gson gson = new GsonBuilder().create();
		return QueryDatabaseRevisions.revertToRevision(originalBook,revisionBook);
	}




	@Path("bookmarkBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String bookmarkBook(@FormParam("sessionId") String sessionId,
							   @FormParam("bookId") int bookId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		Gson gson = new GsonBuilder().create();
		User u = SessionManager.getUserFromSessionId(sessionId);
		return QueryDatabaseActions.bookmarkBook(u, bookId);
	}

	@Path("hasAlreadyVoted")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String hasAlreadyVoted(@FormParam("sessionId") String sessionId,
								  @FormParam("bookId") int bookId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		Gson gson = new GsonBuilder().create();
		User u = SessionManager.getUserFromSessionId(sessionId);
		return QueryDatabaseActions.hasAlreadyVotedFor(u, bookId);
	}

	@Path("removeBookmarkBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String removeBookmarkBook(@FormParam("sessionId") String sessionId,
									 @FormParam("bookId") int bookId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		Gson gson = new GsonBuilder().create();
		User u = SessionManager.getUserFromSessionId(sessionId);
		return QueryDatabaseActions.removeBookmarkBook(u, bookId);
	}

	@Path("subscribeLibrary")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String subscribeLibrary(@FormParam("sessionId") String sessionId,
								   @FormParam("libraryId") int libraryId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;
		LOG.info("subscribing");
		Gson gson = new GsonBuilder().create();
		User u = SessionManager.getUserFromSessionId(sessionId);
		LOG.info("subscribing");
		return QueryDatabaseActions.subscribeLibrary(u, libraryId);
	}

	@Path("removeSubscriptionLibrary")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String removeSubscriptionLibrary(@FormParam("sessionId") String sessionId,
											@FormParam("libraryId") int libraryId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		Gson gson = new GsonBuilder().create();
		User u = SessionManager.getUserFromSessionId(sessionId);
		return QueryDatabaseActions.removeSubscriptionLibrary(u, libraryId);
	}

	@Path("voteBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String voteBook(@FormParam("sessionId") String sessionId,
						   @FormParam("bookId") int bookId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;
		Gson gson = new GsonBuilder().create();
		User u = SessionManager.getUserFromSessionId(sessionId);
		return QueryDatabaseActions.voteBook(u, bookId);
	}

	@Path("removeVoteBook")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String removeVoteBook(@FormParam("sessionId") String sessionId,
								 @FormParam("bookId") int bookId) {
		if (!APIUtil.isValidSession(sessionId))
			return APIUtil.INVALID_SESSION_ERROR_MSG;

		Gson gson = new GsonBuilder().create();
		User u = SessionManager.getUserFromSessionId(sessionId);
		return QueryDatabaseActions.removeVoteBook(u, bookId);
	}
}
