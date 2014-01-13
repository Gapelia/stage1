package com.gapelia.core.model;

import java.sql.Date;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 4:08 PM
 * Copyright Gapelia Inc
 */
public class Book {
	private String bookId;
	private String [] createdByUserIds;
	private String title;
	private String coverPhoto;
	private String dimension;
	private String language;
	private String library;
	private String userId;
	private String [] tags;
	private Page [] pages;
	private Date createdDate;
	private Date publishedDate;
	private Date lastEditedDate;
	private Boolean isPublished;
	
	public String getUserId(){
		return userId;
	}

	public void setUserId(String userId){
		this.userId=userId;
	}

	public String getLibrary(){
		return library;
	}

	public void setLibrary(String library){
		this.library=library;
	}
	
	public String getCoverPhoto(){
		return coverPhoto;
	}

	public void setCoverPhoto(String coverPhoto) {
		this.coverPhoto = coverPhoto;
	}

	public String getBookId() {
		return bookId;
	}

	public void setBookId(String bookId) {
		this.bookId = bookId;
	}

	public String[] getCreatedByUserIds() {
		return createdByUserIds;
	}

	public void setCreatedByUserIds(String[] createdByUserIds) {
		this.createdByUserIds = createdByUserIds;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDimension() {
		return dimension;
	}

	public void setDimension(String dimension) {
		this.dimension = dimension;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String[] getTags() {
		return tags;
	}

	public void setTags(String[] tags) {
		this.tags = tags;
	}

	public Page[] getPages() {
		return pages;
	}

	public void setPages(Page[] pages) {
		this.pages = pages;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getPublishedDate() {
		return publishedDate;
	}

	public void setPublishedDate(Date publishedDate) {
		this.publishedDate = publishedDate;
	}

	public Date getLastEditedDate() {
		return lastEditedDate;
	}

	public void setLastEditedDate(Date lastEditedDate) {
		this.lastEditedDate = lastEditedDate;
	}

	public Boolean getPublished() {
		return isPublished;
	}

	public void setPublished(Boolean published) {
		isPublished = published;
	}
}
