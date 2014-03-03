package com.gapelia.core.api;

import org.apache.log4j.Logger;

import javax.ws.rs.*;

@Path("/notification")
public class Notification {
	public static Logger LOG = Logger.getLogger(Notification.class);
//
//	@POST
//	@Produces(MediaType.APPLICATION_JSON)
//	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
//	public String getNotification(@FormParam("sessionId") String sessionId) {
//		Gson gson = new GsonBuilder().setPrettyPrinting().create();
//		try {
//			// Get UserId from SessionId
//			LOG.info("Trying to retrieve user from session id");
//			org.brickred.socialauth.Profile profile = AuthHelper.getUserProfileFromSessionId(sessionId);
//			// Retrieving user details
//			LOG.info("Trying to retrieve notifications for user");
//			LOG.info("Response json: ");
//            return gson.toJson("Failed");
//		} catch (Exception ex) {
//			LOG.error("Failed to retrieve notifications", ex);
//			return gson.toJson("Failed");
//		}
//	}

}
