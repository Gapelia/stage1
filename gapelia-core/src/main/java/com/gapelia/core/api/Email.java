package com.gapelia.core.api;

import com.gapelia.core.auth.SessionManager;
import com.gapelia.core.database.QueryDatabaseBook;
import com.gapelia.core.database.QueryDatabaseLibrary;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.log4j.Logger;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.sql.Timestamp;

/**
 * Created by frankie on 4/27/14.
 */
@Path("/email/")
public class Email {
	private static Logger LOG = Logger.getLogger(Email.class);

	static final Runtime rt = Runtime.getRuntime();


	@Path("sendFeedbackEmail")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public String sendFeedbackEmail(@FormParam("sessionId") String sessionId, @FormParam("name") String name, @FormParam("email") String email, @FormParam("message") String message) {
		if (!APIUtil.isValidSession(sessionId))
			return "not a valid session";

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/feedbackEmail.sh '"+name+
						"' '"+email+"' '" + message+ "'"
		};

		LOG.info("Emailing feedback email...:\nuser email\ncmd: " + cmd[2]);


		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();

			return "Success...sent to be emailed";
		} catch (Exception e) {
			LOG.error("Error sending notification acceptance:" + e.getMessage());
		}

		return "failed for some reason";
	}

	public static void sendLibrarySubscriberEmail(User u, Book b, Library l){
		if(u.getEmailOptOut()) return;

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/subscriberEmail.sh '"+b.getTitle()+
						"' '"+l.getTitle()+"' '" + u.getEmail()+"' '" + b.getBookId() + "'"
		};

		LOG.info("Emailing subscriber email:\nuser email:" +u.getEmail() + "\ncmd: " + cmd[2]);


		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();
		} catch (Exception e) {
			LOG.error("Error sending notification acceptance:" + e.getMessage());
		}
	}

	public static void sendAcceptanceToLibraryEmail(User u, LibraryNotification n){
		if(u.getEmailOptOut()) return;

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/welcomeEmail.sh '"+QueryDatabaseUser.getBookByID(n.getBookId()).getTitle()+
						"' '"+QueryDatabaseLibrary.getLibrary(n.getLibraryId()).getTitle()+"' '" + u.getEmail()+"' '" +n.getLibraryId() + "'"
		};

		LOG.info("Emailing Acceptance email:\nuser email:" +u.getEmail() + "\ncmd: " + cmd[2]);


		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();
		} catch (Exception e) {
			LOG.error("Error sending notification acceptance:" + e.getMessage());
		}
	}

	public static void sendWelcomeEmail(User u){

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/welcomeEmail.sh '"+u.getName()+ "' '" + u.getEmail() +"'"
		};

		LOG.info("Emailing welcome email:\nuser email:" +u.getEmail() + "\ncmd: " + cmd[2]);


		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();
		} catch (Exception e) {
			LOG.error("Error sending welcome email:" + e.getMessage());
		}
	}

	public static void sendCommentEmail(User u, CommentNotification n){
		if(u.getEmailOptOut()) return;

		if(n.getComment() != null && n.getComment().length() > 0)
			n.setComment("&quot;"+n.getComment()+"&quot;");

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/commentEmail.sh '"+n.getType() + "' '" + n.getReferencedBookId() +
						"' '"+ QueryDatabaseUser.getBookByID(n.getReferencedBookId()).getTitle() +"' '" +
						QueryDatabaseUser.getUserById(n.getCommenterUserId()).getName() + "' '" +
						n.getComment() + "' '" + u.getEmail() +"'"
		};

		LOG.info("Emailing comment email:\nuser email:" +u.getEmail() + "\ncmd: " + cmd[2]);


		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();
		} catch (Exception e) {
			LOG.error("Error sending comment email:" + e.getMessage());
		}
	}

	public static void sendRejectionToLibraryEmail(User u, LibraryNotification n){
		if(u.getEmailOptOut()) return;

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/rejectionEmail.sh '"+QueryDatabaseUser.getBookByID(n.getBookId()).getTitle()+
						"' '"+QueryDatabaseLibrary.getLibrary(n.getLibraryId()).getTitle()+"' '" + u.getEmail()+"'"
		};

		LOG.info("Emailing rejection email:\nuser email:" +u.getEmail() + "\ncmd: " + cmd[2]);


		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();
		} catch (Exception e) {
			LOG.error("Error sending notification acceptance:" + e.getMessage());
		}
	}

	public static void sendSubmissionToLibraryEmail(User u, LibraryNotification n){
		if(u.getEmailOptOut()) return;

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/submissionEmail.sh '"+QueryDatabaseUser.getBookByID(n.getBookId()).getTitle()+
						"' '"+QueryDatabaseLibrary.getLibrary(n.getLibraryId()).getTitle()+"' '" + u.getEmail()+"' '" +n.getLibraryId() + "'"
		};

		LOG.info("Emailing submission email:\nuser email:" +u.getEmail() + "\ncmd: " + cmd[2]);

		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();
		} catch (Exception e) {
			LOG.error("Error sending notification acceptance:" + e.getMessage());
		}
	}
}
