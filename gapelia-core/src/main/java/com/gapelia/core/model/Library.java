package com.gapelia.core.model;

import java.sql.Date;

/**
 * User: Abhishek Tiwari
 * Date: 26/10/13
 * Time: 4:07 PM
 * Copyright Gapelia Inc
 */
public class Library {
	private String libraryId;
	private String createdByUserId;
	private String title;
	private String description;
	private Book [] books;
	private Date created;
	private Date lastEdited;
	private Double reputation;
	private Boolean isPrivate;
	private Boolean isDisabled;

	public String getLibraryId() {
		return libraryId;
	}

	public void setLibraryId(String libraryId) {
		this.libraryId = libraryId;
	}

	public String getCreatedByUserId() {
		return createdByUserId;
	}

	public void setCreatedByUserId(String createdByUserId) {
		this.createdByUserId = createdByUserId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Book[] getBooks() {
		return books;
	}

	public void setBooks(Book[] books) {
		this.books = books;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getLastEdited() {
		return lastEdited;
	}

	public void setLastEdited(Date lastEdited) {
		this.lastEdited = lastEdited;
	}

	public Double getReputation() {
		return reputation;
	}

	public void setReputation(Double reputation) {
		this.reputation = reputation;
	}

	public Boolean getPrivate() {
		return isPrivate;
	}

	public void setPrivate(Boolean aPrivate) {
		isPrivate = aPrivate;
	}

	public Boolean getDisabled() {
		return isDisabled;
	}

	public void setDisabled(Boolean disabled) {
		isDisabled = disabled;
	}
}
