package com.gapelia.core.api;

import com.gapelia.core.database.QueryDatabaseBook;
import com.gapelia.core.database.QueryDatabaseLibrary;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.LibraryNotification;
import com.gapelia.core.model.User;

import java.io.IOException;

/**
 * Created by frankie on 4/27/14.
 */
public class Email {

	static final Runtime rt = Runtime.getRuntime();

	public static void sendAcceptanceToLibraryEmail(User u, LibraryNotification n){
		String[] cmd = {
				"/bin/sh",
				"-c",
				"/emailScripts/acceptanceEmail.sh "+QueryDatabaseUser.getBookByID(n.getBookId()).getTitle()+
						" "+QueryDatabaseLibrary.getLibrary(n.getLibraryId()).getTitle()+" " + u.getEmail()
		};

		Process p = null;
		try {
			p = rt.exec(cmd);
//			p .waitFor();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
