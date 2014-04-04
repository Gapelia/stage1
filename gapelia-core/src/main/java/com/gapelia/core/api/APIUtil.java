package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;


@Path("/utils/")
public class APIUtil {
    private static Logger LOG = Logger.getLogger(APIUtil.class);
    public static String INVALID_SESSION_ERROR_MSG = "SessionID is not valid/Associated with a user";
    public static boolean isValidSession(String sessionId) {
        if(SessionManager.getUserFromSessionId(sessionId)!=null) {
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
}


