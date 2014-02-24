package com.gapelia.core.database;

import com.gapelia.core.model.Book;
import com.gapelia.core.model.BookNotifications;
import com.gapelia.core.model.Page;
import com.gapelia.core.model.User;
import com.gapelia.core.model.UserVotes;
import org.apache.log4j.Logger;
import org.brickred.socialauth.Profile;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class QueryDatabaseBook {
    private static Logger LOG = Logger.getLogger(Book.class);
    private static Connection connection = DatabaseManager.getInstance().getConnection();
    //Page Relate Queries
    private static final String
    private static final String UPDATE_PAGE = "UPDATE pages set title = ?, description = ?, templateId = ?, bookId = ?, marginX = ?, marginY = ?, videoUrl = ?, pageNumber = ?, userId = ?, photoUrl = ?, photoId = ?, creativeCommons = ?, lastUpdated = ? WHERE pageId = ?";
    private static final String INSERT_PAGE = "INSERT INTO pages (title, description,templateId,bookId,marginX,marginY,videoUrl,pageNumber,userId,photoUrl,photoId,pageId) "+ "VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
    // Book Related Queries
    private static final String INSERT_BOOK = "INSERT INTO books (bookiD,title, language,library,tags,userId,isPublished,coverPhoto) " + "VALUES(?,?,?,?,?,?,?,?)";
    private static final String UPDATE_BOOK = "UPDATE books set coverPhoto = ?, title = ?, language = ?, library = ?, tags = ?, lastUpdated = ?, isPublished = ? WHERE bookId= ?";

}
