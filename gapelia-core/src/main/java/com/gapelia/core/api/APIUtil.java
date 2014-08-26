package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseSearch;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.database.QueryUtils;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Search;
import com.gapelia.core.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Map;


@Path("/utils/")
public class APIUtil {
	private static Logger LOG = Logger.getLogger(APIUtil.class);

	public static String INVALID_SESSION_ERROR_MSG = "SessionID is not valid/Associated with a user";

	public static boolean isValidSession(String sessionId) {
		if (SessionManager.getUserFromSessionId(sessionId) != null) {
			return true;
		}
		return false;
	}

	public static boolean checkIfOwnBook() {
		return false;
	}

	public static boolean checkIfOwnUser() {
		return false;
	}

	public static boolean checkIfOwnLibrary() {
		return false;
	}

	public static boolean checkIfOwnPage() {
		return false;
	}

	public static boolean userOwnsBook(User u, int bookId){
		Book b = QueryDatabaseUser.getBookByID(bookId);
		return b.getUserId() == u.getUserId();
	}

	@Path("getUserFromLibraryId")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getUserFromLibraryId(@FormParam("libraryId") int libraryId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryUtils.getUserFromLibraryId(libraryId));
	}

	@Path("isUserNameAvailable")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getUserFromLibraryId(@FormParam("userName") String userName) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryUtils.checkUserByName(userName));
	}

	@Path("getUserFromBookId")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getUserFromBookId(@FormParam("bookId") int bookId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryUtils.getUserFromBookId(bookId));
	}

	@Path("getOpenUserSessions")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getOpenUserSessions() {
		Gson gson = new GsonBuilder().create();

		ArrayList<String> users = new ArrayList<String>();

		for(Map.Entry<String, User> e : SessionManager.sessionIdToUser.entrySet()){
			users.add(e.getValue().getName());
		}

		return gson.toJson(users);
	}

	@Path("getBookFromBookId")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getBookFromBookId(@FormParam("bookId") int bookId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryUtils.getBookFromBookId(bookId));
	}

	@Path("getLibraryFromBookId")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getLibraryFromBookId(@FormParam("bookId") int bookId) {
		Gson gson = new GsonBuilder().create();
		return gson.toJson(QueryUtils.getLibraryFromBookId(bookId));
	}

	@GET
	@Path("search/{query}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response searchQuery(@PathParam("query") String query) {
		query = StringEscapeUtils.unescapeHtml(query);
		StringBuilder strb = new StringBuilder();

		String[] tokens = query.split(" ");

		if(tokens.length > 1){
			for(String t : tokens){
				strb.append(t + "|");
			}

			query = strb.substring(0,strb.length()-1) + ":*";
		}
		else if(query.charAt(query.length()-1) != ' ' && query.length()>0)
			query = query + ":*";

		Gson gson = new GsonBuilder().create();

		Search s = new Search();

		QueryDatabaseSearch.searchBooks(query,s);

		return Response.ok(gson.toJson(s), MediaType.APPLICATION_JSON).header("Access-Control-Allow-Origin", "*").build();

	}
}


