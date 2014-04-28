package com.gapelia.core.api;

import com.gapelia.core.database.QueryDatabaseBook;
import com.gapelia.core.database.QueryDatabaseLibrary;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.LibraryNotification;
import com.gapelia.core.model.User;
import org.apache.log4j.Logger;

import java.io.IOException;

/**
 * Created by frankie on 4/27/14.
 */
public class Email {
	private static Logger LOG = Logger.getLogger(Email.class);

	static final Runtime rt = Runtime.getRuntime();

	public static void sendAcceptanceToLibraryEmail(User u, LibraryNotification n){
		if(u.getEmailOptOut()) return;

		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/acceptanceEmail.sh '"+QueryDatabaseUser.getBookByID(n.getBookId()).getTitle()+
						"' '"+QueryDatabaseLibrary.getLibrary(n.getLibraryId()).getTitle()+"' '" + u.getEmail()+"'"
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
						"' '"+QueryDatabaseLibrary.getLibrary(n.getLibraryId()).getTitle()+"' '" + u.getEmail()+"'"
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
