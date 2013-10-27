package com.gapelia.core.model;

import java.sql.Date;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 4:11 PM
 * Copyright Gapelia Inc
 */
public class BookMeta {
	private String bookId;
	private String title;
	private String dimension;
	private String language;
	private String [] tags;
	private Library [] inLibraries;
	private Page [] pages;
	private Date createdDate;
	private Date publishedDate;
	private Date lastEditedDate;
	private Boolean isPublished;

}
