package com.gapelia.core.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 9:41 PM
 * Copyright Gapelia Inc
 */
@Path("/dimensions")
public class Dimensions {

	public static Logger LOG = Logger.getLogger(Dimensions.class);

	@Path("getRandomDimensionsCover")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getRandomDimensionsCover() {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			String [] dimensionCovers = new String[4];
			dimensionCovers[0] = "Pulse#https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/1404811_10153389220335643_1071958068_o.jpg";
			dimensionCovers[1] = "Art#https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/1404811_10153389220335643_1071958068_o.jpg";
			dimensionCovers[2] = "Music#https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/1404811_10153389220335643_1071958068_o.jpg";
			dimensionCovers[3] = "Life#https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-ash3/1404811_10153389220335643_1071958068_o.jpg";
			String json = gson.toJson(dimensionCovers);
			LOG.info("Response json: " + json);
			return json;
		} catch (Exception ex) {
			LOG.error("Failed to get random dimensions covers", ex);
			return gson.toJson("Failed");
		}
	}
}
