package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.DatabaseManager;
import com.gapelia.core.database.QueryUtils;
import com.gapelia.core.model.Book;
import com.gapelia.core.model.Search;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Connection;
import java.util.ArrayList;


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
	public String searchQuery(@PathParam("query") String query) {
		Gson gson = new GsonBuilder().create();
		LOG.info("SEARCHING FOR:"+query);
		Book b = new Book();
		b.setTitle(query);
		b.setBookId(777);


		Search s = new Search();
		s.addBook(b);
		return gson.toJson(s);

	}
}


