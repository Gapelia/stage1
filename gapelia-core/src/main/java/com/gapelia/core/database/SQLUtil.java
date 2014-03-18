package com.gapelia.core.database;
import org.brickred.socialauth.util.BirthDate;
import org.joda.time.LocalDate;

import java.sql.Date;
import java.util.Calendar;

public class SQLUtil {
    public static Date convertBirthDate(BirthDate bd){

		Calendar cal  = Calendar.getInstance();

		cal.set(bd.getYear(),bd.getMonth(),bd.getDay());
		LocalDate date = new LocalDate(bd.getYear(),bd.getMonth(),bd.getDay());
		return new Date(date.toDate().getTime());
    }
}
