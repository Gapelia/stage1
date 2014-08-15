package com.gapelia.core.api;

import com.gapelia.core.database.QueryDatabaseMetric;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/metrics")
public class Metrics {
    public static Logger LOG = Logger.getLogger(Libraries.class);

    @Path("incrementNumBookShares")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public void incrementNumBookTwitterShares(@FormParam("bookId") int bookId,
                                              @FormParam("type") String type) {
        if(type.equals("twitter")) QueryDatabaseMetric.incrementBookSharesTwitter(bookId);
        if(type.equals("facebook")) QueryDatabaseMetric.incrementBookSharesFB(bookId);
        if(type.equals("email")) QueryDatabaseMetric.incrementBookSharesEmail(bookId);
    }

    @Path("incrementNumPageViews")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public void incrementNumPageViews(@FormParam("bookId") int bookId,
                                      @FormParam("pageNum") int pageNum) {
        QueryDatabaseMetric.incrementPageViews(bookId, pageNum);
    }

    @Path("incrementNumBookViews")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public void incrementNumBookViews(@FormParam("bookId") int bookId) {
        QueryDatabaseMetric.incrementBookViews(bookId);
    }

    @Path("getNumBookViews")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNumBookViews(@FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseMetric.getNumBookViews(bookId));
    }

    @Path("getNumBookVotes")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNumBookVotes(@FormParam("bookId") int bookId) {
        return Integer.toString(QueryDatabaseMetric.getNumVotes(bookId));
    }

    @Path("getNumPageViews")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNumBookViews(@FormParam("bookId") int bookId,
                                  @FormParam("pageNum") int pageNum) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseMetric.getNumPageViews(bookId, pageNum));
    }

    @Path("getNumBookShares")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String getNumBookShares(@FormParam("bookId") int bookId) {
        Gson gson = new GsonBuilder().create();
        return gson.toJson(QueryDatabaseMetric.getBookShares(bookId));
    }

}
