package com.gapelia.core.api;

import com.gapelia.core.auth.AuthHelper;
import com.gapelia.core.database.QueryDatabase;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/notification")
public class Notification {
	public static Logger LOG = Logger.getLogger(Notification.class);

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String getNotification(@FormParam("sessionId") String sessionId) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		try {
			// Get UserId from SessionId
			LOG.info("Trying to retrieve user from session id");
			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
			// Retrieving user details
			LOG.info("Trying to retrieve notifications for user");
			LOG.info("Response json: ");
            return gson.toJson("Failed");
		} catch (Exception ex) {
			LOG.error("Failed to retrieve notifications", ex);
			return gson.toJson("Failed");
		}
	}

}
