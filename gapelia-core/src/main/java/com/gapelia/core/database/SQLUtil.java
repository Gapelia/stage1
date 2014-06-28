package com.gapelia.core.database;
import com.gapelia.core.model.Book;
import org.brickred.socialauth.util.BirthDate;
import org.joda.time.LocalDate;

import java.sql.*;
import java.util.Date;
import java.util.Calendar;

public class SQLUtil {
    public static java.sql.Date convertBirthDate(BirthDate bd){

		Calendar cal  = Calendar.getInstance();

		cal.set(bd.getYear(),bd.getMonth(),bd.getDay());
		LocalDate date = new LocalDate(bd.getYear(),bd.getMonth(),bd.getDay());
		return new java.sql.Date(date.toDate().getTime());
    }

	public static boolean isSameDay(Date date1, Date date2) {
		if (date1 == null || date2 == null) {
			throw new IllegalArgumentException("The dates must not be null");
		}
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(date1);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(date2);
		return isSameDay(cal1, cal2);
	}

	public static boolean isSameDay(Calendar cal1, Calendar cal2) {
		if (cal1 == null || cal2 == null) {
			throw new IllegalArgumentException("The dates must not be null");
		}
		return (cal1.get(Calendar.ERA) == cal2.get(Calendar.ERA) &&
				cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
				cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR));
	}


}
