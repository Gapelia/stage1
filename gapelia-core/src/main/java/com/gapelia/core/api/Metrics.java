package com.gapelia.core.api;

import com.gapelia.core.database.QueryDatabaseMetric;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by frankie on 4/10/14.
 */
@Path("/metrics")
public class Metrics {
	public static Logger LOG = Logger.getLogger(Libraries.class);

	@Path("incrementNumBookEmailShares")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public void incrementNumBookEmailShares(@FormParam("bookId") int bookId) {
		QueryDatabaseMetric.incrementBookSharesEmail(bookId);
	}

	@Path("incrementNumBookTwitterShares")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public void incrementNumBookTwitterShares(@FormParam("bookId") int bookId) {
		QueryDatabaseMetric.incrementBookSharesTwitter(bookId);
	}

	@Path("incrementNumBookFBShares")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public void incrementNumBookFBShares(@FormParam("bookId") int bookId) {
		QueryDatabaseMetric.incrementBookSharesFB(bookId);
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
