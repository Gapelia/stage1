package com.gapelia.core.database;
import org.brickred.socialauth.util.BirthDate;

import java.sql.Date;

public class SQLUtil {
    public static Date convertBirthDate(BirthDate bd){
        Date date = new Date(bd.getYear(),bd.getMonth(),bd.getDay());
        return date;
    }
}
